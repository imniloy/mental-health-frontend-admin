// src/components/surveys/SurveyEditor.tsx
'use client';

import React, { useState } from 'react';
import { Survey, Question, AnswerOption } from '@/interfaces/survey';
import { Plus, Trash2, Check, X } from 'lucide-react';

// --- Sub-component for editing a single question ---
interface QuestionEditorProps {
    question: Question;
    index: number;
    onUpdate: (index: number, updatedQuestion: Question) => void;
    onDelete: (index: number) => void;
}

const QuestionEditor: React.FC<QuestionEditorProps> = ({ question, index, onUpdate, onDelete }) => {
    const [localQuestion, setLocalQuestion] = useState(question);

    const handleQuestionChange = (field: keyof Question, value: any) => {
        const updated = { ...localQuestion, [field]: value };
        setLocalQuestion(updated);
        onUpdate(index, updated); // Update parent state on every change
    };

    const handleOptionChange = (optionIndex: number, text: string) => {
        const newOptions = [...localQuestion.options];
        newOptions[optionIndex] = { ...newOptions[optionIndex], text };
        handleQuestionChange('options', newOptions);
    };

    const addOption = () => {
        const newOption: AnswerOption = { id: `o-${Date.now()}`, text: '' };
        handleQuestionChange('options', [...localQuestion.options, newOption]);
    };

    const removeOption = (optionIndex: number) => {
        const newOptions = localQuestion.options.filter((_, i) => i !== optionIndex);
        handleQuestionChange('options', newOptions);
    };

    return (
        <div className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-md font-semibold text-white">Question {index + 1}</h3>
                <button onClick={() => onDelete(index)} className="p-2 rounded-md hover:bg-red-500/20 text-gray-400 hover:text-red-400" aria-label="Delete Question">
                    <Trash2 size={18} />
                </button>
            </div>

            <div className="space-y-4">
                {/* Question Title */}
                <input
                    type="text"
                    placeholder="Enter your question here"
                    value={localQuestion.title}
                    onChange={(e) => handleQuestionChange('title', e.target.value)}
                    className="w-full bg-gray-700 border-gray-600 text-white rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />

                {/* Answer Options */}
                <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Answer Options</label>
                    {localQuestion.options.map((option, optIndex) => (
                        <div key={option.id} className="flex items-center space-x-2">
                            <input
                                type="text"
                                placeholder={`Option ${optIndex + 1}`}
                                value={option.text}
                                onChange={(e) => handleOptionChange(optIndex, e.target.value)}
                                className="flex-grow bg-gray-600 border-gray-500 text-white rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                            />
                            <button onClick={() => removeOption(optIndex)} className="p-2 rounded-md hover:bg-red-500/20 text-gray-400 hover:text-red-400">
                                <X size={16} />
                            </button>
                        </div>
                    ))}
                    <button onClick={addOption} className="text-sm text-emerald-400 hover:text-emerald-300 font-semibold">+ Add Option</button>
                </div>

                {/* Multiple Selection Toggle */}
                <div className="flex items-center justify-between pt-2">
                    <span className="text-sm font-medium text-gray-300">Allow multiple selections?</span>
                    <label htmlFor={`multi-select-${question.id}`} className="flex items-center cursor-pointer">
                        <div className="relative">
                            <input
                                id={`multi-select-${question.id}`}
                                type="checkbox"
                                className="sr-only"
                                checked={localQuestion.isMultipleChoice}
                                onChange={(e) => handleQuestionChange('isMultipleChoice', e.target.checked)}
                            />
                            <div className={`block w-10 h-6 rounded-full transition-colors ${localQuestion.isMultipleChoice ? 'bg-emerald-500' : 'bg-gray-600'}`}></div>
                            <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform ${localQuestion.isMultipleChoice ? 'translate-x-full' : ''}`}></div>
                        </div>
                    </label>
                </div>
            </div>
        </div>
    );
};


// --- Main Survey Editor Component ---
export const SurveyEditor: React.FC<{ survey: Survey; onSave: (survey: Survey) => void; onCancel: () => void; }> = ({ survey, onSave, onCancel }) => {
    const [editedSurvey, setEditedSurvey] = useState<Survey>(survey);

    const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedSurvey(prev => ({ ...prev, [name]: value }));
    };

    const handleAddQuestion = () => {
        const newQuestion: Question = {
            id: `q-${Date.now()}`,
            title: '',
            isMultipleChoice: false,
            isRequired: false,
            options: [{ id: `o-${Date.now()}`, text: '' }],
        };
        setEditedSurvey(prev => ({
            ...prev,
            questions: [...prev.questions, newQuestion]
        }));
    };

    const updateQuestion = (index: number, updatedQuestion: Question) => {
        const newQuestions = [...editedSurvey.questions];
        newQuestions[index] = updatedQuestion;
        setEditedSurvey(prev => ({ ...prev, questions: newQuestions }));
    };

    const deleteQuestion = (index: number) => {
        const newQuestions = editedSurvey.questions.filter((_, i) => i !== index);
        setEditedSurvey(prev => ({ ...prev, questions: newQuestions }));
    };

    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
            {/* Survey Details Section */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl mb-8">
                <h2 className="text-xl font-bold text-white mb-4">Survey Details</h2>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-1">Title</label>
                        <input type="text" name="title" id="title" value={editedSurvey.title} onChange={handleInfoChange} className="w-full bg-gray-700 border-gray-600 text-white rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500" required />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                        <textarea name="description" id="description" value={editedSurvey.description} onChange={handleInfoChange} rows={3} className="w-full bg-gray-700 border-gray-600 text-white rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500" />
                    </div>
                </div>
            </div>

            {/* Questions Section */}
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
                <h2 className="text-xl font-bold text-white mb-4">Questions ({editedSurvey.questions.length})</h2>
                <div className="space-y-6 mb-6">
                    {editedSurvey.questions.map((q, index) => (
                        <QuestionEditor
                            key={q.id}
                            index={index}
                            question={q}
                            onUpdate={updateQuestion}
                            onDelete={deleteQuestion}
                        />
                    ))}
                </div>
                <button onClick={handleAddQuestion} className="w-full flex justify-center items-center space-x-2 py-3 rounded-lg border-2 border-dashed border-gray-600 text-gray-400 hover:bg-gray-700 hover:border-gray-500 transition-colors">
                    <Plus size={20} />
                    <span>Add More Questions</span>
                </button>
            </div>

            {/* Save/Cancel Actions */}
            <div className="mt-8 flex justify-end space-x-4">
                <button onClick={onCancel} className="px-6 py-2 rounded-lg bg-gray-700 text-white font-semibold hover:bg-gray-600">
                    Cancel
                </button>
                <button onClick={() => onSave(editedSurvey)} className="px-6 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700">
                    Save Survey
                </button>
            </div>
        </div>
    );
};
