import jwt from 'jsonwebtoken';
import User from '../models/User.js';
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
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'Usuário já existe' });
    }

    // Criar usuário
    const newUser = await User.create({ name, email, password });

    // Gerar token
    const token = jwt.sign(
      { id: newUser.id, email: newUser.login },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(201).json({
      message: 'Usuário registrado com sucesso',
      token,
      user: {
        id: newUser.id,
        name: newUser.nome,
        email: newUser.login
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
    const user = await User.findByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    // Verificar senha
    const isValidPassword = await User.verifyPassword(password, user.senha);
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
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

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
