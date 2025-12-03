import Recipe from '../models/Recipe.js';
import Category from '../models/Category.js';

// Listar todas as receitas do usuário
export const listarReceitas = async (req, res) => {
  try {
    const { search, categoryId, sortBy, sortOrder } = req.query;

    const recipes = await Recipe.findByUserId(req.user.id, {
      search,
      categoryId,
      sortBy,
      sortOrder
    });

    res.json(recipes);
  } catch (error) {
    console.error('Erro ao listar receitas:', error);
    res.status(500).json({ message: 'Erro ao listar receitas' });
  }
};

// Buscar receita por ID
export const buscarReceita = async (req, res) => {
  try {
    const { id } = req.params;

    const recipe = await Recipe.findById(id, req.user.id);

    if (!recipe) {
      return res.status(404).json({ message: 'Receita não encontrada' });
    }

    res.json(recipe);
  } catch (error) {
    console.error('Erro ao buscar receita:', error);
    res.status(500).json({ message: 'Erro ao buscar receita' });
  }
};

// Criar nova receita
export const criarReceita = async (req, res) => {
  try {
    const { nome, modo_preparo } = req.body;

    // Validações
    if (!nome || !modo_preparo) {
      return res.status(400).json({ message: 'Nome e modo de preparo são obrigatórios' });
    }

    const novaReceita = await Recipe.create(req.user.id, req.body);

    res.status(201).json({
      message: 'Receita criada com sucesso',
      receita: novaReceita
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

    const receitaAtualizada = await Recipe.update(id, req.user.id, req.body);

    if (!receitaAtualizada) {
      return res.status(404).json({ message: 'Receita não encontrada' });
    }

    res.json({
      message: 'Receita atualizada com sucesso',
      receita: receitaAtualizada
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

    const deleted = await Recipe.delete(id, req.user.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Receita não encontrada' });
    }

    res.json({ message: 'Receita deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar receita:', error);
    res.status(500).json({ message: 'Erro ao deletar receita' });
  }
};

// Listar todas as categorias
export const listarCategorias = async (req, res) => {
  try {
    const categorias = await Category.findAllWithStats();
    res.json(categorias);
  } catch (error) {
    console.error('Erro ao listar categorias:', error);
    res.status(500).json({ message: 'Erro ao listar categorias' });
  }
};

// Criar nova categoria
export const criarCategoria = async (req, res) => {
  try {
    const { nome } = req.body;

    // Validação
    if (!nome || !nome.trim()) {
      return res.status(400).json({ message: 'Nome da categoria é obrigatório' });
    }

    const novaCategoria = await Category.create(nome.trim());

    res.status(201).json({
      message: 'Categoria criada com sucesso',
      categoria: novaCategoria
    });
  } catch (error) {
    console.error('Erro ao criar categoria:', error);
    res.status(500).json({ message: 'Erro ao criar categoria' });
  }
};

// Adicionar receita aos favoritos
export const adicionarFavorito = async (req, res) => {
  try {
    const { id } = req.params;

    const added = await Recipe.addToFavorites(req.user.id, id);

    if (!added) {
      return res.status(400).json({ message: 'Receita já está nos favoritos' });
    }

    res.json({ message: 'Receita adicionada aos favoritos' });
  } catch (error) {
    console.error('Erro ao adicionar favorito:', error);
    res.status(500).json({ message: 'Erro ao adicionar favorito' });
  }
};

// Remover receita dos favoritos
export const removerFavorito = async (req, res) => {
  try {
    const { id } = req.params;

    const removed = await Recipe.removeFromFavorites(req.user.id, id);

    if (!removed) {
      return res.status(404).json({ message: 'Receita não está nos favoritos' });
    }

    res.json({ message: 'Receita removida dos favoritos' });
  } catch (error) {
    console.error('Erro ao remover favorito:', error);
    res.status(500).json({ message: 'Erro ao remover favorito' });
  }
};

// Listar receitas favoritas
export const listarFavoritos = async (req, res) => {
  try {
    const favoritos = await Recipe.findFavorites(req.user.id);
    res.json(favoritos);
  } catch (error) {
    console.error('Erro ao listar favoritos:', error);
    res.status(500).json({ message: 'Erro ao listar favoritos' });
  }
};

// Avaliar receita
export const avaliarReceita = async (req, res) => {
  try {
    const { id } = req.params;
    const { nota, comentario } = req.body;

    // Validação
    if (!nota || nota < 1 || nota > 5) {
      return res.status(400).json({ message: 'Nota deve ser entre 1 e 5' });
    }

    await Recipe.addRating(req.user.id, id, nota, comentario);

    res.json({ message: 'Avaliação registrada com sucesso' });
  } catch (error) {
    console.error('Erro ao avaliar receita:', error);
    res.status(500).json({ message: 'Erro ao avaliar receita' });
  }
};

// Remover avaliação
export const removerAvaliacao = async (req, res) => {
  try {
    const { id } = req.params;

    const removed = await Recipe.removeRating(req.user.id, id);

    if (!removed) {
      return res.status(404).json({ message: 'Avaliação não encontrada' });
    }

    res.json({ message: 'Avaliação removida com sucesso' });
  } catch (error) {
    console.error('Erro ao remover avaliação:', error);
    res.status(500).json({ message: 'Erro ao remover avaliação' });
  }
};

// Listar avaliações de uma receita
export const listarAvaliacoes = async (req, res) => {
  try {
    const { id } = req.params;

    const avaliacoes = await Recipe.getRatings(id);
    res.json(avaliacoes);
  } catch (error) {
    console.error('Erro ao listar avaliações:', error);
    res.status(500).json({ message: 'Erro ao listar avaliações' });
  }
};
