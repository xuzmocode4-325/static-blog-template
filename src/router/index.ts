import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Blog from '../views/Blog.vue';
import PostView from '../views/PostView.vue';
import Contact from '../views/Contact.vue';
import Admin from '../views/Admin.vue';
import AdminLogin from '../views/AdminLogin.vue';
import { useAuthStore } from '../store/authStore';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/blog', name: 'Blog', component: Blog },
  { path: '/blog/:id', name: 'PostView', component: PostView },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/admin/login', name: 'AdminLogin', component: AdminLogin },
  { path: '/admin', name: 'Admin', component: Admin, meta: { requiresAdmin: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  const auth = useAuthStore();
  if (!auth.state.initialized) {
    await auth.initAuth();
  }

  if (to.meta.requiresAdmin && !auth.isAdmin()) {
    return { name: 'AdminLogin' };
  }

  return true;
});

export default router;
