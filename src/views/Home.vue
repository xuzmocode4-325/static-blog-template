<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
        <div class="hidden sm:mb-8 sm:flex sm:justify-center">
        </div>
        <div class="text-center">
          <h1 class="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl dark:text-white">Data to enrich your online business</h1>
          <p class="mt-8 text-lg font-medium text-pretty text-gray-600 sm:text-xl/8 dark:text-gray-400">Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat.</p>
        </div>
      </div>
    </div>

    <section class="bg-white py-16 sm:py-24 lg:py-32 dark:bg-gray-900">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <h2 class="max-w-2xl text-3xl font-semibold tracking-tight text-balance text-gray-900 sm:text-4xl dark:text-white">Want product news and updates? Sign up for our newsletter.</h2>
        <form class="mt-10 max-w-xl lg:max-w-2xl">
          <div class="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto]">
            <div class="grid gap-4 sm:grid-cols-2">
              <div>
                <label for="name" class="sr-only">Name</label>
                <input id="name" name="name" type="text" autocomplete="name" class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-gray-700 dark:focus:outline-indigo-500" placeholder="Enter your name" />
              </div>
              <div>
                <label for="email-address" class="sr-only">Email address</label>
                <input id="email-address" name="email" type="email" autocomplete="email" required class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 dark:bg-white/5 dark:text-white dark:outline-gray-700 dark:focus:outline-indigo-500" placeholder="Enter your email" />
              </div>
            </div>
            <button type="submit" class="flex-none rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500">Subscribe</button>
          </div>
          <p class="mt-4 text-sm/6 text-gray-900 dark:text-gray-300">We care about your data. Read our <a href="#" class="font-semibold whitespace-nowrap text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">privacy policy</a>.</p>
        </form>
      </div>
    </section>

    <section class="bg-white text-slate-950 dark:bg-gray-900 dark:text-white">
      <div class="mx-auto px-6 py-20 max-w-7xl">
        <div class="max-w-3xl space-y-4">
          <p class="text-sm uppercase tracking-[0.2em] text-sky-600">About this template</p>
          <h2 class="text-3xl font-semibold tracking-tight">Designed for storytelling and a modern publishing workflow.</h2>
        </div>
        <div class="mt-10 grid gap-6 lg:grid-cols-3">
          <article class="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-8">
            <h3 class="text-xl font-semibold text-slate-950">Fast navigation</h3>
            <p class="mt-3 text-slate-600">Simple header structure and clear routes make the site easy to browse.</p>
          </article>
          <article class="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-8">
            <h3 class="text-xl font-semibold text-slate-950">Responsive content</h3>
            <p class="mt-3 text-slate-600">The blog grid, sidebar, and pages all adapt smoothly from mobile to desktop.</p>
          </article>
          <article class="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-8">
            <h3 class="text-xl font-semibold text-slate-950">Editable posts</h3>
            <p class="mt-3 text-slate-600">Admin page support lets you manage content without rebuilding the template.</p>
          </article>
        </div>
      </div>
    </section>

    <section class="bg-white text-slate-950 dark:bg-gray-900 dark:text-white">
      <div class="mx-auto px-6 py-20 max-w-7xl">
        <div class="max-w-3xl space-y-4">
          <p class="text-sm uppercase tracking-[0.2em] text-sky-600">From the blog</p>
          <h2 class="text-3xl font-semibold tracking-tight">Learn how to grow your business with our expert advice.</h2>
        </div>
        <div class="mt-10 grid gap-6 lg:grid-cols-3">
          <PostCard v-for="post in recentPosts" :key="post.id" :post="post" />
        </div>
        <div class="mt-10 text-center">
          <router-link to="/blog" class="text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">See more <span aria-hidden="true">→</span></router-link>
        </div>
      </div>
    </section>

    <section class="bg-white text-slate-950 dark:bg-gray-900 dark:text-white">
      <div class="mx-auto px-6 py-20 max-w-7xl">
        <div class="rounded-[1.5rem] border border-slate-200 bg-slate-50 p-10 dark:border-white/10 dark:bg-white/5">
          <h2 class="text-2xl font-semibold text-slate-950 dark:text-white">Disclaimer</h2>
          <p class="mt-4 text-slate-600 dark:text-slate-200">This template is a static front-end starter. Admin changes are stored locally in the browser and are intended to demonstrate the workflow inside a static site.</p>
        </div>
      </div>
    </section>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { usePostStore } from '../store/postStore';
import PostCard from '../components/PostCard.vue';

const { state } = usePostStore();
const recentPosts = computed(() =>
  [...state.posts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 12)
);
</script>
