<template>
    <div>
      <label>Filter by Name:</label>
      <input name="query" v-model="searchQuery" />
      <q-table
        :data="users"
        :filters="filters"
      >
        <thead slot="head">
        <tr>
        </tr>
        </thead>
        <tbody >
        <tr v-for="row in data" :key="row.guid">
          <td>{{ row.name }}</td>
          <td>{{ row.nomOff }}</td>
          <td>{{ row.ninterne }}</td>
        </tr>
        </tbody>
      </q-table>
    </div>
</template>
<script>
export default {
  name: 'TestTableau',
  data: () => ({
    searchQuery: '',
    users: [
      {
        name: '12030',
        ninterne: 300,
        nomOff: 'Alcool Hexylique',
        formBrute: '6H14O'
      },
      {
        name: '57653',
        ninterne: 300,
        nomOff: 'Albert',
        formBrute: '6H14O'
      },
      {
        name: '876655',
        ninterne: 300,
        nomOff: 'Bernard',
        formBrute: '6H14O'
      },
      {
        name: '5644535',
        ninterne: 300,
        nomOff: 'Claude',
        formBrute: '6H14O'
      },
      {
        name: '907656',
        ninterne: 300,
        nomOff: 'Alcool Hexylique',
        formBrute: '6H14O'
      },
      {
        name: '45890',
        ninterne: 300,
        nomOff: 'Alcool Hexylique',
        formBrute: '6H14O'
      },
      {
        name: '9876',
        ninterne: 300,
        nomOff: 'Alcool Hexylique',
        formBrute: '6H14O'
      },
      {
        name: '876543',
        ninterne: 300,
        nomOff: 'Alcool Hexylique',
        formBrute: '6H14O'
      },
      {
        name: '345678',
        ninterne: 300,
        nomOff: 'Alcool Hexylique',
        formBrute: '6H14O'
      }
    ]
  }),
  computed: {
    filteredHeroes: function () {
      var sortKey = this.sortKey
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var order = this.sortOrders[sortKey] || 1
      var heroes = this.heroes
      if (filterKey) {
        heroes = heroes.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortKey) {
        heroes = heroes.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return heroes
    }
  },
  filters: {
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  }
}
</script>
