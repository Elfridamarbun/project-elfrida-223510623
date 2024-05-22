import { createRouter, createWebHistory } from 'vue-router';
import ActivityList from '../components/ActivityList.vue';
import ToDos from '../components/ToDos.vue';
import Posts from '../components/Posts.vue';

const routes = [
  {
    path: '/',
    redirect: '/todos'
  },
  {
    path: '/todos',
    name: 'ToDos',
    component: ToDos
  },
  {
    path: '/posts',
    name: 'Posts',
    component: Posts
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
