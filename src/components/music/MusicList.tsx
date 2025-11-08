// src/components/music/MusicList.tsx
'use client';

import React, { useState } from 'react';
import { Music } from '@/interfaces/program';
import { MusicCard } from './MusicCard';
import { Plus, Search, UploadCloud } from 'lucide-react';

interface MusicListProps {
    music: Music[];
    categories: string[];
    searchTerm: string;
    selectedCategory: string;
    onSearchTermChange: (term: string) => void;
    onCategoryChange: (category: string) => void;
    onAddMusic: (newMusic: Omit<Music, 'id' | 'lastModified' | 'url'>, file: File) => void;
    onToggleStatus: (id: string) => void;
    onDelete: (id: string) => void;
}

export const MusicList: React.FC<MusicListProps> = ({ music, categories, searchTerm, selectedCategory, onSearchTermChange, onCategoryChange, onAddMusic, onToggleStatus, onDelete }) => {
    const [showUpload, setShowUpload] = useState(false);
    const [name, setName] = useState('');
    const [category, setCategory] = useState(categories[0] || '');
    const [file, setFile] = useState<File | null>(null);
    const [isCreatingNewCategory, setIsCreatingNewCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');

    const handleCategoryChange = (value: string) => {
        if (value === 'add_new') {
            setIsCreatingNewCategory(true);
            setCategory(value);
        } else {
            setIsCreatingNewCategory(false);
            setCategory(value);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        let finalCategory = category;
        if (isCreatingNewCategory) {
            if (!newCategoryName.trim()) {
                alert('Please enter a name for the new category.');
                return;
            }
            finalCategory = newCategoryName.trim();
        }

        if (name && finalCategory && file) {
            onAddMusic({ name, category: finalCategory, status: 'Enabled' }, file);
            // Reset form
            setName('');
            setCategory(categories[0] || '');
            setFile(null);
            setShowUpload(false);
            setIsCreatingNewCategory(false);
            setNewCategoryName('');
        } else {
            alert('Please fill all fields and select a file.');
        }
    };

    return (
        <div className="p-4 sm:p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <h1 className="text-2xl font-bold text-white">Music Library</h1>
                <div className="w-full md:w-auto flex items-center gap-4">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input type="text" placeholder="Search by name or ID..." value={searchTerm} onChange={(e) => onSearchTermChange(e.target.value)} className="w-full bg-gray-800 border-gray-700 text-white rounded-lg py-2 pl-10 pr-4 focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                    <select value={selectedCategory} onChange={(e) => onCategoryChange(e.target.value)} className="bg-gray-800 p-2 rounded-lg border border-gray-700">
                        <option value="All">All Categories</option>
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                     <button onClick={() => setShowUpload(!showUpload)} className="flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors">
                        <Plus size={20} />
                        <span>Upload</span>
                    </button>
                </div>
            </div>

            {/* Upload Form */}
            {showUpload && (
                 <div className="bg-gray-800 p-6 rounded-lg shadow-xl mb-8 animate-in fade-in-0">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <h2 className="text-xl font-bold text-white">Upload New Music</h2>
                        <input type="text" placeholder="Song Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-gray-700 p-2 rounded-md" required />
                        
                        <div className="flex gap-4">
                            <select value={category} onChange={(e) => handleCategoryChange(e.target.value)} className="bg-gray-700 p-2 rounded-md flex-grow" required>
                                 {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                 <option value="add_new">-- Create New Category --</option>
                            </select>
                            {isCreatingNewCategory && (
                                <input type="text" placeholder="New Category Name" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} className="w-full bg-gray-700 p-2 rounded-md" required />
                            )}
                        </div>

                        <label htmlFor="audio-upload" className="w-full flex justify-center items-center space-x-2 py-3 px-4 rounded-lg bg-gray-700 text-white font-semibold hover:bg-gray-600 transition-colors cursor-pointer">
                            <UploadCloud size={20} />
                            <span>{file ? file.name : 'Select Audio File'}</span>
                        </label>
                        <input id="audio-upload" type="file" accept="audio/*" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} className="hidden" required />
                        <div className="flex justify-end gap-4">
                            <button type="button" onClick={() => setShowUpload(false)} className="px-6 py-2 rounded-lg bg-gray-600 text-white font-semibold">Cancel</button>
                            <button type="submit" className="px-6 py-2 rounded-lg bg-emerald-600 text-white font-semibold">Add Music</button>
                        </div>
                    </form>
                 </div>
            )}

            {/* Updated to a responsive grid layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {music.map(m => (
                    <MusicCard
                        key={m.id}
                        music={m}
                        onToggleStatus={onToggleStatus}
                        onDelete={onDelete}
                    />
                ))}
                 {music.length === 0 && (
                    <div className="text-center col-span-full py-12">
                        <p className="text-gray-400">No music found.</p>
                    </div>
                )}
            </div>
        </div>
    );
};