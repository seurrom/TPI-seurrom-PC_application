import Vue from 'vue'
import axios from 'axios'

const api = axios.create({
  baseURL: 'https://api-prodchim.divtec.me/api',
  timeout: 3000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

Vue.prototype.$api = api

export { api }
