// src/components/microlearning/MicrolearningTopicCard.tsx
'use client';

import React from 'react';
import { MicrolearningTopic } from '@/interfaces/microlearning';
import { Edit, Trash2, BookText } from 'lucide-react';

interface MicrolearningTopicCardProps {
    topic: MicrolearningTopic;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onToggle: (id: string) => void;
}

export const MicrolearningTopicCard: React.FC<MicrolearningTopicCardProps> = ({ topic, onEdit, onDelete, onToggle }) => {
    return (
        <div className="bg-gray-800 rounded-lg shadow-lg flex flex-col transition-all hover:shadow-indigo-500/30 hover:-translate-y-1 overflow-hidden">
            <img src={topic.imageUrl || 'https://placehold.co/600x400/1f2937/4b5563?text=No+Image'} alt={topic.title} className="w-full h-32 object-cover"/>
            <div className="p-5 flex-grow flex flex-col">
                <h3 className="text-lg font-bold text-white pr-4">{topic.title}</h3>
                <p className="text-sm text-gray-400 mt-2 h-10 overflow-hidden flex-grow">{topic.description}</p>
                 <div className="text-xs text-gray-500 mt-4 pt-4 border-t border-gray-700 flex items-center">
                    <BookText size={14} className="mr-2"/>
                    {topic.episodes.length} Episode{topic.episodes.length !== 1 ? 's' : ''}
                </div>
            </div>
            <div className="bg-gray-700/50 p-3 flex justify-between items-center mt-auto rounded-b-lg">
                <label htmlFor={`toggle-${topic.id}`} className="flex items-center cursor-pointer">
                    <div className="relative">
                        <input id={`toggle-${topic.id}`} type="checkbox" className="sr-only" checked={topic.status === 'Published'} onChange={() => onToggle(topic.id)} />
                        <div className={`block w-10 h-6 rounded-full transition-colors ${topic.status === 'Published' ? 'bg-emerald-500' : 'bg-gray-600'}`}></div>
                        <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${topic.status === 'Published' ? 'translate-x-full' : ''}`}></div>
                    </div>
                    <div className="ml-3 text-gray-300 text-sm font-medium">{topic.status}</div>
                </label>
                <div className="flex space-x-2">
                    <button onClick={() => onEdit(topic.id)} className="p-2 rounded-md hover:bg-gray-600 text-gray-400 hover:text-white" aria-label="Edit">
                        <Edit size={18} />
                    </button>
                    <button onClick={() => onDelete(topic.id)} className="p-2 rounded-md hover:bg-gray-600 text-gray-400 hover:text-red-400" aria-label="Delete">
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};
