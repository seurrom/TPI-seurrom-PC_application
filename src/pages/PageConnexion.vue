<template>
  <q-page class="window-height window-width row justify-center items-center">
    <div class="column">
      <!-- Ajout du logo DIVTEC -->
      <div class="logoDivtec row">
        <img src="~assets/logo-divtec.png" alt="Logo de la DIVTEC">
      </div>
      <div class="row">
        <!-- Création du Q-card permettant de faire un contenu groupé -->
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form @submit="clickMethod" class="q-gutter-md">
              <!-- Input permettant de rentrer le login/pwd afin de se connecter -->
              <q-input square filled clearable v-model="identifiant" type="identifiant" label="Identifiant" />
              <q-input square filled clearable v-model="mdp" type="password" label="Mot de passe" />
              <q-btn type="submit" color="pink" size="lg" class="full-width" label="Connexion"/>
            </q-form>
          </q-card-section>
          <q-card-section class="text-center q-pa-none q-gutter-md row items-start">
            <!--  Case et lien "Se souvenir de moi " et "Mot de passe oublié ?" -->
            <input type="checkbox" id="souvenirMdp" value="">
            <label for="souvenirMdp" class="text-grey-6">Se souvenir de moi</label>
            <p class="text-grey-6">Mot de passe oublié ?</p>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
export default {
  name: 'PageAccueil',
  data () {
    return {
      //Retourne le user et le pwd
      identifiant: '',
      mdp: ''
    }
  },
  //Permet d'effectuer la navigation
  methods: {
    clickMethod () {
      this.$router.push('accueil')
    }
  }
}
</script>
<style>
.q-card {
  width: 360px;
}
.logoDivtec {
  margin-bottom: 25px;
}
</style>
