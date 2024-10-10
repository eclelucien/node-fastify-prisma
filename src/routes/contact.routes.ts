import { FastifyInstance } from "fastify";
import { ContactUseCase } from "../usecases/contact.usecase";
import { ContactCreate } from "../interfaces/contact.interface";
import { authMiddleware } from "../middlewares/auth.middleware";

export async function contactRoutes(fastify: FastifyInstance) {

    const contactUseCase = new ContactUseCase();

    fastify.addHook('preHandler', authMiddleware);

    fastify.post<{ Body: ContactCreate }>('/', async (req, reply) => {
        const { name, email, phone } = req.body;

        const userEmail = req.headers['email'] as string;
        try {
            const data = await contactUseCase.create({
                name,
                email,
                phone,
                userEmail,
            });
            return reply.status(201).send(data);
        } catch (error: any) {
            reply.status(400).send({ error: error.message });
        }
    });

    fastify.get('/', (req, reply) => {
        reply.send({ hello: 'world' });
    });
}
