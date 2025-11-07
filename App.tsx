import React, { useState, useEffect } from 'react';
import AuthPage from './frontend/pages/AuthPage';
import CustomerDashboard from './frontend/pages/CustomerDashboard';
import StoreDashboard from './frontend/pages/StoreDashboard';
import { AuthResponse } from './shared/types';

// Simple in-memory session storage to persist login state
const SESSION_KEY = 'saas-auth-session';

const App: React.FC = () => {
    const [auth, setAuth] = useState<AuthResponse | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // On initial load, check for a saved session in localStorage
        try {
            const savedSession = localStorage.getItem(SESSION_KEY);
            if (savedSession) {
                setAuth(JSON.parse(savedSession));
            }
        } catch (error) {
            console.error("Failed to parse saved session", error);
            localStorage.removeItem(SESSION_KEY); // Clear corrupted session
        }
        setIsLoading(false);
    }, []);

    const handleLoginSuccess = (authResponse: AuthResponse) => {
        setAuth(authResponse);
        localStorage.setItem(SESSION_KEY, JSON.stringify(authResponse));
    };

    const handleLogout = () => {
        setAuth(null);
        localStorage.removeItem(SESSION_KEY);
    };

    // Show a loading indicator while checking for an existing session
    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <h1 className="text-white text-2xl animate-pulse">Loading Application...</h1>
            </div>
        );
    }
    
    // If no authenticated user, show the login/register page
    if (!auth) {
        return <AuthPage onLoginSuccess={handleLoginSuccess} />;
    }

    // Route to the appropriate dashboard based on the user's role
    switch (auth.user.role) {
        case 'customer':
            return <CustomerDashboard user={auth.user} onLogout={handleLogout} />;
        case 'store':
            return <StoreDashboard user={auth.user} onLogout={handleLogout} />;
        default:
             // Fallback to the auth page if the role is unknown
            return <AuthPage onLoginSuccess={handleLoginSuccess} />;
    }
};

export default App;
