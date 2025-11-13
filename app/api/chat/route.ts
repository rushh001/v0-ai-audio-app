import { generateText } from "ai"

export const maxDuration = 30

interface RequestBody {
  message: string
  context: Array<{
    role: "user" | "assistant"
    content: string
  }>
}

export async function POST(req: Request) {
  const { message, context }: RequestBody = await req.json()

  // Build conversation history for context
  const conversationHistory = context.map((msg) => `${msg.role}: ${msg.content}`).join("\n")

  const prompt = `You are a helpful AI assistant. Here's the conversation history:\n${conversationHistory}\n\nUser: ${message}\n\nAssistant:`

  try {
    const { text } = await generateText({
      model: "groq/llama-3.1-70b-versatile",
      prompt,
      maxOutputTokens: 500,
      temperature: 0.7,
    })

    return Response.json({ text })
  } catch (error) {
    console.error("Error generating text:", error)
    return Response.json({ error: "Failed to generate response" }, { status: 500 })
  }
}
