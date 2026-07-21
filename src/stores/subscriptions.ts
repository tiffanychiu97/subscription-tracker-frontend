import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Subscription, Stats } from '../type.ts';

const API_BASE = 'https://subscription-tracker-backend-tnuk.onrender.com/api/subscriptions';

// converts snake_case API response into camelCase Subscription type
function normalize(raw: any): Subscription {
  return {
    id: raw.id,
    name: raw.name,
    cost: raw.cost,
    billingCycle: raw.billing_cycle ?? raw.billingCycle,
    category: raw.category,
    nextRenewalDate: raw.next_renewal_date ?? raw.nextRenewalDate,
    startDate: raw.start_date ?? raw.startDate,
    isRarelyUsed: !!(raw.is_rarely_used ?? raw.isRarelyUsed),
  };
}

export const useSubscriptionStore = defineStore('subscriptions', () => {
  const subscriptions = ref<Subscription[]>([]);
  const stats = ref<Stats | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  async function fetchAll() {
    isLoading.value = true;
    error.value = null;
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error('Failed to fetch subscriptions');
      const data = await res.json();
      subscriptions.value = data.map(normalize);
    } catch (e) {
      error.value = (e as Error).message;
    } finally {
      isLoading.value = false;
    }
  }

  async function fetchStats() {
    isLoading.value = true;
    try {
      const res = await fetch(`${API_BASE}/stats`);
      if (!res.ok) throw new Error('Failed to fetch stats');
      stats.value = await res.json();
    } catch (e) {
      error.value = (e as Error).message;
    } finally {
      isLoading.value = false;
    }
  }

  async function addSubscription(sub: Omit<Subscription, 'id'>) {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sub),
    });
    if (!res.ok) throw new Error('Failed to add subscription');
    await Promise.all([fetchAll(), fetchStats()]);

  }

  async function updateSubscription(id: string, sub: Omit<Subscription, 'id'>) {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sub),
    });
    if (!res.ok) throw new Error('Failed to update subscription');
    await fetchAll();
    await fetchStats();
  }

  async function deleteSubscription(id: string) {
    const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete subscription');
    await fetchAll();
    await fetchStats();
  }

  return {
    subscriptions,
    stats,
    isLoading,
    error,
    fetchAll,
    fetchStats,
    addSubscription,
    updateSubscription,
    deleteSubscription,
  };
});