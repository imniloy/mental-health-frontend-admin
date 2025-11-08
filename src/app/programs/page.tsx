// src/app/programs/page.tsx
'use client';

import React, { useState } from 'react';
import { Program } from '@/interfaces/program';
import { ProgramList } from '@/components/programs/ProgramList';
import { ProgramEditor } from '@/components/programs/ProgramEditor';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { Toast } from '@/components/ui/Toast';

// --- MOCK DATA (Updated with correct Season/Day structure and Music status) ---
const initialPrograms: Program[] = [
  {
    id: 'prog-1',
    title: 'Mindful Morning Routine',
    description: 'A single session to start your day with intention and peace.',
    type: 'Single',
    singleSessionMusic: { id: 'music-1', name: 'Morning Dew', category: 'Ambient', url: '', status: 'Enabled' },
    status: 'Published',
    lastModified: new Date().toISOString(),
  },
  {
    id: 'prog-2',
    title: '14-Day Anxiety Relief Course',
    description: 'A two-week guided course to help you understand and manage anxiety.',
    type: 'Course',
    courseDetails: {
      seasons: [
        {
          id: 's1',
          title: 'Season 1: Foundations of Calm',
          imageUrl: 'https://placehold.co/1080x1920/1e40af/ffffff?text=Season+1',
          days: [
            { id: 'd1', title: 'Day 1: Understanding Anxiety', music: { id: 'music-2', name: 'Calm Waves', category: 'Nature', url: '', status: 'Enabled' } },
            { id: 'd2', title: 'Day 2: Your First Breathing Exercise', music: { id: 'music-3', name: 'Deep Breath', category: 'Guided', url: '', status: 'Enabled' } },
          ]
        },
        {
          id: 's2',
          title: 'Season 2: Building Resilience',
          imageUrl: 'https://placehold.co/1080x1920/3730a3/ffffff?text=Season+2',
          days: [
            { id: 'd3', title: 'Day 8: Mindful Observation', music: null },
          ]
        }
      ]
    },
    status: 'Published',
    lastModified: new Date().toISOString(),
  },
];

export default function ProgramsPage() {
    const [programs, setPrograms] = useState<Program[]>(initialPrograms);
    const [currentView, setCurrentView] = useState<'list' | 'editor'>('list');
    const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; programId: string | null }>({ isOpen: false, programId: null });
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const handleCreate = () => {
        const newProgram: Program = {
            id: `prog-${Date.now()}`,
            title: '',
            description: '',
            type: 'Single',
            status: 'Draft',
            lastModified: new Date().toISOString(),
        };
        setSelectedProgram(newProgram);
        setCurrentView('editor');
    };

    const handleEdit = (programId: string) => {
        const programToEdit = programs.find(p => p.id === programId);
        if (programToEdit) {
            setSelectedProgram(programToEdit);
            setCurrentView('editor');
        }
    };

    const handleSave = (updatedProgram: Program) => {
        setPrograms(prev => {
            const exists = prev.some(p => p.id === updatedProgram.id);
            if (exists) {
                return prev.map(p => p.id === updatedProgram.id ? { ...updatedProgram, lastModified: new Date().toISOString() } : p);
            }
            return [...prev, updatedProgram];
        });
        setCurrentView('list');
        setToast({ message: "Program saved successfully!", type: 'success' });
    };

    const handleReturnToList = () => {
        setCurrentView('list');
        setSelectedProgram(null);
    };
    
    const handleOpenDeleteModal = (programId: string) => {
        setDeleteModal({ isOpen: true, programId });
    };

    const handleConfirmDelete = () => {
        if (deleteModal.programId) {
            setPrograms(prev => prev.filter(p => p.id !== deleteModal.programId));
            setToast({ message: "Program deleted.", type: 'success' });
        }
        setDeleteModal({ isOpen: false, programId: null });
    };

    const handleToggleStatus = (programId: string) => {
        setPrograms(prev =>
            prev.map(p =>
                p.id === programId
                    ? { ...p, status: p.status === 'Published' ? 'Draft' : 'Published' }
                    : p
            )
        );
        setToast({ message: "Program status updated.", type: 'success' });
    };

    return (
        <div className="bg-gray-900 text-gray-100 min-h-screen">
            {currentView === 'list' ? (
                <ProgramList
                    programs={programs}
                    onCreate={handleCreate}
                    onEdit={handleEdit}
                    onDelete={handleOpenDeleteModal}
                    onToggle={handleToggleStatus}
                />
            ) : (
                selectedProgram && <ProgramEditor
                    program={selectedProgram}
                    onSave={handleSave}
                    onCancel={handleReturnToList}
                />
            )}
            
            <ConfirmationModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, programId: null })}
                onConfirm={handleConfirmDelete}
                title="Delete Program"
                message="Are you sure you want to delete this program? This action is permanent."
            />
            {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}
        </div>
    );
}
