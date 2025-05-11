import { ImageIcon } from "lucide-react"

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-lg blur-sm opacity-75"></div>
        <div className="relative bg-white dark:bg-slate-900 rounded-lg p-2 border border-teal-200 dark:border-teal-900">
          <ImageIcon className="h-6 w-6 text-teal-600 dark:text-teal-400" />
        </div>
      </div>
      <div className="font-bold text-xl">
        <span className="text-slate-900 dark:text-white">WebP</span>
        <span className="text-teal-600 dark:text-teal-400">Converter</span>
      </div>
    </div>
  )
}
