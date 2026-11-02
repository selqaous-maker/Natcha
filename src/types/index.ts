export type BottleColor = 'blanc' | 'bleu' | 'rouge';

export type Gender = 'homme' | 'femme';

export interface Perfume {
  id: string;
  number: string;
  name: string;
  gender: Gender;
  category: string;
  family: 'Boisé' | 'Oriental' | 'Gourmand' | 'Floral' | 'Frais' | 'Épicé' | 'Chypré';
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  description: string;
  descriptionAr: string;
  intensity: number; // 1-5
  sillage: 'Modéré' | 'Prononcé' | 'Intense & Majestueux';
  recommendedBottleColor: BottleColor;
}

export interface BottleVariant {
  id: BottleColor;
  name: string;
  nameAr: string;
  subtitle: string;
  subtitleAr: string;
  image: string;
  colorHex: string;
  accentHex: string;
  description: string;
  descriptionAr: string;
  tags: string[];
}

export interface CartItem {
  id: string;
  perfume: Perfume;
  bottleColor: BottleColor;
  bottleImage: string;
  size: '50ml' | '100ml';
  price: number;
  quantity: number;
  engraving?: string;
}

export interface OrderFormData {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  notes?: string;
  preferredContact: 'whatsapp' | 'call';
}
