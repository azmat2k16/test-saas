import React from 'react';

interface OrdersPageProps {
    tenantId: string;
}

const OrdersPage: React.FC<OrdersPageProps> = ({ tenantId }) => {
    return (
        <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-white mb-6">Orders</h1>
            <p className="text-gray-400">
                View and manage all customer orders. Update statuses and view order details.
            </p>
             <div className="mt-8 p-6 bg-slate-800 rounded-lg">
                <h2 className="text-xl font-semibold text-cyan-400">Recent Orders</h2>
                <p className="mt-2 text-gray-300">
                    A list of recent orders would be displayed here, with filtering and search capabilities.
                    <br />
                    (Content for tenant: <span className="font-mono">{tenantId}</span>)
                </p>
            </div>
        </div>
    );
};

export default OrdersPage;
