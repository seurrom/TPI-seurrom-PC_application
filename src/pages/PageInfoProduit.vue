<template>
  <div>
    <p>Nom officiel</p>
    <q-input outlined v-model="text" :dense="dense" label="Hexanol" disable />
    <p>Nom officiel</p>
    <q-input outlined v-model="text" :dense="dense" label="Hexanol" disable />
    <p>Nom officiel</p>
    <q-input outlined v-model="text" :dense="dense" label="Hexanol" disable />
  </div>
</template>
<script>
export default {
  name: 'PageInfoProduit',
  data () {
    return {
      text: '',
      ph: '',

      dense: false
    }
  }
}
</script>
