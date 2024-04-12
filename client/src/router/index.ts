import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect (to) {
        return { name: 'tweet' }
      },
    },
    {
      path: '/tweets',
      name: 'tweet',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/TweetView.vue')
    },
    {
      path: '/:pathMatch(.*)',
      redirect: { name: 'tweet' }
    },

  ]
})

export default router
