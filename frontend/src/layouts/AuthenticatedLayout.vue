<template>
  <div class="min-h-screen bg-a4pm-gray-50">
    <nav class="bg-white border-b-2 border-a4pm-orange shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-20">
          <div class="flex items-center space-x-4">
            <router-link to="/dashboard">
              <img
                src="/logo-a4pm.png"
                alt="A4PM"
                class="h-10 cursor-pointer hover:opacity-80 transition-opacity"
              />
            </router-link>
            <div class="h-8 w-px bg-a4pm-gray-300"></div>
            <div class="hidden md:flex items-center space-x-1">
              <router-link to="/dashboard">
                <Button
                  variant="ghost"
                  size="sm"
                  :class="{ 'bg-a4pm-orange/10 text-a4pm-orange': $route.path === '/dashboard' }"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                  </svg>
                  Dashboard
                </Button>
              </router-link>
              <router-link to="/receitas">
                <Button
                  variant="ghost"
                  size="sm"
                  :class="{ 'bg-a4pm-orange/10 text-a4pm-orange': $route.path.startsWith('/receitas') }"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                  Receitas
                </Button>
              </router-link>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <div class="w-8 h-8 rounded-full bg-a4pm-orange/10 flex items-center justify-center">
                <span class="text-sm font-semibold text-a4pm-orange">
                  {{ (user?.name || user?.email || 'U').charAt(0).toUpperCase() }}
                </span>
              </div>
              <span class="text-sm text-a4pm-gray-700 font-medium hidden sm:block">{{ user?.name || user?.email }}</span>
            </div>
            <Button variant="ghost" size="sm" @click="handleLogout">
              Sair
            </Button>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import Button from '@/components/ui/Button.vue'

const authStore = useAuthStore()
const router = useRouter()

const user = computed(() => authStore.user)

async function handleLogout() {
  await authStore.logout()
  router.push({ name: 'login' })
}
</script>
