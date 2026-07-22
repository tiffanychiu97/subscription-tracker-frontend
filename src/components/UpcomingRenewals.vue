<!-- src/components/UpcomingRenewals.vue -->
<script setup lang="ts">
import { useSubscriptionStore } from "../stores/subscriptions";

const store = useSubscriptionStore();
</script>

<template>
  <div class="bg-white rounded-lg shadow p-5">
    <h3 class="text-sm font-medium text-gray-500 mb-4">
      Upcoming Renewals (Next 30 Days)
    </h3>
    <ul
      v-if="store.stats && store.stats.upcomingRenewals.length"
      class="space-y-2"
    >
      <li
        v-for="sub in store.stats.upcomingRenewals"
        :key="sub.id"
        class="flex justify-between text-sm"
      >
        <span>{{ sub.name }}</span>
        <span class="text-gray-500">{{ sub.nextRenewalDate }}</span>
      </li>
    </ul>
    <p v-else class="text-sm text-gray-400">No renewals in the next 30 days</p>
  </div>
</template>
