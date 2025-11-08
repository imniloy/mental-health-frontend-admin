// src/components/offers/OfferEditor.tsx
'use client';

import React, { useState } from 'react';
import { Offer, OfferFeature } from '@/interfaces/offer';
import { Plus, X, Image as ImageIcon, UploadCloud } from 'lucide-react';

interface OfferEditorProps {
    offer: Offer;
    onSave: (offer: Offer) => void;
    onCancel: () => void;
}

export const OfferEditor: React.FC<OfferEditorProps> = ({ offer, onSave, onCancel }) => {
    const [editedOffer, setEditedOffer] = useState<Offer>(offer);

    const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const isNumeric = ['oldPrice', 'newPrice'].includes(name);
        setEditedOffer(prev => ({ ...prev, [name]: isNumeric ? parseFloat(value) || 0 : value }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditedOffer(prev => ({ ...prev, imageUrl: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleFeatureChange = (index: number, text: string) => {
        const newFeatures = [...editedOffer.features];
        newFeatures[index] = { ...newFeatures[index], text };
        setEditedOffer(prev => ({ ...prev, features: newFeatures }));
    };

    const addFeature = () => {
        const newFeature: OfferFeature = { id: `f-${Date.now()}`, text: '' };
        setEditedOffer(prev => ({ ...prev, features: [...prev.features, newFeature] }));
    };

    const removeFeature = (index: number) => {
        const newFeatures = editedOffer.features.filter((_, i) => i !== index);
        setEditedOffer(prev => ({ ...prev, features: newFeatures }));
    };

    return (
        <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
            <div className="bg-gray-800 p-6 rounded-lg shadow-xl mb-8">
                <h2 className="text-xl font-bold text-white mb-4">{offer.id.startsWith('offer-') ? 'Create New' : 'Edit'} Offer</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column: Form Fields */}
                    <div className="space-y-4">
                        <input type="text" name="title" placeholder="Offer Title" value={editedOffer.title} onChange={handleInfoChange} className="w-full bg-gray-700 p-2 rounded-md" />
                        <input type="text" name="shortDescription" placeholder="Short Description (e.g., 50% off)" value={editedOffer.shortDescription} onChange={handleInfoChange} className="w-full bg-gray-700 p-2 rounded-md" />
                        <textarea name="description" placeholder="Full Description" value={editedOffer.description} onChange={handleInfoChange} rows={4} className="w-full bg-gray-700 p-2 rounded-md" />
                        <div className="flex gap-4">
                            <input type="number" name="oldPrice" placeholder="Old Price" value={editedOffer.oldPrice} onChange={handleInfoChange} className="w-full bg-gray-700 p-2 rounded-md" />
                            <input type="number" name="newPrice" placeholder="New Price" value={editedOffer.newPrice} onChange={handleInfoChange} className="w-full bg-gray-700 p-2 rounded-md" />
                        </div>
                    </div>
                    {/* Right Column: Image Upload and Preview */}
                    <div className="space-y-4">
                        <label className="block text-sm font-medium text-gray-300">Offer Image</label>
                        <div className="w-full h-48 bg-gray-700 rounded-md flex items-center justify-center overflow-hidden relative border-2 border-dashed border-gray-600">
                            {editedOffer.imageUrl ? (
                                <img src={editedOffer.imageUrl} alt="Offer preview" className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-center text-gray-500">
                                    <ImageIcon size={48} className="mx-auto" />
                                    <p>No image selected</p>
                                </div>
                            )}
                        </div>
                        <label htmlFor="image-upload" className="w-full flex justify-center items-center space-x-2 py-2 px-4 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors cursor-pointer">
                            <UploadCloud size={20} />
                            <span>Upload Image</span>
                        </label>
                        <input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                    </div>
                </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-lg shadow-xl">
                <h2 className="text-xl font-bold text-white mb-4">Features</h2>
                <div className="space-y-2 mb-4">
                    {editedOffer.features.map((feature, index) => (
                        <div key={feature.id} className="flex items-center space-x-2">
                            <input type="text" placeholder="Feature description" value={feature.text} onChange={(e) => handleFeatureChange(index, e.target.value)} className="flex-grow bg-gray-700 p-2 rounded-md" />
                            <button onClick={() => removeFeature(index)} className="p-2 rounded-md hover:bg-red-500/20 text-red-400"><X size={16} /></button>
                        </div>
                    ))}
                </div>
                <button onClick={addFeature} className="text-sm text-emerald-400 hover:text-emerald-300 font-semibold">+ Add Feature</button>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
                <button onClick={onCancel} className="px-6 py-2 rounded-lg bg-gray-700 text-white font-semibold hover:bg-gray-600">Cancel</button>
                <button onClick={() => onSave(editedOffer)} className="px-6 py-2 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700">Save Offer</button>
            </div>
        </div>
    );
};
