<script setup lang="ts">
import type { Subscription } from "../types";

defineProps<{
  subscription: Subscription;
}>();

const emit = defineEmits<{
  edit: [sub: Subscription];
  delete: [id: string];
}>();
</script>

<template>
  <li
    class="flex justify-between items-center px-5 py-3 border-b last:border-0"
  >
    <div>
      <p class="font-medium">{{ subscription.name }}</p>
      <p class="text-sm text-gray-500">
        {{ subscription.category }} · {{ subscription.billingCycle }}
      </p>
    </div>
    <div class="flex items-center gap-4">
      <p class="font-semibold">${{ subscription.cost.toFixed(2) }}</p>
      <button
        @click="emit('edit', subscription)"
        class="text-sm text-blue-600 hover:underline cursor-pointer"
      >
        Edit
      </button>
      <button
        @click="emit('delete', subscription.id)"
        class="text-sm text-red-600 hover:underline cursor-pointer"
      >
        Delete
      </button>
    </div>
  </li>
</template>
