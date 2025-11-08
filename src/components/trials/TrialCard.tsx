// src/components/trials/TrialCard.tsx
'use client';

import React from 'react';
import { TrialPlan } from '@/interfaces/trial';
import { Edit, Archive, CheckCircle } from 'lucide-react';

interface TrialCardProps {
    trial: TrialPlan;
    onEdit: (id: string) => void;
    onArchive: (id: string) => void;
}

export const TrialCard: React.FC<TrialCardProps> = ({ trial, onEdit, onArchive }) => {
    return (
        <div className="bg-gray-800 rounded-lg shadow-lg flex flex-col transition-all hover:shadow-indigo-500/30 hover:-translate-y-1">
            <div className="p-5 flex-grow">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-white pr-4">{trial.title}</h3>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${trial.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-600 text-gray-300'}`}>
                        {trial.status}
                    </span>
                </div>
                <p className="text-sm font-bold text-indigo-400 mt-1">{trial.durationDays} Day{trial.durationDays !== 1 ? 's' : ''}</p>
                <p className="text-sm text-gray-400 mt-3">{trial.description}</p>
                <div className="mt-4 pt-4 border-t border-gray-700 space-y-2">
                    {trial.features.map(feature => (
                        <div key={feature.id} className="flex items-center text-sm text-gray-300">
                            <CheckCircle size={16} className="text-emerald-400 mr-2 flex-shrink-0" />
                            <span>{feature.text}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="bg-gray-700/50 p-3 flex justify-end items-center mt-auto rounded-b-lg space-x-2">
                <button onClick={() => onEdit(trial.id)} className="p-2 rounded-md hover:bg-gray-600 text-gray-400 hover:text-white" aria-label="Edit">
                    <Edit size={18} />
                </button>
                {trial.status === 'Active' && (
                    <button onClick={() => onArchive(trial.id)} className="p-2 rounded-md hover:bg-gray-600 text-gray-400 hover:text-red-400" aria-label="Archive">
                        <Archive size={18} />
                    </button>
                )}
            </div>
        </div>
    );
};
