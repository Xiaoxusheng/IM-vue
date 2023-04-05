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
        friends: [],
        on: "",
        isLoading: false,
        title: {
            show: false,
            message: "",
            backgroundColor: "#333"
        },
        ws: ""
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
        //获取好友列表
        getfriends(state, friends) {
            state.friends = friends
        },

        getinfo(state, my) {
            state.myinfo = my
        },
        getws(state, ws) {
            state.ws = ws
        }
    },
    actions: {},
    modules: {}
})

