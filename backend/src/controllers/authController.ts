import { db } from '../services/dbService';
import { User, UserRole, AuthResponse } from '../../../shared/types';

const FAKE_API_DELAY = 500; // Simulate network latency

// A simple ID generator for new users to avoid external dependencies like UUID.
const generateId = () => `user-${Math.random().toString(36).substring(2, 11)}`;

export const authController = {
    /**
     * Simulates a user login attempt.
     * @param email The user's email.
     * @param password The user's password.
     * @returns A Promise that resolves with an AuthResponse on success or rejects with an Error on failure.
     */
    login: (email: string, password: string): Promise<AuthResponse> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const user = db.users.find(u => u.email === email);
                const storedPassword = db.userPasswords.get(email);

                if (user && storedPassword === password) {
                    console.log(`Login successful for ${email}`);
                    resolve({
                        token: `fake-jwt-token-for-${user.id}`,
                        user: user,
                    });
                } else {
                    console.error(`Login failed for ${email}`);
                    reject(new Error('Invalid email or password.'));
                }
            }, FAKE_API_DELAY);
        });
    },

    /**
     * Simulates a new user registration.
     * @param email The new user's email.
     * @param password The new user's password.
     * @param role The role of the new user ('customer' or 'store').
     * @returns A Promise that resolves with an AuthResponse on success or rejects with an Error if the user already exists.
     */
    register: (email: string, password: string, role: UserRole): Promise<AuthResponse> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (db.users.some(u => u.email === email)) {
                    return reject(new Error('User with this email already exists.'));
                }

                const newUser: User = {
                    id: generateId(),
                    email,
                    role,
                };
                
                // For this simulation, new store owners don't get a tenant assigned automatically.
                // A real app would have a more complex onboarding flow.

                db.users.push(newUser);
                db.userPasswords.set(email, password);

                console.log(`Registration successful for ${email}`);
                resolve({
                    token: `fake-jwt-token-for-${newUser.id}`,
                    user: newUser,
                });

            }, FAKE_API_DELAY);
        });
    }
};
