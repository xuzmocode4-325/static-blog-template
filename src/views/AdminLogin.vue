<template>
  <section class="min-h-screen bg-slate-50 px-6 py-20 dark:bg-slate-950">
    <div class="mx-auto w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-10 shadow-xl dark:border-white/10 dark:bg-slate-900">
      <div class="space-y-4 text-center">
        <p class="text-sm uppercase tracking-[0.2em] text-sky-600">Admin login</p>
        <h1 class="text-3xl font-semibold text-slate-950 dark:text-white">Sign in to manage content</h1>
        <p class="text-sm text-slate-600 dark:text-slate-300">Use your admin email to receive a secure sign-in link.</p>
      </div>

      <form @submit.prevent="handleSignIn" class="mt-10 space-y-6">
        <label class="grid gap-2 text-sm text-slate-900 dark:text-white">
          <span>Email address</span>
          <input
            type="email"
            v-model="email"
            required
            placeholder="admin@example.com"
            class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500 dark:bg-slate-950 dark:text-white dark:border-white/10"
          />
        </label>

        <button type="submit" class="w-full rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-500">Send sign-in link</button>
      </form>

      <div class="mt-6 text-sm text-slate-600 dark:text-slate-300">
        <p v-if="message" class="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-sky-900">{{ message }}</p>
        <p v-if="authError" class="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-rose-900">{{ authError }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../store/authStore';

const email = ref('');
const auth = useAuthStore();
const authError = ref('');
const message = ref('');

const handleSignIn = async () => {
  authError.value = '';
  message.value = '';

  if (!email.value) {
    authError.value = 'Please enter your email address.';
    return;
  }

  const success = await auth.signInWithEmail(email.value);
  if (success) {
    message.value = 'A sign-in link has been sent to your email.';
    email.value = '';
  } else {
    authError.value = auth.state.authError || 'Unable to send the sign-in link.';
  }
};
</script>
