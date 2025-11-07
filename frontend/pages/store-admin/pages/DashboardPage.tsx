import React from 'react';

interface DashboardPageProps {
    tenantId: string;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ tenantId }) => {
    return (
        <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-white mb-6">Dashboard</h1>
            <p className="text-gray-400">
                Welcome to your store dashboard. Here you'll find an overview of your store's performance.
            </p>
            <div className="mt-8 p-6 bg-slate-800 rounded-lg">
                <h2 className="text-xl font-semibold text-cyan-400">Store Analytics</h2>
                <p className="mt-2 text-gray-300">
                    This section would contain charts and key metrics like sales, orders, and traffic.
                    <br />
                    (Content for tenant: <span className="font-mono">{tenantId}</span>)
                </p>
            </div>
        </div>
    );
};

export default DashboardPage;
