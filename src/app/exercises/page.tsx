// src/app/exercises/page.tsx
'use client';

import React, { useState } from 'react';
import { Exercise } from '@/interfaces/exercise';
import { ExerciseList } from '@/components/exercises/ExerciseList';
import { ExerciseEditor } from '@/components/exercises/ExerciseEditor';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { Toast } from '@/components/ui/Toast';

// --- MOCK DATA (Replace with API calls) ---
const initialExercises: Exercise[] = [
  {
    id: 'ex-1',
    name: '4-7-8 Breathing',
    description: 'A powerful breathing technique to promote relaxation and help with sleep.',
    imageUrl: 'https://placehold.co/600x400/3b82f6/ffffff?text=4-7-8',
    durationMinutes: 5,
    inhaleSeconds: 4,
    holdSeconds: 7,
    exhaleSeconds: 8,
    status: 'Active',
    lastModified: new Date().toISOString(),
  },
   {
    id: 'ex-2',
    name: 'Box Breathing',
    description: 'Also known as square breathing, this technique can help calm your nervous system.',
    imageUrl: 'https://placehold.co/600x400/8b5cf6/ffffff?text=Box+Breathing',
    durationMinutes: 3,
    inhaleSeconds: 4,
    holdSeconds: 4,
    exhaleSeconds: 4,
    status: 'Active',
    lastModified: new Date().toISOString(),
  },
];

export default function ExercisesPage() {
    const [exercises, setExercises] = useState<Exercise[]>(initialExercises);
    const [currentView, setCurrentView] = useState<'list' | 'editor'>('list');
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
    const [archiveModal, setArchiveModal] = useState<{ isOpen: boolean; exerciseId: string | null }>({ isOpen: false, exerciseId: null });
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const handleCreate = () => {
        const newExercise: Exercise = {
            id: `ex-${Date.now()}`,
            name: '',
            description: '',
            imageUrl: '',
            durationMinutes: 1,
            inhaleSeconds: 4,
            holdSeconds: 4,
            exhaleSeconds: 4,
            status: 'Active',
            lastModified: new Date().toISOString(),
        };
        setSelectedExercise(newExercise);
        setCurrentView('editor');
    };

    const handleEdit = (exerciseId: string) => {
        const exerciseToEdit = exercises.find(ex => ex.id === exerciseId);
        if (exerciseToEdit) {
            setSelectedExercise(exerciseToEdit);
            setCurrentView('editor');
        }
    };

    const handleSave = (updatedExercise: Exercise) => {
        setExercises(prev => {
            const exists = prev.some(ex => ex.id === updatedExercise.id);
            if (exists) {
                return prev.map(ex => ex.id === updatedExercise.id ? { ...updatedExercise, lastModified: new Date().toISOString() } : ex);
            }
            return [...prev, updatedExercise];
        });
        setCurrentView('list');
        setToast({ message: "Exercise saved successfully!", type: 'success' });
    };

    const handleReturnToList = () => {
        setCurrentView('list');
        setSelectedExercise(null);
    };
    
    const handleOpenArchiveModal = (exerciseId: string) => {
        setArchiveModal({ isOpen: true, exerciseId });
    };

    const handleConfirmArchive = () => {
        if (archiveModal.exerciseId) {
            setExercises(prev => prev.map(ex => ex.id === archiveModal.exerciseId ? { ...ex, status: 'Archived' } : ex));
            setToast({ message: "Exercise archived.", type: 'success' });
        }
        setArchiveModal({ isOpen: false, exerciseId: null });
    };

    return (
        <div className="bg-gray-900 text-gray-100 min-h-screen">
            {currentView === 'list' ? (
                <ExerciseList
                    exercises={exercises}
                    onCreate={handleCreate}
                    onEdit={handleEdit}
                    onArchive={handleOpenArchiveModal}
                />
            ) : (
                selectedExercise && <ExerciseEditor
                    exercise={selectedExercise}
                    onSave={handleSave}
                    onCancel={handleReturnToList}
                />
            )}
            
            <ConfirmationModal
                isOpen={archiveModal.isOpen}
                onClose={() => setArchiveModal({ isOpen: false, exerciseId: null })}
                onConfirm={handleConfirmArchive}
                title="Archive Exercise"
                message="Are you sure you want to archive this exercise? It will no longer be available for new sessions."
            />
            {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}
        </div>
    );
}
