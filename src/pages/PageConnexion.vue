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
              <!-- Règle permettant de gérer les erreurs dans l'adresse mail et dans le mot de passe -->
              <q-input
                color="pink"
                square filled clearable
                v-model="identifiant"
                type="identifiant"
                label="Identifiant"
                ref="elementReference"
                :rules="[val => validateEmail(val) || 'Email invalide']"
                lazy-rules />
              <q-input
                color="pink"
                square filled clearable
                v-model="mdp"
                label="Mot de passe"
                :rules="[ val => val.length >= 4 || 'Minimum 4 caractère']"
                lazy-rules />
              <q-btn type="submit" color="pink" size="lg" style="width: 278px" label="Connexion" @click="lsRememberMe" value="Login"/>
            </q-form>
          </q-card-section>
          <q-card-section class="text-center q-pa-none q-gutter-md casesouvenirMdp">
            <!--  Case et lien "Se souvenir de moi "-->
            <q-checkbox v-model="souvenirdeMoi" id="rememberMe" for="rememberMe" value="lsRememberMe" label="Se souvenir de moi" color="primary"/>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
const rmCheck = document.getElementById('rememberMe'), emailInput = document.getElementById('email')
if (localStorage.checkbox && localStorage.checkbox !== '') {
  rmCheck.setAttribute('checked', 'checked')
  emailInput.value = localStorage.username
} else {
  rmCheck.removeAttribute('checked')
  emailInput.value = ''
}
export default {
  name: 'PageAccueil',
  data () {
    return {
      // Retourne le user et le pwd
      identifiant: '',
      mdp: '',
      souvenirdeMoi: true
    }
  },
  // Permet d'effectuer la navigation
  methods: {
    clickMethod () {
      this.$router.push('accueil')
    },
    // Permet de refuser les caractères ainsi que de forcer l'utilisateur à se connecter avec une adresse mail valide
    validateEmail (email) {
      // Source : https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
    },
    lsRememberMe () {
      if (rmCheck.checked && emailInput.value !== '') {
        localStorage.username = emailInput.value
        localStorage.checkbox = rmCheck.value
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
}
.casesouvenirMdp {
  margin-top: 0;
}
</style>
