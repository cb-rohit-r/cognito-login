<template>
  <div>
    <button @click= 'make_request'>Make request</button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import HttpClient from '../api/httpClient'

export default {
  name: 'HelloWorld',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
  computed: {
    credentials () {
      return this.$store.getters.getCredential
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
    }
  }
};
</script>

<style scoped>
</style>
