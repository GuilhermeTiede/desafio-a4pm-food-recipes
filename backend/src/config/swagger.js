import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API A4PM - Sistema de Gerenciamento de Receitas',
      version: '1.0.0',
      description: 'API para gerenciamento de receitas culinárias com autenticação JWT',
      contact: {
        name: 'A4PM - Soluções Inteligentes',
        url: 'https://a4pm.com.br'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor de Desenvolvimento'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Insira o token JWT no formato: Bearer {token}'
        }
      },
      schemas: {
        Usuario: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID do usuário'
            },
            name: {
              type: 'string',
              description: 'Nome completo do usuário'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'E-mail do usuário'
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação do usuário'
            }
          }
        },
        Receita: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID da receita'
            },
            id_usuarios: {
              type: 'integer',
              description: 'ID do usuário proprietário'
            },
            id_categorias: {
              type: 'integer',
              nullable: true,
              description: 'ID da categoria'
            },
            nome: {
              type: 'string',
              description: 'Nome da receita'
            },
            tempo_preparo_minutos: {
              type: 'integer',
              nullable: true,
              description: 'Tempo de preparo em minutos'
            },
            porcoes: {
              type: 'integer',
              nullable: true,
              description: 'Número de porções'
            },
            modo_preparo: {
              type: 'string',
              description: 'Instruções de preparo'
            },
            ingredientes: {
              type: 'string',
              nullable: true,
              description: 'Lista de ingredientes'
            },
            categoria_nome: {
              type: 'string',
              description: 'Nome da categoria'
            },
            usuario_nome: {
              type: 'string',
              description: 'Nome do usuário'
            },
            criado_em: {
              type: 'string',
              format: 'date-time',
              description: 'Data de criação'
            },
            alterado_em: {
              type: 'string',
              format: 'date-time',
              description: 'Data da última alteração'
            }
          }
        },
        Categoria: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID da categoria'
            },
            nome: {
              type: 'string',
              description: 'Nome da categoria'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Mensagem de erro'
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Autenticação',
        description: 'Endpoints de autenticação e gerenciamento de usuários'
      },
      {
        name: 'Receitas',
        description: 'Endpoints de gerenciamento de receitas culinárias'
      },
      {
        name: 'Categorias',
        description: 'Endpoints de categorias de receitas'
      }
    ]
  },
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
