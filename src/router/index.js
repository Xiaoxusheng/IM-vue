import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login/login.vue'
import Home from "@/views/home";
import chat from "@/views/middle/chat";
import userinfo from "@/components/userinfo";
import appendfriends from "@/components/appendfriends";
import store from '../store'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: "/login",
    },
    {
        path: '/login',
        name: "login",
        component: Login
    },
    {
        path: "/home",
        name: "home",
        component: Home,
        children: [
            {
                // 当 /user/:id/profile 匹配成功
                // UserProfile 将被渲染到 User 的 <router-view> 内部
                path: 'chat/:username',
                component: chat,
                name: "chat",
            },


        ]
    },
    {
        path: "/userinfo",
        component: userinfo,
        name: "userinfo",

    },
    {
        path: "/appendfriends",
        component: appendfriends,
        name: "appendfriends",

    }

    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    // }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

const token = localStorage.getItem("token")

//路由权限控制
router.beforeEach((to, from, next) => {
    // console.log(to.path.includes("/home/chat"))
    store.state.isLoading = true

    if (to.path.includes("/home/chat")) {
        if (token) {
            setTimeout(() => {
                next()
            }, 400)
        } else {
            next("/login")
        }
    } else {
        setTimeout(() => {
            next()
        }, 500)
    }
})


router.afterEach((to, from) => {
    // 在路由切换后隐藏loading动画
    // ...
    store.state.isLoading = false
})

export default router
