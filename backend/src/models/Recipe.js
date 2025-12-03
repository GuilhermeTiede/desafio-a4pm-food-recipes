import db from '../config/database.js';

class Recipe {
  /**
   * Lista todas as receitas de um usuário
   */
  static async findByUserId(userId, options = {}) {
    const { search, categoryId, sortBy = 'criado_em', sortOrder = 'DESC' } = options;

    let query = `
      SELECT r.*, c.nome as categoria_nome, u.nome as usuario_nome,
             COALESCE(AVG(av.nota), 0) as media_avaliacoes,
             COUNT(DISTINCT av.id) as total_avaliacoes,
             COUNT(DISTINCT f.id) as total_favoritos,
             EXISTS(
               SELECT 1 FROM favoritos
               WHERE id_usuarios = ? AND id_receitas = r.id
             ) as is_favorito
      FROM receitas r
      LEFT JOIN categorias c ON r.id_categorias = c.id
      LEFT JOIN usuarios u ON r.id_usuarios = u.id
      LEFT JOIN avaliacoes av ON r.id = av.id_receitas
      LEFT JOIN favoritos f ON r.id = f.id_receitas
      WHERE r.id_usuarios = ?
    `;

    const params = [userId, userId];

    // Busca por texto
    if (search) {
      query += ` AND (r.nome LIKE ? OR r.ingredientes LIKE ? OR r.modo_preparo LIKE ?)`;
      const searchTerm = `%${search}%`;
      params.push(searchTerm, searchTerm, searchTerm);
    }

    // Filtro por categoria
    if (categoryId) {
      query += ` AND r.id_categorias = ?`;
      params.push(categoryId);
    }

    query += ` GROUP BY r.id ORDER BY r.${sortBy} ${sortOrder}`;

    const [recipes] = await db.query(query, params);
    return recipes;
  }

  /**
   * Busca receita por ID
   */
  static async findById(id, userId) {
    const [recipes] = await db.query(
      `SELECT r.*, c.nome as categoria_nome, u.nome as usuario_nome,
              COALESCE(AVG(av.nota), 0) as media_avaliacoes,
              COUNT(DISTINCT av.id) as total_avaliacoes,
              COUNT(DISTINCT f.id) as total_favoritos,
              EXISTS(
                SELECT 1 FROM favoritos
                WHERE id_usuarios = ? AND id_receitas = r.id
              ) as is_favorito
       FROM receitas r
       LEFT JOIN categorias c ON r.id_categorias = c.id
       LEFT JOIN usuarios u ON r.id_usuarios = u.id
       LEFT JOIN avaliacoes av ON r.id = av.id_receitas
       LEFT JOIN favoritos f ON r.id = f.id_receitas
       WHERE r.id = ? AND r.id_usuarios = ?
       GROUP BY r.id`,
      [userId, id, userId]
    );

    return recipes[0] || null;
  }

