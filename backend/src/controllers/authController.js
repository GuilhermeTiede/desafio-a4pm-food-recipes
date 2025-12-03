import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../config/database.js';
import dotenv from 'dotenv';

dotenv.config();

export const register = async (req, res) => {
  try {
    const { name, email, password, password_confirmation } = req.body;

    // Validações
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    if (password !== password_confirmation) {
      return res.status(400).json({ message: 'As senhas não coincidem' });
    }

    // Verificar se usuário já existe
    const [existingUser] = await db.query(
      'SELECT id FROM usuarios WHERE login = ?',
      [email]
    );

    if (existingUser.length > 0) {
      return res.status(409).json({ message: 'Usuário já existe' });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Inserir usuário
    const [result] = await db.query(
      'INSERT INTO usuarios (nome, login, senha, criado_em, alterado_em) VALUES (?, ?, ?, NOW(), NOW())',
      [name, email, hashedPassword]
    );

    // Buscar usuário criado
    const [newUser] = await db.query(
      'SELECT id, nome, login, criado_em FROM usuarios WHERE id = ?',
      [result.insertId]
    );

    // Gerar token
    const token = jwt.sign(
      { id: newUser[0].id, email: newUser[0].login },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({
      message: 'Usuário registrado com sucesso',
      token,
      user: {
        id: newUser[0].id,
        name: newUser[0].nome,
        email: newUser[0].login
      }
    });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({ message: 'Erro ao registrar usuário' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validações
    if (!email || !password) {
      return res.status(400).json({ message: 'E-mail e senha são obrigatórios' });
    }

    // Buscar usuário
    const [users] = await db.query(
      'SELECT id, nome, login, senha FROM usuarios WHERE login = ?',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const user = users[0];

    // Verificar senha
    const isValidPassword = await bcrypt.compare(password, user.senha);

    if (!isValidPassword) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Gerar token
    const token = jwt.sign(
      { id: user.id, email: user.login },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({
      message: 'Login realizado com sucesso',
      token,
      user: {
        id: user.id,
        name: user.nome,
        email: user.login
      }
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ message: 'Erro ao fazer login' });
  }
};

export const getUser = async (req, res) => {
  try {
    const [users] = await db.query(
      'SELECT id, nome, login, criado_em FROM usuarios WHERE id = ?',
      [req.user.id]
    );

    if (users.length === 0) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const user = users[0];

    res.json({
      id: user.id,
      name: user.nome,
      email: user.login,
      created_at: user.criado_em
    });
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ message: 'Erro ao buscar usuário' });
  }
};

export const logout = async (req, res) => {
  // Como estamos usando JWT stateless, o logout é feito no frontend
  // removendo o token. Aqui apenas retornamos sucesso.
  res.json({ message: 'Logout realizado com sucesso' });
};
