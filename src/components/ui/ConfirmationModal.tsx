// src/components/ui/ConfirmationModal.tsx
'use client';

import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    message: string;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    // Reduced background opacity from 60 to 30 to make the background more visible
    <div className="fixed inset-0  bg-opacity-30 backdrop-blur-sm z-50 flex justify-center items-center p-4">
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md transform transition-all animate-in fade-in-0 zoom-in-95">
        <div className="flex items-start">
          <div className="bg-red-500/20 p-3 rounded-full mr-4">
            <AlertTriangle className="h-6 w-6 text-red-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white">{title}</h3>
            <p className="text-sm text-gray-300 mt-2">{message}</p>
          </div>
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button onClick={onClose} className="px-4 py-2 rounded-md text-sm font-semibold bg-gray-700 text-white hover:bg-gray-600 transition-colors">
            Cancel
          </button>
          <button onClick={onConfirm} className="px-4 py-2 rounded-md text-sm font-semibold bg-red-600 text-white hover:bg-red-700 transition-colors">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};
