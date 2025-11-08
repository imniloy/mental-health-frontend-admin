// src/components/Sidebar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Music, Users, DollarSign, Tag, BarChart2, Torus, ShieldCheck, Gift, HeartPulse, BookOpen, BrainCircuit } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  // State to track if the component has mounted on the client
  const [isMounted, setIsMounted] = useState(false);

  // After the initial render, this effect runs only on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const navItems = [
    { name: 'Dashboard', icon: <Home size={20} />, href: '/' },
    { name: 'Categories', icon: <Tag size={20} />, href: '/categories' },
    { name: 'Music Library', icon: <Music size={20} />, href: '/music' },
    { name: 'Survey', icon: <Torus size={20} />, href: '/surveys' },
    { name: 'Trials', icon: <ShieldCheck size={20} />, href: '/trials' },
    { name: 'Offers', icon: <Gift size={20} />, href: '/offers' },
    { name: 'Exercises', icon: <HeartPulse size={20} />, href: '/exercises' },
    { name: 'Programs', icon: <BookOpen size={20} />, href: '/programs' },
    { name: 'Microlearning', icon: <BrainCircuit size={20} />, href: '/microlearning' },
    { name: 'Users', icon: <Users size={20} />, href: '/users' },
  ];

  // On the server and during the initial client render, we can return null or a skeleton.
  // This prevents the hydration mismatch because the server's output will match the client's initial output.
  if (!isMounted) {
    // Returning null is the simplest way to fix this.
    // Alternatively, you could render a static placeholder/skeleton component.
    return null;
  }

  return (
    <aside className={`fixed top-0 left-0 h-full bg-gray-900 text-gray-200 flex-col w-64 z-30 hidden lg:flex`}>
      <div className="flex items-center justify-start p-4 border-b border-gray-700 h-16 flex-shrink-0">
        <h1 className="text-2xl font-bold text-white">SereneMind</h1>
      </div>
      
      <nav className="flex-grow mt-4 overflow-y-auto pb-4">
        <ul>
          {navItems.map((item) => {
            // This logic now runs safely on the client after mounting
            const isActive = pathname === item.href;
            return (
              <li key={item.name} className="px-4 mb-2">
                <Link
                  href={item.href}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-cyan-500 text-white font-semibold'
                      : 'hover:bg-gray-700'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-700 flex-shrink-0">
        <div className="flex items-center space-x-4">
          <img src="https://placehold.co/40x40/6366f1/e0e7ff?text=A" alt="Admin" className="rounded-full" />
          <div>
            <p className="font-semibold text-white">Admin User</p>
            <p className="text-xs text-gray-400">admin@serenemind.app</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
