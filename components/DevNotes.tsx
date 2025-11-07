
import React, { useState } from 'react';

const CodeIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-4">
        <h3 className="text-lg font-semibold text-cyan-400 mb-2">{title}</h3>
        <div className="text-gray-400 space-y-2">{children}</div>
    </div>
);

const DevNotes: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="bg-slate-800 text-white px-4 py-2 rounded-full shadow-lg flex items-center hover:bg-slate-700 transition-colors"
            >
                <CodeIcon/>
                Developer Notes
            </button>
            {isOpen && (
                <div className="absolute bottom-14 right-0 w-80 sm:w-96 bg-slate-900 text-white rounded-lg shadow-2xl p-5 border border-slate-700">
                    <h2 className="text-xl font-bold mb-4 text-white">How This App Works (SaaS Simulation)</h2>
                    <Section title="1. Frontend (What you're seeing)">
                        <p>This is a complete React application built with TypeScript and styled using Tailwind CSS. It's a single codebase designed to serve multiple 'tenants' or 'stores'.</p>
                    </Section>
                    <Section title="2. Multi-Tenancy Simulation">
                        <p>In a real SaaS app, you might use subdomains (e.g., `store1.myapp.com`) to identify a tenant. Here, we simulate this with a Store Selector. When you pick a store, the app fetches data for that specific tenant from a mock API service.</p>
                    </Section>
                    <Section title="3. Data Isolation (Mock Backend)">
                        <p>The `services/mockApiService.ts` file acts as our backend. It holds different product lists and theme data for each store. A real backend would use a database with a `tenant_id` column to ensure data is isolated for each customer.</p>
                    </Section>
                    <Section title="4. Dynamic Theming">
                        <p>Each tenant object in our mock data includes theme information (colors). The React components use these theme properties to dynamically apply Tailwind CSS classes, giving each store a unique look and feel.</p>
                    </Section>
                    <Section title="5. Deployment (Conceptual)">
                        <p>To deploy a real version, you would host the React frontend on a service like Vercel or Netlify. The backend (e.g., a Node.js/Express API) and database (e.g., PostgreSQL) would be hosted on a cloud platform like AWS, Google Cloud, or Heroku.</p>
                    </Section>
                     <button
                        onClick={() => setIsOpen(false)}
                        className="mt-4 w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2 px-4 rounded"
                    >
                        Close
                    </button>
                </div>
            )}
        </div>
    );
};

export default DevNotes;
   