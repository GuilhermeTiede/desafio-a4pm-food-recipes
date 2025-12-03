<template>
  <input
    :type="type"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :placeholder="placeholder"
    :required="required"
    :disabled="disabled"
    class="flex h-10 w-full rounded-md border border-a4pm-gray-300 bg-white px-3 py-2 text-sm placeholder:text-a4pm-gray-400 focus:outline-none focus:ring-2 focus:ring-a4pm-orange focus:border-a4pm-orange transition-colors disabled:cursor-not-allowed disabled:opacity-50"
  />
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'text'
  },
  modelValue: [String, Number],
  placeholder: String,
  required: Boolean,
  disabled: Boolean
})

defineEmits(['update:modelValue'])
</script>
