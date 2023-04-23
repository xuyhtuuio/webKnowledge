<template>
  <div class="">
    这是首页
    <el-button type="primary" style="margin-left: 16px" @click="drawer = true">
      open
    </el-button>


    <el-button @click="get">获取token</el-button>
<!--    <el-button @click="getPer"></el-button>-->
<!--    <el-card>{{ $store.state.user }}</el-card>-->
<!--    <admin />-->
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
const drawer = ref(false)


</script>

<style lang="less" scoped>

</style>
