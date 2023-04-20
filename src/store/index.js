import {createStore} from 'vuex'
import {getPermission} from "~/api/manager.js";

// 创建一个新的 store 实例
const store = createStore({
    state() {
        return {
            //用户信息
            user: {},
            is_loading_login: false,
        }
    },
    mutations: {
        change_user_info(state, user) {
            state.user = user
        },
        change_login_state(state, isShow) {
            state.is_loading_login = isShow
        },
        clean_user_info (state) {
            state.user = {}
        }
    },
    actions: {
        getUserInfo({commit}) {
            return new Promise((resolve, reject) => {
                getPermission().then(res => {
                    //将登录的用户信息存储到vuex中
                    commit("change_user_info", res)
                    resolve(res)
                })
            })
        }
    }
})


export default store
