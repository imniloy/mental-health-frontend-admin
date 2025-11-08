
// src/components/users/UserList.tsx
'use client';

import React from 'react';
import { User } from '@/interfaces/user';
import { UserCard } from './UserCard';
import { Search } from 'lucide-react';

interface UserListProps {
    users: User[];
    searchTerm: string;
    onSearchChange: (term: string) => void;
    onToggleStatus: (id: string) => void;
    onDelete: (id: string) => void;
}

export const UserList: React.FC<UserListProps> = ({ users, searchTerm, onSearchChange, onToggleStatus, onDelete }) => {
    return (
        <div className="p-4 sm:p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <h1 className="text-2xl font-bold text-white">User Management</h1>
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full bg-gray-800 border-gray-700 text-white rounded-lg py-2 pl-10 pr-4 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {users.map(user => (
                    <UserCard
                        key={user.id}
                        user={user}
                        onToggleStatus={onToggleStatus}
                        onDelete={onDelete}
                    />
                ))}
            </div>
            {users.length === 0 && searchTerm && (
                <div className="text-center col-span-full py-12">
                    <p className="text-gray-400">No users found for "{searchTerm}".</p>
                </div>
            )}
        </div>
    );
};
