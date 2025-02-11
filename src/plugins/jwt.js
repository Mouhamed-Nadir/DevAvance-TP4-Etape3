import fp from 'fastify-plugin'
import fastifyJwt from "@fastify/jwt";
import fs from 'fs';

export default fp(async function (app, opts) {

    const privateKey = fs.readFileSync('.ssl/ec_private.pem', 'utf8');
    const publicKey = fs.readFileSync('.ssl/ec_public.pem', 'utf8');

    app.register(fastifyJwt, {
        secret: {
            private: privateKey,
            public: publicKey
        },
        sign: {
            algorithm: 'ES256',
            issuer: 'info.iutparis.fr'
        },
        verify: {
            algorithms: ['ES256'] // Autorise uniquement ES256
        }
    })

})