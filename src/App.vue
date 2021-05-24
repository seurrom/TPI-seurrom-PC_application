<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'App',
  methods: {
    ...mapActions('auth', ['setUser'])
  },
  updated () {
    // Récupère les données du localStorage
    console.log('VUE MOUNTED')
    const user = this.$q.localStorage.getItem('user')
    const token = this.$q.localStorage.getItem('token')
    // Si un utilisateur et un token exisent
    if (user && token) {
      // Construction de l'objet data
      const data = {
        user: user,
        token: token
      }
      // Définit l'utilisateur en cours
      this.setUser(data)
    } else {
      this.$router.push('/')
    }
  }
}
</script>
