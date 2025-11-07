import { authController } from './controllers/authController';
import { db } from './services/dbService';
import { Tenant, Product } from '../../shared/types';

const FAKE_API_DELAY = 300;

// This 'api' object simulates a client-side SDK for interacting with the backend.
// In a real application, the methods here would make HTTP requests (e.g., using fetch or axios).
// For this demo, they call controller/service functions directly.
export const api = {
    auth: authController,
    
    // Data-fetching APIs for the e-commerce storefront
    tenants: {
        list: (): Promise<Pick<Tenant, 'id' | 'name' | 'logoUrl'>[]> => {
             return new Promise(resolve => {
                setTimeout(() => {
                    resolve(db.tenants.map(t => ({ id: t.id, name: t.name, logoUrl: t.logoUrl })));
                }, FAKE_API_DELAY);
            });
        },
        getById: (id: string): Promise<Tenant | undefined> => {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(db.tenants.find(t => t.id === id));
                }, FAKE_API_DELAY);
            });
        }
    },
    products: {
        listByTenant: (tenantId: string): Promise<Product[]> => {
             return new Promise(resolve => {
                setTimeout(() => {
                    resolve(db.products.filter(p => p.tenantId === tenantId));
                }, FAKE_API_DELAY);
            });
        }
    },

    // Data-fetching APIs for the Store Owner Admin Dashboard
    storeAdmin: {
        getDashboardData: (tenantId: string) => {
             return new Promise(resolve => {
                setTimeout(() => {
                    resolve({
                        totalRevenue: 12530.50,
                        totalOrders: 42,
                        newCustomers: 15,
                        topProducts: db.products.filter(p => p.tenantId === tenantId).slice(0, 3)
                    });
                }, FAKE_API_DELAY);
            });
        },
        getProducts: (tenantId: string) => {
             return new Promise(resolve => {
                setTimeout(() => {
                    resolve(db.products.filter(p => p.tenantId === tenantId));
                }, FAKE_API_DELAY);
            });
        },
        getOrders: (tenantId: string) => {
             return new Promise(resolve => {
                // In a real app, orders would be filtered by tenantId
                resolve(db.orders);
            }, FAKE_API_DELAY);
        }
    }
};
