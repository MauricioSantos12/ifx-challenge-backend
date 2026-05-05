const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'IFX Challenge API',
      version: '1.0.0',
      description: 'API RESTful para gestión de Máquinas Virtuales',
    },
    servers: [{ url: '/api/v1' }],
    components: {
      cookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'token',
      },
      schemas: {
        Login: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', example: 'admin@ifx.com' },
            password: { type: 'string', example: 'Admin123!' },
          },
        },
        VM: {
          type: 'object',
          properties: {
            id: { type: 'string', format: 'uuid' },
            name: { type: 'string' },
            cores: { type: 'integer' },
            ram: { type: 'number' },
            disk: { type: 'number' },
            os: { type: 'string' },
            status: { type: 'string', enum: ['Encendida', 'Apagada'] },
            isDeleted: { type: 'boolean' },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
          },
        },
        CreateVM: {
          type: 'object',
          required: ['name', 'cores', 'ram', 'disk', 'os', 'status'],
          properties: {
            name: { type: 'string', example: 'VM-01' },
            cores: { type: 'integer', example: 4 },
            ram: { type: 'number', example: 16 },
            disk: { type: 'number', example: 100 },
            os: { type: 'string', example: 'Linux' },
            status: { type: 'string', enum: ['Encendida', 'Apagada'], example: 'Apagada' },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsdoc(options);
