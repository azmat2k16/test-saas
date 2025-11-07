import { User, Tenant, Product, Order, Theme, UserRole } from "../../../shared/types";

// --- MOCK DATA ---

const themes: { [key: string]: Theme } = {
    'retro_funk': {
        primaryColor: 'bg-indigo-600',
        secondaryColor: 'bg-slate-800',
        accentColor: 'bg-pink-500',
        textColor: 'text-white',
        backgroundColor: 'bg-slate-900',
    },
    'eco_friendly': {
        primaryColor: 'bg-green-700',
        secondaryColor: 'bg-gray-100',
        accentColor: 'bg-yellow-500',
        textColor: 'text-gray-800',
        backgroundColor: 'bg-white',
    },
};

let tenants: Tenant[] = [
    { id: 't_retro', name: 'Retro Funk', logoUrl: '/logos/retro-funk.png', theme: themes['retro_funk'] },
    { id: 't_green', name: 'GreenLeaf Organics', logoUrl: '/logos/greenleaf.png', theme: themes['eco_friendly'] },
];

let products: Product[] = [
    // Retro Funk Products
    { id: 1, tenantId: 't_retro', name: '8-bit Sunglasses', description: 'Pixel-perfect shades for a nostalgic vibe.', price: 24.99, imageUrl: '/products/sunglasses.jpg', category: 'Accessories' },
    { id: 2, tenantId: 't_retro', name: 'Cassette Player', description: 'A classic portable music player. Mixtape not included.', price: 49.99, imageUrl: '/products/cassette.jpg', category: 'Electronics' },
    // GreenLeaf Organics Products
    { id: 3, tenantId: 't_green', name: 'Organic Honey', description: 'Pure, raw honey from ethically-treated bees.', price: 12.50, imageUrl: '/products/honey.jpg', category: 'Groceries' },
    { id: 4, tenantId: 't_green', name: 'Bamboo Toothbrush Set', description: 'Eco-friendly dental care for the whole family.', price: 9.99, imageUrl: '/products/toothbrush.jpg', category: 'Personal Care' },
];

let users: User[] = [
    { id: 'u_customer_1', email: 'customer@test.com', role: 'customer' },
    { id: 'u_store_1', email: 'store@test.com', role: 'store', tenantId: 't_retro' },
    { id: 'u_store_2', email: 'newstore@test.com', role: 'store' }, // No tenantId yet
];

let orders: Order[] = [
    { id: 'o_1', customerName: 'John Doe', date: '2023-10-26', total: 74.98, status: 'Shipped', items: [{ productName: '8-bit Sunglasses', quantity: 1 }, { productName: 'Cassette Player', quantity: 1 }] },
    { id: 'o_2', customerName: 'Jane Smith', date: '2023-10-27', total: 25.00, status: 'Pending', items: [{ productName: 'Organic Honey', quantity: 2 }] },
];

// --- MOCK DB FUNCTIONS ---

// FIX: This function now correctly handles 'undefined' data without crashing.
const simulateDelay = <T>(data: T): Promise<T> =>
    new Promise(resolve => setTimeout(() => {
        // The JSON parse/stringify is a deep clone to prevent mutation.
        // It fails for `undefined`, which is a valid result for `find` operations.
        if (typeof data === 'undefined') {
            resolve(data);
            return;
        }
        resolve(JSON.parse(JSON.stringify(data)));
    }, 500));


// User Functions
export const findUserByEmail = async (email: string): Promise<User | undefined> => {
    return simulateDelay(users.find(u => u.email === email));
};

export const createUser = async (email: string, role: UserRole): Promise<User> => {
    const newUser: User = {
        id: `u_${Date.now()}`,
        email,
        role,
    };
    users.push(newUser);
    return simulateDelay(newUser);
};

export const updateUser = async (updatedUser: User): Promise<User> => {
    const userIndex = users.findIndex(u => u.id === updatedUser.id);
    if (userIndex === -1) {
        throw new Error("User not found for update");
    }
    users[userIndex] = updatedUser;
    return simulateDelay(users[userIndex]);
};


// Tenant Functions
export const createTenant = async (name: string): Promise<Tenant> => {
    const newTenant: Tenant = {
        id: `t_${Date.now()}`,
        name,
        logoUrl: '/logos/default-logo.png', // A default logo for new stores
        theme: themes['retro_funk'],       // A default theme
    };
    tenants.push(newTenant);
    return simulateDelay(newTenant);
};

export const getTenants = async (): Promise<Tenant[]> => {
    return simulateDelay(tenants);
};

export const getTenantById = async (tenantId: string): Promise<Tenant | undefined> => {
    return simulateDelay(tenants.find(t => t.id === tenantId));
};

// Product Functions
export const getProductsByTenantId = async (tenantId: string): Promise<Product[]> => {
    return simulateDelay(products.filter(p => p.tenantId === tenantId));
};

export const addProduct = async (tenantId: string, productData: Omit<Product, 'id' | 'tenantId'>): Promise<Product> => {
    const newProduct: Product = {
        ...productData,
        id: Math.max(...products.map(p => p.id), 0) + 1,
        tenantId,
    };
    products.push(newProduct);
    return simulateDelay(newProduct);
};

export const updateProduct = async (tenantId: string, updatedProduct: Product): Promise<Product> => {
    const index = products.findIndex(p => p.id === updatedProduct.id && p.tenantId === tenantId);
    if (index === -1) throw new Error("Product not found");
    products[index] = updatedProduct;
    return simulateDelay(updatedProduct);
};

export const deleteProduct = async (tenantId: string, productId: number): Promise<{ id: number }> => {
    const initialLength = products.length;
    products = products.filter(p => !(p.id === productId && p.tenantId === tenantId));
    if (products.length === initialLength) throw new Error("Product not found");
    return simulateDelay({ id: productId });
};

// Order Functions
export const getOrdersByTenantId = async (tenantId: string): Promise<Order[]> => {
    // This is a simplification; in reality, orders would be linked to products of a tenant.
    // For this mock, we'll just return some orders. A real implementation would be more complex.
    const tenantProducts = products.filter(p => p.tenantId === tenantId).map(p => p.name);
    const tenantOrders = orders.filter(o => o.items.some(item => tenantProducts.includes(item.productName)));
    return simulateDelay(tenantOrders);
};
