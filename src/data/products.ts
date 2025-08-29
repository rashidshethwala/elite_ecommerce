import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'MacBook Pro M3',
    price: 1999,
    image: 'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    description: 'Latest MacBook Pro with M3 chip, 14-inch display, and incredible performance.',
    rating: 4.8,
    reviews: 124,
    inStock: true,
    tags: ['laptop', 'apple', 'professional'],
    featured: true
  },
  {
    id: '2',
    name: 'iPhone 15 Pro',
    price: 999,
    image: 'https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    description: 'The most advanced iPhone with titanium design and A17 Pro chip.',
    rating: 4.9,
    reviews: 89,
    inStock: true,
    tags: ['smartphone', 'apple', 'camera'],
    featured: true
  },
  {
    id: '3',
    name: 'Sony WH-1000XM5',
    price: 299,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Audio',
    description: 'Premium noise canceling headphones with exceptional sound quality.',
    rating: 4.7,
    reviews: 156,
    inStock: true,
    tags: ['headphones', 'wireless', 'noise-canceling'],
    featured: false
  },
  {
    id: '4',
    name: 'Nike Air Max 270',
    price: 150,
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Fashion',
    description: 'Comfortable running shoes with maximum cushioning and style.',
    rating: 4.5,
    reviews: 203,
    inStock: true,
    tags: ['shoes', 'running', 'comfort'],
    featured: true
  },
  {
    id: '5',
    name: 'Canon EOS R5',
    price: 3499,
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Photography',
    description: 'Professional mirrorless camera with 45MP sensor and 8K video.',
    rating: 4.9,
    reviews: 67,
    inStock: false,
    tags: ['camera', 'professional', '8k'],
    featured: false
  },
  {
    id: '6',
    name: 'Levi\'s 501 Jeans',
    price: 89,
    image: 'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Fashion',
    description: 'Classic straight-fit jeans with authentic vintage styling.',
    rating: 4.4,
    reviews: 178,
    inStock: true,
    tags: ['jeans', 'classic', 'denim'],
    featured: false
  },
  {
    id: '7',
    name: 'iPad Air M2',
    price: 599,
    image: 'https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    description: 'Powerful tablet with M2 chip and stunning Liquid Retina display.',
    rating: 4.6,
    reviews: 142,
    inStock: true,
    tags: ['tablet', 'apple', 'creative'],
    featured: true
  },
  {
    id: '8',
    name: 'Adidas Ultraboost 22',
    price: 180,
    image: 'https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Fashion',
    description: 'Energy-returning running shoes for ultimate performance.',
    rating: 4.6,
    reviews: 234,
    inStock: true,
    tags: ['shoes', 'running', 'performance'],
    featured: false
  },
  {
    id: '9',
    name: 'Samsung 65" OLED TV',
    price: 1799,
    image: 'https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Electronics',
    description: '65-inch OLED TV with 4K resolution and smart features.',
    rating: 4.7,
    reviews: 98,
    inStock: true,
    tags: ['tv', 'oled', '4k'],
    featured: false
  },
  {
    id: '10',
    name: 'Dyson V15 Detect',
    price: 749,
    image: 'https://images.pexels.com/photos/4239037/pexels-photo-4239037.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Home',
    description: 'Intelligent cordless vacuum with laser detection technology.',
    rating: 4.8,
    reviews: 167,
    inStock: true,
    tags: ['vacuum', 'cordless', 'smart'],
    featured: false
  },
  {
    id: '11',
    name: 'Tesla Model Y Wheel',
    price: 2500,
    image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Automotive',
    description: 'Premium 21-inch wheel set for Tesla Model Y.',
    rating: 4.5,
    reviews: 45,
    inStock: false,
    tags: ['wheels', 'tesla', 'automotive'],
    featured: false
  },
  {
    id: '12',
    name: 'Rolex Submariner',
    price: 8100,
    image: 'https://images.pexels.com/photos/277319/pexels-photo-277319.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Luxury',
    description: 'Iconic diving watch with exceptional craftsmanship.',
    rating: 4.9,
    reviews: 23,
    inStock: true,
    tags: ['watch', 'luxury', 'diving'],
    featured: false
  }
];

export const categories = [
  'All',
  'Electronics',
  'Fashion',
  'Audio',
  'Photography',
  'Home',
  'Automotive',
  'Luxury'
];

export const sortOptions: SortOption[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' },
  { value: 'rating', label: 'Rating: High to Low' },
  { value: 'name', label: 'Name: A to Z' }
];