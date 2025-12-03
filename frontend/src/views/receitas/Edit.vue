<template>
  <AuthenticatedLayout>
    <div class="max-w-3xl mx-auto space-y-6">
      <!-- Cabeçalho -->
      <div class="flex items-center gap-4">
        <router-link to="/receitas">
          <Button variant="outline" size="icon">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
          </Button>
        </router-link>
        <div>
          <h2 class="text-3xl font-bold text-a4pm-gray-900">Editar Receita</h2>
          <p class="mt-1 text-a4pm-gray-600">Atualize as informações da receita</p>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="carregando" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-a4pm-orange border-t-transparent"></div>
        <p class="mt-4 text-a4pm-gray-600">Carregando receita...</p>
      </div>

      <!-- Formulário -->
      <Card v-else>
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <!-- Mensagem de erro -->
          <div v-if="error" class="p-4 bg-red-50 border-l-4 border-red-500 rounded-md">
            <div class="flex items-start">
              <svg class="w-5 h-5 text-red-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
              </svg>
              <p class="text-sm text-red-700">{{ error }}</p>
            </div>
          </div>

          <!-- Nome -->
          <div class="space-y-2">
            <Label for="nome" class="text-a4pm-gray-700 font-medium">
              Nome da Receita <span class="text-red-500">*</span>
            </Label>
            <Input
              id="nome"
              v-model="form.nome"
              placeholder="Ex: Bolo de Chocolate"
              required
            />
          </div>

          <!-- Grid de 2 colunas -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Categoria -->
            <div class="space-y-2">
              <Label for="categoria" class="text-a4pm-gray-700 font-medium">Categoria</Label>
              <select
                id="categoria"
                v-model="form.id_categorias"
                class="w-full px-3 py-2 border border-a4pm-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-a4pm-orange focus:border-transparent"
              >
                <option :value="null">Selecione uma categoria</option>
                <option v-for="categoria in receitasStore.categorias" :key="categoria.id" :value="categoria.id">
                  {{ categoria.nome }}
                </option>
              </select>
            </div>

            <!-- Tempo de Preparo -->
            <div class="space-y-2">
              <Label for="tempo" class="text-a4pm-gray-700 font-medium">Tempo de Preparo (minutos)</Label>
              <Input
                id="tempo"
                type="number"
                v-model.number="form.tempo_preparo_minutos"
                placeholder="Ex: 45"
                min="1"
              />
            </div>
          </div>

          <!-- Porções -->
          <div class="space-y-2">
            <Label for="porcoes" class="text-a4pm-gray-700 font-medium">Porções</Label>
            <Input
              id="porcoes"
              type="number"
              v-model.number="form.porcoes"
              placeholder="Ex: 8"
              min="1"
            />
          </div>

          <!-- Ingredientes -->
          <div class="space-y-2">
            <Label for="ingredientes" class="text-a4pm-gray-700 font-medium">Ingredientes</Label>
            <textarea
              id="ingredientes"
              v-model="form.ingredientes"
              rows="6"
              placeholder="Liste os ingredientes, um por linha&#10;Ex:&#10;2 xícaras de farinha de trigo&#10;1 xícara de açúcar&#10;3 ovos&#10;..."
              class="w-full px-3 py-2 border border-a4pm-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-a4pm-orange focus:border-transparent resize-none"
            ></textarea>
            <p class="text-xs text-a4pm-gray-500">Dica: Liste um ingrediente por linha para melhor organização</p>
          </div>

          <!-- Modo de Preparo -->
          <div class="space-y-2">
            <Label for="modo_preparo" class="text-a4pm-gray-700 font-medium">
              Modo de Preparo <span class="text-red-500">*</span>
            </Label>
            <textarea
              id="modo_preparo"
              v-model="form.modo_preparo"
              rows="10"
              placeholder="Descreva o passo a passo do preparo...&#10;Ex:&#10;1. Pré-aqueça o forno a 180°C&#10;2. Em uma tigela, misture a farinha e o açúcar&#10;3. Adicione os ovos e bata bem&#10;..."
              class="w-full px-3 py-2 border border-a4pm-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-a4pm-orange focus:border-transparent resize-none"
              required
            ></textarea>
          </div>

          <!-- Botões -->
          <div class="flex items-center gap-3 pt-4 border-t border-a4pm-gray-200">
            <router-link to="/receitas" class="flex-1">
              <Button type="button" variant="outline" class="w-full">
                Cancelar
              </Button>
            </router-link>
            <Button type="submit" :disabled="loading" class="flex-1">
              {{ loading ? 'Salvando...' : 'Salvar Alterações' }}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  </AuthenticatedLayout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useReceitasStore } from '@/stores/receitas'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'
import Label from '@/components/ui/Label.vue'

const router = useRouter()
const route = useRoute()
const receitasStore = useReceitasStore()

const form = ref({
  nome: '',
  id_categorias: null,
  tempo_preparo_minutos: null,
  porcoes: null,
  ingredientes: '',
  modo_preparo: ''
})

const error = ref('')
const loading = ref(false)
const carregando = ref(true)

async function carregarReceita() {
  carregando.value = true
  const result = await receitasStore.buscarReceita(route.params.id)

  if (result.success) {
    const receita = result.data
    form.value = {
      nome: receita.nome,
      id_categorias: receita.id_categorias,
      tempo_preparo_minutos: receita.tempo_preparo_minutos,
      porcoes: receita.porcoes,
      ingredientes: receita.ingredientes || '',
      modo_preparo: receita.modo_preparo
    }
  } else {
    error.value = result.message
  }

  carregando.value = false
}

async function handleSubmit() {
  loading.value = true
  error.value = ''

  const result = await receitasStore.atualizarReceita(route.params.id, form.value)

  if (result.success) {
    router.push('/receitas')
  } else {
    error.value = result.message
  }

  loading.value = false
}

onMounted(() => {
  receitasStore.listarCategorias()
  carregarReceita()
})
</script>
