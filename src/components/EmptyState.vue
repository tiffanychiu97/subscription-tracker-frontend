<script setup lang="ts">
const emit = defineEmits<{ addClick: [] }>();
</script>

<template>
  <div class="flex flex-col items-center justify-center py-16 text-center">
    <div class="text-5xl mb-4">📋</div>
    <h3 class="text-lg font-semibold text-gray-700 mb-1">
      No subscriptions yet
    </h3>
    <p class="text-sm text-gray-500 mb-4">
      Add your first subscription to start tracking your spending.
    </p>
    <button
      @click="emit('addClick')"
      class="text-sm bg-blue-600 text-white px-4 py-2 rounded cursor-pointer"
    >
      + Add Subscription
    </button>
  </div>
</template>
