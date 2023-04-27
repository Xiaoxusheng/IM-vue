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
        ws: "",
        count: 1,
        send: "",
        alltop: false,
        show: false,
        title: ""
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
            console.log(state.message)

        },
        //添加消息记录
        addMessage(state, messages) {
            messages.forEach(i => {
                i.on = i.idently === localStorage.getItem("indently")
            })
            state.message = [...messages, ...state.message]
            console.log(state.message)

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
        },
        getcount(state) {
            state.count++;
            console.log(state.count)
        },
        changsend(state, status) {
            state.send = status
        }

    },
    actions: {},
    modules: {}
})

