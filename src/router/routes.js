const routes = [
  {
    path: '/',
    component: () => import('layouts/ProduitLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/PageConnexion.vue') },
      { path: 'accueil', component: () => import('src/pages/PageAccueil.vue'), meta: { titrePage: 'Produit' } },
      { path: 'infoproduit', component: () => import('src/pages/PageInfoProduit.vue'), meta: { titrePage: 'Informations du produit' } },
      { path: 'etiquette', component: () => import('src/pages/PageEtiquette.vue'), meta: { titrePage: 'Informations du produit' } },
      { path: 'tablbord', component: () => import('src/pages/PageTableaudeBord.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
