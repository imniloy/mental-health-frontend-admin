// src/components/programs/ProgramList.tsx
'use client';

import React from 'react';
import { Program } from '@/interfaces/program';
import { ProgramCard } from './ProgramCard';
import { Plus } from 'lucide-react';

interface ProgramListProps {
    programs: Program[];
    onCreate: () => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onToggle: (id: string) => void;
}

export const ProgramList: React.FC<ProgramListProps> = ({ programs, onCreate, onEdit, onDelete, onToggle }) => {
    return (
        <div className="p-4 sm:p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Program Management</h1>
                <button onClick={onCreate} className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors">
                    <Plus size={20} />
                    <span>Create Program</span>
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {programs.map(program => (
                    <ProgramCard
                        key={program.id}
                        program={program}
                        onEdit={onEdit}
                        onDelete={onDelete}
                        onToggle={onToggle}
                    />
                ))}
            </div>
        </div>
    );
};
