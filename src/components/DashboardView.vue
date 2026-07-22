<script setup lang="ts">
import { useSubscriptionStore } from "../stores/subscriptions";
import CategoryChart from "./CategoryChart.vue";
import SpendTrendChart from "./SpendTrendChart.vue";
import LoadingSpinner from "./LoadingSpinner.vue";
import UpcomingRenewals from "./UpcomingRenewals.vue";

const store = useSubscriptionStore();
</script>

<template>
  <LoadingSpinner v-if="store.isLoading && !store.stats" />

  <section v-else-if="store.stats" class="space-y-6">
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="bg-white rounded-lg shadow p-5">
        <p class="text-sm text-gray-500">Monthly Spend</p>
        <p class="text-2xl font-bold text-gray-900">
          ${{ store.stats.totalMonthlySpend.toFixed(2) }}
        </p>
      </div>
      <div class="bg-white rounded-lg shadow p-5">
        <p class="text-sm text-gray-500">Yearly Spend</p>
        <p class="text-2xl font-bold text-gray-900">
          ${{ store.stats.totalYearlySpend.toFixed(2) }}
        </p>
      </div>
      <div class="bg-white rounded-lg shadow p-5">
        <p class="text-sm text-gray-500">Potential Savings</p>
        <p class="text-2xl font-bold text-green-600">
          ${{ store.stats.potentialSavings.toFixed(2) }}
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <CategoryChart />
      <SpendTrendChart />
      <UpcomingRenewals />
    </div>
  </section>
</template>
