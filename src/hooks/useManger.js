import {reactive} from "vue";
import {changePassword, logout} from "~/api/manager.js";
import popModal from "~/utils/popmodal.js";
import {ElMessage} from "element-plus";
import {removeToken} from "~/utils/auth.js";
import {router} from "~/router/index.js";
import store from "~/store/index.js";

export function encaChangePassword() {
    const form = reactive({
        oldpassword: "",
        password: "",
        repassword: ""
    })
    const rules = {
        oldpassword: [
            {
                required: true,
                message: '老密码不能为空！！',
                trigger: 'blur',
            },
            {
                min: 3,
                message: '长度至少为3个！！',
                trigger: 'blur'
            },
        ],
        password: [
            {
                required: true,
                message: '新密码不能为空！！',
                trigger: 'blur',
            },
            {
                min: 3,
                max: 12,
                message: '长度为3-12个！！',
                trigger: 'blur'
            },
        ],
        repassword: [
            {
                required: true,
                message: '新密码不能为空！！',
                trigger: 'blur',
            },
            {
                min: 3,
                max: 12,
                message: '长度为3-12个！！',
                trigger: 'blur'
            },

        ]
    }
    const onSubmit = () => {
        //修改密码逻辑
        changePassword(form)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            })
    }
    return {
        form,
        rules,
        onSubmit
    }
}

export function encaLogout() {
    function Logout() {
        return popModal("确定退出？", "warning", "退出了可麻烦")
            .then(() => {
                ElMessage({
                    type: 'success',
                    message: '退出成功',
                })
                logout()
                    .finally(() => {
                        //  清除token
                        removeToken()
                        //跳转
                        router.push({
                            path: "/login"
                        })
                        //清除vuex里的正在登录的用户数据
                        store.commit("clean_user_info")
                        //刷新页面
                        location.reload()
                    })
            })
            .catch(() => {
                ElMessage({
                    type: 'info',
                    message: '很明智',
                })
            })
    }

    return {
        Logout,
    }
}

export function encaFullScreenAndRefresh(toggle, flodDrawerRef) {
    const handleRefresh = () => location.reload()
    const handleFullScreen = () => toggle()
    const isFlodDrawer = () => flodDrawerRef.value.open()
    const handleChangePassword = () => isFlodDrawer()

    return {
        handleRefresh,
        handleFullScreen,
        handleChangePassword
    }
}


