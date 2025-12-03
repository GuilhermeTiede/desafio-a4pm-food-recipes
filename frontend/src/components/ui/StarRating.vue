<template>
  <div class="flex items-center gap-1">
    <button
      v-for="star in 5"
      :key="star"
      type="button"
      @click="handleClick(star)"
      @mouseenter="hoveredStar = star"
      @mouseleave="hoveredStar = null"
      :disabled="readonly"
      class="focus:outline-none transition-transform hover:scale-110 disabled:cursor-default disabled:hover:scale-100"
    >
      <svg
        class="transition-colors"
        :class="[
          size === 'sm' ? 'w-4 h-4' : size === 'lg' ? 'w-8 h-8' : 'w-6 h-6',
          star <= (hoveredStar || modelValue)
            ? 'text-yellow-400'
            : 'text-gray-300',
        ]"
        :fill="star <= (hoveredStar || modelValue) ? 'currentColor' : 'none'"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    </button>
    <span
      v-if="showValue && modelValue"
      class="ml-2 text-sm text-a4pm-gray-600"
    >
      {{ modelValue.toFixed(1) }}
    </span>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  modelValue: {
    type: Number,
    default: 0,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: "md",
    validator: (value) => ["sm", "md", "lg"].includes(value),
  },
  showValue: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue"]);

const hoveredStar = ref(null);

function handleClick(star) {
  if (!props.readonly) {
    emit("update:modelValue", star);
  }
}
</script>
