<script setup lang="ts">
import FundsListView from "../components/FundsListView.vue";
import UserPortfolioView from "../components/UserPortfolioView.vue";
import { useSessionStore } from "../stores/useSessionStore";

const sessionStore = useSessionStore();
</script>

<template>
  <div class="h-screen container mx-auto flex w-full gap-2">
    <div class="flex-1">
      <FundsListView />
    </div>
    <div class="w-1/3 p-4 h-full">
      <UserPortfolioView />
    </div>
  </div>
</template>
