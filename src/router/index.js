import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArticleView from '../views/ArticleView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import store from '../store';

const routes = [
  {
     path: '/',
     redirect: '/login'
  },
  {
     path: '/login',
     component: LoginView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true }
  },
  {
    path: '/article/:Id',
    name: 'article',
    component: ArticleView,
    props: true
  },
  {
     path: '/register',
     name: 'register',
     component: RegisterView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Check if the user is authenticated
    if (store.state.isAuthenticated) {
      next();
    } else {
      // Redirect to the login page if not authenticated
      next('/login');
    }
  } else {
    next();
  }
});

export default router
