"use client"

import { useState, useRef, useEffect } from "react"
import { Mic, Square } from "lucide-react"

interface AudioRecorderProps {
  onSubmit: (audioBlob: Blob) => void
  isLoading: boolean
}

export default function AudioRecorder({ onSubmit, isLoading }: AudioRecorderProps) {
  const [isRecording, setIsRecording] = useState(false)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const streamRef = useRef<MediaStream | null>(null)

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream
      chunksRef.current = []

      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      mediaRecorder.ondataavailable = (e) => {
        chunksRef.current.push(e.data)
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/wav" })
        onSubmit(blob)
        stream.getTracks().forEach((track) => track.stop())
        setIsRecording(false)
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error("Error accessing microphone:", error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
    }
  }

  return (
    <button
      onClick={isRecording ? stopRecording : startRecording}
      disabled={isLoading}
      className={`p-2 sm:p-3 rounded-lg sm:rounded-xl flex items-center justify-center transition-all font-medium flex-shrink-0 ${
        isRecording
          ? "bg-destructive hover:bg-destructive/90 text-white animate-pulse-soft shadow-lg"
          : "bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm hover:shadow-md"
      } disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      <Mic size={16} className={`${isRecording ? "hidden" : "block"}`} />
      <Square size={16} className={`fill-current ${isRecording ? "block" : "hidden"}`} />
    </button>
  )
}
