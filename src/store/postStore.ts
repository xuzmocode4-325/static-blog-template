import { reactive, computed } from 'vue';
import type { Post } from '../types/post';
import { samplePosts } from '../data/posts';
import { fetchPosts } from '../api/posts';

const STORAGE_KEY = 'static-blog-template-posts';

const state = reactive({
  posts: [] as Post[],
  searchQuery: '',
  categoryFilter: 'All',
});

const save = () => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.posts));
};

const initializePosts = async () => {
  const stored = window.localStorage.getItem(STORAGE_KEY);

  if (stored) {
    try {
      state.posts = JSON.parse(stored) as Post[];
      return;
    } catch {
      // Continue to fetch the JSON API fallback
    }
  }

  try {
    const posts = await fetchPosts();
    state.posts = posts;
    save();
  } catch {
    state.posts = [...samplePosts];
    save();
  }
};

initializePosts();

export const usePostStore = () => {
  const filteredPosts = computed(() => {
    const query = state.searchQuery.toLowerCase().trim();
    return state.posts.filter((post) => {
      const matchesQuery = !query || post.title.toLowerCase().includes(query) || post.excerpt.toLowerCase().includes(query);
      const matchesCategory = state.categoryFilter === 'All' || post.category === state.categoryFilter;
      return matchesQuery && matchesCategory;
    });
  });

  const categories = computed(() => {
    const unique = Array.from(new Set(state.posts.map((post) => post.category)));
    return ['All', ...unique];
  });

  const archives = computed(() => {
    return state.posts.reduce<Record<string, Post[]>>((groups, post) => {
      const month = new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
      groups[month] = groups[month] ? [...groups[month], post] : [post];
      return groups;
    }, {});
  });

  const addPost = (post: Post) => {
    state.posts.unshift(post);
    save();
  };

  const updatePost = (post: Post) => {
    const index = state.posts.findIndex((item) => item.id === post.id);
    if (index >= 0) {
      state.posts.splice(index, 1, post);
      save();
    }
  };

  const deletePost = (postId: string) => {
    state.posts = state.posts.filter((post) => post.id !== postId);
    save();
  };

  const setSearchQuery = (value: string) => {
    state.searchQuery = value;
  };

  const setCategoryFilter = (value: string) => {
    state.categoryFilter = value;
  };

  return {
    state,
    filteredPosts,
    categories,
    archives,
    addPost,
    updatePost,
    deletePost,
    setSearchQuery,
    setCategoryFilter,
    save,
  };
};
