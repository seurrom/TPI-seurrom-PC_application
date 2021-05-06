const routes = [
  {
    path: '/',
    component: () => import('layouts/Produitlayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/PageConnexion.vue') },
      { path: 'accueil', component: () => import('src/pages/PageAccueil.vue'), meta: { titrePage: 'Produit' } },
      { path: 'infoproduit', component: () => import('src/pages/PageInfoProduit.vue'), meta: { titrePage: 'Informations du produit' } },
      { path: 'etiquette', component: () => import('src/pages/PageEtiquette.vue'), meta: { titrePage: 'Étiquette' } },
      { path: 'tablbord', component: () => import('src/pages/PageTableaudeBord.vue'), meta: { titrePage: 'Tableau de bord' } }
    ]
  }
]

export default routes
