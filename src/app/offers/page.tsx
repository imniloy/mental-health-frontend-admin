// src/app/offers/page.tsx
'use client';

import React, { useState } from 'react';
import { Offer } from '@/interfaces/offer';
import { ConfirmationModal } from '@/components/ui/ConfirmationModal';
import { Toast } from '@/components/ui/Toast';
import { OfferList } from '@/components/offers/OfferList';
import { OfferEditor } from '@/components/offers/OfferEditor';


// --- MOCK DATA (Replace with API calls) ---
const initialOffers: Offer[] = [
  {
    id: 'offer-1',
    title: 'Summer Serenity Sale',
    description: 'Unlock peace of mind this summer with a special discount on our annual plan. Get full access to all features.',
    shortDescription: '50% off annual plan',
    imageUrl: 'https://placehold.co/600x400/818cf8/ffffff?text=Summer+Sale',
    oldPrice: 99.99,
    newPrice: 49.99,
    features: [
        { id: 'f1', text: 'Unlimited access to all content' },
        { id: 'f2', text: 'Advanced mood tracking' },
        { id: 'f3', text: 'Personalized recommendations' },
    ],
    status: 'Active',
    lastModified: new Date().toISOString(),
  },
];

export default function OffersPage() {
    const [offers, setOffers] = useState<Offer[]>(initialOffers);
    const [currentView, setCurrentView] = useState<'list' | 'editor'>('list');
    const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
    const [expireModal, setExpireModal] = useState<{ isOpen: boolean; offerId: string | null }>({ isOpen: false, offerId: null });
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const handleCreate = () => {
        const newOffer: Offer = {
            id: `offer-${Date.now()}`,
            title: '',
            description: '',
            shortDescription: '',
            imageUrl: '',
            oldPrice: 0,
            newPrice: 0,
            features: [],
            status: 'Active',
            lastModified: new Date().toISOString(),
        };
        setSelectedOffer(newOffer);
        setCurrentView('editor');
    };

    const handleEdit = (offerId: string) => {
        const offerToEdit = offers.find(o => o.id === offerId);
        if (offerToEdit) {
            setSelectedOffer(offerToEdit);
            setCurrentView('editor');
        }
    };

    const handleSave = (updatedOffer: Offer) => {
        setOffers(prev => {
            const exists = prev.some(o => o.id === updatedOffer.id);
            if (exists) {
                return prev.map(o => o.id === updatedOffer.id ? { ...updatedOffer, lastModified: new Date().toISOString() } : o);
            }
            return [...prev, updatedOffer];
        });
        setCurrentView('list');
        setToast({ message: "Offer saved successfully!", type: 'success' });
    };

    const handleReturnToList = () => {
        setCurrentView('list');
        setSelectedOffer(null);
    };
    
    const handleOpenExpireModal = (offerId: string) => {
        setExpireModal({ isOpen: true, offerId });
    };

    const handleConfirmExpire = () => {
        if (expireModal.offerId) {
            setOffers(prev => prev.map(o => o.id === expireModal.offerId ? { ...o, status: 'Expired' } : o));
            setToast({ message: "Offer has been expired.", type: 'success' });
        }
        setExpireModal({ isOpen: false, offerId: null });
    };

    return (
        <div className="bg-gray-900 text-gray-100 min-h-screen">
            {currentView === 'list' ? (
                <OfferList
                    offers={offers}
                    onCreate={handleCreate}
                    onEdit={handleEdit}
                    onExpire={handleOpenExpireModal}
                />
            ) : (
                selectedOffer && <OfferEditor
                    offer={selectedOffer}
                    onSave={handleSave}
                    onCancel={handleReturnToList}
                />
            )}
            
            <ConfirmationModal
                isOpen={expireModal.isOpen}
                onClose={() => setExpireModal({ isOpen: false, offerId: null })}
                onConfirm={handleConfirmExpire}
                title="Expire Offer"
                message="Are you sure you want to expire this offer? It will no longer be available."
            />
            {toast && <Toast message={toast.message} type={toast.type} onDismiss={() => setToast(null)} />}
        </div>
    );
}
