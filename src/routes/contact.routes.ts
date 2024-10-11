import { FastifyInstance } from 'fastify';
import { Contact, ContactCreate } from '../interfaces/contact.interface';
import { authMiddleware } from '../middlewares/auth.middleware';
import { ContactUseCase } from '../usecases/contact.usecase';

/**
 * Defines the routes for managing contacts.
 * 
 * @param {FastifyInstance} fastify - The Fastify instance.
 */
export async function contactsRoutes(fastify: FastifyInstance) {
    const contactUseCase = new ContactUseCase();

    /**
     * Middleware hook to handle authentication.
     */
    fastify.addHook('preHandler', authMiddleware);

    /**
     * Route for creating a new contact.
     * 
     * @route POST /
     * @param {ContactCreate} Body - The contact creation object containing name, email, and phone.
     * @returns {Promise<Contact>} The created contact.
     */
    fastify.post<{ Body: ContactCreate }>('/', async (request, reply) => {
        const { name, email, phone } = request.body;
        const emailUser = request.headers['email'];

        try {
            const data = await contactUseCase.create({
                email,
                name,
                phone,
                userEmail: emailUser,
            });
            return reply.send(data);
        } catch (error) {
            reply.send(error);
        }
    });

    /**
     * Route for listing all contacts for a specific user.
     * 
     * @route GET /
     * @returns {Promise<Contact[]>} A list of all contacts.
     */
    fastify.get('/', async (req, reply) => {
        const emailUser = req.headers['email'];
        try {
            const data = await contactUseCase.listAllContacts(emailUser);
            return reply.send(data);
        } catch (error) {
            reply.send(error);
        }
    });

    /**
     * Route for updating an existing contact by ID.
     * 
     * @route PUT /:id
     * @param {string} id - The ID of the contact to update.
     * @param {Contact} Body - The updated contact details including name, email, and phone.
     * @returns {Promise<Contact>} The updated contact.
     */
    fastify.put<{ Body: Contact; Params: { id: string } }>(
        '/:id',
        async (req, reply) => {
            const { id } = req.params;
            const { name, email, phone } = req.body;
            try {
                const data = await contactUseCase.updateContact({
                    id,
                    name,
                    email,
                    phone,
                });
                return reply.send(data);
            } catch (error) {
                reply.send(error);
            }
        },
    );

    /**
     * Route for deleting a contact by ID.
     * 
     * @route DELETE /:id
     * @param {string} id - The ID of the contact to delete.
     * @returns {Promise<string>} A message indicating whether the deletion was successful.
     */
    fastify.delete<{ Params: { id: string } }>('/:id', async (req, reply) => {
        const { id } = req.params;
        try {
            const data = await contactUseCase.delete(id);
            return reply.send(data);
        } catch (error) {
            reply.send(error);
        }
    });
}
