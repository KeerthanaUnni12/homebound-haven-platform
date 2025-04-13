
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

  // Simple bot responses based on user role and message content
  const generateBotResponse = (message: string, role: UserRole = 'guest') => {
    setIsLoading(true);
    
    const buyerResponses = [
      "Here are some properties that match your criteria. Would you like to schedule a viewing?",
      "Have you considered looking in neighboring areas? They often offer better value.",
      "I can help you calculate mortgage payments for this property. Would you like to see an estimate?",
      "This property has been on the market for 2 weeks. The seller might be open to negotiation.",
      "Based on your preferences, I recommend exploring properties in the 300K-400K range."
    ];
    
    const sellerResponses = [
      "Your listing is getting good traction! 15 users have saved it in the last 24 hours.",
      "Professional photography can increase interest in your property by up to 30%.",
      "Based on market trends, your asking price is competitive for your area.",
      "Would you like tips on preparing your home for viewings?",
      "Similar properties in your area are selling within 3 weeks of listing."
    ];
    
    const generalResponses = [
      "How else can I assist you with your real estate needs?",
      "Feel free to ask any questions about our services or the real estate market.",
      "I'm here to help make your real estate journey easier!",
      "Is there anything specific you'd like to know about the real estate process?",
      "Would you like me to connect you with one of our real estate professionals?"
    ];
    
    // Choose response pool based on user role
    const responsePool = role === 'buyer' ? buyerResponses 
      : role === 'seller' ? sellerResponses 
      : generalResponses;
    
    // Simple keyword matching for more relevant responses
    const lowerMessage = message.toLowerCase();
    let response = "";
    
    if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("expensive")) {
      response = "Property prices vary based on location, size, and features. What's your budget range?";
    } else if (lowerMessage.includes("location") || lowerMessage.includes("area") || lowerMessage.includes("where")) {
      response = "We have properties in various locations. Any particular area you're interested in?";
    } else if (lowerMessage.includes("mortgage") || lowerMessage.includes("loan") || lowerMessage.includes("finance")) {
      response = "Our ROI calculator can help estimate mortgage payments and investment returns. Would you like to try it?";
    } else if (lowerMessage.includes("document") || lowerMessage.includes("upload") || lowerMessage.includes("file")) {
      response = "You can securely upload and manage your documents in the Documents section. All files are encrypted.";
    } else if (lowerMessage.includes("sell") || lowerMessage.includes("selling") || lowerMessage.includes("list")) {
      response = "To list your property, go to the 'Add Property' section and complete the details. Would you like more information?";
    } else {
      // Random response if no keywords match
      const randomIndex = Math.floor(Math.random() * responsePool.length);
      response = responsePool[randomIndex];
    }
    
    // Simulate network delay
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: Math.random().toString(36).substring(2, 9),
        sender: 'bot',
        message: response,
        timestamp: new Date().toISOString(),
      };
      
      setMessages(prevMessages => [...prevMessages, botMessage]);
      setIsLoading(false);
    }, 1000);
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
