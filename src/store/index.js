import { createStore } from 'vuex'

// 创建一个新的 store 实例
const store = createStore({
    state () {
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
        }
    }
})


export default store
