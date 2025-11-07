import React, { useEffect, useState } from 'react';
import { api } from '../../../../backend/src/server';
import { Order } from '../../../../shared/types';

interface OrdersPageProps {
  tenantId: string;
}

const getStatusColor = (status: Order['status']) => {
    switch (status) {
        case 'Pending': return 'bg-yellow-500/20 text-yellow-300';
        case 'Shipped': return 'bg-blue-500/20 text-blue-300';
        case 'Delivered': return 'bg-green-500/20 text-green-300';
        case 'Cancelled': return 'bg-red-500/20 text-red-300';
        default: return 'bg-gray-500/20 text-gray-300';
    }
}

const OrdersPage: React.FC<OrdersPageProps> = ({ tenantId }) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

     useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const data = await api.storeAdmin.getOrders(tenantId);
                setOrders(data);
            } catch (err: any) {
                setError(err.message || 'Failed to load orders.');
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [tenantId]);

    if (loading) {
        return <div className="text-center p-10">Loading orders...</div>;
    }

    if (error) {
        return <div className="text-center p-10 text-red-400">{error}</div>;
    }


    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Orders</h1>
              <div className="bg-slate-800 rounded-lg shadow">
                <table className="w-full text-left">
                    <thead className="border-b border-slate-700">
                        <tr>
                            <th className="p-4">Order ID</th>
                            <th className="p-4">Customer</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Total</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id} className="border-b border-slate-700 last:border-b-0">
                                <td className="p-4 font-mono text-sm text-gray-400">{order.id}</td>
                                <td className="p-4 font-medium">{order.customerName}</td>
                                <td className="p-4 text-gray-400">{order.date}</td>
                                <td className="p-4 text-gray-400">${order.total.toFixed(2)}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="p-4">
                                    <button className="text-cyan-400 hover:text-cyan-300">View Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {orders.length === 0 && <p className="text-center p-10 text-gray-400">No orders found.</p>}
            </div>
        </div>
    );
};

export default OrdersPage;
