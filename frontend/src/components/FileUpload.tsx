import React from 'react';
import { Upload, X } from 'lucide-react';

interface FileUploadProps {
  file: File | null;
  onFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFileRemove: () => void;
}

export function FileUpload({ file, onFileUpload, onFileRemove }: FileUploadProps) {
  if (file) {
    return (
      <div className="flex items-center justify-between bg-gray-800 rounded-lg p-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-300">{file.name}</div>
        </div>
        <button
          onClick={onFileRemove}
          className="p-1 hover:bg-gray-700 rounded"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
      <label className="cursor-pointer">
        <input
          type="file"
          accept=".pdf"
          onChange={onFileUpload}
          className="hidden"
        />
        <div className="flex flex-col items-center gap-2">
          <Upload className="w-12 h-12 text-gray-400" />
          <p className="text-lg text-gray-300">Upload your PDF to start chatting</p>
          <p className="text-sm text-gray-500">Supports files up to 10MB</p>
        </div>
      </label>
    </div>
  );
}