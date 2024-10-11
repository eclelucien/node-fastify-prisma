import { FastifyReply, FastifyRequest } from 'fastify';

/**
 * Middleware to authenticate requests based on the presence of an email in the request headers.
 * 
 * @param {FastifyRequest} req - The Fastify request object.
 * @param {FastifyReply} reply - The Fastify reply object to send responses.
 * @returns {Promise<void>} A promise that resolves when the middleware has completed.
 */
export async function authMiddleware(req: FastifyRequest, reply: FastifyReply) {
    
  const apiEmail = req.headers['email'];

  if (!apiEmail) {
    reply.status(401).send({
      message: 'Email is required',
    });
  }
}
