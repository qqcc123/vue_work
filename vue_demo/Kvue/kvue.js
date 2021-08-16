function defineReactive(obj, key, val) {
    observe(obj)

    Object.defineProperty(obj, key, {
        get() {
            console.log('get key: ', key)
        },

        set(v) {
            console.log('set value: ', v)
            obj[key] = v

            observe(obj)
        }
    })
}

//obj其实是一个json格式的data
function observe(obj) {
    if (typeof obj != 'obj' || obj == null) {
        return
    }

    new Observe(obj)
}

function proxy(vm) {
    Object.keys(vm.$data).forEach((key) => {
        Object.defineProperty(vm.$data, key, {
            get() {
                return vm.$data[key]
            },
    
            set(v) {
                vm.$data[key] = v
            }
        })
    })
}

class Compile {
    constructor(el) {
        this.$el = document.querySelector(el)

        this.compile(this.$el)
    }

    compile(el) {
        el.childNodes.forEach((node) => {
            if (this.isElement(node)) {

            } else if (this.isInter(node)) {

            } else {
                
            }
        })
    }

    isElement(node) {
        return node.nodeType == 1
    }

    isInter(node) {
        return node.nodeType == 3 && /\{\{ .* \}\}/.test(node.textContent)
    }
}

class kvue {
    constructor(options) {
        this.$options = options
        this.$data = options.data
        this.$vm = options.el

        //1. 数据响应式
        observe(this.$data)

        //2. vue代理
        proxy(this)

        //3. 编译 （模板编译 dom渲染）
        compile(this.$vm)
    }
}

class Observe {
    constructor(obj) {
        this.value = obj

        if (Array.isArray(obj)) {
            //数组暂不处理
        } else {
            this.work(obj)
        }
    }

    work(obj) {
        Object.keys(obj).forEach(key => {
            defineReactive(obj, key, obj[key])
        })
    }
}

class Watcher {
    constructor() {

    }

}

class Dep {
    constructor() {
        deps = []
    }

    addWatcher(watcher) {
        this.deps.push(watcher)
    }

    notify() {

    }

}