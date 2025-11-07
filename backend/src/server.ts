import * as authController from './controllers/authController';
import * as storeAdminController from './controllers/storeAdminController';
import * as dbService from './services/dbService';

// This file simulates the top-level API that the frontend would interact with.
// In a real application, these would be HTTP endpoints. Here, they are just
// exported functions for direct use by the frontend code in this project.

const getTenant = (tenantId: string) => dbService.getTenantById(tenantId);
const getTenants = () => dbService.getTenants();
const getProducts = (tenantId: string) => dbService.getProductsByTenantId(tenantId);

export const api = {
    auth: authController,
    storeAdmin: storeAdminController,
    // Public-facing "customer" API functions
    customer: {
        getTenant,
        getTenants,
        getProducts,
    }
};
