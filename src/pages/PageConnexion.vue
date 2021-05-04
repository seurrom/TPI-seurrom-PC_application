<template>
  <q-page class="window-height window-width row justify-center items-center">
    <div class="column">
      <div class="logoDivtec row">
        <img src="~assets/logo-divtec.png" alt="Logo de la DIVTEC">
      </div>
      <div class="row">
        <q-card square bordered class="q-pa-lg shadow-1">
          <q-card-section>
            <q-form @submit="clickMethod" class="q-gutter-md">
              <q-input square filled clearable v-model="identifiant" type="identifiant" label="Identifiant" />
              <q-input square filled clearable v-model="mdp" type="password" label="Mot de passe" />
              <q-btn type="submit" color="pink" size="lg" class="full-width" label="Connexion"/>
            </q-form>
          </q-card-section>
          <q-card-section class="text-center q-pa-none q-gutter-md row items-start">
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
      identifiant: '',
      mdp: ''
    }
  },
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
