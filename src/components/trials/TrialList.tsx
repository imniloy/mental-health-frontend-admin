
// src/components/trials/TrialList.tsx
'use client';

import React from 'react';
import { TrialPlan } from '@/interfaces/trial';
import { TrialCard } from './TrialCard';
import { Plus } from 'lucide-react';

interface TrialListProps {
    trials: TrialPlan[];
    onCreate: () => void;
    onEdit: (id: string) => void;
    onArchive: (id: string) => void;
}

export const TrialList: React.FC<TrialListProps> = ({ trials, onCreate, onEdit, onArchive }) => {
    return (
        <div className="p-4 sm:p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Trial Plan Management</h1>
                <button onClick={onCreate} className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors">
                    <Plus size={20} />
                    <span>Create Plan</span>
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {trials.map(trial => (
                    <TrialCard
                        key={trial.id}
                        trial={trial}
                        onEdit={onEdit}
                        onArchive={onArchive}
                    />
                ))}
            </div>
        </div>
    );
};
