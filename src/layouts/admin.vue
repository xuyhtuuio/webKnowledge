<template>
  <el-container>
    <el-header>
      <f-header/>
    </el-header>
    <el-container>
      <el-aside :style="{ width:$store.state.asideWidth }" class="aside">
        <f-menu/>
      </el-aside>
      <el-main>
        <f-tag-list/>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import FHeader from "~/layouts/components/FHeader.vue";
import FMenu from "~/layouts/components/FMenu.vue";
import FTagList from "~/layouts/components/FTagList.vue";
</script>

<style>
.aside {
  transition: all 1.1s;
}
</style>
