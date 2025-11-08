// src/components/exercises/ExerciseEditor.tsx
'use client';

import React, { useState } from 'react';
import { Exercise } from '@/interfaces/exercise';
import { Image as ImageIcon, UploadCloud } from 'lucide-react';

interface ExerciseEditorProps {
    exercise: Exercise;
    onSave: (exercise: Exercise) => void;
    onCancel: () => void;
}

export const ExerciseEditor: React.FC<ExerciseEditorProps> = ({ exercise, onSave, onCancel }) => {
    const [editedExercise, setEditedExercise] = useState<Exercise>(exercise);

    const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const isNumeric = ['durationMinutes', 'inhaleSeconds', 'holdSeconds', 'exhaleSeconds'].includes(name);
        setEditedExercise(prev => ({ ...prev, [name]: isNumeric ? parseInt(value, 10) || 0 : value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditedExercise(prev => ({ ...prev, imageUrl: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
                <h2 className="text-xl font-bold text-white mb-4">
                    {exercise.id.startsWith('ex-') ? 'Create New' : 'Edit'} Exercise
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column: Details */}
                    <div className="space-y-4">
                        <input type="text" name="name" placeholder="Exercise Name (e.g., Box Breathing)" value={editedExercise.name} onChange={handleInfoChange} className="w-full bg-gray-700 p-2 rounded-md" />
                        <textarea name="description" placeholder="Description" value={editedExercise.description} onChange={handleInfoChange} rows={5} className="w-full bg-gray-700 p-2 rounded-md" />
                         <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Total Duration (minutes)</label>
                            <input type="number" name="durationMinutes" value={editedExercise.durationMinutes} onChange={handleInfoChange} className="w-full bg-gray-700 p-2 rounded-md" />
                        </div>
                    </div>

                    {/* Right Column: Image & Timings */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-1">Exercise Image</label>
                            <div className="w-full h-40 bg-gray-700 rounded-md flex items-center justify-center overflow-hidden relative border-2 border-dashed border-gray-600">
                                {editedExercise.imageUrl ? (
                                    <img src={editedExercise.imageUrl} alt="Exercise preview" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="text-center text-gray-500">
                                        <ImageIcon size={40} className="mx-auto" />
                                        <p>No image</p>
                                    </div>
                                )}
                            </div>
                             <label htmlFor="image-upload" className="w-full mt-2 flex justify-center items-center space-x-2 py-2 px-4 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors cursor-pointer">
                                <UploadCloud size={20} />
                                <span>Upload Image</span>
                            </label>
                            <input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Breathing Pattern (seconds)</label>
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs text-center text-gray-400 mb-1">Inhale</label>
                                    <input type="number" name="inhaleSeconds" value={editedExercise.inhaleSeconds} onChange={handleInfoChange} className="w-full bg-gray-700 p-2 rounded-md text-center" />
                                </div>
                                <div>
                                    <label className="block text-xs text-center text-gray-400 mb-1">Hold</label>
                                    <input type="number" name="holdSeconds" value={editedExercise.holdSeconds} onChange={handleInfoChange} className="w-full bg-gray-700 p-2 rounded-md text-center" />
                                </div>
                                <div>
                                    <label className="block text-xs text-center text-gray-400 mb-1">Exhale</label>
                                    <input type="number" name="exhaleSeconds" value={editedExercise.exhaleSeconds} onChange={handleInfoChange} className="w-full bg-gray-700 p-2 rounded-md text-center" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
                <button onClick={onCancel} className="px-6 py-2 rounded-lg bg-gray-700 text-white font-semibold hover:bg-gray-600">Cancel</button>
                <button onClick={() => onSave(editedExercise)} className="px-6 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700">Save Exercise</button>
            </div>
        </div>
    );
};
