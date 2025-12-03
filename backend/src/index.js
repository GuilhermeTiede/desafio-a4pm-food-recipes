import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import authRoutes from './routes/authRoutes.js';
import receitasRoutes from './routes/receitasRoutes.js';
import './config/database.js'; // Inicializar conexão com banco

dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());

// Documentação Swagger
app.use('/api-docs', swaggerUi.serve);
app.get('/api-docs', swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'API A4PM - Documentação'
}));

// Rotas
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'API A4PM - Soluções Inteligentes' });
});

app.use('/api/auth', authRoutes);
app.use('/api/receitas', receitasRoutes);

// Rota 404 - deve ser a última
app.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Erro interno do servidor' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 API rodando em http://localhost:${port}`);
  console.log(`📚 Documentação: http://localhost:${port}/api-docs`);
  console.log(`📚 Ambiente: ${process.env.NODE_ENV}`);
});
