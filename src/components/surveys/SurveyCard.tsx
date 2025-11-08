// src/components/surveys/SurveyCard.tsx
'use client';

import React from 'react';
import { Edit, Trash2, Eye } from 'lucide-react';
import { Survey } from '@/interfaces/survey';

interface SurveyCardProps {
    survey: Survey;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onToggle: (id: string) => void;
    onView: (id: string) => void;
}

export const SurveyCard: React.FC<SurveyCardProps> = ({ survey, onEdit, onDelete, onToggle, onView }) => {
    const { id, title, description, status, questions, lastModified } = survey;

    return (
        <div className="bg-gray-800 rounded-lg shadow-lg flex flex-col justify-between transition-all hover:shadow-indigo-500/30 hover:-translate-y-1">
            <div className="p-5">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-white pr-4 flex-1">{title}</h3>
                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${status === 'Enabled' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-600 text-gray-300'}`}>
                        {status}
                    </span>
                </div>
                <p className="text-sm text-gray-400 mt-3 h-10 overflow-hidden">{description}</p>
                <div className="flex justify-between items-center text-xs text-gray-500 mt-4 pt-4 border-t border-gray-700">
                    <span>{questions.length} Questions</span>
                    <span>Modified: {new Date(lastModified).toLocaleDateString()}</span>
                </div>
            </div>
            {/* The button section now has rounded bottom corners for a "carved" look */}
            <div className="bg-gray-700/50 p-3 flex justify-between items-center mt-auto rounded-b-lg">
                 <label htmlFor={`toggle-${id}`} className="flex items-center cursor-pointer">
                    <div className="relative">
                        <input id={`toggle-${id}`} type="checkbox" className="sr-only" checked={status === 'Enabled'} onChange={() => onToggle(id)} />
                        {/* The background of the switch now changes color */}
                        <div className={`block w-10 h-6 rounded-full transition-colors ${status === 'Enabled' ? 'bg-emerald-500' : 'bg-gray-600'}`}></div>
                        {/* The dot of the switch remains white and slides */}
                        <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${status === 'Enabled' ? 'translate-x-full' : ''}`}></div>
                    </div>
                    <div className="ml-3 text-gray-300 text-sm font-medium">{status === 'Enabled' ? 'Enabled' : 'Disabled'}</div>
                </label>
                <div className="flex space-x-2">
                    <button 
                        onClick={() => onView(id)} 
                        className="p-2 rounded-md hover:bg-gray-600 text-gray-400 hover:text-white" 
                        aria-label="View"
                    >
                        <Eye size={18}/>
                    </button>
                    <button 
                        onClick={() => onEdit(id)} 
                        className="p-2 rounded-md hover:bg-gray-600 text-gray-400 hover:text-white" 
                        aria-label="Edit"
                    >
                        <Edit size={18}/>
                    </button>
                    <button 
                        onClick={() => onDelete(id)} 
                        className="p-2 rounded-md hover:bg-gray-600 text-gray-400 hover:text-red-400" 
                        aria-label="Delete"
                    >
                        <Trash2 size={18}/>
                    </button>
                </div>
            </div>
        </div>
    );
};
