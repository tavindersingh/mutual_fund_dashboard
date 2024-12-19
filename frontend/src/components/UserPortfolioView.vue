<script setup lang="ts">
import { computed, ref } from "vue";
import { usePortfolioStore } from "../stores/usePortfolioStore";

const portfolioStore = usePortfolioStore();

const isLoading = ref(false);
const isSuccess = ref(false);
const message = ref("");

const totalCurrentValue = computed(() => {
  return (
    portfolioStore.portfolio?.reduce((acc, item) => {
      return acc + item.totalCurrentValue;
    }, 0) ?? 0
  );
});

const totalInvestedValue = computed(() => {
  return (
    portfolioStore.portfolio?.reduce((acc, item) => {
      return acc + item.totalOriginalPrice;
    }, 0) ?? 0
  );
});

const totalReturns = computed(() => {
  return totalCurrentValue.value - totalInvestedValue.value;
});

const fetchPortfolioItems = async () => {
  isLoading.value = true;
  console.log("fetching user portfolio");
  const response = await portfolioStore.getUserPortfolio();

  isSuccess.value = response.success;
  message.value = response.message;
  isLoading.value = false;
};

fetchPortfolioItems();
</script>

<template>
  <div class="flex flex-col h-full">
    <h2 class="text-2xl mb-4 font-bold">Investments</h2>

    <div class="outline flex flex-col p-4 gap-4 rounded-lg">
      <div class="flex justify-between">
        <div>
          <h4>Current Value</h4>
          <p class="font-bold text-white">
            {{ totalCurrentValue.toFixed(2) }}
          </p>
        </div>

        <div class="text-right">
          <h4>Total Returns</h4>
          <p class="font-bold">{{ totalReturns.toFixed(2) }}</p>
        </div>
      </div>
      <div>
        <div>
          <h4>Invested</h4>
          <p class="font-bold text-white">
            {{ totalInvestedValue.toFixed(2) }}
          </p>
        </div>
      </div>
    </div>

    <div class="flex flex-col flex-1 outline rounded-lg mt-6 p-4">
      <div class="border-b border-dashed text-right text-sm py-0.5">
        <p>Current(Invested)</p>
      </div>
      <div
        v-for="portfolio in portfolioStore.portfolio"
        :key="portfolio.portfolio_schemeCode"
        class="flex gap-2 border-b py-4 border-gray-400 items-center"
      >
        <div class="flex-1 text-base">
          <p>{{ portfolio.fund_schemeName }}</p>
          <p class="text-xs">Total Units: {{ portfolio.totalUnits }}</p>
        </div>
        <div>
          <p class="text-sm">
            <span>{{ portfolio.totalCurrentValue.toFixed(2) }}</span>
            <span>({{ portfolio.totalOriginalPrice.toFixed(2) }})</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
