<template>
  <aside class="space-y-6 rounded-3xl border border-slate-200 bg-slate-50 p-6">
    <section class="space-y-3">
      <h4 class="text-sm font-semibold text-slate-900">Search posts</h4>
      <input
        type="search"
        placeholder="Search blog..."
        v-model="searchQuery"
        @input="onSearch"
        class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"
      />
    </section>

    <section class="space-y-3">
      <h4 class="text-sm font-semibold text-slate-900">Categories</h4>
      <div class="grid gap-2">
        <button
          v-for="category in categories"
          :key="category"
          :class="[
            'w-full rounded-2xl border px-4 py-3 text-left text-sm font-medium transition',
            category === selectedCategory ? 'border-sky-600 bg-sky-600 text-white' : 'border-slate-300 bg-white text-slate-900 hover:border-slate-400'
          ]"
          @click="selectCategory(category)"
          type="button"
        >
          {{ category }}
        </button>
      </div>
    </section>

    <section class="space-y-3">
      <h4 class="text-sm font-semibold text-slate-900">Archive</h4>
      <ul class="space-y-4 text-sm text-slate-700">
        <li v-for="(posts, archive) in archives" :key="archive" class="space-y-1">
          <strong class="block text-slate-900">{{ archive }}</strong>
          <p>{{ posts.length }} post<span v-if="posts.length > 1">s</span></p>
        </li>
      </ul>
    </section>
  </aside>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { usePostStore } from '../store/postStore';

const { state, categories, archives, setSearchQuery, setCategoryFilter } = usePostStore();
const searchQuery = ref(state.searchQuery);
const selectedCategory = computed(() => state.categoryFilter);

const onSearch = () => setSearchQuery(searchQuery.value);
const selectCategory = (category: string) => setCategoryFilter(category);
</script>
