import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: "",
        username: "小米",
        input: "",
        myinfo: localStorage.getItem("headpicture"),
        message: [],
        on: ""
    },
    getters: {},
    mutations: {
        //获取用户名
        getUsername(state, use) {
            state.user = use
            console.log(use)
        },

        //接收消息
        getMessage(state, messages) {
            state.message.push(messages)
            state.message.forEach(i => {
                i.on = i.idently === localStorage.getItem("indently")
            })
        },

        getinfo(state, my) {
            state.myinfo = my
        }
    },
    actions: {},
    modules: {}
})
