import React from 'react';
// FIX: Updated import path for types.
import { Tenant } from '../shared/types';

interface StoreSelectorProps {
  tenants: Pick<Tenant, 'id' | 'name' | 'logoUrl'>[];
  onSelectTenant: (tenantId: string) => void;
}

const StoreSelector: React.FC<StoreSelectorProps> = ({ tenants, onSelectTenant }) => {
  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-4">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-white mb-2 tracking-tight">
          Welcome to Our SaaS E-commerce Platform
        </h1>
        <p className="text-xl text-gray-400">Choose a store to start shopping</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {tenants.map(tenant => (
          <button
            key={tenant.id}
            onClick={() => onSelectTenant(tenant.id)}
            className="group bg-slate-800 rounded-xl p-8 text-white transition-all duration-300 hover:bg-cyan-500 hover:scale-105 transform shadow-2xl"
          >
            <div className="flex flex-col items-center">
              {tenant.logoUrl && (
                <img
                  src={tenant.logoUrl}
                  alt={`${tenant.name} Logo`}
                  className="h-24 w-24 rounded-full mb-6 border-4 border-slate-700 group-hover:border-white transition-all duration-300"
                />
              )}
              <h2 className="text-3xl font-bold mb-2">{tenant.name}</h2>
              <p className="text-slate-400 group-hover:text-white transition-colors duration-300">
                Click to visit store
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StoreSelector;