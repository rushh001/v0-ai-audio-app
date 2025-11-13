import { generateText } from "ai"
import { writeFile, unlink } from "fs/promises"
import { join } from "path"
import { exec } from "child_process"
import { promisify } from "util"

const execAsync = promisify(exec)

export const maxDuration = 60

interface ContextMessage {
  role: "user" | "assistant"
  content: string
}

async function transcribeAudio(audioPath: string): Promise<string> {
  // Using Groq's whisper model for transcription
  const formData = new FormData()
  const audioBuffer = await import("fs/promises").then((fs) => fs.readFile(audioPath))
  const audioBlob = new Blob([audioBuffer], { type: "audio/wav" })
  formData.append("file", audioBlob, "audio.wav")
  formData.append("model", "whisper-large-v3")

  try {
    const response = await fetch("https://api.groq.com/openai/v1/audio/transcriptions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: formData,
    })

    const data = await response.json()
    return data.text || "Could not transcribe audio"
  } catch (error) {
    console.error("Transcription error:", error)
    return "Error transcribing audio"
  }
}

async function generateSpeech(text: string): Promise<string> {
  // For now, return empty string - speech generation would need a TTS service
  // This is a placeholder for future integration with TTS
  return ""
}

export async function POST(req: Request) {
  const formData = await req.formData()
  const audioFile = formData.get("audio") as Blob
  const contextStr = formData.get("context") as string
  const context: ContextMessage[] = JSON.parse(contextStr || "[]")

  if (!audioFile) {
    return Response.json({ error: "No audio file provided" }, { status: 400 })
  }

  const audioPath = join("/tmp", `audio_${Date.now()}.wav`)

  try {
    // Save audio file
    const buffer = await audioFile.arrayBuffer()
    await writeFile(audioPath, Buffer.from(buffer))

    // Transcribe audio
    const transcription = await transcribeAudio(audioPath)

    // Generate response using context
    const conversationHistory = context.map((msg) => `${msg.role}: ${msg.content}`).join("\n")

    const prompt = `You are a helpful AI assistant. Here's the conversation history:\n${conversationHistory}\n\nUser: ${transcription}\n\nAssistant:`

    const { text: response } = await generateText({
      model: "groq/llama-3.1-70b-versatile",
      prompt,
      maxOutputTokens: 500,
      temperature: 0.7,
    })

    // Generate speech from response
    const audioUrl = await generateSpeech(response)

    // Cleanup
    await unlink(audioPath)

    return Response.json({
      transcription,
      response,
      audioUrl: audioUrl || null,
    })
  } catch (error) {
    console.error("Audio processing error:", error)
    try {
      await unlink(audioPath)
    } catch {}

    return Response.json({ error: "Failed to process audio" }, { status: 500 })
  }
}
