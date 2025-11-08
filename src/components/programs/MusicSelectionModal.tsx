// src/components/programs/MusicSelectionModal.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { Music } from '@/interfaces/program';
import { Search, UploadCloud, Plus } from 'lucide-react';

// Mock existing music data
const initialMusicData: Music[] = [
    { id: 'music-1', name: 'Morning Dew', category: 'Ambient', url: '', status: 'Enabled' },
    { id: 'music-2', name: 'Calm Waves', category: 'Nature', url: '', status: 'Enabled' },
    { id: 'music-3', name: 'Deep Breath', category: 'Guided', url: '', status: 'Disabled' },
    { id: 'music-4', name: 'Forest Sounds', category: 'Nature', url: '', status: 'Enabled' },
];

// Mock existing categories
const initialCategories = ['Ambient', 'Nature', 'Guided', 'Instrumental'];

interface MusicSelectionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectMusic: (music: Music) => void;
}

export const MusicSelectionModal: React.FC<MusicSelectionModalProps> = ({ isOpen, onClose, onSelectMusic }) => {
    const [activeTab, setActiveTab] = useState<'search' | 'upload'>('search');
    
    // Use state for the music list to make it dynamic
    const [musicList, setMusicList] = useState<Music[]>(initialMusicData);

    // State for searching
    const [searchTerm, setSearchTerm] = useState('');
    const [searchCategory, setSearchCategory] = useState('All');

    // State for uploading
    const [uploadName, setUploadName] = useState('');
    const [uploadCategory, setUploadCategory] = useState(initialCategories[0]);
    const [isCreatingNewCategory, setIsCreatingNewCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState('');
    
    // Combined categories state
    const [categories, setCategories] = useState(initialCategories);

    const filteredMusic = useMemo(() => {
        return musicList.filter(music => {
            const matchesCategory = searchCategory === 'All' || music.category === searchCategory;
            const matchesSearchTerm = music.name.toLowerCase().includes(searchTerm.toLowerCase()) || music.id.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesCategory && matchesSearchTerm;
        });
    }, [searchTerm, searchCategory, musicList]);

    const handleUploadAndSelect = () => {
        let finalCategory = uploadCategory;
        if (isCreatingNewCategory && newCategoryName) {
            finalCategory = newCategoryName;
            if (!categories.includes(finalCategory)) {
                setCategories(prev => [...prev, finalCategory]);
            }
        }
        
        const newMusic: Music = {
            id: `music-${Date.now()}`,
            name: uploadName || 'Untitled Song',
            category: finalCategory,
            url: '', // This would be set after successful upload
            status: 'Enabled', // Ensure new music has a status
        };
        
        // Add the new music to the local list and select it
        setMusicList(prev => [newMusic, ...prev]);
        onSelectMusic(newMusic);
    };
    
    const handleCategorySelectChange = (value: string) => {
        if (value === 'add_new') {
            setIsCreatingNewCategory(true);
            setUploadCategory(value);
        } else {
            setIsCreatingNewCategory(false);
            setUploadCategory(value);
        }
    };
    
    const handleToggleStatus = (musicId: string) => {
        setMusicList(prevList =>
            prevList.map(music =>
                music.id === musicId
                    ? { ...music, status: music.status === 'Enabled' ? 'Disabled' : 'Enabled' }
                    : music
            )
        );
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-md z-50 flex justify-center items-center p-4">
            <div className="bg-gray-800/80 backdrop-blur-lg border border-gray-700 rounded-lg shadow-xl p-6 w-full max-w-lg transform transition-all">
                <h2 className="text-xl font-bold text-white mb-4">Select Music</h2>
                <div className="flex border-b border-gray-700 mb-4">
                    <button onClick={() => setActiveTab('search')} className={`px-4 py-2 text-sm font-semibold ${activeTab === 'search' ? 'border-b-2 border-indigo-500 text-white' : 'text-gray-400'}`}>Search Existing</button>
                    <button onClick={() => setActiveTab('upload')} className={`px-4 py-2 text-sm font-semibold ${activeTab === 'upload' ? 'border-b-2 border-indigo-500 text-white' : 'text-gray-400'}`}>Upload New</button>
                </div>

                {activeTab === 'search' && (
                    <div>
                        <div className="flex gap-4 mb-4">
                            <div className="relative flex-grow">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                <input type="text" placeholder="Search by name or ID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-gray-700 pl-10 p-2 rounded-md" />
                            </div>
                            <select value={searchCategory} onChange={(e) => setSearchCategory(e.target.value)} className="bg-gray-700 p-2 rounded-md">
                                <option value="All">All Categories</option>
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                            </select>
                        </div>
                        <div className="space-y-2 max-h-60 overflow-y-auto">
                            {filteredMusic.map(music => (
                                <div key={music.id} className={`p-3 bg-gray-700/50 rounded-md flex justify-between items-center transition-opacity ${music.status === 'Disabled' ? 'opacity-50' : ''}`}>
                                    <div onClick={() => music.status === 'Enabled' && onSelectMusic(music)} className={`flex-grow ${music.status === 'Enabled' ? 'cursor-pointer hover:bg-indigo-500/10' : 'cursor-not-allowed'}`}>
                                        <p className="font-semibold text-white">{music.name}</p>
                                        <p className="text-xs text-gray-400">{music.category} - ID: {music.id}</p>
                                    </div>
                                     <button onClick={() => handleToggleStatus(music.id)} className={`px-3 py-1 text-xs font-semibold rounded-full transition-colors ${ music.status === 'Enabled' ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/40' : 'bg-red-500/20 text-red-400 hover:bg-red-500/40' }`}>
                                        {music.status === 'Enabled' ? 'Disable' : 'Enable'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'upload' && (
                    <div className="space-y-4">
                        <input type="text" placeholder="Music Name" value={uploadName} onChange={(e) => setUploadName(e.target.value)} className="w-full bg-gray-700 p-2 rounded-md" />
                        
                        <div className="flex gap-4">
                            <select value={uploadCategory} onChange={(e) => handleCategorySelectChange(e.target.value)} className="bg-gray-700 p-2 rounded-md flex-grow">
                                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                <option value="add_new">-- Add New Category --</option>
                            </select>
                            {isCreatingNewCategory && (
                                <input type="text" placeholder="New Category Name" value={newCategoryName} onChange={(e) => setNewCategoryName(e.target.value)} className="w-full bg-gray-700 p-2 rounded-md" />
                            )}
                        </div>

                        <label htmlFor="music-upload" className="w-full flex justify-center items-center space-x-2 py-3 px-4 rounded-lg bg-gray-700 text-white font-semibold hover:bg-gray-600 transition-colors cursor-pointer">
                            <UploadCloud size={20} />
                            <span>Upload Audio File</span>
                        </label>
                        <input id="music-upload" type="file" accept="audio/*" className="hidden" />
                        <button onClick={handleUploadAndSelect} className="w-full py-2 bg-emerald-600 rounded-md text-white font-semibold">Upload & Select</button>
                    </div>
                )}
                 <button onClick={onClose} className="mt-6 w-full py-2 bg-gray-600 rounded-md text-white font-semibold">Cancel</button>
            </div>
        </div>
    );
};
