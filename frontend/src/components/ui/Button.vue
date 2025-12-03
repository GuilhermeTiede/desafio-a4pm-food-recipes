<template>
  <button
    :class="buttonClasses"
    :type="type"
    :disabled="disabled"
  >
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'destructive', 'outline', 'ghost', 'link'].includes(value)
  },
  size: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'sm', 'lg'].includes(value)
  },
  type: {
    type: String,
    default: 'button'
  },
  disabled: Boolean
})

const buttonClasses = computed(() => {
  const base = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'

  const variants = {
    default: 'bg-a4pm-orange text-white hover:bg-a4pm-orange-dark focus-visible:ring-a4pm-orange',
    destructive: 'bg-red-500 text-white hover:bg-red-600',
    outline: 'border-2 border-a4pm-orange text-a4pm-orange hover:bg-a4pm-orange hover:text-white',
    ghost: 'text-a4pm-orange hover:bg-a4pm-orange/10',
    link: 'text-a4pm-orange underline-offset-4 hover:underline'
  }

  const sizes = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 px-3 text-sm',
    lg: 'h-11 px-8'
  }

  return `${base} ${variants[props.variant]} ${sizes[props.size]}`
})
</script>
