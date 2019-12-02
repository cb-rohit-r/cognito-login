<template>
  <div>
    <button @click= 'make_request'>Make request</button>
    <button @click= 'logout'>Logout</button>
  </div>
</template>

<script>
import HttpClient from '../api/httpClient'

export default {
  name: 'HelloWorld',
  computed: {
    credentials () {
      return this.$store.getters.getCredentials
    }
  },
  methods: {
    make_request() {
      console.log(this.credentials)
      HttpClient.setCredentials(this.credentials);
      HttpClient.send({
        method: 'GET',
        path: '/dev/home'
      }).then((data) => {
        console.log(data)
      }).catch((err) => {
        console.log(err);
      })
    },
    logout() {
      this.$store.dispatch('logout')
    }
  },
  
};
</script>

<style scoped>
</style>
