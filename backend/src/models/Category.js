import db from "../config/database.js";

class Category {
  /**
   * Lista todas as categorias
   */
  static async findAll() {
    const [categories] = await db.query(
      "SELECT * FROM categorias ORDER BY nome"
    );
    return categories;
  }

  /**
   * Busca categoria por ID
   */
  static async findById(id) {
    const [categories] = await db.query(
      "SELECT * FROM categorias WHERE id = ?",
      [id]
    );
    return categories[0] || null;
  }

  /**
   * Conta receitas por categoria
   */
  static async getRecipeCount(categoryId) {
    const [result] = await db.query(
      "SELECT COUNT(*) as total FROM receitas WHERE id_categorias = ?",
      [categoryId]
    );
    return result[0].total;
  }

  /**
   * Lista categorias com estatísticas
   */
  static async findAllWithStats() {
    const [categories] = await db.query(
      `SELECT c.*,
              COUNT(r.id) as total_receitas,
              COALESCE(AVG(av.nota), 0) as media_avaliacoes
       FROM categorias c
       LEFT JOIN receitas r ON c.id = r.id_categorias
       LEFT JOIN avaliacoes av ON r.id = av.id_receitas
       GROUP BY c.id
       ORDER BY c.nome`
    );
    return categories;
  }

  /**
   * Cria nova categoria
   */
  static async create(nome) {
    const [result] = await db.query(
      "INSERT INTO categorias (nome) VALUES (?)",
      [nome]
    );
    return await this.findById(result.insertId);
  }
}

export default Category;
