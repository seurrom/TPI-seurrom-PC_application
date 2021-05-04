const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/PageConnexion.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  },

  {
    path: '/',
    component: () => import('src/layouts/ProduitLayout.vue'),
    children: [
      { path: 'accueil', component: () => import('src/pages/PageAccueil.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('src/layouts/InfoProduitLayout.vue'),
    children: [
      { path: 'infoproduit', component: () => import('src/pages/PageInfoProduit.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('src/layouts/EtiquetteLayout.vue'),
    children: [
      { path: 'etiquette', component: () => import('src/pages/PageEtiquette.vue') }
    ]
  },
  {
    path: '/',
    component: () => import('src/layouts/TableaudebordLayout.vue'),
    children: [
      { path: 'tablbord', component: () => import('src/pages/PageTableaudeBord.vue') }
    ]
  }
]

export default routes
