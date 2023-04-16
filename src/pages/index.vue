<template>
<div class="">
这是首页
<el-button @click="get">获取token</el-button>
</div>
</template>
<script lang="ts" setup>
import {useCookies} from "@vueuse/integrations/useCookies";
let cookie = useCookies();

function get() {
  console.log(cookie.get("userToken"))
}


</script>

<style lang="less" scoped>

</style>
