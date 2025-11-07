import React from 'react';
import { AuthResponse } from '../../shared/types';
import StoreAdminApp from './store-admin/StoreAdminApp';

interface StoreDashboardProps {
    user: AuthResponse['user'];
    onLogout: () => void;
}

const StoreDashboard: React.FC<StoreDashboardProps> = ({ user, onLogout }) => {
    // If the store owner user object doesn't have a tenantId, they haven't completed setup.
    // In a real app, this would lead to a store creation wizard.
    if (!user.tenantId) {
        return (
            <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-2xl text-center">
                    <h1 className="text-4xl font-extrabold mb-4">Welcome, Store Owner!</h1>
                    <p className="text-lg text-gray-400 mb-6">
                        You're logged in as <span className="font-semibold text-cyan-400">{user.email}</span>.
                    </p>
                    <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 px-4 py-3 rounded-lg mb-8 text-left">
                        <p className="font-bold mb-1">Next Steps</p>
                        <p>It looks like your store isn't fully set up yet. In a real application, you'd be guided through a store creation and configuration process here.</p>
                    </div>
                     <button
                        onClick={onLogout}
                        className="bg-red-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-500 transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </div>
        );
    }

    // If the user has a tenantId, render the full store admin application.
    return <StoreAdminApp user={user} onLogout={onLogout} />;
};

export default StoreDashboard;
