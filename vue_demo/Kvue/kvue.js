function defineReactive(obj, key, val) {
    observe(obj)

    const dep = new Dep()

    Object.defineProperty(obj, key, {
        get() {
            console.log('get key: ', key)

            dep && dep.addWatcher(Dep.target)
            return val
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
    constructor(el, vm) {
        this.$vm = vm
        this.$el = document.querySelector(el)
        this.compile(this.$el)
    }

    compile(el) {
        el.childNodes.forEach((node) => {
            if (this.isElement(node)) {

                if (node.childNodes && node.childNodes.length > 0) {
                    this.compile(node)
                }

            } else if (this.isInter(node)) {

            } else {
                
            }
        })
    }

    isAttrStartK(attr) {
        return attr.startsWith("k-");
      }

    compileElement(node) {
        Array.from(node.attributes).forEach((attr) => {
            const attrName = attr.attrName
            const attrValue = attr.value

            if (this.isAttrStartK(attrName)) {
                const dir = attrName.substring(2);
            }
        })
        
        const fn = this.$[attr + 'update']

        if (fn && fn())

    }

    isElement(node) {
        return node.nodeType == 1
    }

    isInter(node) {
        return node.nodeType == 3 && /\{\{ .* \}\}/.test(node.textContent)
    }

    text(node, kAttr) {
        this.update(node, RegExp.$1, 'text')
    }

    html(node, kAttr) {
        this.update(node, RegExp.$1, 'html')
    }

    textUpdater(node, exp) {
        node.innerText = exp
    }

    htmlUpdater(node, exp) {
        node.innerHTML = exp
    }

    update(node, exp, kAttr) {
        const fn = this[kAttr + 'updater']
        fn && fn(node, this.$vm[exp])

        new watcher(this.$vm, exp, function(val){
            fn && fn(node, val)
        })
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
        //this是为了获取根节点中的内容
        compile(this.$vm, this)
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
    constructor(vm, exp, func) {
        this.vm = vm
        this.updateFunc = func
        this.exp = exp

        Dep.target = this
        this.vm[this.exp] //获取节点的一个data数据属性,从而调起数据响应式函数，传递this
        Dep.target = this
    }

    update() {
        this.updateFunc.call(this.vm, this.vm[this.exp])
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
        this.deps.forEach((watch) => {
            watch.update()
        })
    }

}