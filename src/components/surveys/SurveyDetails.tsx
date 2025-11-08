// src/components/surveys/SurveyDetails.tsx
'use client';

import React from 'react';
import { Survey } from '@/interfaces/survey';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';

interface SurveyDetailsProps {
    survey: Survey;
    onBack: () => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onToggle: (id: string) => void;
}

export const SurveyDetails: React.FC<SurveyDetailsProps> = ({ survey, onBack, onEdit, onDelete, onToggle }) => {
    const { id, title, description, status, questions } = survey;

    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
            <button onClick={onBack} className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white mb-6">
                <ArrowLeft size={16} />
                <span>Back to Survey List</span>
            </button>

            {/* Survey Header & Actions */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl mb-8">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
                        <p className="text-gray-300">{description}</p>
                    </div>
                    <div className="flex items-center space-x-3 flex-shrink-0">
                        <button onClick={() => onEdit(id)} className="flex items-center space-x-2 px-4 py-2 text-sm rounded-lg bg-gray-700 text-white font-semibold hover:bg-gray-600 transition-colors">
                            <Edit size={16} />
                            <span>Edit</span>
                        </button>
                         <button onClick={() => onDelete(id)} className="flex items-center space-x-2 px-4 py-2 text-sm rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition-colors">
                            <Trash2 size={16} />
                            <span>Delete</span>
                        </button>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-6 pt-4 flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-300">Status</span>
                     <label htmlFor={`details-toggle-${id}`} className="flex items-center cursor-pointer">
                        <div className="relative">
                            <input id={`details-toggle-${id}`} type="checkbox" className="sr-only" checked={status === 'Enabled'} onChange={() => onToggle(id)} />
                            <div className={`block w-10 h-6 rounded-full transition-colors ${status === 'Enabled' ? 'bg-emerald-500' : 'bg-gray-600'}`}></div>
                            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${status === 'Enabled' ? 'translate-x-full' : ''}`}></div>
                        </div>
                        <div className={`ml-3 text-sm font-semibold ${status === 'Enabled' ? 'text-emerald-400' : 'text-gray-400'}`}>{status}</div>
                    </label>
                </div>
            </div>

            {/* Read-only Questions List */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
                <h2 className="text-xl font-bold text-white mb-4">Questions ({questions.length})</h2>
                <div className="space-y-6">
                    {questions.length > 0 ? (
                        questions.map((q, index) => (
                            <div key={q.id} className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                                <p className="text-md font-semibold text-white mb-3">Q{index + 1}: {q.title}</p>
                                <div className="space-y-2">
                                    {q.options.map(opt => (
                                        <div key={opt.id} className="flex items-center space-x-3 text-gray-300">
                                            <div className={`w-4 h-4 rounded-${q.isMultipleChoice ? 'sm' : 'full'} border-2 border-gray-500`}></div>
                                            <span>{opt.text}</span>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-xs text-gray-500 mt-3">{q.isMultipleChoice ? 'Multiple selections allowed' : 'Single selection only'}</p>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400 text-center py-4">This survey has no questions yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};
