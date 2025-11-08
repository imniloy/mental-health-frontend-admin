// src/components/Header.tsx
'use client';

import React from 'react';

// The props for the toggle button have been removed as per the provided code.
interface HeaderProps {

}

export const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="flex items-center justify-end p-4 bg-gray-900 border-b border-gray-700 h-16 flex-shrink-0">
      <div className="flex items-center space-x-4">
        {/* The welcome text and profile picture are now in the header. */}
        <span className="text-white font-semibold hidden sm:block">Welcome back, Admin!</span>
        <img 
          src="https://placehold.co/40x40/6366f1/e0e7ff?text=A" 
          alt="Admin Profile" 
          className="w-10 h-10 rounded-full"
        />
      </div>
    </header>
  );
};
