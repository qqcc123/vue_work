
let Vue

class QcRouter {
  constructor (options) {
    this.$options = options

    const inital = window.location.hash.slice(1) || '/'
    console.log('---------constructor------------', inital)
    Vue.util.defineReactive(this, 'current', inital)

    window.addEventListener('hashchange', () => {
      console.log('---------constructor1------------', this.current)
      this.current = window.location.hash.slice(1)
    })
  }
}

QcRouter.install = function (_vue) {
  Vue = _vue

  Vue.mixin({
    beforeCreate () {
      if (this.$options.myRouter) {
        console.log('--------beforeCreate----------', this.$options.myRouter)
        Vue.prototype.$router = this.$options.myRouter
      }
    }
  })

  Vue.component('router-link', {
    render: function (createElement) {
      return createElement(
        'a',
        {
          attrs: {
            href: '#' + this.to
          }
        },
        this.$slots.default
      )
    },

    props: {
      to: {
        type: String,
        required: true
      }
    }
  })

  Vue.component('router-view', {
    render: function (createElement) {
      let component = null
      console.log(this.$router.$options.routes)
      const routerData = this.$router.$options.routes.find((router) =>
        router.path === this.$router.current
      )
      console.log('----------routerData--------', routerData)
      if (routerData) {
        component = routerData.component
      }

      return createElement(component)
    }
  })
}

export default QcRouter
