import { ImageConverter } from "@/components/image-converter"
import { BrowserSupportWarning } from "@/components/browser-support-warning"
import { Logo } from "@/components/logo"
import { Github } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 sticky top-0 z-10 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Logo />
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </a>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-12 mt-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-slate-900 to-teal-600 dark:from-white dark:to-teal-400 text-transparent bg-clip-text">
              Conversor de Imagens para WebP
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Converta suas imagens para o formato WebP e reduza o tamanho dos arquivos em até 34% mantendo a qualidade.
            </p>
          </div>

          <BrowserSupportWarning />

          {/* Main Converter */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 p-6 mb-12">
            <ImageConverter />
          </div>

          {/* Info Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-teal-700 dark:text-teal-400">
                <span className="bg-teal-100 dark:bg-teal-900/30 w-8 h-8 rounded-full flex items-center justify-center mr-2 text-teal-700 dark:text-teal-400">
                  1
                </span>
                Por que WebP?
              </h2>
              <ul className="space-y-2 list-disc pl-5 text-slate-700 dark:text-slate-300">
                <li>Arquivos WebP são 26% menores que PNGs e 25-34% menores que JPEGs</li>
                <li>Suporta transparência como PNG mas com melhor compressão</li>
                <li>Carregamento de páginas mais rápido e melhor experiência do usuário</li>
                <li>Suportado por todos os navegadores modernos</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-teal-700 dark:text-teal-400">
                <span className="bg-teal-100 dark:bg-teal-900/30 w-8 h-8 rounded-full flex items-center justify-center mr-2 text-teal-700 dark:text-teal-400">
                  2
                </span>
                Como Usar
              </h2>
              <ol className="space-y-2 list-decimal pl-5 text-slate-700 dark:text-slate-300">
                <li>Arraste e solte suas imagens na área indicada ou clique para selecionar</li>
                <li>Clique no botão "Converter para WebP" para iniciar a conversão</li>
                <li>Aguarde o processo de conversão ser concluído</li>
                <li>Clique no ícone de download para baixar as imagens convertidas</li>
              </ol>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-teal-600 dark:text-teal-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Rápido e Eficiente</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Conversão rápida diretamente no navegador sem necessidade de upload.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-teal-600 dark:text-teal-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Privacidade Garantida</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Suas imagens nunca saem do seu dispositivo, garantindo total privacidade.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-teal-600 dark:text-teal-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Compatibilidade Total</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Funciona com todos os formatos de imagem populares: PNG, JPG, GIF e mais.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 text-center text-slate-600 dark:text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} WebP Converter. Todos os direitos reservados.</p>
          <p className="mt-2">Criado com ❤️ para otimizar suas imagens na web.</p>
        </div>
      </footer>
    </div>
  )
}
