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
            <q-form @submit="submitForm" class="q-gutter-md">
              <!-- Input permettant de rentrer le login/pwd afin de se connecter -->
              <!-- Règle permettant de gérer les erreurs dans l'adresse mail -->
              <q-input
                autofocus
                color="pink"
                square filled clearable
                v-model="form.email"
                label="E-mail"
                for="email"
                :rules="[val => validateEmail(val) || 'Email invalide']"
                lazy-rules />
              <q-input
                required
                type="password"
                color="pink"
                square filled clearable
                v-model="form.password"
                for="password"
                label="Mot de passe"/>
              <q-select square filled clearable  v-model="form.domaine" label="Domaine" :options="optionsDomaine"/>
              <!-- Bouton de connexion -->
              <q-btn type="submit" color="pink" size="lg" style="width: 278px" label="Connexion" value="Login" />
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  name: 'PageAccueil',
  data () {
    return {
      // Retourne le user et le pwd
      form: {
        email: '',
        password: '',
        domaine: 'DIVTEC'
      },
      optionsDomaine: [
        'DIVTEC', 'Lycée'
      ]
    }
  },
  // Appele l'action connecterUtilisateur et regarde s'il y a une erreur
  methods: {
    ...mapActions('auth', ['connecterUtilisateur']),
    submitForm () {
      this.connecterUtilisateur(this.form)
    },
    // Permet de refuser les caractères ainsi que de forcer l'utilisateur à se connecter avec une adresse mail valide
    validateEmail (email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    }
  }
}
</script>
<style lang="sass" scoped>

.q-card
  width: 360px

.logoDivtec
  margin-bottom: 25px

</style>
