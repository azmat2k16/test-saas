import React from 'react';
import { AuthResponse } from '../../../../shared/types';
import { AdminPage } from '../StoreAdminApp';

interface SidebarProps {
    user: AuthResponse['user'];
    onLogout: () => void;
    currentPage: AdminPage;
    setCurrentPage: (page: AdminPage) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, onLogout, currentPage, setCurrentPage }) => {
    const navItems: { id: AdminPage; label: string; icon: JSX.Element }[] = [
        { id: 'dashboard', label: 'Dashboard', icon: <HomeIcon /> },
        { id: 'products', label: 'Products', icon: <PackageIcon /> },
        { id: 'orders', label: 'Orders', icon: <ShoppingCartIcon /> },
        { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
    ];

    return (
        <aside className="w-64 bg-slate-800 flex flex-col flex-shrink-0">
            <div className="flex items-center justify-center h-20 border-b border-slate-700">
                <h1 className="text-2xl font-bold text-white tracking-wider">Store Admin</h1>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
                {navItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => setCurrentPage(item.id)}
                        className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors text-lg ${
                            currentPage === item.id 
                            ? 'bg-cyan-600 text-white' 
                            : 'text-gray-300 hover:bg-slate-700 hover:text-white'
                        }`}
                    >
                        {item.icon}
                        <span className="ml-4">{item.label}</span>
                    </button>
                ))}
            </nav>
            <div className="p-4 border-t border-slate-700">
                <div className="mb-4 text-center">
                    <p className="text-sm font-medium text-white truncate">{user.email}</p>
                    <p className="text-xs text-gray-400 capitalize">{user.role} Role</p>
                </div>
                <button
                    onClick={onLogout}
                    className="w-full flex items-center justify-center bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-500 transition-colors"
                >
                    <LogoutIcon/>
                    <span className="ml-2">Logout</span>
                </button>
            </div>
        </aside>
    );
};

// SVG Icon Components (kept inline for simplicity)
const HomeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const PackageIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>;
const ShoppingCartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const SettingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;

export default Sidebar;
