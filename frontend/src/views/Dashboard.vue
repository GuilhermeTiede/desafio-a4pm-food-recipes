<template>
  <AuthenticatedLayout>
    <div class="space-y-6">
      <!-- Cabeçalho -->
      <div class="bg-gradient-to-r from-a4pm-orange to-a4pm-orange-light rounded-lg p-8 text-white shadow-lg">
        <h2 class="text-3xl font-bold">Olá, {{ user?.name?.split(' ')[0] || 'Usuário' }}! 👨‍🍳</h2>
        <p class="mt-2 text-white/90">Bem-vindo ao seu livro de receitas digital</p>
      </div>

      <!-- Ações Rápidas -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Card Minhas Receitas -->
        <router-link to="/receitas">
          <Card class="hover:shadow-lg transition-all cursor-pointer border-2 border-a4pm-gray-200 hover:border-a4pm-orange">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-3">
                  <div class="w-12 h-12 bg-a4pm-orange/10 rounded-full flex items-center justify-center">
                    <svg class="w-6 h-6 text-a4pm-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-xl font-semibold text-a4pm-gray-900">Minhas Receitas</h3>
                    <p class="text-sm text-a4pm-gray-600">Gerencie suas receitas culinárias</p>
                  </div>
                </div>
              </div>
              <svg class="w-6 h-6 text-a4pm-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </Card>
        </router-link>

        <!-- Card Nova Receita -->
        <router-link to="/receitas/criar">
          <Card class="hover:shadow-lg transition-all cursor-pointer border-2 border-a4pm-gray-200 hover:border-a4pm-orange">
            <div class="flex items-center justify-between">
              <div class="flex-1">
                <div class="flex items-center gap-3 mb-3">
                  <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                    </svg>
                  </div>
                  <div>
                    <h3 class="text-xl font-semibold text-a4pm-gray-900">Nova Receita</h3>
                    <p class="text-sm text-a4pm-gray-600">Adicione uma nova receita</p>
                  </div>
                </div>
              </div>
              <svg class="w-6 h-6 text-a4pm-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
              </svg>
            </div>
          </Card>
        </router-link>
      </div>

      <!-- Categorias de Receitas -->
      <div>
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-xl font-bold text-a4pm-gray-900">Categorias de Receitas</h3>
          <span v-if="receitasStore.categorias.length > 0" class="text-sm text-a4pm-gray-600">
            {{ receitasStore.categorias.length }} {{ receitasStore.categorias.length === 1 ? 'categoria' : 'categorias' }}
          </span>
        </div>

        <!-- Loading -->
        <div v-if="carregandoCategorias" class="text-center py-8">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-4 border-a4pm-orange border-t-transparent"></div>
        </div>

        <!-- Lista de Categorias -->
        <div v-else-if="receitasStore.categorias.length > 0" class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <router-link
            v-for="categoria in receitasStore.categorias.slice(0, 8)"
            :key="categoria.id"
            :to="`/receitas?categoria=${categoria.id}`"
            class="bg-white rounded-lg border-2 border-a4pm-gray-200 p-6 hover:border-a4pm-orange hover:shadow-md transition-all text-center"
          >
            <div class="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3"
                 :class="getCategoriaStyle(categoria.id).bg">
              <span class="text-3xl">{{ getCategoriaEmoji(categoria.nome) }}</span>
            </div>
            <p class="font-semibold text-a4pm-gray-900 mb-1">{{ categoria.nome }}</p>
            <p class="text-xs text-a4pm-gray-500">{{ categoria.total_receitas || 0 }} {{ categoria.total_receitas === 1 ? 'receita' : 'receitas' }}</p>
          </router-link>
        </div>

        <!-- Estado Vazio -->
        <Card v-else class="text-center py-8">
          <span class="text-4xl mb-3 block">📂</span>
          <p class="text-a4pm-gray-600">Nenhuma categoria cadastrada ainda</p>
        </Card>
      </div>

      <!-- Informações do Perfil -->
      <Card>
        <div class="space-y-4">
          <div class="flex items-center space-x-3">
            <div class="w-12 h-12 rounded-full bg-a4pm-orange/10 flex items-center justify-center">
              <span class="text-xl font-bold text-a4pm-orange">
                {{ (user?.name || user?.email || 'U').charAt(0).toUpperCase() }}
              </span>
            </div>
            <div>
              <h3 class="text-xl font-semibold text-a4pm-gray-900">Informações do Perfil</h3>
              <p class="text-sm text-a4pm-gray-600">Seus dados cadastrados</p>
            </div>
          </div>

          <div class="border-t border-a4pm-gray-200 pt-4 space-y-3">
            <div class="flex items-center justify-between py-2">
              <span class="font-medium text-a4pm-gray-700">Nome:</span>
              <span class="text-a4pm-gray-900">{{ user?.name || 'Não informado' }}</span>
            </div>
            <div class="flex items-center justify-between py-2 border-t border-a4pm-gray-100">
              <span class="font-medium text-a4pm-gray-700">E-mail:</span>
              <span class="text-a4pm-gray-900">{{ user?.email }}</span>
            </div>
          </div>
        </div>
      </Card>

      <!-- Dicas Culinárias -->
      <Card>
        <div class="space-y-4">
          <div class="flex items-center gap-2 mb-4">
            <span class="text-2xl">💡</span>
            <h3 class="text-xl font-semibold text-a4pm-gray-900">Dicas Culinárias</h3>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex gap-3 p-4 bg-a4pm-gray-50 rounded-lg">
              <span class="text-2xl">🧂</span>
              <div>
                <p class="font-semibold text-a4pm-gray-900 mb-1">Temperos Frescos</p>
                <p class="text-sm text-a4pm-gray-600">Use ervas frescas para realçar o sabor das suas receitas</p>
              </div>
            </div>
            <div class="flex gap-3 p-4 bg-a4pm-gray-50 rounded-lg">
              <span class="text-2xl">🌡️</span>
              <div>
                <p class="font-semibold text-a4pm-gray-900 mb-1">Temperatura Correta</p>
                <p class="text-sm text-a4pm-gray-600">Sempre pré-aqueça o forno antes de assar</p>
              </div>
            </div>
            <div class="flex gap-3 p-4 bg-a4pm-gray-50 rounded-lg">
              <span class="text-2xl">⏱️</span>
              <div>
                <p class="font-semibold text-a4pm-gray-900 mb-1">Planejamento</p>
                <p class="text-sm text-a4pm-gray-600">Organize os ingredientes antes de começar a cozinhar</p>
              </div>
            </div>
            <div class="flex gap-3 p-4 bg-a4pm-gray-50 rounded-lg">
              <span class="text-2xl">📝</span>
              <div>
                <p class="font-semibold text-a4pm-gray-900 mb-1">Anotações</p>
                <p class="text-sm text-a4pm-gray-600">Guarde suas receitas favoritas para acessar rapidamente</p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  </AuthenticatedLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useReceitasStore } from '@/stores/receitas'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import Card from '@/components/ui/Card.vue'

