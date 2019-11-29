import Vue from 'vue'
import Vuex from 'vuex'
import Auth from './module/Auth'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        auth: Auth,
    }
})

export default store
