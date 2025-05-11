import { ImageConverterEn } from "@/components/image-converter-en"
import { BrowserSupportWarningEn } from "@/components/browser-support-warning-en"
import { Logo } from "@/components/logo"
import { Github } from "lucide-react"

export default function EnglishPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      {/* Header */}
      <header className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 sticky top-0 z-10 backdrop-blur-sm bg-opacity-80 dark:bg-opacity-80">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <Logo />
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
            >
              PT
            </a>
            <a href="/en" className="text-sm font-medium text-teal-600 dark:text-teal-400">
              EN
            </a>
            <a
              href="https://github.com/ChaAcaL77/v0-webpconverter"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mx-auto max-w-4xl">
          {/* Hero Section */}
          <div className="text-center mb-12 mt-4">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 bg-gradient-to-r from-slate-900 to-teal-600 dark:from-white dark:to-teal-400 text-transparent bg-clip-text">
              WebP Image Converter
            </h1>
            <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Convert your images to WebP format and reduce file sizes by up to 34% while maintaining quality.
            </p>
          </div>

          <BrowserSupportWarningEn />

          {/* Main Converter */}
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 p-6 mb-12">
            <ImageConverterEn />
          </div>

          {/* Info Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-teal-700 dark:text-teal-400">
                <span className="bg-teal-100 dark:bg-teal-900/30 w-8 h-8 rounded-full flex items-center justify-center mr-2 text-teal-700 dark:text-teal-400">
                  1
                </span>
                Why WebP?
              </h2>
              <ul className="space-y-2 list-disc pl-5 text-slate-700 dark:text-slate-300">
                <li>WebP files are 26% smaller than PNGs and 25-34% smaller than JPEGs</li>
                <li>Supports transparency like PNG but with better compression</li>
                <li>Faster page loading times and better user experience</li>
                <li>Supported by all modern browsers</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-md border border-slate-200 dark:border-slate-800 p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center text-teal-700 dark:text-teal-400">
                <span className="bg-teal-100 dark:bg-teal-900/30 w-8 h-8 rounded-full flex items-center justify-center mr-2 text-teal-700 dark:text-teal-400">
                  2
                </span>
                How to Use
              </h2>
              <ol className="space-y-2 list-decimal pl-5 text-slate-700 dark:text-slate-300">
                <li>Drag and drop your images into the designated area or click to select</li>
                <li>Click the "Convert to WebP" button to start the conversion</li>
                <li>Wait for the conversion process to complete</li>
                <li>Click the download icon to download the converted images</li>
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
              <h3 className="text-lg font-medium mb-2">Fast & Efficient</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Quick conversion directly in your browser without the need for uploads.
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
              <h3 className="text-lg font-medium mb-2">Privacy Guaranteed</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Your images never leave your device, ensuring complete privacy.
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
              <h3 className="text-lg font-medium mb-2">Full Compatibility</h3>
              <p className="text-slate-600 dark:text-slate-400">
                Works with all popular image formats: PNG, JPG, GIF, and more.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 bg-white dark:bg-slate-950">
        <div className="container mx-auto px-4 text-center text-slate-600 dark:text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} WebP Converter. All rights reserved.</p>
          <p className="mt-2">Created with ❤️ to optimize your images on the web.</p>
        </div>
      </footer>
    </div>
  )
}
