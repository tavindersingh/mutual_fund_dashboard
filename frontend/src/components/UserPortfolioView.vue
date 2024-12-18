<script setup lang="ts">
import { onMounted, ref } from "vue";
import { usePortfolioStore } from "../stores/usePortfolioStore";

const portfolioStore = usePortfolioStore();

const isLoading = ref(false);
const isSuccess = ref(false);
const message = ref("");

onMounted(async () => {
  isLoading.value = true;
  const response = await portfolioStore.getUserPortfolio();

  isSuccess.value = response.success;
  message.value = response.message;
  isLoading.value = false;
});
</script>

<template>
  <div class="flex flex-col h-full">
    <h2 class="text-2xl mb-4 font-bold">Investments</h2>

    <div class="outline flex flex-col p-4 gap-4 rounded-lg">
      <div class="flex justify-between">
        <div>
          <h4>Current Value</h4>
          <p class="font-bold text-white">1,20,000</p>
        </div>

        <div class="text-right">
          <h4>Total Returns</h4>
          <p class="font-bold">+20,000</p>
        </div>
      </div>
      <div>
        <div>
          <h4>Invested</h4>
          <p class="font-bold text-white">1,00,000</p>
        </div>
      </div>
    </div>

    <div class="flex flex-col flex-1 outline rounded-lg mt-6 p-4">
      <div
        v-for="portfolio in portfolioStore.portfolio"
        :key="portfolio.portfolio_schemeCode"
        class="flex gap-2 border-b py-4 border-gray-400 items-center"
      >
        <div class="flex-1 text-base">
          <p>{{ portfolio.fund_schemeName }}</p>
        </div>
        <div>
          <p class="text-sm">
            <span>{{ portfolio.totalCurrentValue }}</span>
            <span>({{ portfolio.totalOriginalPrice }})</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
