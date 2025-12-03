import db from '../config/database.js';
import bcrypt from 'bcrypt';

class User {
  /**
   * Busca usuário por ID
   */
  static async findById(id) {
    const [users] = await db.query(
      'SELECT id, nome, login, criado_em FROM usuarios WHERE id = ?',
      [id]
    );
    return users[0] || null;
  }

  /**
   * Busca usuário por email (login)
   */
  static async findByEmail(email) {
    const [users] = await db.query(
      'SELECT * FROM usuarios WHERE login = ?',
      [email]
    );
    return users[0] || null;
  }

  /**
   * Cria novo usuário
   */
  static async create(data) {
    const { name, email, password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.query(
      'INSERT INTO usuarios (nome, login, senha, criado_em, alterado_em) VALUES (?, ?, ?, NOW(), NOW())',
      [name, email, hashedPassword]
    );

    return await this.findById(result.insertId);
  }

  /**
   * Verifica se senha está correta
   */
  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  /**
   * Atualiza dados do usuário
   */
  static async update(id, data) {
    const { name } = data;

    await db.query(
      'UPDATE usuarios SET nome = ?, alterado_em = NOW() WHERE id = ?',
      [name, id]
    );

    return await this.findById(id);
  }

  /**
   * Deleta usuário
   */
  static async delete(id) {
    const [result] = await db.query(
      'DELETE FROM usuarios WHERE id = ?',
      [id]
    );
    return result.affectedRows > 0;
  }
}

export default User;
