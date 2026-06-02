<template>
  <article class="relative min-h-[26rem] overflow-hidden rounded-[1.5rem] bg-slate-950 text-slate-50 p-10 pb-7 flex flex-col justify-end">
    <img :src="imageUrl" alt="" class="absolute inset-0 h-full w-full object-cover z-0" />
    <div class="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/60 to-slate-950/20 z-10"></div>
    <div class="absolute inset-0 rounded-[1.5rem] border border-white/10 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] z-20"></div>

    <div class="relative z-30 flex flex-wrap justify-between gap-4 text-sm text-slate-300">
      <time :datetime="props.post.publishedAt">{{ formattedDate }}</time>
      <div class="flex items-center gap-3">
        <svg viewBox="0 0 2 2" class="h-2 w-2 flex-none fill-slate-300" aria-hidden="true">
          <circle cx="1" cy="1" r="1" />
        </svg>
        <img :src="authorImageUrl" alt="Author photo" class="h-8 w-8 rounded-full object-cover bg-white/10" />
        <span>{{ props.post.author }}</span>
      </div>
    </div>

    <h3 class="relative z-30 mt-4 text-2xl leading-tight font-semibold">
      <router-link :to="blogLink" class="text-white no-underline hover:text-sky-300">
        <span class="sr-only">Read {{ props.post.title }}</span>
        {{ props.post.title }}
      </router-link>
    </h3>
  </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Post } from '../types/post';

const props = defineProps<{ post: Post }>();
const formattedDate = computed(() =>
  new Date(props.post.publishedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
);
const blogLink = computed(() => `/blog/${props.post.id}`);

const imageUrl = computed(() => {
  if ((props.post as any).imageUrl) {
    return (props.post as any).imageUrl;
  }

  const imageSeeds = [
    'business',
    'workspace',
    'technology',
    'creative',
    'writing',
    'design',
  ];
  const seed = imageSeeds[props.post.id.charCodeAt(0) % imageSeeds.length];
  return `https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80`;
});

const authorImageUrl = computed(() => {
  return `https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`;
});
</script>
