import Vue from "vue";

let Vuex;

class Store {
    constructor(options) {
        this._vm = new Vue({
            data: {
                $$state: options.state
            },
        })
        
        this._mutations = options.mutations
        this._actions = options._actions

        this.commit = this.commit.bind(this)
        this.dispatch = this.dispatch.bind(this)

        this.getters = {}
    }

    get state() {
        return this._vm.$data.$$state
    }

    set state(v) {
        console.error('please use replaceState to reset state');
    }

    dispatch(type, payload) {
        const entry = this._actions[type]
        if (!entry) {
            console.error('unkown action type');
        }

        entry(this, payload)
    }    
    
    commit(type, payload) {
        const entry = this._mutations[type]
        if (!entry) {
            console.error('unkown mutations type');
        }

        entry(this.state, payload)
    }
}

function install(_vuex) {
    Vuex = _vuex;

    Vuex.mixin({
        beforeCreate() {
            if (this.$options.store) {
                Vuex.prototype.$store = this.$options.store
            }
        },
    })
}


export default {Store, install}