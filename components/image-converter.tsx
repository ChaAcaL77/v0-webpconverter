"use client"

import { useState, useCallback, useEffect } from "react"
import { useDropzone } from "react-dropzone"
import { Upload, Check, X, Download, ImageIcon, Loader2, Archive, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"
import Compressor from "compressorjs"
import JSZip from "jszip"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type FileWithPreview = {
  file: File
  preview: string
  status: "pending" | "converting" | "completed" | "error"
  webpUrl?: string
  originalSize?: number
  convertedSize?: number
}

export function ImageConverter() {
  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [isConverting, setIsConverting] = useState(false)
  const [overallProgress, setOverallProgress] = useState(0)
  const [isDownloading, setIsDownloading] = useState(false)
  const [totalSaved, setTotalSaved] = useState({ original: 0, converted: 0 })

  // Calcular estatísticas de economia de espaço
  useEffect(() => {
    const completedFiles = files.filter((f) => f.status === "completed")
    if (completedFiles.length > 0) {
      const original = completedFiles.reduce((sum, file) => sum + (file.originalSize || 0), 0)
      const converted = completedFiles.reduce((sum, file) => sum + (file.convertedSize || 0), 0)
      setTotalSaved({ original, converted })
    } else {
      setTotalSaved({ original: 0, converted: 0 })
    }
  }, [files])

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      status: "pending" as const,
      originalSize: file.size,
    }))
    setFiles((prev) => [...prev, ...newFiles])
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".bmp", ".tiff"],
    },
    onDrop,
  })

  // Convert image to WebP using Compressor.js
  const convertToWebP = (file: File): Promise<{ blob: Blob; url: string }> => {
    return new Promise((resolve, reject) => {
      new Compressor(file, {
        quality: 0.8,
        mimeType: "image/webp",
        success(result) {
          // Create a URL for the blob
          const url = URL.createObjectURL(result)
          resolve({ blob: result, url })
        },
        error(err) {
          reject(err)
        },
      })
    })
  }

  const handleConvert = async () => {
    if (files.length === 0 || isConverting) return

    setIsConverting(true)
    const pendingFiles = files.filter((f) => f.status === "pending")
    let completed = 0

    for (let i = 0; i < pendingFiles.length; i++) {
      const fileIndex = files.findIndex((f) => f === pendingFiles[i])

      // Update status to converting
      setFiles((prev) => prev.map((f, idx) => (idx === fileIndex ? { ...f, status: "converting" } : f)))

      try {
        // Convert image to WebP
        const { blob, url } = await convertToWebP(pendingFiles[i].file)

        // Update file status to completed
        setFiles((prev) =>
          prev.map((f, idx) =>
            idx === fileIndex
              ? {
                  ...f,
                  status: "completed",
                  webpUrl: url,
                  convertedSize: blob.size,
                }
              : f,
          ),
        )
      } catch (error) {
        console.error("Conversion error:", error)

        // Update file status to error
        setFiles((prev) => prev.map((f, idx) => (idx === fileIndex ? { ...f, status: "error" } : f)))
      }

      // Update progress
      completed++
      setOverallProgress(Math.round((completed / pendingFiles.length) * 100))
    }

    // Reset conversion state
    setIsConverting(false)
    setOverallProgress(0)
  }

  const downloadWebP = (webpUrl: string, fileName: string) => {
    const link = document.createElement("a")
    link.href = webpUrl
    link.download = `${fileName.split(".")[0]}.webp`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Função para baixar todas as imagens convertidas como um arquivo ZIP
  const downloadAllAsZip = async () => {
    const completedFiles = files.filter((f) => f.status === "completed" && f.webpUrl)

    if (completedFiles.length === 0) return

    setIsDownloading(true)

    try {
      const zip = new JSZip()

      // Adicionar cada imagem convertida ao ZIP
      const fetchPromises = completedFiles.map(async (file) => {
        if (!file.webpUrl) return

        // Buscar o blob da URL
        const response = await fetch(file.webpUrl)
        const blob = await response.blob()

        // Adicionar ao ZIP com um nome de arquivo adequado
        const fileName = `${file.file.name.split(".")[0]}.webp`
        zip.file(fileName, blob)
      })

      // Aguardar todas as imagens serem adicionadas
      await Promise.all(fetchPromises)

      // Gerar o arquivo ZIP
      const zipBlob = await zip.generateAsync({ type: "blob" })

      // Criar URL para o blob
      const zipUrl = URL.createObjectURL(zipBlob)

      // Criar link para download
      const link = document.createElement("a")
      link.href = zipUrl
      link.download = "imagens-webp.zip"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Limpar a URL do blob
      setTimeout(() => {
        URL.revokeObjectURL(zipUrl)
      }, 100)
    } catch (error) {
      console.error("Erro ao criar arquivo ZIP:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  const removeFile = (index: number) => {
    setFiles((prev) => {
      const newFiles = [...prev]
      // Revoke the object URL to avoid memory leaks
      if (newFiles[index].preview) {
        URL.revokeObjectURL(newFiles[index].preview)
      }
      if (newFiles[index].webpUrl) {
        URL.revokeObjectURL(newFiles[index].webpUrl)
      }
      newFiles.splice(index, 1)
      return newFiles
    })
  }

  const clearAll = () => {
    files.forEach((file) => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview)
      }
      if (file.webpUrl) {
        URL.revokeObjectURL(file.webpUrl)
      }
    })
    setFiles([])
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  const calculateSavings = (original: number, converted: number) => {
    if (!original || !converted || original === 0) return "0%"
    const savings = original - converted
    const percentage = Math.round((savings / original) * 100)
    return `${percentage}%`
  }

  // Verificar se há arquivos convertidos
  const hasCompletedFiles = files.some((f) => f.status === "completed")

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20"
            : "border-slate-300 dark:border-slate-700 hover:border-teal-400 dark:hover:border-teal-600"
        }`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="w-16 h-16 rounded-full bg-teal-100 dark:bg-teal-900/30 flex items-center justify-center">
            <Upload className="h-8 w-8 text-teal-600 dark:text-teal-400" />
          </div>
          <p className="text-lg font-medium">
            {isDragActive ? "Solte as imagens aqui..." : "Arraste e solte imagens aqui, ou clique para selecionar"}
          </p>
          <p className="text-sm text-slate-500 dark:text-slate-400">Suporta PNG, JPG, JPEG, GIF, BMP, TIFF</p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h3 className="text-lg font-medium flex items-center">
              <ImageIcon className="h-5 w-5 mr-2 text-teal-600 dark:text-teal-400" />
              {files.length} {files.length === 1 ? "Imagem" : "Imagens"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {hasCompletedFiles && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={downloadAllAsZip}
                        disabled={isDownloading || isConverting}
                        size="sm"
                        className="bg-teal-600 hover:bg-teal-700 text-white"
                      >
                        {isDownloading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Compactando...
                          </>
                        ) : (
                          <>
                            <Archive className="mr-2 h-4 w-4" />
                            Baixar Todas (.zip)
                          </>
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Baixar todas as imagens convertidas em um arquivo ZIP</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              <Button variant="outline" size="sm" onClick={clearAll} disabled={isConverting || isDownloading}>
                Limpar Tudo
              </Button>
              <Button
                onClick={handleConvert}
                disabled={isConverting || isDownloading || files.every((f) => f.status !== "pending")}
                size="sm"
                className="bg-teal-600 hover:bg-teal-700 text-white"
              >
                {isConverting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Convertendo...
                  </>
                ) : (
                  "Converter para WebP"
                )}
              </Button>
            </div>
          </div>

          {/* Estatísticas de economia */}
          {hasCompletedFiles && totalSaved.original > 0 && (
            <div className="bg-teal-50 dark:bg-teal-900/20 rounded-lg p-4 border border-teal-100 dark:border-teal-900/50">
              <div className="flex items-start gap-3">
                <div className="mt-1 text-teal-600 dark:text-teal-400">
                  <Info size={18} />
                </div>
                <div>
                  <h4 className="font-medium text-teal-800 dark:text-teal-300">Estatísticas de Economia</h4>
                  <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-slate-500 dark:text-slate-400">Tamanho Original</p>
                      <p className="font-medium text-slate-900 dark:text-white">
                        {formatFileSize(totalSaved.original)}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500 dark:text-slate-400">Tamanho Convertido</p>
                      <p className="font-medium text-slate-900 dark:text-white">
                        {formatFileSize(totalSaved.converted)}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-500 dark:text-slate-400">Economia</p>
                      <p className="font-medium text-teal-600 dark:text-teal-400">
                        {formatFileSize(totalSaved.original - totalSaved.converted)} (
                        {calculateSavings(totalSaved.original, totalSaved.converted)})
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isConverting && (
            <div className="space-y-2 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-lg">
              <div className="flex justify-between text-sm">
                <span>Progresso Geral</span>
                <span>{overallProgress}%</span>
              </div>
              <Progress value={overallProgress} className="h-2 bg-slate-200 dark:bg-slate-700">
                <div
                  className="h-full bg-teal-600 dark:bg-teal-500 transition-all"
                  style={{ width: `${overallProgress}%` }}
                />
              </Progress>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {files.map((file, index) => (
              <div
                key={index}
                className="relative bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm border border-slate-200 dark:border-slate-700 transition-all hover:shadow-md"
              >
                <div className="aspect-video relative bg-slate-100 dark:bg-slate-900/50">
                  <Image
                    src={file.preview || "/placeholder.svg"}
                    alt={file.file.name}
                    fill
                    className="object-contain"
                  />
                  {file.status === "converting" && (
                    <div className="absolute inset-0 bg-slate-900/30 flex items-center justify-center">
                      <div className="bg-white dark:bg-slate-800 rounded-full p-3">
                        <Loader2 className="h-6 w-6 animate-spin text-teal-600 dark:text-teal-400" />
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="truncate pr-2">
                      <p className="font-medium truncate">{file.file.name}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {formatFileSize(file.originalSize || 0)}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      {file.status === "completed" && file.webpUrl && (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 text-teal-600 hover:text-teal-700 hover:bg-teal-50 dark:text-teal-400 dark:hover:text-teal-300 dark:hover:bg-teal-900/20"
                                onClick={() => downloadWebP(file.webpUrl, file.file.name)}
                              >
                                <Download className="h-4 w-4" />
                                <span className="sr-only">Download</span>
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Baixar imagem WebP</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="h-8 w-8 text-slate-500 hover:text-slate-700 hover:bg-slate-50 dark:text-slate-400 dark:hover:text-slate-300 dark:hover:bg-slate-800"
                              onClick={() => removeFile(index)}
                              disabled={isConverting && file.status === "converting"}
                            >
                              <X className="h-4 w-4" />
                              <span className="sr-only">Remover</span>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Remover imagem</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {file.status === "pending" && (
                      <span className="text-sm text-slate-500 dark:text-slate-400 flex items-center">
                        <div className="w-2 h-2 rounded-full bg-slate-400 mr-2"></div>
                        Pronto para converter
                      </span>
                    )}
                    {file.status === "converting" && (
                      <span className="text-sm text-amber-500 flex items-center">
                        <div className="w-2 h-2 rounded-full bg-amber-500 mr-2 animate-pulse"></div>
                        Convertendo...
                      </span>
                    )}
                    {file.status === "completed" && (
                      <div className="flex items-center gap-2 bg-teal-50 dark:bg-teal-900/20 px-3 py-1 rounded-full">
                        <Check className="h-4 w-4 text-teal-600 dark:text-teal-400" />
                        <span className="text-sm text-teal-700 dark:text-teal-300">Convertido</span>
                        <span className="text-xs bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full">
                          {formatFileSize(file.convertedSize || 0)} (
                          {calculateSavings(file.originalSize || 0, file.convertedSize || 0)} economizado)
                        </span>
                      </div>
                    )}
                    {file.status === "error" && (
                      <span className="text-sm text-red-500 flex items-center">
                        <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
                        Falha na conversão
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
