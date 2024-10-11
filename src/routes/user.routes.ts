import { FastifyInstance } from 'fastify';
import { UserCreate } from '../interfaces/user.interface';
import { UserUseCase } from '../usecases/user.usecase';

/**
 * Defines the routes for managing user-related operations.
 * 
 * @param {FastifyInstance} fastify - The Fastify instance.
 */
export async function userRoutes(fastify: FastifyInstance) {
    const userUseCase = new UserUseCase();

    /**
     * Route for creating a new user.
     * 
     * @route POST /
     * @param {UserCreate} Body - The user creation data, including name and email.
     * @returns {Promise<User>} The newly created user.
     */
    fastify.post<{ Body: UserCreate }>('/', async (req, reply) => {
        const { name, email } = req.body;

        try {
            const data = await userUseCase.create({
                name,
                email,
            });
            return reply.send(data);
        } catch (error) {
            reply.send(error);
        }
    });

    /**
     * A simple test route for checking the API status.
     * 
     * @route GET /
     * @returns {object} A message indicating that the server is working.
     */
    fastify.get('/', (req, reply) => {
        reply.send({ hello: 'world' });
    });
}
