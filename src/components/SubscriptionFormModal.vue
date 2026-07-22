<script setup lang="ts">
import { reactive, watch } from "vue";
import type { Subscription, BillingCycle, Category } from "../type";

const props = defineProps<{
  isOpen: boolean;
  editingSub: Subscription | null;
  serverError?: string | null;
}>();

const emit = defineEmits<{
  close: [];
  submit: [data: Omit<Subscription, "id">];
}>();

const categories: Category[] = [
  "Streaming",
  "Software/SaaS",
  "Fitness",
  "Gaming",
  "News/Media",
  "Other",
];
const billingCycles: BillingCycle[] = ["weekly", "monthly", "yearly"];

const emptyForm = {
  name: "",
  cost: 0,
  billingCycle: "monthly" as BillingCycle,
  category: "Streaming" as Category,
  nextRenewalDate: "",
  startDate: "",
  isRarelyUsed: false,
};

const form = reactive({ ...emptyForm });
const errors = reactive<string[]>([]);

watch(
  () => props.isOpen,
  (open) => {
    if (open) {
      if (props.editingSub) {
        Object.assign(form, props.editingSub);
      } else {
        Object.assign(form, emptyForm);
      }
      errors.length = 0;
    }
  },
);

function validate(): boolean {
  errors.length = 0;

  if (!form.name.trim()) {
    errors.push("Name cannot be empty");
  }
  if (form.cost <= 0) {
    errors.push("Cost must be greater than 0");
  }
  if (!form.startDate) {
    errors.push("Start date is required");
  }
  if (!form.nextRenewalDate) {
    errors.push("Next renewal date is required");
  }
  if (
    form.startDate &&
    form.nextRenewalDate &&
    form.nextRenewalDate < form.startDate
  ) {
    errors.push("Renewal date cannot be before start date");
  }

  return errors.length === 0;
}

function handleSubmit() {
  if (!validate()) return;
  emit("submit", { ...form, name: form.name.trim() });
}
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
    @click.self="emit('close')"
  >
    <div
      class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md max-h-[90vh] flex flex-col"
    >
      <div class="p-6 overflow-y-auto">
        <h2 class="text-lg font-semibold mb-4">
          {{ editingSub ? "Edit Subscription" : "Add Subscription" }}
        </h2>

        <ul
          v-if="errors.length || serverError"
          class="bg-red-50 text-red-700 text-sm rounded p-3 space-y-1 mb-4"
        >
          <li v-for="err in errors" :key="err">{{ err }}</li>
          <li v-if="serverError">{{ serverError }}</li>
        </ul>

        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Name</label>
            <input
              v-model="form.name"
              type="text"
              class="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Cost</label>
            <input
              v-model.number="form.cost"
              type="number"
              step="0.01"
              class="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Billing Cycle</label>
            <select
              v-model="form.billingCycle"
              class="w-full border rounded px-3 py-2"
            >
              <option
                v-for="cycle in billingCycles"
                :key="cycle"
                :value="cycle"
              >
                {{ cycle }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Category</label>
            <select
              v-model="form.category"
              class="w-full border rounded px-3 py-2"
            >
              <option v-for="cat in categories" :key="cat" :value="cat">
                {{ cat }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium mb-1"
              >Next Renewal Date</label
            >
            <input
              v-model="form.nextRenewalDate"
              type="date"
              class="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label class="block text-sm font-medium mb-1">Start Date</label>
            <input
              v-model="form.startDate"
              type="date"
              class="w-full border rounded px-3 py-2"
            />
          </div>

          <label class="flex items-center gap-2 text-sm">
            <input v-model="form.isRarelyUsed" type="checkbox" />
            Rarely used
          </label>

          <div class="flex justify-end gap-2 pt-2">
            <button
              type="button"
              @click="emit('close')"
              class="px-4 py-2 text-sm text-gray-600 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              class="px-4 py-2 text-sm bg-blue-600 text-white rounded cursor-pointer"
            >
              {{ editingSub ? "Save Changes" : "Add" }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
