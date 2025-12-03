import db from '../config/database.js';

// Listar todas as receitas do usuário
export const listarReceitas = async (req, res) => {
  try {
    const [receitas] = await db.query(
      `SELECT r.*, c.nome as categoria_nome, u.nome as usuario_nome
       FROM receitas r
       LEFT JOIN categorias c ON r.id_categorias = c.id
       LEFT JOIN usuarios u ON r.id_usuarios = u.id
       WHERE r.id_usuarios = ?
       ORDER BY r.criado_em DESC`,
      [req.user.id]
    );

    res.json(receitas);
  } catch (error) {
    console.error('Erro ao listar receitas:', error);
    res.status(500).json({ message: 'Erro ao listar receitas' });
  }
};

// Buscar receita por ID
export const buscarReceita = async (req, res) => {
  try {
    const { id } = req.params;

    const [receitas] = await db.query(
      `SELECT r.*, c.nome as categoria_nome, u.nome as usuario_nome
       FROM receitas r
       LEFT JOIN categorias c ON r.id_categorias = c.id
       LEFT JOIN usuarios u ON r.id_usuarios = u.id
       WHERE r.id = ? AND r.id_usuarios = ?`,
      [id, req.user.id]
    );

    if (receitas.length === 0) {
      return res.status(404).json({ message: 'Receita não encontrada' });
    }

    res.json(receitas[0]);
  } catch (error) {
    console.error('Erro ao buscar receita:', error);
    res.status(500).json({ message: 'Erro ao buscar receita' });
  }
};

// Criar nova receita
export const criarReceita = async (req, res) => {
  try {
    const {
      nome,
      id_categorias,
      tempo_preparo_minutos,
      porcoes,
      modo_preparo,
      ingredientes
    } = req.body;

    // Validações
    if (!nome || !modo_preparo) {
      return res.status(400).json({ message: 'Nome e modo de preparo são obrigatórios' });
    }

    const [result] = await db.query(
      `INSERT INTO receitas
       (id_usuarios, id_categorias, nome, tempo_preparo_minutos, porcoes, modo_preparo, ingredientes, criado_em, alterado_em)
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        req.user.id,
        id_categorias || null,
        nome,
        tempo_preparo_minutos || null,
        porcoes || null,
        modo_preparo,
        ingredientes || null
      ]
    );

    // Buscar receita criada
    const [novaReceita] = await db.query(
      `SELECT r.*, c.nome as categoria_nome
       FROM receitas r
       LEFT JOIN categorias c ON r.id_categorias = c.id
       WHERE r.id = ?`,
      [result.insertId]
    );

    res.status(201).json({
      message: 'Receita criada com sucesso',
      receita: novaReceita[0]
    });
  } catch (error) {
    console.error('Erro ao criar receita:', error);
    res.status(500).json({ message: 'Erro ao criar receita' });
  }
};

// Atualizar receita
export const atualizarReceita = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nome,
      id_categorias,
      tempo_preparo_minutos,
      porcoes,
      modo_preparo,
      ingredientes
    } = req.body;

    // Verificar se a receita existe e pertence ao usuário
    const [receitaExistente] = await db.query(
      'SELECT id FROM receitas WHERE id = ? AND id_usuarios = ?',
      [id, req.user.id]
    );

    if (receitaExistente.length === 0) {
      return res.status(404).json({ message: 'Receita não encontrada' });
    }

    await db.query(
      `UPDATE receitas
       SET nome = ?, id_categorias = ?, tempo_preparo_minutos = ?, porcoes = ?,
           modo_preparo = ?, ingredientes = ?, alterado_em = NOW()
       WHERE id = ? AND id_usuarios = ?`,
      [
        nome,
        id_categorias || null,
        tempo_preparo_minutos || null,
        porcoes || null,
        modo_preparo,
        ingredientes || null,
        id,
        req.user.id
      ]
    );

    // Buscar receita atualizada
    const [receitaAtualizada] = await db.query(
      `SELECT r.*, c.nome as categoria_nome
       FROM receitas r
       LEFT JOIN categorias c ON r.id_categorias = c.id
       WHERE r.id = ?`,
      [id]
    );

    res.json({
      message: 'Receita atualizada com sucesso',
      receita: receitaAtualizada[0]
    });
  } catch (error) {
    console.error('Erro ao atualizar receita:', error);
    res.status(500).json({ message: 'Erro ao atualizar receita' });
  }
};

// Deletar receita
export const deletarReceita = async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar se a receita existe e pertence ao usuário
    const [receitaExistente] = await db.query(
      'SELECT id FROM receitas WHERE id = ? AND id_usuarios = ?',
      [id, req.user.id]
    );

    if (receitaExistente.length === 0) {
      return res.status(404).json({ message: 'Receita não encontrada' });
    }

    await db.query(
      'DELETE FROM receitas WHERE id = ? AND id_usuarios = ?',
      [id, req.user.id]
    );

    res.json({ message: 'Receita deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar receita:', error);
    res.status(500).json({ message: 'Erro ao deletar receita' });
  }
};

// Listar todas as categorias
export const listarCategorias = async (req, res) => {
  try {
    const [categorias] = await db.query('SELECT * FROM categorias ORDER BY nome');
    res.json(categorias);
  } catch (error) {
    console.error('Erro ao listar categorias:', error);
    res.status(500).json({ message: 'Erro ao listar categorias' });
  }
};
