import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

export const useReceitasStore = defineStore('receitas', () => {
  const receitas = ref([])
  const categorias = ref([])
  const loading = ref(false)

  async function listarReceitas() {
    loading.value = true
    try {
      const response = await api.get('/receitas')
      receitas.value = response.data
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erro ao listar receitas'
      }
    } finally {
      loading.value = false
    }
  }

  async function buscarReceita(id) {
    loading.value = true
    try {
      const response = await api.get(`/receitas/${id}`)
      return { success: true, data: response.data }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erro ao buscar receita'
      }
    } finally {
      loading.value = false
    }
  }

  async function criarReceita(dados) {
    loading.value = true
    try {
      const response = await api.post('/receitas', dados)
      receitas.value.unshift(response.data.receita)
      return { success: true, data: response.data.receita }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erro ao criar receita'
      }
    } finally {
      loading.value = false
    }
  }

  async function atualizarReceita(id, dados) {
    loading.value = true
    try {
      const response = await api.put(`/receitas/${id}`, dados)
      const index = receitas.value.findIndex(r => r.id === id)
      if (index !== -1) {
        receitas.value[index] = response.data.receita
      }
      return { success: true, data: response.data.receita }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erro ao atualizar receita'
      }
    } finally {
      loading.value = false
    }
  }

  async function deletarReceita(id) {
    loading.value = true
    try {
      await api.delete(`/receitas/${id}`)
      receitas.value = receitas.value.filter(r => r.id !== id)
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erro ao deletar receita'
      }
    } finally {
      loading.value = false
    }
  }

  async function listarCategorias() {
    try {
      const response = await api.get('/receitas/categorias')
      categorias.value = response.data
      return { success: true }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Erro ao listar categorias'
      }
    }
  }

  return {
    receitas,
    categorias,
    loading,
    listarReceitas,
    buscarReceita,
    criarReceita,
    atualizarReceita,
    deletarReceita,
    listarCategorias
  }
})
