import { home } from './home.js';


export async function routes(app) {
  app.get('/', home);
  app.get('/hello', (request,reply) => {
    const message = request.query.name
    ? `Hello ${request.query.name}`
    : 'Hello world';

    reply.send({message});
  } );

  const messageSchema = {
    body: {
        type: 'object',
        properties: {
            message: { type: 'string' },
            random: { type: 'string' },
        },
        required: ['message'],
        additionalProperties: false,
    },
}   

  app.post('/message', { schema: messageSchema }, (request, reply) => {
    const data = request.body
    reply.send({
        message: 'Message received',
        data: data,
    })
}   );
}


