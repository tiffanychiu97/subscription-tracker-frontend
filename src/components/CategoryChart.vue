<script setup lang="ts">
import { computed } from "vue";
import { Doughnut } from "vue-chartjs";
import { useSubscriptionStore } from "../stores/subscriptions";

const store = useSubscriptionStore();

const colors = [
  "#3b82f6",
  "#f59e0b",
  "#10b981",
  "#ef4444",
  "#8b5cf6",
  "#6b7280",
];

const chartData = computed(() => {
  const byCategory = store.stats?.spendByCategory ?? [];
  return {
    labels: byCategory.map((c) => c.category),
    datasets: [
      {
        data: byCategory.map((c) => c.total),
        backgroundColor: byCategory.map((_, i) => colors[i % colors.length]),
      },
    ],
  };
});

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: "bottom" as const },
  },
};
</script>

<template>
  <div class="bg-white rounded-lg shadow p-5">
    <h3 class="text-sm font-medium text-gray-500 mb-4">Spend by Category</h3>
    <Doughnut v-if="store.stats" :data="chartData" :options="chartOptions" />
  </div>
</template>
