import React from 'react';
// FIX: Updated import path for types.
import { Product, Tenant } from '../shared/types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  tenant: Tenant;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, tenant }) => {
  return (
    <div className={`flex flex-col rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 ${tenant.theme.backgroundColor === 'bg-white' ? 'bg-white text-stone-800' : 'bg-slate-800 text-white'}`}>
      <div className="flex-shrink-0">
        <img className="h-56 w-full object-cover" src={product.imageUrl} alt={product.name} />
      </div>
      <div className="flex-1 p-6 flex flex-col justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-cyan-500">{product.category.toUpperCase()}</p>
          <div className="block mt-2">
            <p className="text-xl font-semibold">{product.name}</p>
            <p className="mt-3 text-base text-gray-400">{product.description}</p>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-between">
          <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
          <button
            onClick={() => onAddToCart(product)}
            className={`px-4 py-2 rounded-md font-semibold text-white ${tenant.theme.accentColor} hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500`}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;