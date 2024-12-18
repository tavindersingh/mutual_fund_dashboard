<script setup lang="ts">
import FundsListView from "../components/FundsListView.vue";
import { useSessionStore } from "../stores/useSessionStore";

const sessionStore = useSessionStore();
</script>

<template>
  <div class="h-screen container mx-auto flex w-full">
    <div class="flex-1">
      <FundsListView />
    </div>
    <div class="w-1/3"></div>
  </div>
</template>
