# VEXA - AI Audio Agent

A futuristic, interactive Next.js application that responds to your questions via text or voice using the Groq AI API. Features real-time audio transcription, intelligent responses, and a beautifully animated minimalist interface inspired by modern AI assistants.

## Features

- **Audio & Text Input**: Ask questions via typed text or voice recording
- **Real-time Transcription**: Uses Groq's Whisper model for accurate audio-to-text conversion
- **Intelligent Responses**: Powered by Groq's Llama 3.1 70B model
- **Context-Aware**: Maintains last 5 messages for better conversational context
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices
- **Beautiful UI**: Minimalist futuristic interface with smooth animations and avatars
- **Production Ready**: Error handling, message history, and optimized performance

## Tech Stack

- **Frontend**: Next.js 16 with React 19
- **Styling**: TailwindCSS v4 with custom animations
- **AI Models**: Groq API (Whisper + Llama 3.1 70B)
- **State Management**: React hooks with custom context manager
- **Deployment**: Vercel (recommended)

## Prerequisites

- Node.js 18+
- npm or yarn
- Groq API key (get one free at [console.groq.com](https://console.groq.com))

## Quick Start

### Local Development

1. **Clone the repository**:
\`\`\`bash
git clone https://github.com/yourusername/vexa-ai-agent.git
cd vexa-ai-agent
\`\`\`

2. **Install dependencies**:
\`\`\`bash
npm install
\`\`\`

3. **Set up environment variables**:
\`\`\`bash
cp .env.example .env.local
# Add your GROQ_API_KEY to .env.local
\`\`\`

4. **Start the development server**:
\`\`\`bash
npm run dev
\`\`\`

5. **Open your browser**:
Navigate to [http://localhost:3000](http://localhost:3000)

## Deployment

### Option 1: Deploy to Vercel (Recommended)

Vercel is the optimal hosting choice for this Next.js app with full API support.

1. **Push to GitHub**:
Click the GitHub logo button in v0 (top right) or run:
\`\`\`bash
git add .
git commit -m "Initial commit"
git push origin main
\`\`\`

2. **Connect to Vercel**:
- Go to [vercel.com](https://vercel.com)
- Click "New Project" and select your repository
- Vercel will auto-detect Next.js settings

3. **Add Environment Variables**:
- In Vercel dashboard, go to Settings → Environment Variables
- Add `GROQ_API_KEY` with your Groq API key value
- Click "Save"

4. **Deploy**:
- Click the "Deploy" button
- Your app will be live in 1-2 minutes!

### Option 2: Deploy to Other Platforms

#### GitHub Pages (Limited - Static Only)
GitHub Pages doesn't support Next.js API routes. For the full audio functionality, use Vercel instead.

#### Heroku/Railway
These platforms support Node.js but require additional configuration for production builds.

#### Self-hosted (VPS)
Build and run with `npm run build && npm start`, ensuring Node.js 18+ is installed.

## Usage

### Text Mode
1. Type your question in the input field
2. Press Enter or click Send
3. View the AI response with your message history

### Audio Mode
1. Click the microphone button to start recording
2. Speak your question clearly
3. Click the stop button to finish recording
4. Wait for transcription and AI response
5. Listen to the response or read the transcript

## Project Structure

\`\`\`
.
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main chat interface
│   ├── globals.css         # Global styles and animations
│   └── api/
│       ├── chat/route.ts   # Text chat endpoint
│       └── audio/route.ts  # Audio transcription & response endpoint
├── components/
│   ├── chat-messages.tsx   # Message display component
│   ├── message-input.tsx   # Text input component
│   ├── audio-recorder.tsx  # Audio recording component
│   └── avatar.tsx          # User/AI avatar component
├── lib/
│   └── message-context.ts  # Conversation history manager
└── public/                 # Static assets
\`\`\`

## API Endpoints

### `POST /api/chat`

Handles text-based conversations with context awareness.

**Request**:
\`\`\`json
{
  "message": "What is the capital of France?",
  "context": [
    { "role": "user", "content": "Hello" },
    { "role": "assistant", "content": "Hi there!" }
  ]
}
\`\`\`

**Response**:
\`\`\`json
{
  "response": "The capital of France is Paris.",
  "timestamp": "2024-01-15T10:30:00Z"
}
\`\`\`

### `POST /api/audio`

Handles audio recording, transcription, and response generation.

**Request**: FormData with:
- `audio`: WAV audio file
- `context`: JSON string with conversation history

**Response**:
\`\`\`json
{
  "transcript": "What time is it?",
  "response": "The current time is...",
  "timestamp": "2024-01-15T10:30:00Z"
}
\`\`\`

## Browser Compatibility

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome/Edge | ✅ Full | Recommended |
| Firefox | ✅ Full | Full support |
| Safari | ✅ Full | iOS 14.5+ required for audio |
| Opera | ✅ Full | Full support |

**Note**: Audio recording requires HTTPS in production (localhost works fine for development).

## Troubleshooting

### Microphone Not Working
- Verify browser permissions for microphone access
- Ensure you're using HTTPS in production
- Try a different browser if available

### Audio Transcription Fails
- Check internet connection
- Verify `GROQ_API_KEY` is correctly set
- Ensure audio is clear and in English
- Check Groq API quotas in console.groq.com

### Slow Response Times
- Groq API response times depend on server load
- Check your network connection
- Verify API rate limits aren't exceeded

### Build Issues
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Clear npm cache: `npm cache clean --force`

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `GROQ_API_KEY` | Yes | Your Groq API key from console.groq.com |

## Performance Tips

- Audio files are kept under 1MB for faster processing
- Message context limited to last 5 exchanges for optimal performance
- API responses are cached client-side when appropriate

## Future Enhancements

- Text-to-speech for AI responses
- Multiple language support
- Conversation export (PDF/JSON)
- Custom system prompts
- User authentication
- Message search and filtering
- Real-time collaboration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT - See LICENSE file for details

## Support

- GitHub Issues: [Report a bug](https://github.com/yourusername/vexa-ai-agent/issues)
- Email: support@vexa.ai
- Documentation: Check the docs folder

## Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Styled with [TailwindCSS](https://tailwindcss.com)
- AI powered by [Groq](https://www.groq.com)
- Design inspiration from modern AI assistants
