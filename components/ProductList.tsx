import React from 'react';
// FIX: Updated import path for types.
import { Product, Tenant } from '../shared/types';
import ProductCard from './ProductCard';

interface ProductListProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  tenant: Tenant;
}

const ProductList: React.FC<ProductListProps> = ({ products, onAddToCart, tenant }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
      {products.map(product => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} tenant={tenant}/>
      ))}
    </div>
  );
};

export default ProductList;