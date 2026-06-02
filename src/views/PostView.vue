<template>
  <div class="bg-white px-6 py-32 lg:px-8 dark:bg-gray-900">
    <div class="mx-auto max-w-3xl text-base/7 text-gray-700 dark:text-gray-300">
      <p class="text-base/7 font-semibold text-indigo-600 dark:text-indigo-400">{{ category }}</p>
      <h1 class="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">{{ postTitle }}</h1>
      <p class="mt-6 text-xl/8">{{ postExcerpt }}</p>
      <div v-if="post" class="mt-10 max-w-2xl text-gray-600 dark:text-gray-400">
        <p>{{ paragraphOne }}</p>
        <ul role="list" class="mt-8 max-w-xl space-y-8 text-gray-600 dark:text-gray-400">
          <li class="flex gap-x-3">
            <CheckCircleIcon class="mt-1 size-5 flex-none text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
            <span><strong class="font-semibold text-gray-900 dark:text-white">{{ bulletOneTitle }}</strong> {{ bulletOneText }}</span>
          </li>
          <li class="flex gap-x-3">
            <CheckCircleIcon class="mt-1 size-5 flex-none text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
            <span><strong class="font-semibold text-gray-900 dark:text-white">{{ bulletTwoTitle }}</strong> {{ bulletTwoText }}</span>
          </li>
          <li class="flex gap-x-3">
            <CheckCircleIcon class="mt-1 size-5 flex-none text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
            <span><strong class="font-semibold text-gray-900 dark:text-white">{{ bulletThreeTitle }}</strong> {{ bulletThreeText }}</span>
          </li>
        </ul>
        <p class="mt-8">{{ paragraphTwo }}</p>
        <h2 class="mt-16 text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">{{ sectionHeading }}</h2>
        <p class="mt-6">{{ paragraphThree }}</p>
        <figure class="mt-10 border-l border-indigo-600 pl-9 dark:border-indigo-400">
          <blockquote class="font-semibold text-gray-900 dark:text-white">
            <p>{{ quote }}</p>
          </blockquote>
          <figcaption class="mt-6 flex gap-x-4">
            <img class="size-6 flex-none rounded-full bg-gray-50 dark:bg-gray-800" :src="authorImage" alt="" />
            <div class="text-sm/6"><strong class="font-semibold text-gray-900 dark:text-white">{{ authorName }}</strong> – {{ authorRole }}</div>
          </figcaption>
        </figure>
        <p class="mt-10">{{ paragraphFour }}</p>
      </div>
      <div v-else class="mt-10 rounded-[1.5rem] border border-slate-200 bg-slate-50 p-10 text-slate-900 dark:border-white/10 dark:bg-white/5">
        <h2 class="text-2xl font-semibold">Post not found</h2>
        <p class="mt-4 text-sm text-slate-600 dark:text-slate-300">The post could not be loaded yet. Please check the API or refresh the page.</p>
      </div>
      <figure class="mt-16">
        <img class="aspect-video rounded-xl bg-gray-50 object-cover dark:bg-gray-800" :src="heroImage" :alt="heroAlt" />
        <figcaption class="mt-4 flex gap-x-2 text-sm/6 text-gray-500 dark:text-gray-400">
          <InformationCircleIcon class="mt-0.5 size-5 flex-none text-gray-300 dark:text-gray-600" aria-hidden="true" />
          {{ heroCaption }}
        </figcaption>
      </figure>
      <div class="mt-16 max-w-2xl text-gray-600 dark:text-gray-400">
        <h2 class="text-3xl font-semibold tracking-tight text-pretty text-gray-900 dark:text-white">Everything you need to get up and running</h2>
        <p class="mt-6">{{ paragraphFive }}</p>
        <p class="mt-8">{{ paragraphSix }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { usePostStore } from '../store/postStore';
import { CheckCircleIcon, InformationCircleIcon } from '@heroicons/vue/20/solid';

const route = useRoute();
const { state } = usePostStore();
const postId = computed(() => String(route.params.id || ''));

const post = computed(() => state.posts.find((item) => item.id === postId.value));

const formattedDate = computed(() => {
  if (!post.value) return '';
  return new Date(post.value.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
});

const subtitle = computed(() => (post.value?.category ? `Introducing ${post.value.category}` : 'Introducing'));
const postTitle = computed(() => post.value?.title ?? 'Loading post...');
const postExcerpt = computed(() => post.value?.excerpt ?? 'Fetching blog content from the API.');
const paragraphOne = computed(() => post.value?.content ?? 'Content is loading or unavailable at this time.');
const paragraphTwo = computed(() => post.value ? `${post.value.author} shares a concise take on ${post.value.title}, with practical examples and tips for readers.` : 'Loading additional information...');
const paragraphThree = computed(() => post.value ? `Id orci tellus laoreet id ac. Dolor, aenean leo, ac etiam consequat in. ${post.value.authorRole ?? 'This post'} is designed to help you understand the main topic quickly.` : 'Loading expert guidance...');
const paragraphFour = computed(() => post.value ? 'Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim. Mattis mauris semper sed amet vitae sed turpis id.' : 'Waiting for content...');
const paragraphFive = computed(() => post.value ? `Purus morbi dignissim senectus mattis adipiscing. ${post.value.author} crafts the content with clarity and structure.` : 'More details will appear once the post is loaded.');
const paragraphSix = computed(() => post.value ? 'Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus enim.' : 'Please refresh if the content does not load.');

const bulletOneTitle = computed(() => post.value?.category ?? 'Core concept');
const bulletOneText = computed(() => post.value?.excerpt ?? 'This post introduces the main idea and explains why it matters.');
const bulletTwoTitle = computed(() => post.value?.author ?? 'Author');
const bulletTwoText = computed(() => post.value ? `${post.value.author} explains the topic using clear, practical guidance.` : 'An expert summary is coming soon.');
const bulletThreeTitle = computed(() => (post.value ? formattedDate.value : 'Published'));
const bulletThreeText = computed(() => (post.value ? `Read the full post titled “${post.value.title}”.` : 'The published date will appear once loaded.'));
const sectionHeading = computed(() => (post.value ? `From ${post.value.category ?? 'beginner'} to expert in 3 hours` : 'From beginner to expert in 3 hours'));
const quote = computed(() => (post.value?.excerpt ? `"${post.value.excerpt}"` : '“Loading insight…”'));
const authorName = computed(() => post.value?.author ?? 'Author');
const authorRole = computed(() => post.value?.authorRole ?? 'Marketing Manager');
const authorImage = computed(() => post.value?.authorImageUrl ?? 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80');
const heroImage = computed(() => post.value?.imageUrl ?? 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&w=1310&h=873&q=80&facepad=3');
const heroAlt = computed(() => (post.value ? `${post.value.title} image` : 'Post hero image'));
const heroCaption = computed(() => (post.value ? `Illustration for ${post.value.title}` : 'Faucibus commodo massa rhoncus, volutpat.'));
</script>
