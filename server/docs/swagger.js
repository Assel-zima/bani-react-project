export const swaggerDocument = {
  openapi: '3.0.0',
  info: {
    title: 'Bani Backend API',
    version: '1.0.0',
    description: 'REST API for users, services, projects, orders, reviews, JWT auth and MongoDB relations.',
  },
  servers: [{ url: '/api' }],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  paths: {
    '/health': {
      get: {
        summary: 'Health check',
        responses: { 200: { description: 'Server is running' } },
      },
    },
    '/auth/register': {
      post: {
        summary: 'Register user',
        responses: { 201: { description: 'User registered and token returned' } },
      },
    },
    '/auth/login': {
      post: {
        summary: 'Login user',
        responses: { 200: { description: 'User authenticated and token returned' } },
      },
    },
    '/auth/me': {
      get: {
        summary: 'Current user profile',
        security: [{ bearerAuth: [] }],
        responses: { 200: { description: 'Current user' } },
      },
    },
    '/users': createCrudPath('Users', true),
    '/users/{id}': createCrudByIdPath('Users', true),
    '/services': createCrudPath('Services'),
    '/services/{id}': createCrudByIdPath('Services'),
    '/projects': createCrudPath('Projects'),
    '/projects/{id}': createCrudByIdPath('Projects'),
    '/orders': createCrudPath('Orders', true),
    '/orders/{id}': createCrudByIdPath('Orders', true),
    '/reviews': createCrudPath('Reviews'),
    '/reviews/{id}': createCrudByIdPath('Reviews'),
  },
}

function createCrudPath(tag, secured = false) {
  const security = secured ? [{ bearerAuth: [] }] : undefined

  return {
    get: {
      summary: `Get all ${tag.toLowerCase()}`,
      security,
      responses: { 200: { description: `${tag} list` } },
    },
    post: {
      summary: `Create ${tag.slice(0, -1).toLowerCase()}`,
      security: [{ bearerAuth: [] }],
      responses: { 201: { description: `${tag.slice(0, -1)} created` } },
    },
  }
}

function createCrudByIdPath(tag, secured = false) {
  const security = secured ? [{ bearerAuth: [] }] : undefined

  return {
    get: {
      summary: `Get ${tag.slice(0, -1).toLowerCase()} by id`,
      security,
      parameters: [idParam()],
      responses: { 200: { description: `${tag.slice(0, -1)} item` } },
    },
    put: {
      summary: `Update ${tag.slice(0, -1).toLowerCase()}`,
      security: [{ bearerAuth: [] }],
      parameters: [idParam()],
      responses: { 200: { description: `${tag.slice(0, -1)} updated` } },
    },
    delete: {
      summary: `Delete ${tag.slice(0, -1).toLowerCase()}`,
      security: [{ bearerAuth: [] }],
      parameters: [idParam()],
      responses: { 200: { description: `${tag.slice(0, -1)} deleted` } },
    },
  }
}

function idParam() {
  return {
    name: 'id',
    in: 'path',
    required: true,
    schema: { type: 'string' },
  }
}
