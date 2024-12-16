import React, { useState } from 'react';
import { Header } from './components/Header';
import { FileUpload } from './components/FileUpload';
import { ChatMessages } from './components/ChatMessages';
import { ChatInput } from './components/ChatInput';
import { useSocket } from './hooks/useSocket';
import { uploadPDF, sendMessage } from './services/api';

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [messages, setMessages] = useState<Array<{type: 'user' | 'bot', content: string}>>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  useSocket(
    (message) => setMessages(prev => [...prev, { type: 'bot', content: message }]),
    (error) => {
      setMessages(prev => [...prev, { type: 'bot', content: `Error: ${error}` }]);
      setIsProcessing(false);
    }
  );

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    
    setFile(selectedFile);
    setIsProcessing(true);

    try {
      await uploadPDF(selectedFile);
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: 'PDF processed successfully! You can now ask questions about it.' 
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: 'Error processing PDF. Please try again.' 
      }]);
      setFile(null);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = async (message: string) => {
    setMessages(prev => [...prev, { type: 'user', content: message }]);
    setIsProcessing(true);

    try {
      const { response } = await sendMessage(message);
      setMessages(prev => [...prev, { type: 'bot', content: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        type: 'bot', 
        content: 'Error processing your question. Please try again.' 
      }]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0E1117] text-white flex flex-col">
      <div className="max-w-4xl mx-auto w-full px-4 flex-1 flex flex-col">
        <Header />
        
        <main className="flex-1 flex flex-col min-h-0 pt-6">
          <div className="mb-6">
            <FileUpload
              file={file}
              onFileUpload={handleFileUpload}
              onFileRemove={() => setFile(null)}
            />
          </div>

          <div className="flex-1 min-h-0 mb-24">
            <ChatMessages messages={messages} />
          </div>
        </main>
      </div>

      <ChatInput
        onSubmit={handleSubmit}
        isDisabled={!file || isProcessing}
        isProcessing={isProcessing}
      />
    </div>
  );
}

export default App;