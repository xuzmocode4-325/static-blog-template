<template>
  <div id="app" class="min-h-screen flex flex-col">
    <NavBar />
    <main class="flex-1">
      <router-view />
    </main>
    <FooterBar />
    <PrivacyNotice />
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import FooterBar from './components/FooterBar.vue';
import PrivacyNotice from './components/PrivacyNotice.vue';
</script>
