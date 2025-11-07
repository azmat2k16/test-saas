import React from 'react';

interface ProductsPageProps {
    tenantId: string;
}

const ProductsPage: React.FC<ProductsPageProps> = ({ tenantId }) => {
    return (
        <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-white mb-6">Products</h1>
            <p className="text-gray-400">
                Manage your store's inventory. Add, edit, and remove products from this page.
            </p>
            <div className="mt-8 p-6 bg-slate-800 rounded-lg">
                <h2 className="text-xl font-semibold text-cyan-400">Product List</h2>
                <p className="mt-2 text-gray-300">
                    A data table with all your products would be displayed here, including tools for management.
                    <br />
                    (Content for tenant: <span className="font-mono">{tenantId}</span>)
                </p>
            </div>
        </div>
    );
};

export default ProductsPage;
