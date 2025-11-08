
// src/components/exercises/ExerciseList.tsx
'use client';

import React from 'react';
import { Exercise } from '@/interfaces/exercise';
import { ExerciseCard } from './ExerciseCard';
import { Plus } from 'lucide-react';

interface ExerciseListProps {
    exercises: Exercise[];
    onCreate: () => void;
    onEdit: (id: string) => void;
    onArchive: (id: string) => void;
}

export const ExerciseList: React.FC<ExerciseListProps> = ({ exercises, onCreate, onEdit, onArchive }) => {
    return (
        <div className="p-4 sm:p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Exercise Management</h1>
                <button onClick={onCreate} className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors">
                    <Plus size={20} />
                    <span>Create Exercise</span>
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {exercises.map(exercise => (
                    <ExerciseCard
                        key={exercise.id}
                        exercise={exercise}
                        onEdit={onEdit}
                        onArchive={onArchive}
                    />
                ))}
            </div>
        </div>
    );
};
