import { createRouter, createWebHistory } from 'vue-router';

// Importation des composants
import LoginPage from '../pages/Login.vue';
import RegisterPage from '../pages/Register.vue';
import HomePage from '../pages/Home.vue';
import ChatPage from '../pages/Chat.vue';
import ThreadPage from '../pages/Thread.vue'
import SettingsPage from '../pages/Settings.vue';
import LegalMentionPage from '../pages/Legal_Mentions.vue';
import TermsOfUse from '../pages/Terms_Of_Use.vue';

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

export default router;
