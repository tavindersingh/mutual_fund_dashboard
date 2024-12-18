<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useFundsStore } from "../stores/useFundsStore";

const fundsStore = useFundsStore();

const isSuccess = ref(false);
const isLoading = ref(false);
const message = ref("");

onMounted(async () => {
  isLoading.value = true;
  const response = await fundsStore.fetchFundsList();

  isLoading.value = false;
  isSuccess.value = response.success;
  message.value = response.message;
});
</script>

<template>
  <div v-if="isLoading">Loading</div>

  <div v-if="!isSuccess">
    {{ message }}
  </div>

  <div class="h-screen overflow-scroll p-4">
    <h2 class="text-2xl mb-4 font-bold">Funds List</h2>
    <div class="flex flex-col space-y-4">
      <div
        v-for="fund in fundsStore.funds"
        :key="fund.schemeCode"
        class="card bg-neutral text-neutral-content"
      >
        <div class="card-body px-6 py-5">
          <h3 class="card-title text-lg">{{ fund.schemeName }}</h3>
          <p>{{ fund.fundSchemeType.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
