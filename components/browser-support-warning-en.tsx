"use client"

import { useState, useEffect } from "react"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function BrowserSupportWarningEn() {
  const [showWarning, setShowWarning] = useState(false)

  useEffect(() => {
    // Check if browser supports WebP
    const checkWebPSupport = () => {
      const elem = document.createElement("canvas")
      if (elem.getContext && elem.getContext("2d")) {
        // Check if toDataURL supports WebP
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
      <AlertTitle className="text-amber-800 dark:text-amber-300">Browser Compatibility Issue</AlertTitle>
      <AlertDescription className="text-amber-700 dark:text-amber-400">
        Your browser may not fully support WebP conversion. For best results, please use Chrome, Edge, or Firefox.
      </AlertDescription>
    </Alert>
  )
}
