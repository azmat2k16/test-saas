import React, { useEffect, useState } from 'react';
import { api } from '../../../../backend/src/server';
import { Tenant } from '../../../../shared/types';

interface SettingsPageProps {
  tenantId: string;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ tenantId }) => {
    const [tenant, setTenant] = useState<Tenant | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                setLoading(true);
                const data = await api.storeAdmin.getSettings(tenantId);
                if (data) {
                    setTenant(data);
                } else {
                    throw new Error("Tenant settings not found.");
                }
            } catch (err: any) {
                setError(err.message || 'Failed to load settings.');
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, [tenantId]);

    if (loading) {
        return <div className="text-center p-10">Loading settings...</div>;
    }

    if (error || !tenant) {
        return <div className="text-center p-10 text-red-400">{error || 'Could not load tenant data.'}</div>;
    }


    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Store Settings</h1>
            <div className="max-w-2xl bg-slate-800 p-8 rounded-lg">
                <form className="space-y-6">
                    <div>
                        <label htmlFor="storeName" className="block text-sm font-medium text-gray-300">Store Name</label>
                        <input type="text" id="storeName" defaultValue={tenant.name} className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
                    </div>
                     <div>
                        <label htmlFor="logoUrl" className="block text-sm font-medium text-gray-300">Logo URL</label>
                        <input type="text" id="logoUrl" defaultValue={tenant.logoUrl} className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-cyan-500 focus:border-cyan-500" />
                    </div>
                    {/* Add more settings fields for theme colors etc. */}
                    <div className="pt-4">
                        <button type="submit" className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded">
                            Save Settings
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SettingsPage;
