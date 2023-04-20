<template>
<div class="">
  <el-container>
    <el-header>
      <f-header/>
    </el-header>
    <el-container>
      <el-aside >
        <f-menu></f-menu>
      </el-aside>
      <el-main>
        <f-tag-list/>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</div>
</template>

<script setup>

import FHeader from "~/layouts/components/FHeader.vue";
import FMenu from "~/layouts/components/FMenu.vue";
import FTagList from "~/layouts/components/FTagList.vue";
</script>

<style  scoped>

</style>
