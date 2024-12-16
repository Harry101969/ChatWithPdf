import React, { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

interface ChatInputProps {
  onSubmit: (message: string) => void;
  isDisabled: boolean;
  isProcessing: boolean;
}

export function ChatInput({ onSubmit, isDisabled, isProcessing }: ChatInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onSubmit(input.trim());
    setInput('');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0E1117] p-4 border-t border-gray-800">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isDisabled ? 'Upload a PDF to start chatting...' : 'Ask a question about your PDF...'}
            className="w-full bg-gray-800 rounded-lg pl-4 pr-12 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
            disabled={isDisabled}
          />
          <button
            type="submit"
            disabled={isDisabled || !input.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <Send className="w-6 h-6" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}