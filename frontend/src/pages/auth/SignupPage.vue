<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { toast } from "vue3-toastify";
import Button from "../../components/common/Button.vue";
import { useAuth } from "../../composables/useAuth";

const router = useRouter();

const { signup } = useAuth();

const isLoading = ref(false);

const onSignupFormSubmit = async (event: Event) => {
  isLoading.value = true;

  const target = event.target as HTMLFormElement;
  const email = target.email.value;
  const password = target.password.value;

  console.log(email, password);

  const response = await signup(email, password);

  if (response.success) {
    toast.success(response.message);

    setTimeout(() => {
      router.replace("/login");
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
      <h1 class="text-2xl font-bold">Create New Account</h1>

      <form
        class="mt-4 flex flex-col gap-3"
        @submit.prevent="onSignupFormSubmit"
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
          <Button title="Sign Up" :is-loading="isLoading" class="w-full" />
        </div>
      </form>
      <div class="mt-2 text-center">
        <span> Already have an account? </span>
        <RouterLink to="/login" class="text-primary"> Login here </RouterLink>
      </div>
    </div>
  </div>
</template>
