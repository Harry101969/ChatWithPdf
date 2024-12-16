import React, { useRef, useEffect } from 'react';
import { ChatMessage } from './ChatMessage';

interface Message {
  type: 'user' | 'bot';
  content: string;
}

interface ChatMessagesProps {
  messages: Message[];
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto py-4 space-y-4">
      {messages.map((message, index) => (
        <ChatMessage key={index} type={message.type} content={message.content} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}