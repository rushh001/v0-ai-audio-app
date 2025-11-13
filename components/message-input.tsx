"use client"

import type React from "react"
import { useState } from "react"
import { Send } from "lucide-react"

interface MessageInputProps {
  onSend: (message: string) => void
  isLoading: boolean
}

export default function MessageInput({ onSend, isLoading }: MessageInputProps) {
  const [input, setInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      onSend(input)
      setInput("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Message agent..."
        disabled={isLoading}
        className="flex-1 bg-card border border-accent-thin rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 text-foreground placeholder-muted-foreground text-xs sm:text-sm focus:outline-none focus:border-primary/40 focus:ring-1 focus:ring-primary/20 disabled:opacity-50 transition-all"
      />
      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        className="bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl flex items-center justify-center transition-all font-medium hover:shadow-sm flex-shrink-0"
      >
        <Send size={16} className="stroke-[2.5]" />
      </button>
    </form>
  )
}
