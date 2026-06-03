<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="mx-auto grid gap-10 px-6 py-20 max-w-7xl lg:grid-cols-[1.4fr_1fr] lg:items-start">
      <div class="rounded-[1.75rem] border border-slate-200 bg-white p-10 dark:border-white/10 dark:bg-slate-950">
        <div class="space-y-4">
          <p class="text-sm uppercase tracking-[0.2em] text-sky-600">Admin</p>
          <h1 class="text-3xl font-semibold text-slate-950 dark:text-white">Manage blog posts</h1>
          <p class="text-slate-600 dark:text-slate-300">Use the admin dashboard to manage content and users.</p>
        </div>

        <div class="mt-10 space-y-6 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-slate-900">
          <div v-if="auth.state.profile" class="space-y-4">
            <p class="text-sm text-slate-600 dark:text-slate-300">Signed in as <strong>{{ auth.state.profile.email }}</strong></p>
            <p class="text-sm text-slate-600 dark:text-slate-300">Role: <strong>{{ auth.state.profile.role || 'user' }}</strong></p>
            <button @click="handleSignOut" class="rounded-2xl bg-rose-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-rose-400">Sign out</button>
          </div>
          <div v-else class="space-y-4">
            <p class="text-sm text-slate-600 dark:text-slate-300">You must sign in to access admin tools.</p>
            <router-link to="/admin/login" class="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-500">Go to login</router-link>
          </div>
        </div>
      </div>

      <div class="rounded-[1.75rem] border border-slate-200 bg-white p-10 dark:border-white/10 dark:bg-slate-950">
        <div class="space-y-4">
          <p class="text-sm uppercase tracking-[0.2em] text-sky-600">Admin tools</p>
          <h2 class="text-2xl font-semibold text-slate-950 dark:text-white">Dashboard coming soon</h2>
          <p class="text-slate-600 dark:text-slate-300">The admin dashboard will include post, user, and campaign management for your Supabase backend.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useAuthStore } from '../store/authStore';

const auth = useAuthStore();

const handleSignOut = async () => {
  await auth.signOut();
};
</script>
