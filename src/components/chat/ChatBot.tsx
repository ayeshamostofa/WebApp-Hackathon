import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BotMessageSquare, Send, Loader2, X, Settings } from 'lucide-react'
import axios from 'axios'

interface Message {
  text: string
  isUser: boolean
  timestamp?: string
  isError?: boolean
}

interface Model {
  name: string
  value: string
  speed: string
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    // MODIFIED: Initial greeting for JoddhaBot
    { text: "আমি যোদ্ধাবট, আপনার ডিজিটাল মুক্তিযুদ্ধ গাইড। আমি আপনাকে কিভাবে সাহায্য করতে পারি?", isUser: false }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showSettings, setShowSettings] = useState(false)
  const [selectedModel, setSelectedModel] = useState("llama-3-8b-8192")
  const scrollRef = useRef<HTMLDivElement>(null)

  const models: Model[] = [
    { name: "Llama 3 8B ⚡", value: "llama-3-8b-8192", speed: "Fastest" },
    { name: "Llama 3 70B 🚀", value: "llama-3-70b-8192", speed: "Powerful" },
    { name: "Mixtral 8x7B", value: "mixtral-8x7b-32768", speed: "Expert" },
    { name: "Gemma 7B", value: "gemma-7b-it", speed: "Efficient" }
  ]

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput("")
    setIsLoading(true)
    setError("")

    setMessages(prev => [...prev, { 
      text: userMessage, 
      isUser: true, 
      timestamp: new Date().toISOString() 
    }])

    try {
      const response = await axios.post('http://localhost:5000/api/chat', {
        message: userMessage,
        chatHistory: messages
          .filter(m => !m.isUser && !m.isError)
          .map((m, i) => ({
            user: messages[i * 2]?.text || '',
            assistant: m.text
          }))
      })

      setMessages(prev => [...prev, {
        text: response.data.response,
        isUser: false,
        timestamp: response.data.timestamp
      }])
    } catch (err: any) {
      console.error('Chat error:', err)
      const errorMessage = err.response?.data?.message || 'Sorry, an error occurred. Please try again.'
      setError(errorMessage)
      
      setMessages(prev => [...prev, {
        text: errorMessage,
        isUser: false,
        isError: true,
        timestamp: new Date().toISOString()
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const clearChat = () => {
    // MODIFIED: Reset message for JoddhaBot
    setMessages([{ 
      text: "চ্যাট রিসেট করা হয়েছে। আমি আপনাকে কিভাবে সাহায্য করতে পারি?", 
      isUser: false 
    }])
    setError("")
  }

  const handleModelChange = async (model: string) => {
    setSelectedModel(model)
    try {
      await axios.post('http://localhost:5000/api/model', { model })
      setMessages([{ 
        text: `Model changed successfully! How can I help you?`, 
        isUser: false 
      }])
    } catch (err) {
      console.error('Failed to change model:', err)
      setError('Failed to change model')
    }
  }

  if (!isOpen) {
    return (
      <Button
        // MODIFIED: Red and Green color theme
        className="fixed bottom-6 right-6 rounded-full w-16 h-16 p-0 shadow-lg hover:shadow-xl transition-all duration-200 bg-green-600 hover:bg-green-700 text-white"
        onClick={() => setIsOpen(true)}
      >
        {/* MODIFIED: Icon changed */}
        <BotMessageSquare className="w-8 h-8" />
      </Button>
    )
  }

  return (
    // MODIFIED: Card border color
    <Card className="fixed bottom-6 right-6 w-96 h-[600px] flex flex-col shadow-xl border-2 border-green-200">
      {/* Header */}
      {/* MODIFIED: Header color and text */}
      <div className="flex justify-between items-center p-3 border-b-2 border-green-200 bg-green-50">
        <div className="flex items-center gap-2">
          <BotMessageSquare className="w-6 h-6 text-red-600" />
          <h3 className="font-bold text-lg text-green-800">JoddhaBot</h3>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSettings(!showSettings)}
            className="h-8 w-8 text-gray-500 hover:text-gray-800"
          >
            <Settings className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 text-gray-500 hover:text-gray-800"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className="p-4 border-b bg-gray-50">
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700">Model Settings</h4>
            <div className="grid grid-cols-2 gap-2">
              {models.map((model) => (
                <Button
                  key={model.value}
                  // MODIFIED: Selected button color
                  className={`text-xs h-10 flex flex-col items-center justify-center ${
                    selectedModel === model.value ? 'bg-green-600 text-white hover:bg-green-700' : ''
                  }`}
                  variant={selectedModel === model.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleModelChange(model.value)}
                >
                  <span className="font-medium">{model.name}</span>
                  <span className="text-xs opacity-70">{model.speed}</span>
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={clearChat}
              className="w-full text-xs h-8"
            >
              Clear Chat
            </Button>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="p-2 bg-red-50 border-b border-red-200">
          <p className="text-xs text-red-600 text-center">{error}</p>
        </div>
      )}

      {/* Messages Area */}
      <ScrollArea className="flex-1 p-4 bg-white" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message, i) => (
            <div
              key={i}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                // MODIFIED: Message bubble colors
                className={`rounded-2xl px-4 py-3 max-w-[85%] relative group ${
                  message.isUser
                    ? 'bg-green-700 text-white rounded-br-md'
                    : message.isError
                    ? 'bg-red-100 text-red-800 border border-red-200 rounded-bl-md'
                    : 'bg-gray-100 text-gray-800 border border-gray-200 rounded-bl-md'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                {message.timestamp && (
                  <span className={`text-xs opacity-70 block mt-1 ${
                    message.isUser ? 'text-green-100' : 'text-gray-500'
                  }`}>
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </span>
                )}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-800 rounded-2xl px-4 py-3 max-w-[85%] rounded-bl-md border border-gray-200">
                <div className="flex items-center gap-1.5">
                  <Loader2 className="w-3 h-3 animate-spin text-green-700" />
                  {/* MODIFIED: Loading text */}
                  <span className="text-sm">চিন্তা করছি...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t bg-white">
        <div className="flex gap-2">
          <Input
            placeholder="আপনার প্রশ্ন লিখুন..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            // MODIFIED: Input focus color
            className="flex-1 focus-visible:ring-green-500"
          />
          <Button 
            onClick={handleSend} 
            disabled={!input.trim() || isLoading}
            size="icon"
            // MODIFIED: Button color
            className="flex-shrink-0 bg-green-600 hover:bg-green-700"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
        <p className="text-xs text-gray-500 text-center mt-2">
          {/* MODIFIED: Footer text */}
          JoddhaBot • Press Enter to send
        </p>
      </div>
    </Card>
  )
}