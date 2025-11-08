// src/components/offers/OfferCard.tsx
'use client';

import React from 'react';
import { Offer } from '@/interfaces/offer';
import { Edit, ZapOff, CheckCircle } from 'lucide-react';

interface OfferCardProps {
    offer: Offer;
    onEdit: (id: string) => void;
    onExpire: (id: string) => void;
}

export const OfferCard: React.FC<OfferCardProps> = ({ offer, onEdit, onExpire }) => {
    return (
        <div className="bg-gray-800 rounded-lg shadow-lg flex flex-col transition-all hover:shadow-indigo-500/30 hover:-translate-y-1 overflow-hidden">
            <img src={offer.imageUrl || 'https://placehold.co/600x400/1f2937/4b5563?text=No+Image'} alt={offer.title} className="w-full h-40 object-cover"/>
            <div className="p-5 flex-grow flex flex-col">
                <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold text-white pr-4">{offer.title}</h3>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${offer.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-600 text-gray-300'}`}>
                        {offer.status}
                    </span>
                </div>
                <p className="text-sm text-gray-400 mt-1">{offer.shortDescription}</p>
                 <div className="flex items-baseline space-x-2 mt-4">
                    <span className="text-2xl font-bold text-white">${offer.newPrice.toFixed(2)}</span>
                    <span className="text-md line-through text-gray-500">${offer.oldPrice.toFixed(2)}</span>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-700 space-y-2 flex-grow">
                    {offer.features.map(feature => (
                        <div key={feature.id} className="flex items-center text-sm text-gray-300">
                            <CheckCircle size={16} className="text-emerald-400 mr-2 flex-shrink-0" />
                            <span>{feature.text}</span>
                        </div>
                    ))}
                </div>
                 <div className="bg-gray-700/50 -m-5 mt-5 p-3 flex justify-end items-center rounded-b-lg space-x-2">
                    <button onClick={() => onEdit(offer.id)} className="p-2 rounded-md hover:bg-gray-600 text-gray-400 hover:text-white" aria-label="Edit">
                        <Edit size={18} />
                    </button>
                    {offer.status === 'Active' && (
                        <button onClick={() => onExpire(offer.id)} className="p-2 rounded-md hover:bg-gray-600 text-gray-400 hover:text-red-400" aria-label="Expire">
                            <ZapOff size={18} />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
