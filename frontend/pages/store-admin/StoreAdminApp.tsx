import React, { useState } from 'react';
import { AuthResponse } from '../../../shared/types';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import ProductsPage from './pages/ProductsPage';
import OrdersPage from './pages/OrdersPage';
import SettingsPage from './pages/SettingsPage';

interface StoreAdminAppProps {
    user: AuthResponse['user'];
    onLogout: () => void;
}

export type AdminPage = 'dashboard' | 'products' | 'orders' | 'settings';

const StoreAdminApp: React.FC<StoreAdminAppProps> = ({ user, onLogout }) => {
    const [currentPage, setCurrentPage] = useState<AdminPage>('dashboard');

    // Renders the appropriate page component based on the current state
    const renderPage = () => {
        // This should always be true if this component is rendered, but it's a good safeguard.
        if (!user.tenantId) {
            return <div className="text-red-400">Error: No Tenant ID found for this user.</div>;
        }

        switch (currentPage) {
            case 'dashboard':
                return <DashboardPage tenantId={user.tenantId} />;
            case 'products':
                return <ProductsPage tenantId={user.tenantId} />;
            case 'orders':
                return <OrdersPage tenantId={user.tenantId} />;
            case 'settings':
                return <SettingsPage tenantId={user.tenantId} />;
            default:
                return <DashboardPage tenantId={user.tenantId} />;
        }
    };

    return (
        <div className="flex h-screen bg-slate-900 text-white selection:bg-cyan-500 selection:text-white">
            <Sidebar 
                user={user} 
                onLogout={onLogout}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <main className="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto">
                {renderPage()}
            </main>
        </div>
    );
};

export default StoreAdminApp;
