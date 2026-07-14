<script setup lang="ts">
import { ref } from "vue";
import { useSubscriptionStore } from "../stores/subscriptions";
import SubscriptionCard from "./SubscriptionCard.vue";
import SubscriptionFormModal from "./SubscriptionFormModal.vue";
import type { Subscription } from "../types";
import LoadingSpinner from "./LoadingSpinner.vue";
import EmptyState from "./EmptyState.vue";

const store = useSubscriptionStore();
const isModalOpen = ref(false);
const editingSub = ref<Subscription | null>(null);

function openAddModal() {
  editingSub.value = null;
  isModalOpen.value = true;
}

function openEditModal(sub: Subscription) {
  editingSub.value = sub;
  isModalOpen.value = true;
}

async function handleSubmit(data: Omit<Subscription, "id">) {
  if (editingSub.value) {
    await store.updateSubscription(editingSub.value.id, data);
  } else {
    await store.addSubscription(data);
  }
  isModalOpen.value = false;
}

async function handleDelete(id: string) {
  if (confirm("Delete this subscription?")) {
    await store.deleteSubscription(id);
  }
}
</script>

<template>
  <section class="bg-white rounded-lg shadow">
    <div class="flex justify-between items-center p-5 border-b">
      <h2 class="text-lg font-semibold">Your Subscriptions</h2>
      <button
        @click="openAddModal"
        class="text-sm bg-blue-600 text-white px-3 py-1.5 rounded cursor-pointer"
      >
        + Add
      </button>
    </div>

    <LoadingSpinner
      v-if="store.isLoading && store.subscriptions.length === 0"
    />
    <EmptyState
      v-else-if="store.subscriptions.length === 0"
      @add-click="openAddModal"
    />

    <ul v-else>
      <SubscriptionCard
        v-for="sub in store.subscriptions"
        :key="sub.id"
        :subscription="sub"
        @edit="openEditModal"
        @delete="handleDelete"
      />
    </ul>
  </section>

  <SubscriptionFormModal
    :is-open="isModalOpen"
    :editing-sub="editingSub"
    @close="isModalOpen = false"
    @submit="handleSubmit"
  />
</template>
