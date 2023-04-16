<template>
<!--<button class="btn">点我</button>-->
  <router-view />
</template>

<script setup>

</script>

<style scoped>
.btn {
  @apply text-purple-50 bg-purple-500 px-5 py-2
  rounded-3xl hover:(bg-purple-900) transition-all duration-500 focus:(ring-8) ring-purple-900;
}

</style>
