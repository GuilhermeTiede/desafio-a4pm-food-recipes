<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-a4pm-gray-50 to-a4pm-gray-100 px-4 py-12">
    <div class="w-full max-w-md">
      <div class="text-center mb-8">
        <img
          src="/logo-a4pm.png"
          alt="A4PM - Soluções Inteligentes"
          class="h-16 mx-auto mb-4"
        />
        <p class="text-a4pm-gray-600 text-sm">Soluções Inteligentes</p>
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup>
</script>
