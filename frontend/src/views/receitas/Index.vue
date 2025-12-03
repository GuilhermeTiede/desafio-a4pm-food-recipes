<template>
  <AuthenticatedLayout>
    <div class="space-y-6">
      <!-- Cabeçalho -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 class="text-3xl font-bold text-a4pm-gray-900">Minhas Receitas</h2>
          <p class="mt-1 text-a4pm-gray-600">Gerencie suas receitas culinárias</p>
        </div>
        <router-link to="/receitas/criar">
          <Button class="w-full sm:w-auto">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Nova Receita
          </Button>
        </router-link>
      </div>

      <!-- Barra de Pesquisa -->
      <Card>
        <div class="flex items-center gap-3">
          <svg class="w-5 h-5 text-a4pm-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
          <Input
            v-model="searchTerm"
            placeholder="Pesquisar receitas..."
            class="flex-1"
          />
        </div>
      </Card>

      <!-- Loading -->
      <div v-if="receitasStore.loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-a4pm-orange border-t-transparent"></div>
        <p class="mt-4 text-a4pm-gray-600">Carregando receitas...</p>
      </div>

      <!-- Lista de Receitas -->
      <div v-else-if="receitasFiltradas.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card v-for="receita in receitasFiltradas" :key="receita.id" class="hover:shadow-lg transition-shadow">
          <div class="space-y-4">
            <!-- Cabeçalho do Card -->
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h3 class="text-xl font-semibold text-a4pm-gray-900 line-clamp-1">
                  {{ receita.nome }}
                </h3>
                <span v-if="receita.categoria_nome" class="inline-block mt-2 px-3 py-1 bg-a4pm-orange/10 text-a4pm-orange rounded-full text-sm font-medium">
                  {{ receita.categoria_nome }}
                </span>
              </div>
            </div>

            <!-- Informações -->
            <div class="space-y-2 text-sm text-a4pm-gray-600">
              <div v-if="receita.tempo_preparo_minutos" class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>{{ receita.tempo_preparo_minutos }} minutos</span>
              </div>
              <div v-if="receita.porcoes" class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
                </svg>
                <span>{{ receita.porcoes }} porções</span>
              </div>
            </div>

            <!-- Modo de preparo preview -->
            <p class="text-sm text-a4pm-gray-600 line-clamp-2">
              {{ receita.modo_preparo }}
            </p>

            <!-- Ações -->
            <div class="flex items-center gap-2 pt-4 border-t border-a4pm-gray-200">
              <router-link :to="`/receitas/${receita.id}`" class="flex-1">
                <Button variant="outline" class="w-full">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  Ver
                </Button>
              </router-link>
              <router-link :to="`/receitas/${receita.id}/editar`">
                <Button variant="outline" size="icon">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </Button>
              </router-link>
              <Button variant="outline" size="icon" @click="confirmarExclusao(receita)">
                <svg class="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <!-- Estado Vazio -->
      <Card v-else class="text-center py-12">
        <svg class="w-16 h-16 mx-auto text-a4pm-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
        </svg>
        <h3 class="mt-4 text-lg font-semibold text-a4pm-gray-900">Nenhuma receita encontrada</h3>
        <p class="mt-2 text-a4pm-gray-600">
          {{ searchTerm ? 'Tente pesquisar com outros termos' : 'Comece criando sua primeira receita!' }}
        </p>
        <router-link v-if="!searchTerm" to="/receitas/criar">
          <Button class="mt-6">
            <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
            Criar Primeira Receita
          </Button>
        </router-link>
      </Card>
    </div>

    <!-- Modal de Confirmação de Exclusão -->
    <div v-if="receitaParaExcluir" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-lg max-w-md w-full p-6 space-y-4">
        <div class="flex items-start gap-4">
          <div class="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
            <svg class="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
          </div>
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-a4pm-gray-900">Excluir Receita</h3>
            <p class="mt-2 text-sm text-a4pm-gray-600">
              Tem certeza que deseja excluir a receita "<strong>{{ receitaParaExcluir.nome }}</strong>"?
              Esta ação não pode ser desfeita.
            </p>
          </div>
        </div>

        <div class="flex items-center gap-3 pt-4">
          <Button variant="outline" @click="receitaParaExcluir = null" class="flex-1">
            Cancelar
          </Button>
          <Button @click="excluirReceita" :disabled="excluindo" class="flex-1 bg-red-600 hover:bg-red-700">
            {{ excluindo ? 'Excluindo...' : 'Excluir' }}
          </Button>
        </div>
      </div>
    </div>
  </AuthenticatedLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useReceitasStore } from '@/stores/receitas'
import AuthenticatedLayout from '@/layouts/AuthenticatedLayout.vue'
import Card from '@/components/ui/Card.vue'
import Button from '@/components/ui/Button.vue'
import Input from '@/components/ui/Input.vue'

const receitasStore = useReceitasStore()
const searchTerm = ref('')
const receitaParaExcluir = ref(null)
const excluindo = ref(false)

const receitasFiltradas = computed(() => {
  if (!searchTerm.value) {
    return receitasStore.receitas
  }

  const termo = searchTerm.value.toLowerCase()
  return receitasStore.receitas.filter(receita => {
    return (
      receita.nome.toLowerCase().includes(termo) ||
      receita.categoria_nome?.toLowerCase().includes(termo) ||
      receita.modo_preparo.toLowerCase().includes(termo) ||
      receita.ingredientes?.toLowerCase().includes(termo)
    )
  })
})

function confirmarExclusao(receita) {
  receitaParaExcluir.value = receita
}

async function excluirReceita() {
  if (!receitaParaExcluir.value) return

  excluindo.value = true
  const result = await receitasStore.deletarReceita(receitaParaExcluir.value.id)
  excluindo.value = false

  if (result.success) {
    receitaParaExcluir.value = null
  } else {
    alert(result.message)
  }
}

onMounted(() => {
  receitasStore.listarReceitas()
})
</script>
