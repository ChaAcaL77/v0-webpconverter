"use client"

import { useState, useEffect } from "react"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function BrowserSupportWarning() {
  const [showWarning, setShowWarning] = useState(false)

  useEffect(() => {
    // Verificar se o navegador suporta WebP
    const checkWebPSupport = () => {
      const elem = document.createElement("canvas")
      if (elem.getContext && elem.getContext("2d")) {
        // Verificar se toDataURL suporta WebP
        const isWebPSupported = elem.toDataURL("image/webp").indexOf("data:image/webp") === 0
        setShowWarning(!isWebPSupported)
      } else {
        setShowWarning(true)
      }
    }

    checkWebPSupport()
  }, [])

  if (!showWarning) return null

  return (
    <Alert
      variant="destructive"
      className="mb-6 border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-900/20"
    >
      <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
      <AlertTitle className="text-amber-800 dark:text-amber-300">Problema de Compatibilidade do Navegador</AlertTitle>
      <AlertDescription className="text-amber-700 dark:text-amber-400">
        Seu navegador pode não suportar totalmente a conversão para WebP. Para melhores resultados, use Chrome, Edge ou
        Firefox.
      </AlertDescription>
    </Alert>
  )
}
