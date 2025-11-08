
// src/components/ui/Toast.tsx
'use client';

import React, { useEffect } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';

interface ToastProps {
    message: string;
    type: 'success' | 'error';
    onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onDismiss }) => {
    useEffect(() => {
        const timer = setTimeout(onDismiss, 3000);
        return () => clearTimeout(timer);
    }, [onDismiss]);

    const colors = {
        success: 'bg-emerald-500 text-white',
        error: 'bg-red-500 text-white',
    };
    const Icon = type === 'success' ? CheckCircle : XCircle;

    return (
        <div className={`fixed bottom-5 right-5 p-4 rounded-lg shadow-2xl flex items-center space-x-3 animate-in slide-in-from-right-10 ${colors[type]}`}>
            <Icon className="h-5 w-5" />
            <span>{message}</span>
            <button onClick={onDismiss} className="ml-auto text-white/70 hover:text-white">&times;</button>
        </div>
    );
};
