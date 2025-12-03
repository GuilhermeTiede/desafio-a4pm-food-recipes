<template>
  <AuthenticatedLayout>
    <div class="max-w-4xl mx-auto space-y-6">
      <!-- Cabeçalho - Oculto na impressão -->
      <div class="flex items-center justify-between print:hidden">
        <div class="flex items-center gap-4">
          <router-link to="/receitas">
            <Button variant="outline" size="icon">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
            </Button>
          </router-link>
          <div>
            <h2 class="text-3xl font-bold text-a4pm-gray-900">Visualizar Receita</h2>
            <p class="mt-1 text-a4pm-gray-600">Detalhes completos da receita</p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <router-link :to="`/receitas/${route.params.id}/editar`">
            <Button variant="outline">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
              </svg>
              Editar
            </Button>
          </router-link>
          <Button @click="imprimir">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
            </svg>
            Imprimir
          </Button>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="carregando" class="text-center py-12 print:hidden">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-a4pm-orange border-t-transparent"></div>
        <p class="mt-4 text-a4pm-gray-600">Carregando receita...</p>
      </div>

      <!-- Conteúdo da Receita -->
      <div v-else-if="receita" class="space-y-6">
        <!-- Card Principal -->
        <Card class="print:shadow-none print:border-none">
          <div class="space-y-6">
            <!-- Título e Categoria -->
            <div class="border-b border-a4pm-gray-200 pb-6">
              <h1 class="text-4xl font-bold text-a4pm-gray-900 mb-3">{{ receita.nome }}</h1>
              <div class="flex flex-wrap items-center gap-4">
                <span v-if="receita.categoria_nome" class="px-4 py-2 bg-a4pm-orange/10 text-a4pm-orange rounded-full text-sm font-medium">
                  {{ receita.categoria_nome }}
                </span>
                <div v-if="receita.tempo_preparo_minutos" class="flex items-center gap-2 text-a4pm-gray-600">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span>{{ receita.tempo_preparo_minutos }} minutos</span>
                </div>
                <div v-if="receita.porcoes" class="flex items-center gap-2 text-a4pm-gray-600">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                  </svg>
                  <span>{{ receita.porcoes }} porções</span>
                </div>
              </div>
            </div>

            <!-- Ingredientes -->
            <div v-if="receita.ingredientes" class="space-y-3">
              <div class="flex items-center gap-2">
                <svg class="w-6 h-6 text-a4pm-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                </svg>
                <h2 class="text-2xl font-bold text-a4pm-gray-900">Ingredientes</h2>
              </div>
              <div class="bg-a4pm-gray-50 rounded-lg p-6">
                <div class="space-y-2">
                  <div
                    v-for="(ingrediente, index) in ingredientesLista"
                    :key="index"
                    class="flex items-start gap-3"
                  >
                    <svg class="w-5 h-5 text-a4pm-orange mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                    </svg>
                    <span class="text-a4pm-gray-700">{{ ingrediente }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Modo de Preparo -->
            <div class="space-y-3">
              <div class="flex items-center gap-2">
                <svg class="w-6 h-6 text-a4pm-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                </svg>
                <h2 class="text-2xl font-bold text-a4pm-gray-900">Modo de Preparo</h2>
              </div>
              <div class="prose max-w-none">
                <p class="text-a4pm-gray-700 whitespace-pre-line leading-relaxed">{{ receita.modo_preparo }}</p>
              </div>
            </div>

            <!-- Informações Adicionais - Oculto na impressão -->
            <div class="border-t border-a4pm-gray-200 pt-6 text-sm text-a4pm-gray-500 print:hidden">
              <p>Criada por {{ receita.usuario_nome }}</p>
              <p>Adicionada em {{ formatarData(receita.criado_em) }}</p>
              <p v-if="receita.alterado_em !== receita.criado_em">
                Última atualização em {{ formatarData(receita.alterado_em) }}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <!-- Erro -->
      <Card v-else class="text-center py-12 print:hidden">
        <svg class="w-16 h-16 mx-auto text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
        <h3 class="mt-4 text-lg font-semibold text-a4pm-gray-900">Receita não encontrada</h3>
        <p class="mt-2 text-a4pm-gray-600">A receita que você está procurando não existe ou foi removida.</p>
        <router-link to="/receitas">
          <Button class="mt-6">Voltar para Receitas</Button>
        </router-link>
      </Card>
    </div>
  </AuthenticatedLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useReceitasStore } from '@/stores/receitas'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'

const route = useRoute()
const receitasStore = useReceitasStore()

const receita = ref(null)
const carregando = ref(true)

const ingredientesLista = computed(() => {
  if (!receita.value?.ingredientes) return []
  return receita.value.ingredientes
    .split('\n')
    .map(i => i.trim())
    .filter(i => i.length > 0)
})

function formatarData(data) {
  return new Date(data).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function imprimir() {
  window.print()
}

async function carregarReceita() {
  carregando.value = true
  const result = await receitasStore.buscarReceita(route.params.id)

  if (result.success) {
    receita.value = result.data
  }

  carregando.value = false
}

onMounted(() => {
  carregarReceita()
})
</script>

<style>
@media print {
  body {
    background: white;
  }

  .print\:hidden {
    display: none !important;
  }

  .print\:shadow-none {
    box-shadow: none !important;
  }

  .print\:border-none {
    border: none !important;
  }

  @page {
    margin: 2cm;
  }
}
</style>