const authStore = useAuthStore()
const receitasStore = useReceitasStore()
const user = computed(() => authStore.user)
const carregandoCategorias = ref(true)

// Mapeamento de emojis por categoria
const categoriaEmojis = {
  'bolos': '🍰',
  'tortas': '🥧',
  'doces': '🍰',
  'sobremesas': '🍨',
  'carnes': '🍖',
  'aves': '🍗',
  'frango': '🍗',
  'peixes': '🐟',
  'frutos do mar': '🦐',
  'saladas': '🥗',
  'molhos': '🥫',
  'acompanhamentos': '🍚',
  'sopas': '🍲',
  'massas': '🍝',
  'bebidas': '🥤',
  'lanches': '🥪',
  'vegetariano': '🥬',
  'vegano': '🌱',
  'light': '🥗',
  'saudável': '💚',
  'prato único': '🍱'
}

// Cores diferentes para as categorias
const cores = [
  { bg: 'bg-red-100', text: 'text-red-600' },
  { bg: 'bg-green-100', text: 'text-green-600' },
  { bg: 'bg-yellow-100', text: 'text-yellow-600' },
  { bg: 'bg-orange-100', text: 'text-orange-600' },
  { bg: 'bg-blue-100', text: 'text-blue-600' },
  { bg: 'bg-purple-100', text: 'text-purple-600' },
  { bg: 'bg-pink-100', text: 'text-pink-600' },
  { bg: 'bg-indigo-100', text: 'text-indigo-600' }
]

function getCategoriaEmoji(nomeCategoria) {
  const nome = nomeCategoria.toLowerCase()
  
  // Procura por palavras-chave no nome da categoria
  for (const [key, emoji] of Object.entries(categoriaEmojis)) {
    if (nome.includes(key)) {
      return emoji
    }
  }
  
  // Emoji padrão se não encontrar
  return '🍽️'
}

function getCategoriaStyle(categoriaId) {
  // Usa o ID da categoria para determinar a cor de forma consistente
  const index = (categoriaId - 1) % cores.length
  return cores[index]
}

async function carregarCategorias() {
  carregandoCategorias.value = true
  await receitasStore.listarCategorias()
  carregandoCategorias.value = false
}

onMounted(() => {
  carregarCategorias()
})
</script>
