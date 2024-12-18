<script setup lang="ts">
defineProps<{
  title: string;
  isLoading?: boolean;
}>();

defineEmits<{
  (e: "click"): void;
}>();
</script>

<template>
  <button class="btn btn-primary btn-block" @click="$emit('click')">
    <span v-if="isLoading" class="loading loading-spinner"></span>
    <span v-else>{{ title }}</span>
  </button>
</template>
