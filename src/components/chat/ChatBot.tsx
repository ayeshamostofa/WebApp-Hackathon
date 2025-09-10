import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { BotMessageSquare } from 'lucide-react'

interface Message {
  text: string
  isUser: boolean
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! How can I help you today?", isUser: false }
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return

    // Add user message
    setMessages(prev => [...prev, { text: input, isUser: true }])

    // Simulate bot response (you can replace this with actual API calls)
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "Thank you for your message. Our team will get back to you soon.",
        isUser: false
      }])
    }, 1000)

    setInput("")
  }

  if (!isOpen) {
    return (
      <Button
        className="fixed bottom-6 right-6 rounded-full w-16 h-16 p-0"
        onClick={() => setIsOpen(true)}
      >
        <BotMessageSquare className='w-32'/>
      </Button>
    )
  }

  return (
    <Card className="fixed bottom-6 right-6 w-80 h-96 flex flex-col">
      <div className="flex justify-between items-center p-3 border-b">
        <h3 className="font-semibold">Chat Support</h3>
        <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
          ✕
        </Button>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message, i) => (
            <div
              key={i}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`rounded-lg px-4 py-2 max-w-[80%] ${
                  message.isUser
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className="p-3 border-t flex gap-2">
        <Input
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button onClick={handleSend}>Send</Button>
      </div>
    </Card>
  )
}
