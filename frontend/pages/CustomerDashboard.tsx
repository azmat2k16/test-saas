import React from 'react';
import { AuthResponse } from '../../shared/types';

interface CustomerDashboardProps {
    user: AuthResponse['user'];
    onLogout: () => void;
}

const CustomerDashboard: React.FC<CustomerDashboardProps> = ({ user, onLogout }) => {
    return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-4xl text-center">
                <h1 className="text-5xl font-extrabold mb-4">
                    Welcome, Customer!
                </h1>
                <p className="text-xl text-gray-400 mb-8">
                    You are logged in as <span className="font-semibold text-cyan-400">{user.email}</span>.
                </p>
                <p className="mb-8">
                    This is where the main customer-facing e-commerce experience would live.
                    <br/>
                    You would be able to browse stores, view products, and manage your cart.
                </p>
                <button
                    onClick={onLogout}
                    className="bg-red-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-red-500 transition-all duration-200"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default CustomerDashboard;
