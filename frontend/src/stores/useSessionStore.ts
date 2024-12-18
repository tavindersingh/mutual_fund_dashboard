import { defineStore } from "pinia";
import { ref } from "vue";
import { Tokens } from "../models/Tokens";

export const useSessionStore = defineStore("session", () => {
  const isLoggedIn = ref(false);
  const tokens = ref<Tokens | undefined>(undefined);

  const startSession = (data: Tokens) => {
    isLoggedIn.value = true;
    tokens.value = data;
  };

  return {
    isLoggedIn,
    tokens,
    startSession,
  };
});
