export interface Property {
  id: number;
  address: string;
  city: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  lotSize?: string;
  imageUrl?: string;
}

export interface LeadFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address?: string;
  intent: 'buy' | 'sell';
}
