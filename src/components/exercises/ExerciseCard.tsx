// src/components/exercises/ExerciseCard.tsx
'use client';

import React from 'react';
import { Exercise } from '@/interfaces/exercise';
import { Edit, Archive, Clock, ArrowDown, Pause, ArrowUp } from 'lucide-react';

interface ExerciseCardProps {
    exercise: Exercise;
    onEdit: (id: string) => void;
    onArchive: (id: string) => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, onEdit, onArchive }) => {
    return (
        <div className="bg-gray-800 rounded-lg shadow-lg flex flex-col transition-all hover:shadow-indigo-500/30 hover:-translate-y-1">
            <div className="p-5 flex-grow">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-white pr-4">{exercise.name}</h3>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${exercise.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-600 text-gray-300'}`}>
                        {exercise.status}
                    </span>
                </div>
                <p className="text-sm text-gray-400 mt-2 h-10 overflow-hidden">{exercise.description}</p>
                <div className="mt-4 pt-4 border-t border-gray-700 space-y-2">
                    <div className="flex items-center text-sm text-gray-300">
                        <Clock size={16} className="text-indigo-400 mr-2 flex-shrink-0" />
                        <span>Total Duration: {exercise.durationMinutes} min</span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-300">
                        <span className="flex items-center"><ArrowUp size={14} className="mr-1 text-cyan-400"/> Inhale: {exercise.inhaleSeconds}s</span>
                        <span className="flex items-center"><Pause size={14} className="mr-1 text-amber-400"/> Hold: {exercise.holdSeconds}s</span>
                        <span className="flex items-center"><ArrowDown size={14} className="mr-1 text-rose-400"/> Exhale: {exercise.exhaleSeconds}s</span>
                    </div>
                </div>
            </div>
            <div className="bg-gray-700/50 p-3 flex justify-end items-center mt-auto rounded-b-lg space-x-2">
                <button onClick={() => onEdit(exercise.id)} className="p-2 rounded-md hover:bg-gray-600 text-gray-400 hover:text-white" aria-label="Edit">
                    <Edit size={18} />
                </button>
                {exercise.status === 'Active' && (
                    <button onClick={() => onArchive(exercise.id)} className="p-2 rounded-md hover:bg-gray-600 text-gray-400 hover:text-red-400" aria-label="Archive">
                        <Archive size={18} />
                    </button>
                )}
            </div>
        </div>
    );
};
