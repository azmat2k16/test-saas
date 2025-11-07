import React, { useEffect, useState } from 'react';
import { api } from '../../../../backend/src/server';

interface DashboardPageProps {
  tenantId: string;
}

type Stats = {
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
    pendingOrders: number;
} | null;

// FIX: Changed JSX.Element to React.ReactElement to resolve namespace error.
const StatCard: React.FC<{ title: string; value: string | number, icon: React.ReactElement }> = ({ title, value, icon }) => (
    <div className="bg-slate-800 p-6 rounded-lg flex items-center">
        <div className="bg-slate-900 p-3 rounded-full mr-4">
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-400">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
        </div>
    </div>
);

const DashboardPage: React.FC<DashboardPageProps> = ({ tenantId }) => {
    const [stats, setStats] = useState<Stats>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                setLoading(true);
                const data = await api.storeAdmin.getDashboardStats(tenantId);
                setStats(data);
            } catch (err: any) {
                setError(err.message || 'Failed to load dashboard data.');
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, [tenantId]);

    if (loading) {
        return <div className="text-center p-10">Loading dashboard...</div>;
    }

    if (error) {
        return <div className="text-center p-10 text-red-400">{error}</div>;
    }

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Total Revenue" 
                    value={`$${stats?.totalRevenue.toFixed(2)}`} 
                    icon={<DollarSignIcon />}
                />
                <StatCard 
                    title="Total Orders" 
                    value={stats?.totalOrders ?? 0}
                    icon={<ShoppingCartIcon />}
                />
                <StatCard 
                    title="Total Products" 
                    value={stats?.totalProducts ?? 0}
                    icon={<PackageIcon />}
                />
                 <StatCard 
                    title="Pending Orders" 
                    value={stats?.pendingOrders ?? 0}
                    icon={<ClockIcon />}
                />
            </div>
            {/* Here you could add charts or recent activity feeds */}
        </div>
    );
};

// Icons
const DollarSignIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8v1m0 6v1m6-4h-2m-6 0H6" /></svg>;
const ShoppingCartIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const PackageIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>;
const ClockIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;


export default DashboardPage;