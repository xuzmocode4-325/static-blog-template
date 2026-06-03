<template>
  <div class="relative bg-white dark:bg-gray-900">
    <div class="lg:absolute lg:inset-0 lg:left-1/2">
      <img class="h-64 w-full bg-gray-50 object-cover sm:h-80 lg:absolute lg:h-full dark:bg-gray-800" src="https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-x=.4&w=2560&h=3413&&q=80" alt="" />
    </div>
    <div class="pt-16 pb-24 sm:pt-24 sm:pb-32 lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:pt-32">
      <div class="px-6 lg:px-8">
        <div class="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
          <h2 class="text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl dark:text-white">Let's work together</h2>
          <p class="mt-2 text-lg/8 text-gray-600 dark:text-gray-400">Proin volutpat consequat porttitor cras nullam gravida at orci molestie a eu arcu sed ut tincidunt magna.</p>
          <form @submit.prevent="sendMessage" class="mt-16">
            <div v-if="status === 'success'" class="rounded-3xl border border-emerald-200 bg-emerald-50 px-6 py-4 text-sm text-emerald-900 dark:border-emerald-400/20 dark:bg-emerald-500/10 dark:text-emerald-100">
              <p>Your message was sent successfully. We’ll reply as soon as possible.</p>
            </div>
            <div v-if="status === 'error'" class="rounded-3xl border border-rose-200 bg-rose-50 px-6 py-4 text-sm text-rose-900 dark:border-rose-400/20 dark:bg-rose-500/10 dark:text-rose-100">
              <p>{{ errorMessage }}</p>
            </div>
            <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label for="first-name" class="block text-sm/6 font-semibold text-gray-900 dark:text-white">First name</label>
                <div class="mt-2.5">
                  <input
                    v-model="form.firstName"
                    type="text"
                    name="first-name"
                    id="first-name"
                    autocomplete="given-name"
                    class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                  />
                </div>
              </div>
              <div>
                <label for="last-name" class="block text-sm/6 font-semibold text-gray-900 dark:text-white">Last name</label>
                <div class="mt-2.5">
                  <input
                    v-model="form.lastName"
                    type="text"
                    name="last-name"
                    id="last-name"
                    autocomplete="family-name"
                    class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                  />
                </div>
              </div>
              <div class="sm:col-span-2">
                <label for="email" class="block text-sm/6 font-semibold text-gray-900 dark:text-white">Email</label>
                <div class="mt-2.5">
                  <input
                    v-model="form.email"
                    id="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                  />
                </div>
              </div>
              <div class="sm:col-span-2">
                <div class="flex justify-between text-sm/6">
                  <label for="phone" class="block font-semibold text-gray-900 dark:text-white">Phone</label>
                  <p id="phone-description" class="text-gray-400 dark:text-gray-500">Optional</p>
                </div>
                <div class="mt-2.5">
                  <input
                    v-model="form.phone"
                    type="tel"
                    name="phone"
                    id="phone"
                    autocomplete="tel"
                    aria-describedby="phone-description"
                    class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                  />
                </div>
              </div>
              <div class="sm:col-span-2">
                <div class="flex justify-between text-sm/6">
                  <label for="message" class="block text-sm/6 font-semibold text-gray-900 dark:text-white">How can we help you?</label>
                  <p id="message-description" class="text-gray-400 dark:text-gray-500">Max 500 characters</p>
                </div>
                <div class="mt-2.5">
                  <textarea
                    v-model="form.message"
                    id="message"
                    name="message"
                    rows="4"
                    aria-describedby="message-description"
                    class="block w-full rounded-md bg-white px-3.5 py-2 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 dark:bg-white/5 dark:text-white dark:outline-white/10 dark:placeholder:text-gray-500 dark:focus:outline-indigo-500"
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="mt-10 flex justify-end border-t border-gray-900/10 pt-8 dark:border-white/10">
              <button
                :disabled="isSending"
                class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:outline-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-400"
              >
                {{ submitButtonText }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { supabase } from '../supabaseClient';

const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  message: '',
});

const status = ref<'idle' | 'sending' | 'success' | 'error'>('idle');
const errorMessage = ref('');

const isSending = computed(() => status.value === 'sending');
const submitButtonText = computed(() => (status.value === 'sending' ? 'Sending…' : 'Send message'));

const resetForm = () => {
  form.firstName = '';
  form.lastName = '';
  form.email = '';
  form.phone = '';
  form.message = '';
};

const sendMessage = async () => {
  status.value = 'sending';
  errorMessage.value = '';

  const payload = {
    name: `${form.firstName.trim()} ${form.lastName.trim()}`.trim(),
    email: form.email.trim(),
    phone: form.phone.trim(),
    message: form.message.trim(),
  };

  if (!payload.name || !payload.email || !payload.message) {
    status.value = 'error';
    errorMessage.value = 'Name, email, and message are required.';
    return;
  }

  try {
    const { error } = await supabase.functions.invoke('resend', {
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (error) {
      status.value = 'error';
      errorMessage.value = error.message || 'Unable to send your message. Please try again later.';
      return;
    }

    status.value = 'success';
    resetForm();
  } catch (err) {
    status.value = 'error';
    errorMessage.value = err instanceof Error ? err.message : 'An unexpected error occurred.';
  }
};
</script>
