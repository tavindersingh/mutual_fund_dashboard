<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import Button from "../../components/common/Button.vue";
import { useAuth } from "../../composables/useAuth";
import { useSessionStore } from "../../stores/useSessionStore";

const router = useRouter();

const { login } = useAuth();
const sessionStore = useSessionStore();

const isLoading = ref(false);

const onLoginFormSubmit = async (event: Event) => {
  isLoading.value = true;

  const target = event.target as HTMLFormElement;
  const email = target.email.value;
  const password = target.password.value;

  const response = await login(email, password);

  if (response.success) {
    toast.success(response.message);

    sessionStore.startSession(response.tokens!);

    setTimeout(() => {
      router.replace("/");
    }, 500);
  } else {
    toast.error(response.message);
  }

  isLoading.value = false;
};
</script>

<template>
  <div class="w-screen h-screen flex items-center justify-center">
    <div class="mx-auto w-full max-w-lg bg-base-300 rounded-xl px-8 py-8">
      <h3 class="text-2xl font-bold">Login to continue</h3>

      <form
        class="mt-4 flex flex-col gap-3"
        @submit.prevent="onLoginFormSubmit"
      >
        <div class="flex flex-col gap-1">
          <label for="email" class="text-sm font-semibold">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            class="input input-bordered w-full focus:border-primary focus:outline-none focus:ring-0"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label for="password" class="text-sm font-semibold">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            class="input input-bordered w-full focus:border-primary focus:outline-none focus:ring-0"
          />
        </div>

        <div class="mt-2">
          <Button title="Login" :is-loading="isLoading" class="w-full" />
        </div>
      </form>
      <div class="mt-2 text-center">
        <span>Don't have an account? </span>
        <RouterLink to="/signup" class="text-primary">
          Create New Account
        </RouterLink>
      </div>
    </div>
  </div>
</template>
