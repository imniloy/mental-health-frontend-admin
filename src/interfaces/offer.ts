// src/interfaces/offer.ts

export interface OfferFeature {
  id: string;
  text: string;
}

export interface Offer {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  oldPrice: number;
  newPrice: number;
  features: OfferFeature[];
  status: 'Active' | 'Expired';
  lastModified: string;
}
