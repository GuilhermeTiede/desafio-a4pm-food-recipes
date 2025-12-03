<template>
  <GuestLayout>
    <Card>
      <template #header>
        <h2 class="text-2xl font-bold text-a4pm-gray-900">Bem-vindo de volta</h2>
        <p class="text-sm text-a4pm-gray-600 mt-1">Acesse sua conta para continuar</p>
      </template>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <div v-if="error" class="p-4 bg-red-50 border-l-4 border-red-500 rounded-md">
          <div class="flex items-start">
            <svg class="w-5 h-5 text-red-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
            </svg>
            <p class="text-sm text-red-700">{{ error }}</p>
          </div>
        </div>

        <div class="space-y-2">
          <Label for="email" class="text-a4pm-gray-700 font-medium">E-mail</Label>
          <Input
            id="email"
            type="email"
            v-model="form.email"
            placeholder="seu@email.com"
            required
          />
        </div>

        <div class="space-y-2">
          <Label for="password" class="text-a4pm-gray-700 font-medium">Senha</Label>
          <Input
            id="password"
            type="password"
            v-model="form.password"
            placeholder="••••••••"
            required
          />
        </div>

        <Button type="submit" class="w-full" :disabled="loading">
          {{ loading ? 'Entrando...' : 'Entrar' }}
        </Button>
      </form>

      <template #footer>
        <p class="text-sm text-center text-a4pm-gray-600">
          Não tem uma conta?
          <router-link to="/register" class="text-a4pm-orange font-semibold hover:text-a4pm-orange-dark transition-colors">
            Registre-se
          </router-link>
        </p>
      </template>
    </Card>
  </GuestLayout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import GuestLayout from '@/layouts/GuestLayout.vue'
import Card from '@/components/ui/Card.vue'
import Input from '@/components/ui/Input.vue'
import Button from '@/components/ui/Button.vue'
import Label from '@/components/ui/Label.vue'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  email: '',
  password: ''
})

const error = ref('')
const loading = ref(false)

async function handleLogin() {
  loading.value = true
  error.value = ''

  const result = await authStore.login(form.value)

  if (result.success) {
    router.push({ name: 'dashboard' })
  } else {
    error.value = result.message
  }

  loading.value = false
}
</script>
