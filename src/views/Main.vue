<template>
  <div id="app">
    <GlobalLoading />
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Main",
};
</script>

<script setup>
import GlobalLoading from "../components/GlobalLoading.vue";
</script>
