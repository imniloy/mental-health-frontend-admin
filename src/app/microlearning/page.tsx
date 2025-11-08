// src/app/microlearning/page.tsx
'use client';

import React, { useState } from 'react';
import { MicrolearningTopic } from '@/interfaces/microlearning';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { Toast } from '@/components/ui/Toast';
import { MicrolearningList } from '@/components/microlearning/MicrolearningList';
import { MicrolearningEditor } from '@/components/microlearning/MicrolearningEditor';

// --- MOCK DATA (Updated to include topic imageUrl and story segment titles) ---
const initialTopics: MicrolearningTopic[] = [
  {
    id: 'ml-1',
    title: 'Understanding & Overcoming Stress',
    description: 'A short series on the science of stress and practical techniques to manage it.',
    imageUrl: 'https://placehold.co/600x400/ef4444/ffffff?text=Stress+Management',
    episodes: [
      {
        id: 'ep-1',
        title: 'What is Stress?',
        story: [
          { id: 'ss-1', title: 'The Body\'s Reaction', text: 'Stress is the body\'s reaction to any change that requires an adjustment or response.', imageUrl: 'https://placehold.co/1080x1920/dc2626/ffffff?text=Story+1' },
          { id: 'ss-2', title: 'Types of Responses', text: 'The body reacts to these changes with physical, mental, and emotional responses.', imageUrl: 'https://placehold.co/1080x1920/be123c/ffffff?text=Story+2' },
        ]
      }
    ],
    status: 'Published',
    lastModified: new Date().toISOString(),
  },
];

export default function MicrolearningPage() {
    const [topics, setTopics] = useState<MicrolearningTopic[]>(initialTopics);
    const [currentView, setCurrentView] = useState<'list' | 'editor'>('list');
    const [selectedTopic, setSelectedTopic] = useState<MicrolearningTopic | null>(null);
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; topicId: string | null }>({ isOpen: false, topicId: null });
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const handleCreate = () => {
        const newTopic: MicrolearningTopic = {
            id: `ml-${Date.now()}`,
            title: '',
            description: '',
            imageUrl: '', // Added imageUrl to match the interface
            episodes: [],
            status: 'Draft',
            lastModified: new Date().toISOString(),
        };
        setSelectedTopic(newTopic);
        setCurrentView('editor');
    };

    const handleEdit = (topicId: string) => {
        const topicToEdit = topics.find(t => t.id === topicId);
        if (topicToEdit) {
            setSelectedTopic(topicToEdit);
            setCurrentView('editor');
        }
    };

    const handleSave = (updatedTopic: MicrolearningTopic) => {
        setTopics(prev => {
            const exists = prev.some(t => t.id === updatedTopic.id);
            if (exists) {
                return prev.map(t => t.id === updatedTopic.id ? { ...updatedTopic, lastModified: new Date().toISOString() } : t);
            }
            return [...prev, updatedTopic];
        });
        setCurrentView('list');
        setToast({ message: "Microlearning topic saved!", type: 'success' });
    };

    const handleReturnToList = () => {
        setCurrentView('list');
        setSelectedTopic(null);
    };
    
    const handleOpenDeleteModal = (topicId: string) => {
        setDeleteModal({ isOpen: true, topicId });
    };

    const handleConfirmDelete = () => {
        if (deleteModal.topicId) {
            setTopics(prev => prev.filter(t => t.id !== deleteModal.topicId));
            setToast({ message: "Topic deleted.", type: 'success' });
        }
        setDeleteModal({ isOpen: false, topicId: null });
    };

    const handleToggleStatus = (topicId: string) => {
        setTopics(prev =>
            prev.map(t =>
                t.id === topicId
                    ? { ...t, status: t.status === 'Published' ? 'Draft' : 'Published' }
                    : t
            )
        );
        setToast({ message: "Topic status updated.", type: 'success' });
    };

    return (
        <div className="bg-gray-900 text-gray-100 min-h-screen">
            {currentView === 'list' ? (
                <MicrolearningList
                    topics={topics}
                    onCreate={handleCreate}
                    onEdit={handleEdit}
                    onDelete={handleOpenDeleteModal}
                    onToggle={handleToggleStatus}
                />
            ) : (
                selectedTopic && <MicrolearningEditor
                    topic={selectedTopic}
                    onSave={handleSave}
                    onCancel={handleReturnToList}
                />
            )}
            
            <ConfirmationModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, topicId: null })}
                onConfirm={handleConfirmDelete}
                title="Delete Topic"
                message="Are you sure you want to delete this microlearning topic and all its episodes?"
            />
            {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}
        </div>
    );
}
