import * as db from '../services/dbService';
import { AuthResponse, UserRole } from '../../../shared/types';

export const login = async (email: string, password: string): Promise<AuthResponse> => {
    console.log(`Attempting login for: ${email}`);
    // NOTE: Password is not being checked in this mock implementation.
    if (!password) {
        throw new Error("Password is required.");
    }

    const user = await db.findUserByEmail(email);

    if (!user) {
        throw new Error("Invalid email or password.");
    }

    return {
        token: `mock_token_${Date.now()}`,
        user,
    };
};

export const register = async (email: string, password: string, role: UserRole): Promise<AuthResponse> => {
    console.log(`Attempting registration for: ${email} with role: ${role}`);
    // NOTE: Password is not being checked or stored securely in this mock implementation.
    if (!password || password.length < 6) {
        throw new Error("Password must be at least 6 characters long.");
    }

    const existingUser = await db.findUserByEmail(email);
    if (existingUser) {
        throw new Error("An account with this email already exists.");
    }

    let newUser = await db.createUser(email, role);

    // If the new user is a store owner, automatically create a new tenant for them.
    if (newUser.role === 'store') {
        const tenantName = `${email.split('@')[0]}'s Store`;
        const newTenant = await db.createTenant(tenantName);
        newUser.tenantId = newTenant.id;
        newUser = await db.updateUser(newUser); // Save the user with their new tenantId
    }

    return {
        token: `mock_token_${Date.now()}`,
        user: newUser,
    };
};
