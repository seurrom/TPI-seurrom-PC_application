<script>
export default{
name: 'PageConnexion',
  data () {
    return {
      // Retourne l'email et le mot de passe
      form: {
        email: 'test@test.com',
        password: '12345'
      }
    }
  },
  methods: {
    submitForm () {
      this.$router.push('/accueil')
    },
    // Permet de refuser les caractères ainsi que de forcer l'utilisateur à se connecter avec une adresse mail valide
    validateEmail (email) {
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
