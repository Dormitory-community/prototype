"use client"

import { useState, useEffect } from "react"

export const usePWA = () => {
  const [isInstallable, setIsInstallable] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setIsInstallable(true)
      setDeferredPrompt(e)
    }

    window.addEventListener("beforeinstallprompt", handler)

    return () => {
      window.removeEventListener("beforeinstallprompt", handler)
    }
  }, [])

  const installPWA = () => {
    if (deferredPrompt) {
      // Show the install prompt
      ;(deferredPrompt as any).prompt()

      // Wait for the user to respond to the prompt
      ;(deferredPrompt as any).userChoice.then((choiceResult: { outcome: string }) => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the PWA install prompt")
        } else {
          console.log("User dismissed the PWA install prompt")
        }
        setDeferredPrompt(null)
        setIsInstallable(false)
      })
    }
  }

  return { isInstallable, installPWA }
}
