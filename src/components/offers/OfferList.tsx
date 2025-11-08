
// src/components/offers/OfferList.tsx
'use client';

import React from 'react';
import { Offer } from '@/interfaces/offer';
import { OfferCard } from './OfferCard';
import { Plus } from 'lucide-react';

interface OfferListProps {
    offers: Offer[];
    onCreate: () => void;
    onEdit: (id: string) => void;
    onExpire: (id: string) => void;
}

export const OfferList: React.FC<OfferListProps> = ({ offers, onCreate, onEdit, onExpire }) => {
    return (
        <div className="p-4 sm:p-6 md:p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-white">Offer Management</h1>
                <button onClick={onCreate} className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors">
                    <Plus size={20} />
                    <span>Create Offer</span>
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {offers.map(offer => (
                    <OfferCard
                        key={offer.id}
                        offer={offer}
                        onEdit={onEdit}
                        onExpire={onExpire}
                    />
                ))}
            </div>
        </div>
    );
};
