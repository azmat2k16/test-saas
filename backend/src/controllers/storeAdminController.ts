import * as db from '../services/dbService';
import { Product, Order, Tenant } from '../../../shared/types';

export const getDashboardStats = async (tenantId: string) => {
    const products = await db.getProductsByTenantId(tenantId);
    const orders = await db.getOrdersByTenantId(tenantId);
    const totalRevenue = orders.reduce((sum, order) => sum + (order.status !== 'Cancelled' ? order.total : 0), 0);
    
    return {
        totalProducts: products.length,
        totalOrders: orders.length,
        totalRevenue: totalRevenue,
        pendingOrders: orders.filter(o => o.status === 'Pending').length,
    };
};

export const getProducts = (tenantId: string): Promise<Product[]> => {
    return db.getProductsByTenantId(tenantId);
};

export const addProduct = (tenantId: string, productData: Omit<Product, 'id' | 'tenantId'>): Promise<Product> => {
    return db.addProduct(tenantId, productData);
};

export const updateProduct = (tenantId: string, updatedProduct: Product): Promise<Product> => {
    return db.updateProduct(tenantId, updatedProduct);
};

export const deleteProduct = (tenantId: string, productId: number): Promise<{ id: number }> => {
    return db.deleteProduct(tenantId, productId);
};

export const getOrders = (tenantId: string): Promise<Order[]> => {
    return db.getOrdersByTenantId(tenantId);
};

export const getSettings = (tenantId: string): Promise<Tenant | undefined> => {
    return db.getTenantById(tenantId);
};

export const updateSettings = async (tenantId: string, updatedSettings: Partial<Tenant>): Promise<Tenant> => {
    // This is a mock implementation. A real one would update the DB.
    const tenant = await db.getTenantById(tenantId);
    if (!tenant) throw new Error("Tenant not found");
    
    // In a real DB, you would update the record. Here we just merge and return.
    const newTenant = { ...tenant, ...updatedSettings };
    console.log("Updated tenant settings (mock):", newTenant);
    return newTenant;
};
