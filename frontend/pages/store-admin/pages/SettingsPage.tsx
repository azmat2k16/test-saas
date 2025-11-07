import React from 'react';

interface SettingsPageProps {
    tenantId: string;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ tenantId }) => {
    return (
        <div className="animate-fade-in">
            <h1 className="text-3xl font-bold text-white mb-6">Settings</h1>
            <p className="text-gray-400">
                Configure your store's settings, including theme, payment gateways, and shipping options.
            </p>
            <div className="mt-8 p-6 bg-slate-800 rounded-lg">
                <h2 className="text-xl font-semibold text-cyan-400">Store Configuration</h2>
                <p className="mt-2 text-gray-300">
                    Forms for updating store details and preferences would be available in this section.
                    <br />
                    (Content for tenant: <span className="font-mono">{tenantId}</span>)
                </p>
            </div>
        </div>
    );
};

export default SettingsPage;
