export interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  type: "text" | "audio"
  timestamp: Date
}

export class MessageContextManager {
  private messages: Message[] = []
  private maxMessages = 5

  addMessage(message: Message): void {
    this.messages.push(message)
    if (this.messages.length > this.maxMessages * 2) {
      this.messages = this.messages.slice(-this.maxMessages * 2)
    }
  }

  getContext(): Message[] {
    return this.messages.slice(-this.maxMessages)
  }

  clearContext(): void {
    this.messages = []
  }
}
