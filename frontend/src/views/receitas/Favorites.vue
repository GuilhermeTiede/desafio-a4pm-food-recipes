<template>
  <AuthenticatedLayout>
    <div class="space-y-6">
      <!-- Cabeçalho -->
      <div
        class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <h2 class="text-3xl font-bold text-a4pm-gray-900">
            Receitas Favoritas
          </h2>
          <p class="mt-1 text-a4pm-gray-600">
            Suas receitas favoritas em um só lugar
          </p>
        </div>
        <router-link to="/receitas">
          <Button variant="outline">
            <svg
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Voltar para Receitas
          </Button>
        </router-link>
      </div>

      <!-- Loading -->
      <div v-if="receitasStore.loading" class="text-center py-12">
        <div
          class="inline-block animate-spin rounded-full h-12 w-12 border-4 border-a4pm-orange border-t-transparent"
        ></div>
        <p class="mt-4 text-a4pm-gray-600">Carregando favoritos...</p>
      </div>

      <!-- Lista de Favoritos -->
      <div
        v-else-if="receitasStore.receitas.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <Card
          v-for="receita in receitasStore.receitas"
          :key="receita.id"
          class="hover:shadow-lg transition-shadow"
        >
          <div class="space-y-4">
            <!-- Cabeçalho do Card -->
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h3
                  class="text-xl font-semibold text-a4pm-gray-900 line-clamp-1"
                >
                  {{ receita.nome }}
                </h3>
                <span
                  v-if="receita.categoria_nome"
                  class="inline-block mt-2 px-3 py-1 bg-a4pm-orange/10 text-a4pm-orange rounded-full text-sm font-medium"
                >
                  {{ receita.categoria_nome }}
                </span>
              </div>
              <!-- Botão de Remover Favorito -->
              <button
                @click="removerFavorito(receita)"
                class="flex-shrink-0 p-2 hover:bg-red-50 rounded-full transition-colors"
                title="Remover dos favoritos"
              >
                <svg
                  class="w-6 h-6 text-red-500 fill-current"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>

            <!-- Avaliação -->
            <div
              v-if="receita.media_avaliacoes > 0"
              class="flex items-center gap-2"
            >
              <StarRating
                :model-value="Number(receita.media_avaliacoes)"
                readonly
                size="sm"
              />
              <span class="text-sm text-a4pm-gray-500"
                >({{ receita.total_avaliacoes }})</span
              >
            </div>

            <!-- Informações -->
            <div class="space-y-2 text-sm text-a4pm-gray-600">
              <div
                v-if="receita.tempo_preparo_minutos"
                class="flex items-center gap-2"
              >
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{{ receita.tempo_preparo_minutos }} minutos</span>
              </div>
              <div v-if="receita.porcoes" class="flex items-center gap-2">
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span>{{ receita.porcoes }} porções</span>
              </div>
              <div class="flex items-center gap-2 text-a4pm-gray-500">
                <svg
                  class="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span class="text-xs"
                  >Favoritado em {{ formatarData(receita.favoritado_em) }}</span
                >
              </div>
            </div>

            <!-- Modo de preparo preview -->
            <p class="text-sm text-a4pm-gray-600 line-clamp-2">
              {{ receita.modo_preparo }}
            </p>

            <!-- Ações -->
            <div
              class="flex items-center gap-2 pt-4 border-t border-a4pm-gray-200"
            >
              <router-link :to="`/receitas/${receita.id}`" class="flex-1">
                <Button variant="outline" class="w-full">
                  <svg
                    class="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                  Ver Receita
                </Button>
              </router-link>
            </div>
          </div>
        </Card>
      </div>

      <!-- Estado Vazio -->
      <Card v-else class="text-center py-12">
        <svg
          class="w-16 h-16 mx-auto text-a4pm-gray-300"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <h3 class="mt-4 text-lg font-semibold text-a4pm-gray-900">
          Nenhuma receita favorita
        </h3>
        <p class="mt-2 text-a4pm-gray-600">
          Você ainda não favoritou nenhuma receita. Comece explorando suas
          receitas!
        </p>
        <router-link to="/receitas">
          <Button class="mt-6">
            <svg
              class="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            Explorar Receitas
          </Button>
        </router-link>
      </Card>
    </div>
  </AuthenticatedLayout>
</template>

<script setup>
import { onMounted } from "vue";
import { useReceitasStore } from "@/stores/receitas";
import AuthenticatedLayout from "@/layouts/AuthenticatedLayout.vue";
import Card from "@/components/ui/Card.vue";
import Button from "@/components/ui/Button.vue";
import StarRating from "@/components/ui/StarRating.vue";

const receitasStore = useReceitasStore();

function formatarData(data) {
  return new Date(data).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

async function removerFavorito(receita) {
  const result = await receitasStore.removerFavorito(receita.id);

  if (result.success) {
    // Recarrega a lista de favoritos
    await receitasStore.listarFavoritos();
  } else {
    alert(result.message);
  }
}

onMounted(() => {
  receitasStore.listarFavoritos();
});
</script>
