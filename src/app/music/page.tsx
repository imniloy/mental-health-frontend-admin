// src/app/music/page.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { Music } from '@/interfaces/program'; // Re-using the Music interface
import { Toast } from '@/components/ui/Toast';
import { MusicList } from '@/components/music/MusicList';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';

// --- MOCK DATA (Replace with API calls and real URLs) ---
const initialMusic: Music[] = [
  { id: 'music-1', name: 'Morning Dew', category: 'Ambient', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', status: 'Enabled' },
  { id: 'music-2', name: 'Calm Waves', category: 'Nature', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', status: 'Enabled' },
  { id: 'music-3', name: 'Deep Breath', category: 'Guided', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', status: 'Disabled' },
  { id: 'music-4', name: 'Forest Sounds', category: 'Nature', url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', status: 'Enabled' },
];

const initialCategories = ['Ambient', 'Nature', 'Guided', 'Instrumental'];

export default function MusicPage() {
    const [musicList, setMusicList] = useState<Music[]>(initialMusic);
    const [categories, setCategories] = useState<string[]>(initialCategories);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; musicId: string | null }>({ isOpen: false, musicId: null });

    // State for filtering
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const handleAddMusic = (newMusic: Omit<Music, 'id' | 'lastModified' | 'url'>, file: File) => {
        // In a real app, you would upload the file to a storage service (e.g., S3, Firebase Storage)
        // and get a URL back. Here, we'll simulate it.
        const newMusicEntry: Music = {
            ...newMusic,
            id: `music-${Date.now()}`,
            url: URL.createObjectURL(file), // Creates a temporary local URL for the browser
        };
        
        setMusicList(prev => [newMusicEntry, ...prev]);

        // Add new category to the list if it doesn't exist
        if (!categories.includes(newMusic.category)) {
            setCategories(prev => [...prev, newMusic.category]);
        }

        setToast({ message: "Music uploaded successfully!", type: 'success' });
    };

    const handleToggleStatus = (musicId: string) => {
        setMusicList(prevList =>
            prevList.map(music =>
                music.id === musicId
                    ? { ...music, status: music.status === 'Enabled' ? 'Disabled' : 'Enabled' }
                    : music
            )
        );
        setToast({ message: "Music status updated.", type: 'success' });
    };

    const handleOpenDeleteModal = (musicId: string) => {
        setDeleteModal({ isOpen: true, musicId });
    };

    const handleConfirmDelete = () => {
        if (deleteModal.musicId) {
            setMusicList(prev => prev.filter(m => m.id !== deleteModal.musicId));
            setToast({ message: "Music deleted.", type: 'success' });
        }
        setDeleteModal({ isOpen: false, musicId: null });
    };

    const filteredMusic = useMemo(() => {
        return musicList.filter(music => {
            const matchesCategory = selectedCategory === 'All' || music.category === selectedCategory;
            const matchesSearchTerm = music.name.toLowerCase().includes(searchTerm.toLowerCase()) || music.id.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearchTerm;
        });
    }, [musicList, searchTerm, selectedCategory]);

    return (
        <div className="bg-gray-900 text-gray-100 min-h-screen">
            <MusicList
                music={filteredMusic}
                categories={categories}
                searchTerm={searchTerm}
                selectedCategory={selectedCategory}
                onSearchTermChange={setSearchTerm}
                onCategoryChange={setSelectedCategory}
                onAddMusic={handleAddMusic}
                onToggleStatus={handleToggleStatus}
                onDelete={handleOpenDeleteModal}
            />
            <ConfirmationModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, musicId: null })}
                onConfirm={handleConfirmDelete}
                title="Delete Music"
                message="Are you sure you want to permanently delete this music file? This action cannot be undone."
            />
            {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}
        </div>
    );
}
