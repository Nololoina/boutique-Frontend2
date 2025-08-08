export interface Boutique {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  rating: number;
  isVerified: boolean;
  productsCount: number;
  location: string;
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}