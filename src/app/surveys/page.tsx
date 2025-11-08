// src/app/surveys/page.tsx
'use client';

import React, { useState } from 'react';
import { SurveyEditor } from '@/components/surveys/SurveyEditor';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { Toast } from '@/components/ui/Toast';
import { Survey } from '@/interfaces/survey';
import { SurveyDetails } from '@/components/surveys/SurveyDetails';
import { SurveyList } from '@/components/surveys/SurveyList';

// --- MOCK DATA (Replace with API calls) ---
const initialSurveys: Survey[] = [
  {
    id: 'survey-1',
    title: 'User Satisfaction Survey 2024',
    description: 'A brief survey to gauge user satisfaction with our core features.',
    status: 'Enabled',
    questions: [
      { id: 'q1', title: 'How satisfied are you?', subtitle: 'Rate your overall satisfaction.', isMultipleChoice: false, isRequired: true, options: [{id: 'o1', text: 'Very Satisfied'}, {id: 'o2', text: 'Satisfied'}, {id: 'o3', text: 'Neutral'}] },
      { id: 'q2', title: 'Which features do you use most?', subtitle: 'Select all that apply.', isMultipleChoice: true, isRequired: false, options: [{id: 'o4', text: 'Meditation'}, {id: 'o5', text: 'Journaling'}, {id: 'o6', text: 'Breathing Exercises'}] },
    ],
    lastModified: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'survey-2',
    title: 'New Feature Feedback',
    description: 'Help us understand your thoughts on the new journaling feature.',
    status: 'Disabled',
    questions: [],
    lastModified: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export default function SurveysPage() {
    const [surveys, setSurveys] = useState<Survey[]>(initialSurveys);
    const [currentView, setCurrentView] = useState<'list' | 'editor' | 'details'>('list');
    const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null);
    const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; surveyId: string | null }>({ isOpen: false, surveyId: null });
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const handleCreate = () => {
        const newSurvey: Survey = {
            id: `survey-${Date.now()}`,
            title: 'New Untitled Survey',
            description: '',
            status: 'Disabled',
            questions: [],
            lastModified: new Date().toISOString(),
        };
        setSelectedSurvey(newSurvey);
        setCurrentView('editor');
    };
    
    const handleEdit = (surveyId: string) => {
        const surveyToEdit = surveys.find(s => s.id === surveyId);
        if (surveyToEdit) {
            setSelectedSurvey(surveyToEdit);
            setCurrentView('editor');
        }
    };
    
    const handleView = (surveyId: string) => {
        const surveyToView = surveys.find(s => s.id === surveyId);
        if (surveyToView) {
            setSelectedSurvey(surveyToView);
            setCurrentView('details');
        }
    };

    const handleSave = (updatedSurvey: Survey) => {
        setSurveys(prev => {
            const exists = prev.some(s => s.id === updatedSurvey.id);
            if (exists) {
                return prev.map(s => s.id === updatedSurvey.id ? { ...updatedSurvey, lastModified: new Date().toISOString() } : s);
            }
            return [...prev, { ...updatedSurvey, lastModified: new Date().toISOString() }];
        });
        setCurrentView('list');
        setSelectedSurvey(null);
        setToast({ message: "Survey saved successfully!", type: 'success' });
    };

    const handleReturnToList = () => {
        setCurrentView('list');
        setSelectedSurvey(null);
    };

    const handleOpenDeleteModal = (surveyId: string) => {
        setDeleteModal({ isOpen: true, surveyId });
    };

    const handleConfirmDelete = () => {
        if (deleteModal.surveyId) {
            setSurveys(prev => prev.filter(s => s.id !== deleteModal.surveyId));
            setToast({ message: "Survey deleted.", type: 'success' });
        }
        setDeleteModal({ isOpen: false, surveyId: null });
        handleReturnToList();
    };

    const handleToggleStatus = (surveyId: string) => {
        const updatedSurveys = surveys.map((s): Survey => {
            if (s.id === surveyId) {
                // By explicitly typing newStatus, we ensure TypeScript doesn't widen the type to a generic string.
                const newStatus: 'Enabled' | 'Disabled' = s.status === 'Enabled' ? 'Disabled' : 'Enabled';
                return { ...s, status: newStatus, lastModified: new Date().toISOString() };
            }
            return s;
        });
        setSurveys(updatedSurveys);
        
        if (selectedSurvey && selectedSurvey.id === surveyId) {
            setSelectedSurvey(updatedSurveys.find(s => s.id === surveyId) || null);
        }

        setToast({ message: "Status updated.", type: 'success' });
    };
    
    const filteredSurveys = surveys.filter(survey =>
        survey.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const renderContent = () => {
        switch (currentView) {
            case 'editor':
                return selectedSurvey && <SurveyEditor survey={selectedSurvey} onSave={handleSave} onCancel={handleReturnToList} />;
            case 'details':
                return selectedSurvey && (
                    <SurveyDetails 
                        survey={selectedSurvey} 
                        onBack={handleReturnToList}
                        onEdit={handleEdit}
                        onDelete={handleOpenDeleteModal}
                        onToggle={handleToggleStatus}
                    />
                );
            case 'list':
            default:
                return (
                    <SurveyList 
                        surveys={filteredSurveys}
                        searchTerm={searchTerm}
                        onSearchChange={setSearchTerm}
                        onCreate={handleCreate}
                        onEdit={handleEdit}
                        onDelete={handleOpenDeleteModal}
                        onToggle={handleToggleStatus}
                        onView={handleView}
                    />
                );
        }
    };

    return (
        <div className="bg-gray-900 text-gray-100 min-h-screen">
            {renderContent()}
            <ConfirmationModal
                isOpen={deleteModal.isOpen}
                onClose={() => setDeleteModal({ isOpen: false, surveyId: null })}
                onConfirm={handleConfirmDelete}
                title="Delete Survey"
                message="Are you sure you want to delete this survey? This action cannot be undone."
            />
            {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}
        </div>
    );
}
