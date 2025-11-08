
// src/components/programs/ProgramCard.tsx
'use client';

import React from 'react';
import { Program } from '@/interfaces/program';
import { Edit, Trash2, File, Layers } from 'lucide-react';

interface ProgramCardProps {
    program: Program;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onToggle: (id: string) => void;
}

export const ProgramCard: React.FC<ProgramCardProps> = ({ program, onEdit, onDelete, onToggle }) => {
    const isCourse = program.type === 'Course';
    const season_count = program.courseDetails?.seasons.length || 0;

    return (
        <div className="bg-gray-800 rounded-lg shadow-lg flex flex-col transition-all hover:shadow-indigo-500/30 hover:-translate-y-1">
            <div className="p-5 flex-grow">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-white pr-4">{program.title}</h3>
                    <span className={`flex items-center gap-2 px-3 py-1 text-xs font-semibold rounded-full ${isCourse ? 'bg-indigo-500/20 text-indigo-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                        {isCourse ? <Layers size={14}/> : <File size={14}/>}
                        {program.type}
                    </span>
                </div>
                <p className="text-sm text-gray-400 mt-2 h-10 overflow-hidden">{program.description}</p>
                 <div className="text-xs text-gray-500 mt-4 pt-4 border-t border-gray-700">
                    {isCourse ? `${season_count} Season${season_count !== 1 ? 's' : ''}` : 'Single Session'}
                </div>
            </div>
            <div className="bg-gray-700/50 p-3 flex justify-between items-center mt-auto rounded-b-lg">
                <label htmlFor={`toggle-${program.id}`} className="flex items-center cursor-pointer">
                    <div className="relative">
                        <input id={`toggle-${program.id}`} type="checkbox" className="sr-only" checked={program.status === 'Published'} onChange={() => onToggle(program.id)} />
                        <div className={`block w-10 h-6 rounded-full transition-colors ${program.status === 'Published' ? 'bg-emerald-500' : 'bg-gray-600'}`}></div>
                        <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${program.status === 'Published' ? 'translate-x-full' : ''}`}></div>
                    </div>
                    <div className="ml-3 text-gray-300 text-sm font-medium">{program.status}</div>
                </label>
                <div className="flex space-x-2">
                    <button onClick={() => onEdit(program.id)} className="p-2 rounded-md hover:bg-gray-600 text-gray-400 hover:text-white" aria-label="Edit">
                        <Edit size={18} />
                    </button>
                    <button onClick={() => onDelete(program.id)} className="p-2 rounded-md hover:bg-gray-600 text-gray-400 hover:text-red-400" aria-label="Delete">
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};
