
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/profil', component: () => import('pages/ProfilePage.vue')},
      { path: '/team', component: () => import('pages/TeamPage.vue')},
      { path: '/auftrag', component: () => import('pages/SchwarzesBrett.vue')},
      { path: '/thread', component: () => import('pages/ThreadPage.vue')}
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
