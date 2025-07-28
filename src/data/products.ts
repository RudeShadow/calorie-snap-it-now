import { Product } from '../types/petsy';

export const featuredProduct: Product = {
  id: 'petsy-pro-remover',
  name: 'Petsy Pro Hair Remover',
  description: 'The ultimate pet hair removal tool that works on all surfaces with revolutionary self-cleaning technology.',
  price: 49.99,
  originalPrice: 79.99,
  images: [
    'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=600&h=400&fit=crop'
  ],
  features: [
    'Works on ALL surfaces: fur, lint, pilling',
    'Self-cleaning technology - no messy disposal',
    'Vet-approved gentle on pet skin',
    'Ergonomic grip for comfort',
    'Reusable and eco-friendly'
  ],
  rating: 4.8,
  reviewCount: 2847,
  inStock: true,
  lowStock: true,
  category: 'tool'
};

export const products: Product[] = [
  featuredProduct,
  {
    id: 'petsy-travel-kit',
    name: 'Petsy Travel Kit',
    description: 'Compact hair removal solution perfect for travel and quick touch-ups.',
    price: 29.99,
    images: [
      'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop'
    ],
    features: [
      'Compact and portable',
      'Travel-friendly size',
      'Same powerful cleaning'
    ],
    rating: 4.6,
    reviewCount: 892,
    inStock: true,
    category: 'tool'
  },
  {
    id: 'replacement-pads',
    name: 'Replacement Cleaning Pads',
    description: 'High-quality replacement pads for your Petsy hair remover.',
    price: 19.99,
    images: [
      'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=300&fit=crop'
    ],
    features: [
      'Pack of 6 replacement pads',
      'Premium materials',
      'Easy to install'
    ],
    rating: 4.7,
    reviewCount: 456,
    inStock: true,
    category: 'accessory'
  }
];