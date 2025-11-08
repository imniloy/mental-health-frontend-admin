// src/components/users/UserCard.tsx
'use client';

import React from 'react';
import { User } from '@/interfaces/user';
import { Edit, Trash2, Mail } from 'lucide-react';

interface UserCardProps {
    user: User;
    onToggleStatus: (id: string) => void;
    onDelete: (id: string) => void;
}

export const UserCard: React.FC<UserCardProps> = ({ user, onToggleStatus, onDelete }) => {
    const defaultAvatarText = user.name ? user.name.charAt(0).toUpperCase() : '?';

    return (
        <div className="bg-gray-800 rounded-lg shadow-lg flex flex-col items-center p-6 text-center transition-all hover:shadow-indigo-500/30 hover:-translate-y-1">
            <div className="relative mb-4">
                <img 
                    src={user.profilePictureUrl || `https://placehold.co/100x100/3730a3/ffffff?text=${defaultAvatarText}`} 
                    alt={user.name} 
                    className="w-24 h-24 rounded-full object-cover border-4 border-gray-700"
                />
                <span className={`absolute bottom-0 right-0 block h-6 w-6 rounded-full border-2 border-gray-800 ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-gray-500'}`}></span>
            </div>
            <h3 className="text-lg font-bold text-white">{user.name}</h3>
            <p className="text-sm text-gray-400 flex items-center gap-2">
                <Mail size={14}/>
                {user.email}
            </p>
            <p className="text-xs text-gray-500 mt-2">Joined: {new Date(user.joinDate).toLocaleDateString()}</p>
            
            <div className="w-full border-t border-gray-700 mt-4 pt-4 flex justify-between items-center">
                 <label htmlFor={`toggle-${user.id}`} className="flex items-center cursor-pointer">
                    <div className="relative">
                        <input id={`toggle-${user.id}`} type="checkbox" className="sr-only" checked={user.status === 'Active'} onChange={() => onToggleStatus(user.id)} />
                        <div className={`block w-10 h-6 rounded-full transition-colors ${user.status === 'Active' ? 'bg-emerald-500' : 'bg-gray-600'}`}></div>
                        <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${user.status === 'Active' ? 'translate-x-full' : ''}`}></div>
                    </div>
                    <div className="ml-3 text-gray-300 text-sm font-medium">{user.status}</div>
                </label>
                 <button onClick={() => onDelete(user.id)} className="p-2 rounded-full hover:bg-red-500/20 text-gray-400 hover:text-red-400" aria-label="Delete">
                    <Trash2 size={18} />
                </button>
            </div>
        </div>
    );
};
