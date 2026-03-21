"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"

interface CameraContextType {
  isCameraActive: boolean
  requestCamera: (reason: string) => Promise<boolean>
  stopCamera: () => void
  cameraStream: MediaStream | null
}

const CameraContext = createContext<CameraContextType | null>(null)

export function CameraProvider({ children }: { children: React.ReactNode }) {
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null)

  const requestCamera = useCallback(
    async (reason: string): Promise<boolean> => {
      if (isCameraActive) return true

      const userConsent = window.confirm(
        `🔥 FireLoop would like to access your camera for: ${reason}\n\nThis helps provide personalized recommendations based on your mood. Allow camera access?`,
      )

      if (!userConsent) return false

      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        })
        setCameraStream(stream)
        setIsCameraActive(true)
        return true
      } catch (error) {
        console.error("Camera access denied:", error)
        alert(
          "Camera access was denied. Please enable camera permissions in your browser settings to use mood detection features.",
        )
        return false
      }
    },
    [isCameraActive],
  )

  const stopCamera = useCallback(() => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop())
      setCameraStream(null)
    }
    setIsCameraActive(false)
  }, [cameraStream])

  return (
    <CameraContext.Provider
      value={{
        isCameraActive,
        requestCamera,
        stopCamera,
        cameraStream,
      }}
    >
      {children}
    </CameraContext.Provider>
  )
}

export const useCamera = () => {
  const context = useContext(CameraContext)
  if (!context) {
    throw new Error("useCamera must be used within CameraProvider")
  }
  return context
}
