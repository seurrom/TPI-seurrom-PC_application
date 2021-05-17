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
                :rules="[ val => val.length >= 8 || 'Minimum 8 caractères']"
                lazy-rules />
              <q-btn type="submit" color="pink" size="lg" style="width: 278px" label="Connexion"/>
            </q-form>
          </q-card-section>
          <q-card-section class="text-center q-pa-none q-gutter-md casesouvenirMdp">
            <!--  Case et lien "Se souvenir de moi "-->
            <q-checkbox v-model="souvenirdeMoi" id="souvenirMdp" value="" label="Se souvenir de moi" color="primary" class="souvenirMdp"/>
            <a href="https://passwordreset.microsoftonline.com/?ru=https%3a%2f%2flogin.microsoftonline.com%2f2424a8a7-7ecd-4244-be7e-046fa0432420%2freprocess%3fctx%3drQIIAZVRv4sTQRjdyebWJN5hvMrykFTCJPPN7O5Mwlnszu4eqIcWgmhz7I8JCV6ye7sbOa9RrASb-wdUOBAkpSDIVYKNpDGl3F8QbBQbLU2wsTwfj8f3eF_x8b5rOrSh1yJ_wfBKMen3AcdqNf2DfLPRfP356a_vRNv6ip_U33_6spgiGJRlVvQ6nWT4qFRxuxiEucrS4bhsx-mos9dP81HRSVQ_nOyX7bDIDj8gNEdogdC0csB44FLXgoC51LK8Ljh2NwAHfMflPnVtzgKQYBJPsmVmUez70vbNQFrCt4EtaQUBcGG50uPSsTzJoetzW9qEUotT05YedG2f0YB7AgLvrHLptjMpB3QlaT48Uj8r9dWNe1lalFP9XE2801vUpGYoQo65ihO8NCaOFFeYmHY_JCZb5mSmG2mmxsNkXkXfqutE79VqjaZ2RdvSflfRydqyzxcwu19WtndOLr96u3jzUputdW4dqHCnpKNBSe-NIvZ4IsfjXfIwf7B_1zlybxaTG4QX2a45KYrr0INjAx0bxqlRr-lN7aou78DCQD8M9PyCdlr__-fML6KzdWjU4zTKw3EyTDZbAFEiiGBYcEWwCZGFo4gLTKLYZLEIhRLhs41zrX3c0P4A0&mkt=fr&hosted=0&device_platform=Windows+10&username=romane.seuret%40divtec.ch"> Mot de passe oublié</a>
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
    // Permet de refuser les caractère ainsi que de forcer l'utilisateur à se connecter avec une adresse mail valide
    validateEmail (email) {
      // Source : https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(String(email).toLowerCase())
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
  margin-top: 0;
}
.casesouvenirMdp {
  margin-top: 0;
}
</style>
