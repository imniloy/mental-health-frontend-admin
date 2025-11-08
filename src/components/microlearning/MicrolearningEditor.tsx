// src/components/microlearning/MicrolearningEditor.tsx
'use client';

import React, { useState } from 'react';
import { MicrolearningTopic, Episode, StorySegment } from '@/interfaces/microlearning';
import { Plus, Trash2, Image as ImageIcon, UploadCloud, ArrowLeft, GripVertical } from 'lucide-react';

// --- Main Editor Component ---
interface MicrolearningEditorProps {
    topic: MicrolearningTopic;
    onSave: (topic: MicrolearningTopic) => void;
    onCancel: () => void;
}

export const MicrolearningEditor: React.FC<MicrolearningEditorProps> = ({ topic, onSave, onCancel }) => {
    const [editedTopic, setEditedTopic] = useState<MicrolearningTopic>(topic);

    const handleTopicInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEditedTopic(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    
    const handleTopicImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditedTopic(prev => ({ ...prev, imageUrl: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleStatusChange = (status: 'Published' | 'Draft') => {
        setEditedTopic(prev => ({...prev, status}));
    };

    // --- Episode Handlers ---
    const addEpisode = () => {
        const newEpisode: Episode = { id: `ep-${Date.now()}`, title: '', story: [] };
        setEditedTopic(prev => ({ ...prev, episodes: [...prev.episodes, newEpisode] }));
    };

    const updateEpisode = (epIndex: number, updatedEpisode: Partial<Episode>) => {
        const newEpisodes = [...editedTopic.episodes];
        newEpisodes[epIndex] = { ...newEpisodes[epIndex], ...updatedEpisode };
        setEditedTopic(prev => ({ ...prev, episodes: newEpisodes }));
    };

    const removeEpisode = (epIndex: number) => {
        setEditedTopic(prev => ({ ...prev, episodes: prev.episodes.filter((_, i) => i !== epIndex) }));
    };

    return (
        <div className="p-4 sm:p-6 md:p-8 w-full">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <button onClick={onCancel} className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white"><ArrowLeft size={16} /><span>Back to Topics</span></button>
                    <h1 className="text-3xl font-bold text-white mt-1">
                        {topic.id.startsWith('ml-') && !topic.title ? 'Create New Topic' : `Editing: ${editedTopic.title || 'Untitled Topic'}`}
                    </h1>
                </div>
                <div className="flex items-center space-x-4">
                    <button onClick={onCancel} className="px-6 py-2 rounded-lg bg-gray-700 text-white font-semibold hover:bg-gray-600">Cancel</button>
                    <button onClick={() => onSave(editedTopic)} className="px-6 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700">Save Topic</button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Topic Details (Sticky) */}
                <div className="lg:col-span-1 space-y-6 lg:sticky top-24 h-fit">
                    <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
                        <h2 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">Topic Details</h2>
                        <div className="space-y-4">
                            <input type="text" name="title" placeholder="Topic Title" value={editedTopic.title} onChange={handleTopicInfoChange} className="w-full bg-gray-700 p-2 rounded-md" />
                            <textarea name="description" placeholder="Description" value={editedTopic.description} onChange={handleTopicInfoChange} rows={4} className="w-full bg-gray-700 p-2 rounded-md" />
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-1">Topic Image</label>
                                <label htmlFor="topic-image-upload" className="w-full aspect-video bg-gray-700 rounded-md flex items-center justify-center overflow-hidden relative border-2 border-dashed border-gray-600 hover:border-indigo-500 transition-colors cursor-pointer group">
                                    {editedTopic.imageUrl ? <img src={editedTopic.imageUrl} alt="Topic preview" className="w-full h-full object-cover" /> : <div className="text-center text-gray-500 group-hover:text-white"><UploadCloud size={32} className="mx-auto" /><p className="text-xs mt-1">Upload Image</p></div>}
                                </label>
                                <input id="topic-image-upload" type="file" accept="image/*" onChange={handleTopicImageChange} className="hidden" />
                            </div>
                        </div>
                    </div>
                     <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
                        <h2 className="text-lg font-semibold text-white mb-4">Status</h2>
                        <div className="flex rounded-md bg-gray-700 p-1">
                            <button onClick={() => handleStatusChange('Draft')} className={`w-1/2 py-2 rounded ${editedTopic.status === 'Draft' ? 'bg-gray-600 text-white shadow' : 'text-gray-300'}`}>Draft</button>
                            <button onClick={() => handleStatusChange('Published')} className={`w-1/2 py-2 rounded ${editedTopic.status === 'Published' ? 'bg-emerald-600 text-white shadow' : 'text-gray-300'}`}>Published</button>
                        </div>
                    </div>
                </div>

                {/* Right Column: Episodes */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-2xl font-bold text-white">Episodes</h2>
                    {editedTopic.episodes.map((episode, epIndex) => (
                        <EpisodeEditor key={episode.id} episode={episode} index={epIndex} onUpdate={updateEpisode} onDelete={removeEpisode} />
                    ))}
                    <button onClick={addEpisode} className="w-full flex justify-center items-center space-x-2 py-3 rounded-lg bg-indigo-600/20 text-indigo-300 font-semibold hover:bg-indigo-600/40">
                        <Plus size={20} /><span>Add Episode</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- Episode Editor Sub-Component ---
interface EpisodeEditorProps {
    episode: Episode;
    index: number;
    onUpdate: (index: number, updatedEpisode: Partial<Episode>) => void;
    onDelete: (index: number) => void;
}

const EpisodeEditor: React.FC<EpisodeEditorProps> = ({ episode, index, onUpdate, onDelete }) => {
    
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onUpdate(index, { title: e.target.value });
    };

    const addStorySegment = () => {
        const newSegment: StorySegment = { id: `ss-${Date.now()}`, title: '', text: '', imageUrl: '' };
        onUpdate(index, { story: [...episode.story, newSegment] });
    };

    const updateStorySegment = (segIndex: number, updatedSegment: Partial<StorySegment>) => {
        const newStory = [...episode.story];
        newStory[segIndex] = { ...newStory[segIndex], ...updatedSegment };
        onUpdate(index, { story: newStory });
    };

    const removeStorySegment = (segIndex: number) => {
        onUpdate(index, { story: episode.story.filter((_, i) => i !== segIndex) });
    };

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700">
            <div className="flex justify-between items-center mb-4">
                <input type="text" placeholder={`Episode ${index + 1} Title`} value={episode.title} onChange={handleTitleChange} className="text-xl font-bold text-white bg-transparent w-full border-b-2 border-gray-700 focus:border-indigo-500 outline-none transition-colors" />
                <button onClick={() => onDelete(index)} className="p-1 text-red-400 hover:bg-red-500/10 rounded-full"><Trash2 size={18}/></button>
            </div>
            
            <div className="space-y-4 mb-4">
                {episode.story.map((segment, segIndex) => (
                    <StorySegmentEditor key={segment.id} segment={segment} index={segIndex} onUpdate={updateStorySegment} onDelete={removeStorySegment} />
                ))}
            </div>

            <button onClick={addStorySegment} className="w-full flex justify-center items-center space-x-2 py-2 rounded-lg border-2 border-dashed border-gray-600 text-gray-400 hover:bg-gray-700 hover:border-gray-500 transition-colors">
                <Plus size={18} /><span>Add Story Segment</span>
            </button>
        </div>
    );
};

// --- Story Segment Editor Sub-Component ---
interface StorySegmentEditorProps {
    segment: StorySegment;
    index: number;
    onUpdate: (index: number, updatedSegment: Partial<StorySegment>) => void;
    onDelete: (index: number) => void;
}

const StorySegmentEditor: React.FC<StorySegmentEditorProps> = ({ segment, index, onUpdate, onDelete }) => {
    
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                onUpdate(index, { imageUrl: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="bg-gray-700/50 p-4 rounded-lg flex flex-col md:flex-row gap-4 border border-gray-600">
            <div className="flex-grow space-y-4">
                <div>
                    <label className="text-xs font-semibold text-gray-400">SEGMENT TITLE #{index + 1}</label>
                    <input type="text" placeholder="Title for this segment..." value={segment.title} onChange={(e) => onUpdate(index, { title: e.target.value })} className="w-full bg-gray-600 p-2 rounded-md mt-1" />
                </div>
                <div>
                    <label className="text-xs font-semibold text-gray-400">STORY TEXT</label>
                    <textarea placeholder="Write the story for this segment..." value={segment.text} onChange={(e) => onUpdate(index, { text: e.target.value })} rows={4} className="w-full bg-gray-600 p-2 rounded-md mt-1" />
                </div>
                <button onClick={() => onDelete(index)} className="text-xs text-red-400 hover:underline">Remove Segment</button>
            </div>
            <div className="w-full md:w-40 flex-shrink-0">
                 <label className="text-xs font-semibold text-gray-400 mb-1 block">IMAGE</label>
                <label htmlFor={`segment-image-upload-${segment.id}`} className="w-full aspect-[9/16] bg-gray-600 rounded-md flex items-center justify-center overflow-hidden relative border-2 border-dashed border-gray-500 hover:border-indigo-500 transition-colors cursor-pointer group">
                    {segment.imageUrl ? (
                        <img src={segment.imageUrl} alt="Story preview" className="w-full h-full object-cover" />
                    ) : (
                        <div className="text-center text-gray-500 group-hover:text-white transition-colors">
                            <UploadCloud size={32} className="mx-auto" />
                            <p className="text-xs mt-1">Upload</p>
                        </div>
                    )}
                </label>
                <input id={`segment-image-upload-${segment.id}`} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </div>
        </div>
    );
};
