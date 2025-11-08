// src/app/users/page.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { User } from '@/interfaces/user';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { Toast } from '@/components/ui/Toast';
import { UserList } from '@/components/users/UserList';

// --- MOCK DATA (Replace with API calls) ---
const initialUsers: User[] = [
  { id: 'user-1', name: 'Alice Johnson', email: 'alice.j@example.com', profilePictureUrl: 'https://placehold.co/100x100/34d399/ffffff?text=A', status: 'Active', joinDate: '2024-01-15' },
  { id: 'user-2', name: 'Bob Williams', email: 'bob.w@example.com', profilePictureUrl: '', status: 'Active', joinDate: '2024-03-22' },
  { id: 'user-3', name: 'Charlie Brown', email: 'charlie.b@example.com', profilePictureUrl: 'https://placehold.co/100x100/60a5fa/ffffff?text=C', status: 'Disabled', joinDate: '2024-05-10' },
  { id: 'user-4', name: 'Diana Miller', email: 'diana.m@example.com', profilePictureUrl: 'https://placehold.co/100x100/facc15/ffffff?text=D', status: 'Active', joinDate: '2023-11-30' },
];

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; userId: string | null }>({ isOpen: false, userId: null });
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleToggleStatus = (userId: string) => {
        setUsers(prev =>
            prev.map(user =>
                user.id === userId
                    ? { ...user, status: user.status === 'Active' ? 'Disabled' : 'Active' }
                    : user
            )
        );
        setToast({ message: "User status updated.", type: 'success' });
    };
    
    const handleOpenDeleteModal = (userId: string) => {
        setDeleteModal({ isOpen: true, userId });
    };

    const handleConfirmDelete = () => {
        if (deleteModal.userId) {
            setUsers(prev => prev.filter(user => user.id !== deleteModal.userId));
            setToast({ message: "User deleted successfully.", type: 'success' });
        }
        setDeleteModal({ isOpen: false, userId: null });
    };

    const filteredUsers = useMemo(() => {
        return users.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [users, searchTerm]);

    return (
        <div className="bg-gray-900 text-gray-100 min-h-screen">
            <UserList
                users={filteredUsers}
                searchTerm={searchTerm}
                onSearchChange={setSearchTerm}
                onToggleStatus={handleToggleStatus}
                onDelete={handleOpenDeleteModal}
            />
            <ConfirmationModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, userId: null })}
                onConfirm={handleConfirmDelete}
                title="Delete User"
                message="Are you sure you want to permanently delete this user? This action cannot be undone."
            />
            {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}
        </div>
    );
}
