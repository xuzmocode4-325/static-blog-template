<template>
  <section class="bg-white dark:bg-gray-900">
    <div class="mx-auto grid gap-10 px-6 py-20 max-w-7xl lg:grid-cols-[1.4fr_1fr] lg:items-start">
      <div class="rounded-[1.75rem] border border-slate-200 bg-white p-10 dark:border-white/10 dark:bg-slate-950">
        <div class="space-y-4">
          <p class="text-sm uppercase tracking-[0.2em] text-sky-600">Admin</p>
          <h1 class="text-3xl font-semibold text-slate-950 dark:text-white">Manage blog posts</h1>
          <p class="text-slate-600 dark:text-slate-300">Add new posts, update existing content, or remove posts from the site.</p>
        </div>

        <form class="mt-10 space-y-6" @submit.prevent="handleSubmit">
          <label class="grid gap-2 text-sm text-slate-900">
            <span>Title</span>
            <input v-model="form.title" required class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500" />
          </label>
          <label class="grid gap-2 text-sm text-slate-900">
            <span>Excerpt</span>
            <textarea v-model="form.excerpt" rows="3" required class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"></textarea>
          </label>
          <label class="grid gap-2 text-sm text-slate-900">
            <span>Category</span>
            <input v-model="form.category" required class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500" />
          </label>
          <label class="grid gap-2 text-sm text-slate-900">
            <span>Author</span>
            <input v-model="form.author" required class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500" />
          </label>
          <label class="grid gap-2 text-sm text-slate-900">
            <span>Publish date</span>
            <input type="date" v-model="form.publishedAt" required class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500" />
          </label>
          <label class="grid gap-2 text-sm text-slate-900">
            <span>Content</span>
            <textarea v-model="form.content" rows="6" required class="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-sky-500"></textarea>
          </label>
          <div class="flex flex-wrap gap-3">
            <button type="submit" class="rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-500">{{ editing ? 'Update post' : 'Add post' }}</button>
            <button v-if="editing" type="button" @click="resetForm" class="rounded-2xl bg-slate-200 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-300">Cancel</button>
          </div>
        </form>
      </div>

      <div class="rounded-[1.75rem] border border-slate-200 bg-white p-10 dark:border-white/10 dark:bg-slate-950">
        <div class="space-y-4">
          <p class="text-sm uppercase tracking-[0.2em] text-sky-600">Drafts</p>
          <h2 class="text-2xl font-semibold text-slate-950 dark:text-white">Posts in storage</h2>
        </div>
        <ul class="mt-8 space-y-4">
          <li v-for="post in state.posts" :key="post.id" class="flex flex-col gap-4 rounded-[1.25rem] bg-slate-50 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 class="text-lg font-semibold text-slate-950">{{ post.title }}</h3>
              <p class="text-sm text-slate-600">{{ post.category }} • {{ new Date(post.publishedAt).toLocaleDateString() }}</p>
            </div>
            <div class="flex flex-wrap gap-3">
              <button type="button" @click="editPost(post)" class="rounded-2xl bg-slate-200 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-300">Edit</button>
              <button type="button" class="rounded-2xl bg-rose-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-400" @click="removePost(post.id)">Delete</button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
