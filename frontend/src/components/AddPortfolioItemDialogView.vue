<script setup lang="ts">
import { ref } from "vue";
import Datepicker from "vue3-datepicker";
import { CreatePortfolioItem } from "../models/CreatePortfolioItem";
import { Fund } from "../models/Fund";

defineEmits<{
  (e: "addPortfolioItem", portfolioItem: CreatePortfolioItem): void;
}>();

defineProps<{
  selectedFund: Fund;
}>();

const selectedDate = ref(new Date());
const units = ref(1);
</script>
<template>
  <h2 class="text-2xl font-bold mb-4">Add to Portfolio</h2>
  <h3 class="text-lg font-semibold">{{ selectedFund.schemeName }}</h3>
  <p>{{ selectedFund.fundHouse.name }}</p>
  <div class="flex flex-col gap-1 mt-4">
    <label for="units">Number of Units</label>
    <input
      type="number"
      id="units"
      class="input input-bordered w-full focus:border-primary focus:outline-none focus:ring-0"
      v-model="units"
    />
  </div>

  <div class="flex flex-col gap-1 mt-4">
    <label for="units">Select Date of Purchase</label>
    <Datepicker
      v-model="selectedDate"
      typeable
      class="input input-bordered w-full focus:border-primary focus:outline-none focus:ring-0"
    />
  </div>

  <div class="mt-10 flex flex-col gap-6">
    <button
      class="btn btn-primary w-full"
      @click="
        () =>
          $emit('addPortfolioItem', {
            purchaseDate: selectedDate,
            schemeCode: selectedFund.schemeCode,
            units: units,
          })
      "
    >
      Add
    </button>
    <form method="dialog">
      <button class="btn btn-outline btn-error w-full">Cancel</button>
    </form>
  </div>
</template>
