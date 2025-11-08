// src/components/programs/ProgramEditor.tsx
'use client';

import React, { useState } from 'react';
import { Program, Season, Day, Music } from '@/interfaces/program';
import { Plus, Trash2, Music as MusicIcon, Image as ImageIcon, UploadCloud, ArrowLeft } from 'lucide-react';
import { MusicSelectionModal } from './MusicSelectionModal';

interface ProgramEditorProps {
    program: Program;
    onSave: (program: Program) => void;
    onCancel: () => void;
}

export const ProgramEditor: React.FC<ProgramEditorProps> = ({ program, onSave, onCancel }) => {
    const [editedProgram, setEditedProgram] = useState<Program>(program);
    const [isMusicModalOpen, setIsMusicModalOpen] = useState(false);
    const [editingMusicLocation, setEditingMusicLocation] = useState<{ seasonIndex: number; dayIndex: number } | null>(null);

    const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setEditedProgram(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleTypeChange = (type: 'Single' | 'Course') => {
        setEditedProgram(prev => ({ ...prev, type }));
    };

    // --- Season and Day Handlers ---
    const addSeason = () => {
        const newSeason: Season = { 
            id: `s-${Date.now()}`, 
            title: `Season ${ (editedProgram.courseDetails?.seasons.length || 0) + 1}`,
            imageUrl: '', 
            days: [] 
        };
        const courseDetails = editedProgram.courseDetails || { seasons: [] };
        setEditedProgram(prev => ({ 
            ...prev, 
            courseDetails: { ...courseDetails, seasons: [...courseDetails.seasons, newSeason] } 
        }));
    };

    const updateSeason = (seasonIndex: number, updatedValues: Partial<Season>) => {
        const newSeasons = [...(editedProgram.courseDetails?.seasons || [])];
        newSeasons[seasonIndex] = { ...newSeasons[seasonIndex], ...updatedValues };
        setEditedProgram(prev => ({ ...prev, courseDetails: { ...prev.courseDetails, seasons: newSeasons } as any }));
    };

    const handleSeasonImageChange = (seasonIndex: number, e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                updateSeason(seasonIndex, { imageUrl: reader.result as string });
            };
            reader.readAsDataURL(file);
        }
    };
    
    const removeSeason = (seasonIndex: number) => {
        const newSeasons = (editedProgram.courseDetails?.seasons || []).filter((_, i) => i !== seasonIndex);
        setEditedProgram(prev => ({ ...prev, courseDetails: { ...prev.courseDetails, seasons: newSeasons } as any }));
    };

    const addDay = (seasonIndex: number) => {
        const newDay: Day = { id: `d-${Date.now()}`, title: '', music: null };
        const newSeasons = [...(editedProgram.courseDetails?.seasons || [])];
        newSeasons[seasonIndex].days.push(newDay);
        setEditedProgram(prev => ({ ...prev, courseDetails: { ...prev.courseDetails, seasons: newSeasons } as any }));
    };
    
    const updateDayTitle = (seasonIndex: number, dayIndex: number, title: string) => {
        const newSeasons = [...(editedProgram.courseDetails?.seasons || [])];
        newSeasons[seasonIndex].days[dayIndex].title = title;
        setEditedProgram(prev => ({ ...prev, courseDetails: { ...prev.courseDetails, seasons: newSeasons } as any }));
    };

    const removeDay = (seasonIndex: number, dayIndex: number) => {
        const newSeasons = [...(editedProgram.courseDetails?.seasons || [])];
        newSeasons[seasonIndex].days = newSeasons[seasonIndex].days.filter((_, i) => i !== dayIndex);
        setEditedProgram(prev => ({ ...prev, courseDetails: { ...prev.courseDetails, seasons: newSeasons } as any }));
    };
    
    const handleSelectMusic = (music: Music) => {
        if (editedProgram.type === 'Single') {
            setEditedProgram(prev => ({ ...prev, singleSessionMusic: music }));
        } else if (editingMusicLocation) {
            const { seasonIndex, dayIndex } = editingMusicLocation;
            const newSeasons = [...(editedProgram.courseDetails?.seasons || [])];
            newSeasons[seasonIndex].days[dayIndex].music = music;
            setEditedProgram(prev => ({ ...prev, courseDetails: { ...prev.courseDetails, seasons: newSeasons } as any }));
        }
        setIsMusicModalOpen(false);
        setEditingMusicLocation(null);
    };

    return (
        <>
            <div className="p-4 sm:p-6 md:p-8 w-full">
                {/* Header */}
                 <div className="flex justify-between items-center mb-6">
                    <div>
                        <button onClick={onCancel} className="flex items-center space-x-2 text-sm text-gray-400 hover:text-white">
                            <ArrowLeft size={16} />
                            <span>Back to Programs</span>
                        </button>
                        <h1 className="text-3xl font-bold text-white mt-1">
                            {program.id.startsWith('prog-') && !program.title ? 'Create New Program' : `Editing: ${editedProgram.title || 'Untitled Program'}`}
                        </h1>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button onClick={onCancel} className="px-6 py-2 rounded-lg bg-gray-700 text-white font-semibold hover:bg-gray-600 transition-colors">Cancel</button>
                        <button onClick={() => onSave(editedProgram)} className="px-6 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors">Save Program</button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column: Program Details */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
                            <h2 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">Program Details</h2>
                            <div className="space-y-4">
                                <input type="text" name="title" placeholder="Program Title" value={editedProgram.title} onChange={handleInfoChange} className="w-full bg-gray-700 p-2 rounded-md" />
                                <textarea name="description" placeholder="Description" value={editedProgram.description} onChange={handleInfoChange} rows={4} className="w-full bg-gray-700 p-2 rounded-md" />
                            </div>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
                            <h2 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">Program Type</h2>
                            <div className="flex rounded-md bg-gray-700 p-1">
                                <button onClick={() => handleTypeChange('Single')} className={`w-1/2 py-2 rounded ${editedProgram.type === 'Single' ? 'bg-indigo-600 text-white shadow' : 'text-gray-300'}`}>Single Session</button>
                                <button onClick={() => handleTypeChange('Course')} className={`w-1/2 py-2 rounded ${editedProgram.type === 'Course' ? 'bg-indigo-600 text-white shadow' : 'text-gray-300'}`}>Course</button>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Content */}
                    <div className="lg:col-span-2">
                        {editedProgram.type === 'Single' ? (
                            <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
                                <h2 className="text-lg font-semibold text-white mb-4">Session Music</h2>
                                <button onClick={() => setIsMusicModalOpen(true)} className="w-full flex justify-between items-center p-3 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors">
                                    <span className={editedProgram.singleSessionMusic ? 'text-white' : 'text-gray-400'}>{editedProgram.singleSessionMusic?.name || 'Select Music'}</span>
                                    <MusicIcon size={20} />
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <h2 className="text-2xl font-bold text-white">Course Content</h2>
                                {(editedProgram.courseDetails?.seasons || []).map((season, seasonIndex) => (
                                    <div key={season.id} className="bg-gray-800 p-6 rounded-lg shadow-xl border border-gray-700">
                                        <div className="flex justify-between items-center mb-4">
                                            <input type="text" value={season.title} onChange={(e) => updateSeason(seasonIndex, { title: e.target.value })} className="text-xl font-bold text-white bg-transparent w-full" />
                                            <button onClick={() => removeSeason(seasonIndex)} className="p-1 text-red-400 hover:bg-red-500/10 rounded-full"><Trash2 size={18}/></button>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="md:col-span-1">
                                                <label className="block text-sm font-medium text-gray-300 mb-1">Season Image</label>
                                                <div className="aspect-[9/16] bg-gray-700 rounded-lg flex items-center justify-center overflow-hidden relative border-2 border-dashed border-gray-600">
                                                    {season.imageUrl ? <img src={season.imageUrl} alt="Season preview" className="w-full h-full object-cover" /> : <div className="text-center text-gray-500"><ImageIcon size={48} className="mx-auto" /><p className="text-sm mt-2">No image</p></div>}
                                                </div>
                                                <label htmlFor={`season-image-upload-${season.id}`} className="w-full mt-2 flex justify-center items-center space-x-2 py-2 px-4 rounded-lg bg-gray-600 text-white font-semibold hover:bg-gray-500 transition-colors cursor-pointer"><UploadCloud size={18} /><span>Upload</span></label>
                                                <input id={`season-image-upload-${season.id}`} type="file" accept="image/*" onChange={(e) => handleSeasonImageChange(seasonIndex, e)} className="hidden" />
                                            </div>
                                            <div className="md:col-span-2 space-y-4">
                                                {season.days.map((day, dayIndex) => (
                                                    <div key={day.id} className="bg-gray-700/50 p-3 rounded-lg">
                                                        <div className="flex justify-between items-center mb-2">
                                                            <input type="text" placeholder={`Day ${dayIndex + 1} Title`} value={day.title} onChange={(e) => updateDayTitle(seasonIndex, dayIndex, e.target.value)} className="bg-transparent font-semibold text-white flex-grow" />
                                                            <button onClick={() => removeDay(seasonIndex, dayIndex)} className="p-1 text-red-400"><Trash2 size={16}/></button>
                                                        </div>
                                                        <button onClick={() => { setEditingMusicLocation({ seasonIndex, dayIndex }); setIsMusicModalOpen(true); }} className="w-full flex justify-between items-center p-2 bg-gray-600 rounded-md">
                                                            <span className={day.music ? 'text-white' : 'text-gray-400'}>{day.music?.name || 'Select Music'}</span>
                                                            <MusicIcon size={18} />
                                                        </button>
                                                    </div>
                                                ))}
                                                <button onClick={() => addDay(seasonIndex)} className="w-full flex justify-center items-center space-x-2 py-2 rounded-lg border-2 border-dashed border-gray-600 text-gray-400 hover:bg-gray-700 hover:border-gray-500"><Plus size={18} /><span>Add Day</span></button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                 <button onClick={addSeason} className="w-full flex justify-center items-center space-x-2 py-3 rounded-lg bg-indigo-600/20 text-indigo-300 font-semibold hover:bg-indigo-600/40">
                                    <Plus size={20} /><span>Add Season</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            
            <MusicSelectionModal isOpen={isMusicModalOpen} onClose={() => setIsMusicModalOpen(false)} onSelectMusic={handleSelectMusic} />
        </>
    );
};
