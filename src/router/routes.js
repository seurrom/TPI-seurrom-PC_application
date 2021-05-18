const routes = [
  {
    // Route permettant d'afficher le MainLayout à la page PageConnexion.vue
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/PageConnexion.vue') }
    ]
  },
  {
    // Route permettant d'afficher le ProduitLayout aux pages suivantes
    // titrePage = permet d'afficher le titre suivant sur quelle page on est
    path: '/',
    component: () => import('layouts/Produitlayout.vue'),
    children: [
      { path: 'accueil', component: () => import('src/pages/PageAccueil.vue'), meta: { titrePage: 'Produit' } },
      { path: 'infoproduit/:id', component: () => import('src/pages/PageInfoProduit.vue'), meta: { titrePage: 'Informations du produit' } },
      { path: 'etiquette', component: () => import('src/pages/PageEtiquette.vue'), meta: { titrePage: 'Étiquette' } },
      { path: 'tablbord', component: () => import('src/pages/PageTableaudeBord.vue'), meta: { titrePage: 'Tableau de bord' } },
      { path: 'ajout', component: () => import('src/pages/PageAjouter.vue'), meta: { titrePage: 'Ajouter' } }
    ]
  }
]

export default routes
