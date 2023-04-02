import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login/login.vue'
import Home from "@/views/home";
import chat from "@/views/middle/chat";

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
                path: 'chat/:id',
                component: chat,
                name: "chat",
            },

        ]
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
    if (to.path === "/home") {
        if (token) {
            next()
        } else {
            next("/login")
        }
    } else {
        next()
    }
})


export default router
