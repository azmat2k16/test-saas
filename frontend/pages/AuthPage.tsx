import React, { useState } from 'react';
import { api } from '../../backend/src/server';
import { AuthResponse, UserRole } from '../../shared/types';

interface AuthPageProps {
    onLoginSuccess: (authResponse: AuthResponse) => void;
}

type AuthMode = 'login' | 'register';

const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess }) => {
    const [mode, setMode] = useState<AuthMode>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState<UserRole>('customer');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Email and password are required.");
            return;
        }
        setError(null);
        setIsLoading(true);

        try {
            let response;
            if (mode === 'login') {
                response = await api.auth.login(email, password);
            } else {
                response = await api.auth.register(email, password, role);
            }
            onLoginSuccess(response);
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    const toggleMode = () => {
        setMode(prevMode => prevMode === 'login' ? 'register' : 'login');
        setError(null);
        setEmail('');
        setPassword('');
    };

    return (
        <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 selection:bg-cyan-500 selection:text-white">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">
                        SaaS Platform
                    </h1>
                    <p className="text-lg text-gray-400">
                        The all-in-one solution for your e-commerce needs.
                    </p>
                </div>
                
                <div className="bg-slate-800 rounded-xl shadow-2xl p-8">
                    <div className="flex border-b border-slate-700 mb-6">
                        <button onClick={() => setMode('login')} className={`flex-1 py-3 font-semibold text-lg transition-colors ${mode === 'login' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400 hover:text-white'}`}>
                            Login
                        </button>
                        <button onClick={() => setMode('register')} className={`flex-1 py-3 font-semibold text-lg transition-colors ${mode === 'register' ? 'text-cyan-400 border-b-2 border-cyan-400' : 'text-gray-400 hover:text-white'}`}>
                            Register
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow"
                                placeholder="you@example.com"
                                autoComplete="email"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-300 text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={6}
                                className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-shadow"
                                placeholder="••••••••"
                                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                            />
                        </div>

                        {mode === 'register' && (
                           <div>
                                <span className="block text-gray-300 text-sm font-bold mb-2">I am a...</span>
                                <div className="flex rounded-lg shadow-sm bg-slate-700 border border-slate-600">
                                    <button type="button" onClick={() => setRole('customer')} className={`flex-1 px-4 py-3 text-sm font-medium rounded-l-md transition-all duration-200 ${role === 'customer' ? 'bg-cyan-600 text-white shadow-inner' : 'text-gray-300 hover:bg-slate-600'}`}>
                                        Customer
                                    </button>
                                    <button type="button" onClick={() => setRole('store')} className={`flex-1 px-4 py-3 text-sm font-medium rounded-r-md transition-all duration-200 ${role === 'store' ? 'bg-cyan-600 text-white shadow-inner' : 'text-gray-300 hover:bg-slate-600'}`}>
                                        Store Owner
                                    </button>
                                </div>
                           </div>
                        )}
                        
                        {error && (
                            <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg text-center text-sm">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-cyan-600 text-white font-bold text-lg py-3 px-4 rounded-lg hover:bg-cyan-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-cyan-500 transition-all duration-200 disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center justify-center transform hover:scale-105"
                        >
                             {isLoading && <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
                            {isLoading ? 'Processing...' : (mode === 'login' ? 'Sign In' : 'Create Account')}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;
