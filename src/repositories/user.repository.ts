import { prisma } from '../database/prisma.client';
import { User, UserCreate, UserRepository } from '../interfaces/user.interface';

/**
 * Prisma implementation of the UserRepository interface.
 * This class provides methods to interact with the database 
 * for user-related operations.
 */
class UserRepositoryPrisma implements UserRepository {

    /**
     * Creates a new user in the database.
     * 
     * @param {UserCreate} data - The user data, including name and email.
     * @returns {Promise<User>} The created user.
     */
    async create(data: UserCreate): Promise<User> {
        const result = await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
            },
        });
        return result;
    }

    /**
     * Finds a user by their email address.
     * 
     * @param {string} email - The email of the user to search for.
     * @returns {Promise<User | null>} The user object if found, 
     * or null if no user with that email exists.
     */
    async findByEmail(email: string): Promise<User | null> {
        const result = await prisma.user.findFirst({
            where: {
                email,
            },
        });

        return result || null;
    }
}

export { UserRepositoryPrisma };
