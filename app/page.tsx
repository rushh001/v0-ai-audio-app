"use client"

import { useState, useRef } from "react"
import AudioRecorder from "@/components/audio-recorder"
import ChatMessages from "@/components/chat-messages"
import MessageInput from "@/components/message-input"
import { type Message, MessageContextManager } from "@/lib/message-context"

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const contextManagerRef = useRef(new MessageContextManager())
  const audioRef = useRef<HTMLAudioElement>(null)

  const addMessage = (role: "user" | "assistant", content: string, type: "text" | "audio" = "text") => {
    const newMessage: Message = {
      id: Date.now().toString(),
      role,
      content,
      type,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])
    contextManagerRef.current.addMessage(newMessage)
    return newMessage
  }

  const handleSendText = async (text: string) => {
    if (!text.trim()) return

    addMessage("user", text, "text")
    setIsLoading(true)

    try {
      const context = contextManagerRef.current.getContext()
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, context }),
      })

      const data = await response.json()
      addMessage("assistant", data.text, "text")
    } catch (error) {
      console.error("Error sending message:", error)
      addMessage("assistant", "Sorry, there was an error processing your request.", "text")
    } finally {
      setIsLoading(false)
    }
  }

  const handleAudioSubmit = async (audioBlob: Blob) => {
    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append("audio", audioBlob)
      const context = contextManagerRef.current.getContext()
      formData.append("context", JSON.stringify(context))

      const response = await fetch("/api/audio", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      addMessage("user", data.transcription, "audio")
      addMessage("assistant", data.response, "audio")

      if (data.audioUrl) {
        if (audioRef.current) {
          audioRef.current.src = data.audioUrl
          audioRef.current.play()
        }
      }
    } catch (error) {
      console.error("Error processing audio:", error)
      addMessage("assistant", "Sorry, there was an error processing your audio.", "text")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <audio ref={audioRef} className="hidden" />

      <header className="border-b border-accent-thin bg-card/40 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-6 w-full">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="w-7 sm:w-8 h-7 sm:h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-card text-xs sm:text-sm font-bold">✧</span>
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-xl font-bold text-foreground tracking-tight truncate">VEXA</h1>
                <p className="text-xs text-muted-foreground tracking-wider uppercase mt-0.5 hidden sm:block">
                  AI Agent
                </p>
              </div>
            </div>
            <nav className="hidden lg:flex items-center gap-6 text-sm flex-shrink-0">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Explore
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Docs
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                API
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Messages Container */}
      <div className="flex-1 overflow-hidden flex flex-col">
        <ChatMessages messages={messages} isLoading={isLoading} />
      </div>

      <footer className="border-t border-accent-thin bg-card/40 backdrop-blur-sm sticky bottom-0">
        <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-6 w-full">
          <div className="space-y-3 sm:space-y-4">
            {isLoading && (
              <div className="w-full h-0.5 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary animate-pulse-soft" style={{ width: "60%" }} />
              </div>
            )}
            <div className="flex gap-2 sm:gap-3 items-end">
              <AudioRecorder onSubmit={handleAudioSubmit} isLoading={isLoading} />
              <div className="flex-1 min-w-0">
                <MessageInput onSend={handleSendText} isLoading={isLoading} />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
