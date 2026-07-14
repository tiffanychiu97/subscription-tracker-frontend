<script setup lang="ts">
import { computed } from "vue";
import { Bar } from "vue-chartjs";
import { useSubscriptionStore } from "../stores/subscriptions";

const store = useSubscriptionStore();

const chartData = computed(() => {
  const monthlyTotal = store.stats?.totalMonthlySpend ?? 0;
  const now = new Date();
  const labels: string[] = [];
  const data: number[] = [];

  for (let i = 0; i < 6; i++) {
    const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
    labels.push(d.toLocaleString("en-US", { month: "short" }));
    data.push(Math.round(monthlyTotal * (i + 1) * 100) / 100); // cumulative projection
  }

  return {
    labels,
    datasets: [
      {
        label: "Cumulative Spend",
        data,
        backgroundColor: "#3b82f6",
      },
    ],
  };
});

const chartOptions = {
  responsive: true,
  plugins: { legend: { display: false } },
  scales: { y: { beginAtZero: true } },
};
</script>

<template>
  <div class="bg-white rounded-lg shadow p-5">
    <h3 class="text-sm font-medium text-gray-500 mb-4">
      6-Month Projected Spend
    </h3>
    <Bar v-if="store.stats" :data="chartData" :options="chartOptions" />
  </div>
</template>
