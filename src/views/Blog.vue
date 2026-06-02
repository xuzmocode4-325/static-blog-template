<template>
  <section class="bg-white py-24 sm:py-32 dark:bg-gray-900">
    <div class="mx-auto max-w-7xl px-6 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <p class="text-sm uppercase tracking-[0.2em] text-sky-600">Blog</p>
        <h2 class="text-4xl font-semibold tracking-tight text-balance text-gray-900 sm:text-5xl dark:text-white">From the blog</h2>
        <p class="mt-2 text-lg/8 text-gray-600 dark:text-gray-300">Learn how to grow your business with our expert advice.</p>
      </div>

      <div class="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        <article v-for="post in posts" :key="post.id" class="flex flex-col items-start justify-between">
          <div class="relative w-full">
            <img :src="post.imageUrl" alt="" class="aspect-video w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2] dark:bg-gray-800" />
            <div class="absolute inset-0 rounded-2xl inset-ring inset-ring-gray-900/10 dark:inset-ring-white/10"></div>
          </div>
          <div class="flex max-w-xl grow flex-col justify-between">
            <div class="mt-8 flex items-center gap-x-4 text-xs">
              <time :datetime="post.datetime" class="text-gray-500 dark:text-gray-400">{{ post.date }}</time>
              <a :href="post.category.href" class="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100 dark:bg-gray-800/60 dark:text-gray-300 dark:hover:bg-gray-800">{{ post.category.title }}</a>
            </div>
            <div class="group relative grow">
              <h3 class="mt-3 text-lg/6 font-semibold text-gray-900 group-hover:text-gray-600 dark:text-white dark:group-hover:text-gray-300">
                <a :href="post.href">
                  <span class="absolute inset-0"></span>
                  {{ post.title }}
                </a>
              </h3>
              <p class="mt-5 line-clamp-3 text-sm/6 text-gray-600 dark:text-gray-400">{{ post.description }}</p>
            </div>
            <div class="relative mt-8 flex items-center gap-x-4 justify-self-end">
              <img :src="post.author.imageUrl" alt="" class="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-800" />
              <div class="text-sm/6">
                <p class="font-semibold text-gray-900 dark:text-white">
                  <a :href="post.author.href">
                    <span class="absolute inset-0"></span>
                    {{ post.author.name }}
                  </a>
                </p>
                <p class="text-gray-600 dark:text-gray-400">{{ post.author.role }}</p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { usePostStore } from '../store/postStore';

const { state } = usePostStore();

const posts = computed(() =>
  state.posts.map((post) => ({
    id: post.id,
    title: post.title,
    href: `/blog/${post.id}`,
    description: post.excerpt,
    imageUrl:
      post.imageUrl ??
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    date: new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    datetime: post.publishedAt,
    category: { title: post.category, href: '#' },
    author: {
      name: post.author,
      role: post.authorRole ?? 'Author',
      href: '#',
      imageUrl:
        post.authorImageUrl ??
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format=facearea&facepad=2&w=256&q=80',
    },
  }))
);
</script>
