import React from 'react';
// FIX: Updated import path for types.
import { Tenant } from '../shared/types';

interface HeaderProps {
  tenant: Tenant;
  cartCount: number;
  onCartClick: () => void;
  onSwitchStore: () => void;
}

const ShoppingCartIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const SwitchIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
    </svg>
);

const Header: React.FC<HeaderProps> = ({ tenant, cartCount, onCartClick, onSwitchStore }) => {
  return (
    <header className={`${tenant.theme.primaryColor} ${tenant.theme.textColor} shadow-lg sticky top-0 z-40`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            {tenant.logoUrl && <img src={tenant.logoUrl} alt={`${tenant.name} Logo`} className="h-12 w-12 rounded-full mr-4 border-2 border-white" />}
            <h1 className="text-2xl sm:text-3xl font-bold tracking-wider">{tenant.name}</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={onSwitchStore}
              className={`hidden sm:flex items-center justify-center p-2 rounded-md ${tenant.theme.secondaryColor} hover:opacity-80 transition-opacity`}
              aria-label="Switch store"
            >
              <SwitchIcon />
              Switch Store
            </button>
            <button 
              onClick={onCartClick} 
              className={`relative p-3 rounded-full ${tenant.theme.accentColor} hover:opacity-90 transition-opacity`}
              aria-label={`View cart with ${cartCount} items`}
            >
              <ShoppingCartIcon />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;