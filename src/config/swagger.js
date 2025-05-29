const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Post App API',
            version: '1.0.0',
            description: 'API REST desarrollada con Node.js, Express y Sequelize, que utiliza Redis + BullMQ para manejo de colas',
            contact: {
                name: 'Mickcore',
            },
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor de desarrollo',
            },
        ],
        components: {
            securitySchemes: {
                ApiKeyAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'x-api-key',
                    description: 'API Key para autenticación',
                },
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    description: 'JWT token para autenticación',
                },
            },
        },
        security: [
            {
                ApiKeyAuth: [],
                BearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/*.js', './src/models/*.js'], // Rutas de los archivos con anotaciones
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec; 