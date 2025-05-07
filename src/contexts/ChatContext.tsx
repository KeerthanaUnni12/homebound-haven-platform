
import React, { createContext, useContext, useState } from 'react';
import { ChatMessage, UserRole } from '@/types';
import { useAuth } from './AuthContext';

interface ChatContextType {
  messages: ChatMessage[];
  sendMessage: (message: string) => void;
  clearChat: () => void;
  isLoading: boolean;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  // Simplified bot response generator
  const generateBotResponse = (message: string, role: UserRole = 'guest') => {
    setIsLoading(true);
    
    // Simplified response logic with less repetitive answers
    const lowerMessage = message.toLowerCase();
    let response = "";
    
    if (lowerMessage.includes("price") || lowerMessage.includes("cost")) {
      response = "Property prices vary based on location, size, and features. What's your budget range?";
    } else if (lowerMessage.includes("location") || lowerMessage.includes("area")) {
      response = "We have properties in various locations. Any particular area you're interested in?";
    } else if (lowerMessage.includes("mortgage") || lowerMessage.includes("loan")) {
      response = "Our calculator can help estimate mortgage payments. Would you like to try it?";
    } else if (lowerMessage.includes("document") || lowerMessage.includes("upload")) {
      response = "You can securely upload and manage your documents in the Documents section.";
    } else if (lowerMessage.includes("sell") || lowerMessage.includes("selling")) {
      response = "To list your property, go to the 'Add Property' section and complete the details.";
    } else {
      // More varied general responses
      const generalResponses = [
        "How else can I assist you today?",
        "Is there anything specific about real estate you'd like to know?",
        "I'm here to help with your property questions.",
        "Would you like information about buying or selling properties?",
        "Can I help you find your dream home?"
      ];
      
      // Use a more random selection method
      const randomIndex = Math.floor(Math.random() * generalResponses.length);
      response = generalResponses[randomIndex];
    }
    
    // Simulate network delay (shorter for better UX)
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: Math.random().toString(36).substring(2, 9),
        sender: 'bot',
        message: response,
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
      setIsLoading(false);
    }, 800);
  };

  const sendMessage = (message: string) => {
    if (!message.trim()) return;
    
    const userMessage: ChatMessage = {
      id: Math.random().toString(36).substring(2, 9),
      sender: 'user',
      message,
      timestamp: new Date().toISOString(),
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    // Generate bot response
    generateBotResponse(message, user?.role);
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <ChatContext.Provider value={{ messages, sendMessage, clearChat, isLoading }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
