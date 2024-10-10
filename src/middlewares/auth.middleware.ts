export function authMiddleware(req: any, reply: any, done: any) {
    const apiEmail = req.headers['email'];

    if (!apiEmail) {
        reply.status(401).send({
            message: 'Email is required',
        });
    } else {
        done();
    }
}
