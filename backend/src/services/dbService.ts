import { Product, Tenant, User, Order } from '../../../shared/types';

// --- MOCK DATA ---
// This data simulates what would be stored in a real database.

const tenants: Tenant[] = [
    {
        id: 'tech-gear',
        name: 'TechGear',
        logoUrl: 'https://placehold.co/150x150/0ea5e9/white?text=TG',
        theme: {
            primaryColor: 'bg-slate-800',
            secondaryColor: 'bg-slate-700',
            accentColor: 'bg-cyan-500',
            textColor: 'text-white',
            backgroundColor: 'bg-slate-900',
        },
    },
    {
        id: 'fashion-hub',
        name: 'FashionHub',
        logoUrl: 'https://placehold.co/150x150/ec4899/white?text=FH',
        theme: {
            primaryColor: 'bg-pink-500',
            secondaryColor: 'bg-pink-400',
            accentColor: 'bg-purple-500',
            textColor: 'text-white',
            backgroundColor: 'bg-gray-100',
        },
    },
];

const products: Product[] = [
    // TechGear Products
    { id: 1, tenantId: 'tech-gear', name: 'Quantum Keyboard', description: 'A mechanical keyboard with RGB lighting.', price: 129.99, imageUrl: 'https://placehold.co/400x300/334155/e2e8f0?text=Keyboard', category: 'Peripherals' },
    { id: 2, tenantId: 'tech-gear', name: 'Nebula Mouse', description: 'Ergonomic gaming mouse with high DPI.', price: 79.99, imageUrl: 'https://placehold.co/400x300/334155/e2e8f0?text=Mouse', category: 'Peripherals' },
    { id: 3, tenantId: 'tech-gear', name: 'Galaxy Headset', description: 'Wireless headset with 7.1 surround sound.', price: 199.99, imageUrl: 'https://placehold.co/400x300/334155/e2e8f0?text=Headset', category: 'Audio' },
    { id: 4, tenantId: 'tech-gear', name: 'Starship Monitor', description: '27-inch 4K UHD monitor for crisp visuals.', price: 499.99, imageUrl: 'https://placehold.co/400x300/334155/e2e8f0?text=Monitor', category: 'Displays' },
    
    // FashionHub Products
    { id: 5, tenantId: 'fashion-hub', name: 'Urban Explorer Jacket', description: 'Stylish and durable for city life.', price: 150.00, imageUrl: 'https://placehold.co/400x300/f472b6/ffffff?text=Jacket', category: 'Apparel' },
    { id: 6, tenantId: 'fashion-hub', name: 'Classic Chronograph Watch', description: 'An elegant timepiece for any occasion.', price: 250.00, imageUrl: 'https://placehold.co/400x300/f472b6/ffffff?text=Watch', category: 'Accessories' },
];

const users: User[] = [
    { id: 'user-cust1', email: 'customer@example.com', role: 'customer' },
    { id: 'user-store1', email: 'store-owner@example.com', role: 'store', tenantId: 'tech-gear' },
];

// Using plain text passwords for mock environment simplicity.
// In a real application, NEVER store passwords in plain text. Always hash them.
const userPasswords = new Map<string, string>([
    ['customer@example.com', 'password123'],
    ['store-owner@example.com', 'password123'],
]);

const orders: Order[] = [
    { id: 'ord-1', customerName: 'Alice Johnson', date: '2023-10-26', total: 209.98, status: 'Shipped', items: [{productName: 'Quantum Keyboard', quantity: 1}, {productName: 'Nebula Mouse', quantity: 1}] },
    { id: 'ord-2', customerName: 'Bob Williams', date: '2023-10-25', total: 199.99, status: 'Delivered', items: [{productName: 'Galaxy Headset', quantity: 1}] },
    { id: 'ord-3', customerName: 'Charlie Brown', date: '2023-10-27', total: 499.99, status: 'Pending', items: [{productName: 'Starship Monitor', quantity: 1}] },
];

// Export all mock data collections in a single 'db' object
export const db = {
    tenants,
    products,
    users,
    userPasswords,
    orders
};
