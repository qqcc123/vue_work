import Vue from 'vue';
import kVuex from './kvue-store'

Vue.use(kVuex)

export default new kVuex.Store({
    state: {
        counter: 0
    },

    mutations: {
        add(state) {
            state.counter++
        }
    },

    actions: {
        add({commit}) {
            setTimeout(()=> {
                commit('add')
            }, 1000)
        }
    }




})