<script setup lang="ts">
import { useAuth } from "../composables/useAuth";

const { tokens } = useAuth();
</script>

<template>
  <h1>Home Page</h1>
  <p>Tokens: {{ tokens }}</p>
</template>
