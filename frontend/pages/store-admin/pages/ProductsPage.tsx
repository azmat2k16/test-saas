import React, { useEffect, useState } from 'react';
import { api } from '../../../../backend/src/server';
import { Product } from '../../../../shared/types';

interface ProductsPageProps {
  tenantId: string;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ tenantId }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const data = await api.storeAdmin.getProducts(tenantId);
                setProducts(data);
            } catch (err: any) {
                setError(err.message || 'Failed to load products.');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [tenantId]);

    if (loading) {
        return <div className="text-center p-10">Loading products...</div>;
    }

    if (error) {
        return <div className="text-center p-10 text-red-400">{error}</div>;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Products</h1>
                <button className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded">
                    Add Product
                </button>
            </div>
            <div className="bg-slate-800 rounded-lg shadow">
                <table className="w-full text-left">
                    <thead className="border-b border-slate-700">
                        <tr>
                            <th className="p-4">Name</th>
                            <th className="p-4">Category</th>
                            <th className="p-4">Price</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id} className="border-b border-slate-700 last:border-b-0">
                                <td className="p-4 font-medium">{product.name}</td>
                                <td className="p-4 text-gray-400">{product.category}</td>
                                <td className="p-4 text-gray-400">${product.price.toFixed(2)}</td>
                                <td className="p-4">
                                    <button className="text-cyan-400 hover:text-cyan-300 mr-4">Edit</button>
                                    <button className="text-red-400 hover:text-red-300">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {products.length === 0 && <p className="text-center p-10 text-gray-400">No products found.</p>}
            </div>
        </div>
    );
};

export default ProductsPage;
