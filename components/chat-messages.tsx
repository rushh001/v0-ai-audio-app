"use client"

import { useEffect, useRef } from "react"
import Avatar from "./avatar"
import type { Message } from "@/lib/message-context"

interface ChatMessagesProps {
  messages: Message[]
  isLoading: boolean
}

export default function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  return (
    <div className="overflow-y-auto px-3 sm:px-6 py-6 sm:py-8 space-y-4 sm:space-y-6 max-w-5xl mx-auto w-full">
      {messages.length === 0 && !isLoading && (
        <div className="h-full flex items-center justify-center min-h-96">
          <div className="text-center space-y-4 sm:space-y-6 px-4">
            <div className="w-16 sm:w-20 h-16 sm:h-20 mx-auto bg-muted rounded-xl border border-accent-thin flex items-center justify-center">
              <span className="text-2xl sm:text-3xl">◆</span>
            </div>
            <div className="space-y-2 sm:space-y-3">
              <h2 className="text-lg sm:text-2xl font-bold text-foreground tracking-tight">CRAFTING INTELLIGENCE</h2>
              <p className="text-muted-foreground text-xs sm:text-sm max-w-sm leading-relaxed mx-auto">
                Engage with advanced AI through voice or text. Your questions drive meaningful conversations.
              </p>
            </div>
          </div>
        </div>
      )}

      {messages.map((message) => (
        <div
          key={message.id}
          className={`animate-slideInUp flex ${message.role === "user" ? "justify-end" : "justify-start"} gap-2 sm:gap-3`}
        >
          <div
            className={`flex gap-2 sm:gap-3 items-end max-w-xs sm:max-w-2xl ${message.role === "user" ? "flex-row-reverse" : ""}`}
          >
            <Avatar role={message.role} size="sm" />
            <div
              className={`rounded-lg sm:rounded-xl px-3 sm:px-5 py-2 sm:py-4 break-words ${
                message.role === "user"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-card border border-accent-thin text-foreground"
              }`}
            >
              <div className="flex items-start gap-2">
                {message.type === "audio" && (
                  <span className="text-xs sm:text-base mt-0.5 flex-shrink-0 text-primary">▸</span>
                )}
                <p className="text-xs sm:text-sm leading-relaxed">{message.content}</p>
              </div>
            </div>
          </div>
        </div>
      ))}

      {isLoading && (
        <div className="flex justify-start gap-2 sm:gap-3 animate-slideInUp">
          <Avatar role="assistant" size="sm" />
          <div className="bg-card border border-accent-thin rounded-lg sm:rounded-xl px-3 sm:px-5 py-2 sm:py-4">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" style={{ animationDelay: "0ms" }} />
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" style={{ animationDelay: "150ms" }} />
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse-soft" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  )
}
