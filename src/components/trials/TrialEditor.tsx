// src/components/trials/TrialEditor.tsx
'use client';

import React, { useState } from 'react';
import { TrialPlan, TrialFeature } from '@/interfaces/trial';
import { Plus, X } from 'lucide-react';

interface TrialEditorProps {
    trial: TrialPlan;
    onSave: (trial: TrialPlan) => void;
    onCancel: () => void;
}

export const TrialEditor: React.FC<TrialEditorProps> = ({ trial, onSave, onCancel }) => {
    const [editedTrial, setEditedTrial] = useState<TrialPlan>(trial);

    const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedTrial(prev => ({ ...prev, [name]: name === 'durationDays' ? parseInt(value, 10) || 0 : value }));
    };

    const handleFeatureChange = (index: number, text: string) => {
        const newFeatures = [...editedTrial.features];
        newFeatures[index] = { ...newFeatures[index], text };
        setEditedTrial(prev => ({ ...prev, features: newFeatures }));
    };

    const addFeature = () => {
        const newFeature: TrialFeature = { id: `f-${Date.now()}`, text: '' };
        setEditedTrial(prev => ({ ...prev, features: [...prev.features, newFeature] }));
    };

    const removeFeature = (index: number) => {
        const newFeatures = editedTrial.features.filter((_, i) => i !== index);
        setEditedTrial(prev => ({ ...prev, features: newFeatures }));
    };

    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl mb-8">
                <h2 className="text-xl font-bold text-white mb-4">
                    {trial.id.startsWith('trial-') ? 'Create New' : 'Edit'} Trial Plan
                </h2>
                <div className="space-y-4">
                    <input type="text" name="title" placeholder="Plan Title (e.g., 7 Day Pro Access)" value={editedTrial.title} onChange={handleInfoChange} className="w-full bg-gray-700 border-gray-600 text-white rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500" />
                    <input type="number" name="durationDays" placeholder="Duration in Days" value={editedTrial.durationDays} onChange={handleInfoChange} className="w-full bg-gray-700 border-gray-600 text-white rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500" />
                    <textarea name="description" placeholder="Description" value={editedTrial.description} onChange={handleInfoChange} rows={3} className="w-full bg-gray-700 border-gray-600 text-white rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500" />
                </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
                <h2 className="text-xl font-bold text-white mb-4">Features</h2>
                <div className="space-y-2 mb-4">
                    {editedTrial.features.map((feature, index) => (
                        <div key={feature.id} className="flex items-center space-x-2">
                            <input type="text" placeholder="Feature description" value={feature.text} onChange={(e) => handleFeatureChange(index, e.target.value)} className="flex-grow bg-gray-700 border-gray-600 text-white rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500" />
                            <button onClick={() => removeFeature(index)} className="p-2 rounded-md hover:bg-red-500/20 text-gray-400 hover:text-red-400"><X size={16} /></button>
                        </div>
                    ))}
                </div>
                <button onClick={addFeature} className="text-sm text-emerald-400 hover:text-emerald-300 font-semibold">+ Add Feature</button>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
                <button onClick={onCancel} className="px-6 py-2 rounded-lg bg-gray-700 text-white font-semibold hover:bg-gray-600">Cancel</button>
                <button onClick={() => onSave(editedTrial)} className="px-6 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700">Save Plan</button>
            </div>
        </div>
    );
};
