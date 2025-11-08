// src/components/AdminLayout.tsx
'use client';

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

interface AdminLayoutProps {
    children: React.ReactNode;
}

// This is a client component that manages the state for the layout (e.g., dark mode)
export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(true);

    return (
        <div className={isDarkMode ? 'dark' : ''}>
            <div className="bg-gray-800 text-gray-200 min-h-screen flex">
                <Sidebar />
                {/* This container for the header and main content will take up the full height of the screen */}
                <div className="flex-1 flex flex-col lg:ml-64 h-screen">
                    {/* The Header component is fixed at the top */}
                    <Header />
                    {/* The main content area is set to grow and handle its own scrolling */}
                    <main className="flex-grow p-4 md:p-8 overflow-y-auto">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
};
