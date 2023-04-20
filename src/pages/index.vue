<template>
  <div class="">
    这是首页
    <el-button @click="Logout">退出登录</el-button>
    <el-button @click="get">获取token</el-button>
    <el-button @click="getPer"></el-button>
<!--    <el-card>{{ $store.state.user }}</el-card>-->
    <admin />
  </div>
</template>


<script setup>
import {setToken, getToken, removeToken} from "~/utils/auth.js";
import store from "~/store/index.js";
import {ref} from "vue";
import {router} from "~/router/index.js";
import popModal from "~/utils/popmodal.js";
import {ElMessage} from "element-plus";
import {logout} from "~/api/manager.js";
import {startLoading, endLoading} from "~/utils/loading.js";
import Admin from "~/layouts/admin.vue";

function get() {
  console.log(getToken())
}

console.log(store.state.user)

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
            })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '很明智',
        })
      })
}

</script>

<style lang="less" scoped>

</style>
