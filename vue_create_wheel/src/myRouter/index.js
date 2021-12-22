/* eslint-disable */  //如需禁用eslint格式, 将此代码放文件头部即可忽略警告
import Vue from 'vue'
import QcRouter from './vue-myRouter'
//import HelloWorld from '../components/HelloWorld.vue'

Vue.use(QcRouter)

const routes = [
    {
        path: '/About',
        name: 'About',
        component: () => import('../components/HelloWorld1.vue')
    },
    {
        path: '/HelloWorld',
        name: 'HelloWorld',
        component: () => import('../components/HelloWorld.vue')
    }
  ]

const router = new QcRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

export default router
