import { articles } from "./fakeArticle.js";

export async function articleRoute(app) {
    app.get('/articles',(request,reply) => {
        reply.send(articles)
    } );

    const schemaArticles = {
        params: {
            type: 'object',
            properties: {
                id: { type: 'number' },
            },
            additionalProperties: false,
        },
    }
    app.get('/articles/:id', { schema: schemaArticles }, (request, reply) => {
        const id = request.params.id;
        const article = articles.find((w) => w.id === id);
        if (!article) {
            return reply.code(404).send({ error: `Article ${request.params.id} not found` });
        }
        reply.send(article);
    });

    const schemaPost = {
        body: {
            type: 'object',
            properties: {
                title: { type: 'string' },
            },
            required: ['title'],
            additionalProperties: false,
        },
    }
    app.post('/articles', { schema: schemaPost }, (request, reply) => {
    reply.code(201).send({ message: 'Article created' });
});
    app.delete('/articles/:id', { schema: schemaArticles }, (req, reply) => {
        const id = req.params.id;
        const article = articles.find((x) => x.id === id);
        if (!article) {
            return reply.code(404).send({ error: `Article ${req.params.id} not found` });
        }
        reply.code(200).send({ message: "Article deleted" });
    });
}