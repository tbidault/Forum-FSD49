import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../stores/authStore';

import LoginPage from '../pages/Login.vue';
import RegisterPage from '../pages/Register.vue';
import HomePage from '../pages/Home.vue';
import ChatPage from '../pages/Chat.vue';
import ThreadPage from '../pages/Thread.vue'
import SettingsPage from '../pages/Settings.vue';
import LegalMentionPage from '../pages/Legal_Mentions.vue';
import TermsOfUse from '../pages/Terms_Of_Use.vue';
import AdminDashboard from '../pages/AdminDashboard.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterPage
  },
  {
    path: '/chat',
    name: 'chat',
    component: ChatPage
  },
  {
    path: '/thread/:id',
    name: 'thread',
    component: ThreadPage
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: AdminDashboard,
    meta: { requiresAdmin: true },
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsPage
  },
  {
    path: '/legal-mentions',
    name: 'legal-mentions',
    component: LegalMentionPage
  },
  {
    path: '/terms-of-use',
    name: 'terms-of-use',
    component: TermsOfUse
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAdmin) {
    if (!authStore.userRole) {
      await authStore.decodeToken();
    }
    if (authStore.userRole !== 'admin') {
      console.error('Accès refusé : rôle admin requis');
      return next('/chat');
    }
  }
  next();
});
export default router;
