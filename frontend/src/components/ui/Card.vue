<template>
  <div class="rounded-lg border border-slate-200 bg-white shadow-sm">
    <div v-if="$slots.header" class="p-6 pb-4">
      <slot name="header" />
    </div>
    <div class="p-6">
      <slot />
    </div>
    <div v-if="$slots.footer" class="p-6 pt-4">
      <slot name="footer" />
    </div>
  </div>
</template>

<script setup>
</script>
