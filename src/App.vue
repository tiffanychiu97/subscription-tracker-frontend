<script setup lang="ts">
import { onMounted } from "vue";
import { useSubscriptionStore } from "./stores/subscriptions";
import AppHeader from "./components/AppHeader.vue";
import DashboardView from "./components/DashboardView.vue";
import SubscriptionList from "./components/SubscriptionList.vue";

const store = useSubscriptionStore();

onMounted(() => {
  store.fetchAll();
  store.fetchStats();
});
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />
    <main class="max-w-5xl mx-auto px-4 py-8 space-y-8">
      <DashboardView />
      <SubscriptionList />
    </main>
  </div>
</template>