  /**
   * Cria nova receita
   */
  static async create(userId, data) {
    const {
      nome,
      id_categorias,
      tempo_preparo_minutos,
      porcoes,
      modo_preparo,
      ingredientes
    } = data;

    const [result] = await db.query(
      `INSERT INTO receitas
       (id_usuarios, id_categorias, nome, tempo_preparo_minutos, porcoes, modo_preparo, ingredientes, criado_em, alterado_em)
       VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [userId, id_categorias || null, nome, tempo_preparo_minutos || null, porcoes || null, modo_preparo, ingredientes || null]
    );

    return await this.findById(result.insertId, userId);
  }

  /**
   * Atualiza receita
   */
  static async update(id, userId, data) {
    const {
      nome,
      id_categorias,
      tempo_preparo_minutos,
      porcoes,
      modo_preparo,
      ingredientes
    } = data;

    const [result] = await db.query(
      `UPDATE receitas
       SET nome = ?, id_categorias = ?, tempo_preparo_minutos = ?, porcoes = ?,
           modo_preparo = ?, ingredientes = ?, alterado_em = NOW()
       WHERE id = ? AND id_usuarios = ?`,
      [nome, id_categorias || null, tempo_preparo_minutos || null, porcoes || null, modo_preparo, ingredientes || null, id, userId]
    );

    if (result.affectedRows === 0) {
      return null;
    }

    return await this.findById(id, userId);
  }

  /**
   * Deleta receita
   */
  static async delete(id, userId) {
    const [result] = await db.query(
      'DELETE FROM receitas WHERE id = ? AND id_usuarios = ?',
      [id, userId]
    );
    return result.affectedRows > 0;
  }

  /**
   * Adiciona receita aos favoritos
   */
  static async addToFavorites(userId, recipeId) {
    try {
      await db.query(
        'INSERT INTO favoritos (id_usuarios, id_receitas, criado_em) VALUES (?, ?, NOW())',
        [userId, recipeId]
      );
      return true;
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return false; // Já está nos favoritos
      }
      throw error;
    }
  }

  /**
   * Remove receita dos favoritos
   */
  static async removeFromFavorites(userId, recipeId) {
    const [result] = await db.query(
      'DELETE FROM favoritos WHERE id_usuarios = ? AND id_receitas = ?',
      [userId, recipeId]
    );
    return result.affectedRows > 0;
  }

  /**
   * Lista receitas favoritas do usuário
   */
  static async findFavorites(userId) {
    const [recipes] = await db.query(
      `SELECT r.*, c.nome as categoria_nome, u.nome as usuario_nome,
              COALESCE(AVG(av.nota), 0) as media_avaliacoes,
              COUNT(DISTINCT av.id) as total_avaliacoes,
              f.criado_em as favoritado_em
       FROM favoritos f
       INNER JOIN receitas r ON f.id_receitas = r.id
       LEFT JOIN categorias c ON r.id_categorias = c.id
       LEFT JOIN usuarios u ON r.id_usuarios = u.id
       LEFT JOIN avaliacoes av ON r.id = av.id_receitas
       WHERE f.id_usuarios = ?
       GROUP BY r.id
       ORDER BY f.criado_em DESC`,
      [userId]
    );
    return recipes;
  }

  /**
   * Adiciona ou atualiza avaliação
   */
  static async addRating(userId, recipeId, nota, comentario = null) {
    const [existing] = await db.query(
      'SELECT id FROM avaliacoes WHERE id_usuarios = ? AND id_receitas = ?',
      [userId, recipeId]
    );

    if (existing.length > 0) {
      // Atualiza avaliação existente
      await db.query(
        'UPDATE avaliacoes SET nota = ?, comentario = ?, alterado_em = NOW() WHERE id = ?',
        [nota, comentario, existing[0].id]
      );
    } else {
      // Cria nova avaliação
      await db.query(
        'INSERT INTO avaliacoes (id_usuarios, id_receitas, nota, comentario, criado_em, alterado_em) VALUES (?, ?, ?, ?, NOW(), NOW())',
        [userId, recipeId, nota, comentario]
      );
    }

    return true;
  }

  /**
   * Remove avaliação
   */
  static async removeRating(userId, recipeId) {
    const [result] = await db.query(
      'DELETE FROM avaliacoes WHERE id_usuarios = ? AND id_receitas = ?',
      [userId, recipeId]
    );
    return result.affectedRows > 0;
  }

  /**
   * Busca avaliações de uma receita
   */
  static async getRatings(recipeId) {
    const [ratings] = await db.query(
      `SELECT av.*, u.nome as usuario_nome
       FROM avaliacoes av
       INNER JOIN usuarios u ON av.id_usuarios = u.id
       WHERE av.id_receitas = ?
       ORDER BY av.criado_em DESC`,
      [recipeId]
    );
    return ratings;
  }
}

export default Recipe;
