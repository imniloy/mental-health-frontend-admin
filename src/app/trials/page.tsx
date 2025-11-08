// src/app/trials/page.tsx
'use client';

import React, { useState } from 'react';
import { TrialPlan } from '@/interfaces/trial';

import { TrialEditor } from '@/components/trials/TrialEditor';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { Toast } from '@/components/ui/Toast';
import { TrialList } from '@/components/trials/TrialList';

// --- MOCK DATA (Replace with API calls) ---
const initialTrials: TrialPlan[] = [
  {
    id: 'trial-1',
    title: '1 Day Free Trial',
    durationDays: 1,
    description: 'A quick look at our basic features to get you started.',
    features: [
        { id: 'f1', text: 'Access to 5 meditation sessions' },
        { id: 'f2', text: 'Limited journal entries' },
    ],
    status: 'Active',
    lastModified: new Date().toISOString(),
  },
    {
    id: 'trial-2',
    title: '7 Day Pro Access',
    durationDays: 7,
    description: 'Experience all the premium features of SereneMind for a full week.',
    features: [
        { id: 'f3', text: 'Unlimited meditation sessions' },
        { id: 'f4', text: 'Full journaling capabilities' },
        { id: 'f5', text: 'Access to all audio content' },
    ],
    status: 'Active',
    lastModified: new Date().toISOString(),
  },
];

export default function TrialsPage() {
    const [trials, setTrials] = useState<TrialPlan[]>(initialTrials);
    const [currentView, setCurrentView] = useState<'list' | 'editor'>('list');
    const [selectedTrial, setSelectedTrial] = useState<TrialPlan | null>(null);
    const [archiveModal, setArchiveModal] = useState<{ isOpen: boolean; trialId: string | null }>({ isOpen: false, trialId: null });
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const handleCreate = () => {
        const newTrial: TrialPlan = {
            id: `trial-${Date.now()}`,
            title: '',
            durationDays: 1,
            description: '',
            features: [],
            status: 'Active',
            lastModified: new Date().toISOString(),
        };
        setSelectedTrial(newTrial);
        setCurrentView('editor');
    };

    const handleEdit = (trialId: string) => {
        const trialToEdit = trials.find(t => t.id === trialId);
        if (trialToEdit) {
            setSelectedTrial(trialToEdit);
            setCurrentView('editor');
        }
    };

    const handleSave = (updatedTrial: TrialPlan) => {
        setTrials(prev => {
            const exists = prev.some(t => t.id === updatedTrial.id);
            if (exists) {
                return prev.map(t => t.id === updatedTrial.id ? { ...updatedTrial, lastModified: new Date().toISOString() } : t);
            }
            return [...prev, updatedTrial];
        });
        setCurrentView('list');
        setToast({ message: "Trial plan saved!", type: 'success' });
    };

    const handleReturnToList = () => {
        setCurrentView('list');
        setSelectedTrial(null);
    };
    
    const handleOpenArchiveModal = (trialId: string) => {
        setArchiveModal({ isOpen: true, trialId });
    };

    const handleConfirmArchive = () => {
        if (archiveModal.trialId) {
            setTrials(prev => prev.map(t => t.id === archiveModal.trialId ? { ...t, status: 'Archived' } : t));
            setToast({ message: "Trial plan archived.", type: 'success' });
        }
        setArchiveModal({ isOpen: false, trialId: null });
    };

    return (
        <div className="bg-gray-900 text-gray-100 min-h-screen">
            {currentView === 'list' ? (
                <TrialList
                    trials={trials}
                    onCreate={handleCreate}
                    onEdit={handleEdit}
                    onArchive={handleOpenArchiveModal}
                />
            ) : (
                selectedTrial && <TrialEditor
                    trial={selectedTrial}
                    onSave={handleSave}
                    onCancel={handleReturnToList}
                />
            )}
            
            <ConfirmationModal
                isOpen={archiveModal.isOpen}
                onClose={() => setArchiveModal({ isOpen: false, trialId: null })}
                onConfirm={handleConfirmArchive}
                title="Archive Trial Plan"
                message="Are you sure you want to archive this plan? It will no longer be available for new users."
            />
            {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}
        </div>
    );
}
