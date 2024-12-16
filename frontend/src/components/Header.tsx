import React from 'react';
import { Bot } from 'lucide-react';

export function Header() {
  return (
    <header className="py-6 border-b border-gray-800">
      <div className="flex items-center gap-2">
        <Bot className="w-8 h-8 text-blue-500" />
        <h1 className="text-2xl font-bold">Chat with PDF</h1>
      </div>
    </header>
  );
}