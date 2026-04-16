import awsConfig from '../config/aws';
import { getToken } from './auth';

const API_BASE = awsConfig.apiGateway.endpoint;

// Helper for authenticated API calls
const authFetch = async (path, options = {}) => {
  const token = await getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_BASE}${path}`, { ...options, headers });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Request failed' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
};

// Users API
export const registerUser = (userData) => {
  return authFetch('/users/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

export const getUserProfile = () => {
  return authFetch('/users/me');
};

export const updateUserProfile = (profileData) => {
  return authFetch('/users/me', {
    method: 'PUT',
    body: JSON.stringify(profileData),
  });
};

// Products API
export const getProducts = (category) => {
  const query = category ? `?category=${encodeURIComponent(category)}` : '';
  return authFetch(`/products${query}`);
};

export const getProductById = (id) => {
  return authFetch(`/products/${id}`);
};

export const searchProducts = (query) => {
  return authFetch(`/products/search?q=${encodeURIComponent(query)}`);
};

// Orders API
export const createOrder = (orderData) => {
  return authFetch('/orders', {
    method: 'POST',
    body: JSON.stringify(orderData),
  });
};

export const getOrders = () => {
  return authFetch('/orders');
};

export const getOrderById = (id) => {
  return authFetch(`/orders/${id}`);
};

// Payments API (Stripe)
export const createPaymentIntent = (amount, currency = 'usd') => {
  return authFetch('/payments/create-intent', {
    method: 'POST',
    body: JSON.stringify({ amount, currency }),
  });
};

// Demo data for development (used when API is not connected)
export const DEMO_PRODUCTS = [
  {
    id: '1',
    name: 'Wireless Noise-Cancelling Headphones',
    price: 299.99,
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
    description: 'Premium wireless headphones with active noise cancellation, 30-hour battery life, and crystal-clear sound quality. Perfect for music lovers and professionals.',
    rating: 4.8,
    reviews: 1247,
    inStock: true,
    brand: 'SoundMax',
  },
  {
    id: '2',
    name: '4K Ultra HD Smart TV 55"',
    price: 699.99,
    category: 'TVs',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400',
    description: '55-inch 4K UHD Smart TV with HDR10+, built-in streaming apps, voice control, and Dolby Atmos sound. Transform your living room into a cinema.',
    rating: 4.6,
    reviews: 892,
    inStock: true,
    brand: 'VisionPro',
  },
  {
    id: '3',
    name: 'Professional Mechanical Keyboard',
    price: 159.99,
    category: 'Computers',
    image: 'https://images.unsplash.com/photo-1541140532154-b024d1b23fad?w=400',
    description: 'RGB mechanical keyboard with Cherry MX switches, aluminum frame, programmable keys, and USB-C connectivity. Built for gamers and developers.',
    rating: 4.7,
    reviews: 2103,
    inStock: true,
    brand: 'KeyCraft',
  },
  {
    id: '4',
    name: 'Smartphone Pro Max 256GB',
    price: 1099.99,
    category: 'Phones',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
    description: 'Flagship smartphone with 6.7" AMOLED display, triple camera system, 5G connectivity, and all-day battery life. The ultimate mobile experience.',
    rating: 4.9,
    reviews: 3456,
    inStock: true,
    brand: 'TechNova',
  },
  {
    id: '5',
    name: 'Wireless Gaming Mouse',
    price: 79.99,
    category: 'Computers',
    image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=400',
    description: 'Ultra-lightweight wireless gaming mouse with 25K DPI sensor, 70-hour battery, and customizable RGB lighting. Dominate every game.',
    rating: 4.5,
    reviews: 1876,
    inStock: true,
    brand: 'GameForce',
  },
  {
    id: '6',
    name: 'Portable Bluetooth Speaker',
    price: 129.99,
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400',
    description: 'Waterproof portable speaker with 360° sound, 20-hour battery, and deep bass. Take your music anywhere — beach, pool, or trail.',
    rating: 4.4,
    reviews: 967,
    inStock: true,
    brand: 'SoundMax',
  },
  {
    id: '7',
    name: 'Laptop Ultra Slim 14"',
    price: 1299.99,
    category: 'Computers',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
    description: 'Ultra-thin laptop with Intel i7, 16GB RAM, 512GB SSD, and stunning 2K display. Weighs just 2.8 lbs — power meets portability.',
    rating: 4.7,
    reviews: 654,
    inStock: true,
    brand: 'TechNova',
  },
  {
    id: '8',
    name: 'Smart Watch Series X',
    price: 349.99,
    category: 'Wearables',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    description: 'Advanced smartwatch with health monitoring, GPS, always-on display, and 7-day battery life. Your fitness companion on your wrist.',
    rating: 4.6,
    reviews: 2234,
    inStock: true,
    brand: 'FitTech',
  },
  {
    id: '9',
    name: 'Wireless Earbuds Pro',
    price: 199.99,
    category: 'Audio',
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12f032f55?w=400',
    description: 'True wireless earbuds with ANC, spatial audio, and 8-hour battery. IPX5 water resistant with wireless charging case.',
    rating: 4.5,
    reviews: 1543,
    inStock: true,
    brand: 'SoundMax',
  },
  {
    id: '10',
    name: '27" Gaming Monitor 165Hz',
    price: 449.99,
    category: 'Computers',
    image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400',
    description: '27-inch QHD gaming monitor with 165Hz refresh rate, 1ms response time, and G-Sync compatibility. See every frame, win every fight.',
    rating: 4.8,
    reviews: 789,
    inStock: true,
    brand: 'VisionPro',
  },
  {
    id: '11',
    name: 'Robot Vacuum Cleaner',
    price: 399.99,
    category: 'Smart Home',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400',
    description: 'AI-powered robot vacuum with LiDAR navigation, auto-empty dock, and app control. Keeps your home spotless while you relax.',
    rating: 4.3,
    reviews: 1122,
    inStock: true,
    brand: 'HomeBot',
  },
  {
    id: '12',
    name: 'Digital Camera Mirrorless',
    price: 1499.99,
    category: 'Cameras',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400',
    description: 'Full-frame mirrorless camera with 45MP sensor, 8K video, and in-body stabilization. Capture every moment in stunning detail.',
    rating: 4.9,
    reviews: 445,
    inStock: true,
    brand: 'OptiLens',
  },
];
