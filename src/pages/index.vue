<template>
<div class="">
这是首页
<el-button @click="get">获取token</el-button>

  <el-button @click="getPer"></el-button>
</div>
</template>
<script  setup>
import {setToken, getToken, removeToken} from "~/utils/auth.js";

function get() {
  console.log(getToken())
}


</script>

<style lang="less" scoped>

</style>
