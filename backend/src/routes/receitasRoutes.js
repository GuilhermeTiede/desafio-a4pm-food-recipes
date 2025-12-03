import express from 'express';
import {
  listarReceitas,
  buscarReceita,
  criarReceita,
  atualizarReceita,
  deletarReceita,
  listarCategorias,
  criarCategoria,
  adicionarFavorito,
  removerFavorito,
  listarFavoritos,
  avaliarReceita,
  removerAvaliacao,
  listarAvaliacoes
} from '../controllers/receitasController.js';
import { authenticateToken } from '../middlewares/auth.js';

const router = express.Router();

// Todas as rotas de receitas são protegidas
router.use(authenticateToken);

/**
 * @swagger
 * /receitas/categorias:
 *   get:
 *     summary: Listar categorias
 *     description: Retorna todas as categorias de receitas disponíveis
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Categoria'
 *       401:
 *         description: Não autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/categorias', listarCategorias);

/**
 * @swagger
 * /receitas/categorias:
 *   post:
 *     summary: Criar categoria
 *     description: Cria uma nova categoria de receita
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome da categoria
 *                 example: Pratos Vegetarianos
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Categoria criada com sucesso
 *                 categoria:
 *                   $ref: '#/components/schemas/Categoria'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Não autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/categorias', criarCategoria);

/**
 * @swagger
 * /receitas:
 *   get:
 *     summary: Listar receitas
 *     description: Retorna todas as receitas do usuário autenticado
 *     tags: [Receitas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de receitas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Receita'
 *       401:
 *         description: Não autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', listarReceitas);

/**
 * @swagger
 * /receitas/{id}:
 *   get:
 *     summary: Buscar receita por ID
 *     description: Retorna uma receita específica do usuário autenticado
 *     tags: [Receitas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da receita
 *     responses:
 *       200:
 *         description: Dados da receita
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Receita'
 *       401:
 *         description: Não autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Receita não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', buscarReceita);

/**
 * @swagger
 * /receitas:
 *   post:
 *     summary: Criar receita
 *     description: Cria uma nova receita para o usuário autenticado
 *     tags: [Receitas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - modo_preparo
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome da receita
 *                 example: Bolo de Chocolate
 *               id_categorias:
 *                 type: integer
 *                 nullable: true
 *                 description: ID da categoria
 *                 example: 1
 *               tempo_preparo_minutos:
 *                 type: integer
 *                 nullable: true
 *                 description: Tempo de preparo em minutos
 *                 example: 45
 *               porcoes:
 *                 type: integer
 *                 nullable: true
 *                 description: Número de porções
 *                 example: 8
 *               modo_preparo:
 *                 type: string
 *                 description: Instruções de preparo
 *                 example: Misture todos os ingredientes e asse por 30 minutos...
 *               ingredientes:
 *                 type: string
 *                 nullable: true
 *                 description: Lista de ingredientes
 *                 example: 2 xícaras de farinha, 1 xícara de açúcar, 3 ovos...
 *     responses:
 *       201:
 *         description: Receita criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Receita criada com sucesso
 *                 receita:
 *                   $ref: '#/components/schemas/Receita'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Não autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', criarReceita);

/**
 * @swagger
 * /receitas/{id}:
 *   put:
 *     summary: Atualizar receita
 *     description: Atualiza uma receita existente do usuário autenticado
 *     tags: [Receitas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da receita
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 description: Nome da receita
 *                 example: Bolo de Chocolate Atualizado
 *               id_categorias:
 *                 type: integer
 *                 nullable: true
 *                 description: ID da categoria
 *                 example: 1
 *               tempo_preparo_minutos:
 *                 type: integer
 *                 nullable: true
 *                 description: Tempo de preparo em minutos
 *                 example: 50
 *               porcoes:
 *                 type: integer
 *                 nullable: true
 *                 description: Número de porções
 *                 example: 10
 *               modo_preparo:
 *                 type: string
 *                 description: Instruções de preparo
 *                 example: Misture todos os ingredientes e asse por 35 minutos...
 *               ingredientes:
 *                 type: string
 *                 nullable: true
 *                 description: Lista de ingredientes
 *                 example: 2 xícaras de farinha, 1 xícara de açúcar, 4 ovos...
 *     responses:
 *       200:
 *         description: Receita atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Receita atualizada com sucesso
 *                 receita:
 *                   $ref: '#/components/schemas/Receita'
 *       401:
 *         description: Não autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Receita não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', atualizarReceita);

/**
 * @swagger
 * /receitas/{id}:
 *   delete:
 *     summary: Deletar receita
 *     description: Remove uma receita do usuário autenticado
 *     tags: [Receitas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da receita
 *     responses:
 *       200:
 *         description: Receita deletada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Receita deletada com sucesso
 *       401:
 *         description: Não autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       404:
 *         description: Receita não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       500:
 *         description: Erro interno do servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', deletarReceita);

// Rotas de favoritos
router.get('/favoritos/list', listarFavoritos);
router.post('/:id/favorito', adicionarFavorito);
router.delete('/:id/favorito', removerFavorito);

// Rotas de avaliações
router.get('/:id/avaliacoes', listarAvaliacoes);
router.post('/:id/avaliar', avaliarReceita);
router.delete('/:id/avaliar', removerAvaliacao);

export default router;
