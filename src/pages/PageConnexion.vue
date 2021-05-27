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
                color="pink"
                square filled clearable
                v-model="form.email"
                label="E-mail"
                ref="elementReference"
                for="email"
                :rules="[val => validateEmail(val) || 'Email invalide']"
                lazy-rules />
              <q-input
                type="password"
                color="pink"
                square filled clearable
                v-model="form.password"
                for="password"
                label="Mot de passe"
                :rules="[ val => val.length >= 3 || 'Minimum 8 caractères']"
                lazy-rules />
                <label class="connexionInvalide" v-if= 'connexionInvalide'>
                  E-mail et/ou mot de passe incorrect(s)
                </label>
              <q-btn type="submit" @click="lsRememberMe" color="pink" size="lg" style="width: 278px" label="Connexion" value="Login" />
            </q-form>
          </q-card-section>
          <q-card-section class="text-center q-pa-none q-gutter-md casesouvenirMdp">
            <!--  Case et lien "Se souvenir de moi "-->
            <q-checkbox
              v-model="souvenirdeMoi"
              value="lsRememberMe"
              id="rememberMe"
              label="Se souvenir de moi"
              color="primary"
              class="souvenirMdp"/>
            <a href="https://passwordreset.microsoftonline.com/?ru">Mot de passe oublié</a>
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
        password: ''
      },
      connexionInvalide: false,
      souvenirdeMoi: true
    }
  },
  // Permet d'effectuer la navigation
  methods: {
    ...mapActions('auth', ['connecterUtilisateur']),
    submitForm () {
      const page = this
      this.connecterUtilisateur(this.form)
        .catch(function (e) {
          page.connexionInvalide = true
        })
    },
    // Permet de refuser les caractères ainsi que de forcer l'utilisateur à se connecter avec une adresse mail valide
    validateEmail (email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    },
    lsRememberMe () {
      if (this.rmCheck.ariaChecked === 'true' && this.emailInput.value !== '') {
        localStorage.username = this.emailInput.value
        localStorage.checkbox = this.rmCheck.ariaChecked
      } else {
        localStorage.username = ''
        localStorage.checkbox = ''
      }
    }
  },
  // Permet de mettre le focus sur l'élément "Identifiant"
  async mounted () {
    await this.$nextTick()
    this.$refs.elementReference.$el.focus()
    this.rmCheck = document.getElementById('rememberMe')
    this.emailInput = document.getElementById('email')

    if (localStorage.checkbox && localStorage.checkbox !== '') {
      this.souvenirdeMoi = true
      this.form.email = localStorage.username
    } else {
      this.souvenirdeMoi = false
      this.emailInput.value = ''
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
.checkbox {
  vertical-align: middle;
  margin-top: 0;
}
.souvenirMdp {
  vertical-align: middle;
  margin-top: 0;
}
.casesouvenirMdp {
  margin-top: 0;
}
.connexionInvalide {
  color: red;
  display: block;
  text-align: center;
  font-weight: bold;
}
</style>
