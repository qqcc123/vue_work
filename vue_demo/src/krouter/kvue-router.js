// 1.插件
// 2.两个组件

// vue插件：
// function
// 要求必须有一个install，将来会被Vue.use调用
let Vue

class vueRouter {
    constructor(options) {
        this.$options = options;

        // 把current作为响应式数据
        // 将来发生变化，router-view的render函数能够再次执行
        const path = window.location.hash.slice(1) || '/';
        Vue.util.defineReactive(this, 'current', path);

        window.addEventListener('hashchange', ()=> {
            this.current = window.location.hash.slice(1);
        });
    };
}

vueRouter.install = function(_vue) {
    Vue = _vue;

     // 1.挂载$router属性
    // this.$router.push()
    // 全局混入目的：延迟下面逻辑到router创建完毕并且附加到选项上时才执行
    Vue.mixin({
        beforeCreate() {
            if (this.$options.router) { //此处的router其实是在main.js中实例化的route，this指的是根组件（因为在beforeCreate中可拿到实例对象的指针）
                Vue.prototype.$router = this.$options.router
            }
        },
    })
    // 2.注册实现两个组件router-view,router-link
    Vue.component('router-link', {
        props: {
            to: {
                type: String,
                required: true,
            }
        },

        // <a href="to">xxx</a>
        // return <a href={'#'+this.to}>{this.$slots.default}</a>
        render(h) {
            return h(
                'a', 
                {
                    attrs: {
                        href: '#' + this.to
                    }
                }, 
                this.$slots.default
            );
        },
    })

    Vue.component('router-view', {
        render(h) {
             // 获取当前路由对应的组件
            let component
            const router = this.$router.$options.routes.find(
                (routerItem) => routerItem.path === this.$router.current
            )

            if (router) {
                component = router.component
            }

            console.log(this.$router.current, component)

            return h(component);
        },
    })
}

export default vueRouter;