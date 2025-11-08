// src/components/surveys/SurveyList.tsx
'use client';

import React from 'react';
import { Survey } from '@/interfaces/survey';
import { SurveyCard } from './SurveyCard';
import { Plus, Search } from 'lucide-react';

interface SurveyListProps {
    surveys: Survey[];
    searchTerm: string;
    onSearchChange: (term: string) => void;
    onCreate: () => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onToggle: (id: string) => void;
    onView: (id: string) => void;
}

export const SurveyList: React.FC<SurveyListProps> = ({ surveys, searchTerm, onSearchChange, onCreate, onEdit, onDelete, onToggle, onView }) => {
    return (
        <div className="p-4 sm:p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                <h1 className="text-2xl font-bold text-white">Survey Management</h1>
                <div className="w-full md:w-auto flex items-center gap-4">
                    <div className="relative w-full md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search surveys..."
                            value={searchTerm}
                            onChange={(e) => onSearchChange(e.target.value)}
                            className="w-full bg-gray-800 border-gray-700 text-white rounded-lg py-2 pl-10 pr-4 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <button onClick={onCreate} className="flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors">
                        <Plus size={20} />
                        <span>Create</span>
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {surveys.map(survey => (
                    <SurveyCard 
                        key={survey.id} 
                        survey={survey} 
                        onEdit={onEdit} 
                        onDelete={onDelete} 
                        onToggle={onToggle} 
                        onView={onView} 
                    />
                ))}
            </div>
             {surveys.length === 0 && searchTerm && (
                <div className="text-center col-span-full py-12">
                    <p className="text-gray-400">No surveys found for "{searchTerm}".</p>
                </div>
            )}
        </div>
    );
};
