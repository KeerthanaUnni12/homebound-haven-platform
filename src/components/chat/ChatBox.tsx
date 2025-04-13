
import { useState, useRef, useEffect } from 'react';
import { useChat } from '@/contexts/ChatContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Send, Bot, User, Trash2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

export const ChatBox = () => {
  const [message, setMessage] = useState('');
  const { messages, sendMessage, clearChat, isLoading } = useChat();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      sendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col bg-white rounded-lg shadow h-[600px] overflow-hidden">
      <div className="p-4 bg-estate-navy text-white flex justify-between items-center">
        <div className="flex items-center">
          <Bot className="h-5 w-5 mr-2" />
          <h2 className="font-semibold">Real Estate Assistant</h2>
        </div>
        <Button variant="ghost" size="icon" className="text-white hover:bg-estate-navy/90" onClick={clearChat}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-6">
            <Bot className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">How can I help you today?</h3>
            <p className="text-muted-foreground mt-2">
              Ask me about properties, investment advice, or any real estate questions you have.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-6 w-full max-w-md">
              <Button variant="outline" className="justify-start" onClick={() => sendMessage("How much house can I afford?")}>
                How much house can I afford?
              </Button>
              <Button variant="outline" className="justify-start" onClick={() => sendMessage("What's a good location to invest?")}>
                What's a good location to invest?
              </Button>
              <Button variant="outline" className="justify-start" onClick={() => sendMessage("How do I upload documents?")}>
                How do I upload documents?
              </Button>
              <Button variant="outline" className="justify-start" onClick={() => sendMessage("Calculate ROI for a rental property")}>
                Calculate ROI for a rental
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.sender === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    msg.sender === 'user'
                      ? 'bg-estate-navy text-white rounded-br-none'
                      : 'bg-muted rounded-bl-none'
                  }`}
                >
                  <div className="flex items-center mb-1">
                    {msg.sender === 'user' ? (
                      <User className="h-4 w-4 mr-1" />
                    ) : (
                      <Bot className="h-4 w-4 mr-1" />
                    )}
                    <span className="text-xs opacity-70">
                      {msg.sender === 'user' ? 'You' : 'Assistant'} • {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                  <p className="text-sm whitespace-pre-wrap">{msg.message}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-lg p-3 bg-muted rounded-bl-none">
                  <div className="flex items-center mb-1">
                    <Bot className="h-4 w-4 mr-1" />
                    <span className="text-xs opacity-70">Assistant</span>
                  </div>
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 bg-estate-navy rounded-full animate-pulse"></div>
                    <div className="h-2 w-2 bg-estate-navy rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="h-2 w-2 bg-estate-navy rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </ScrollArea>
      
      <Separator />
      
      <form onSubmit={handleSubmit} className="p-4 flex">
        <Input
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mr-2 flex-1"
          disabled={isLoading}
        />
        <Button type="submit" size="icon" disabled={isLoading || !message.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};
