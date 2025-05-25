<template>
  <div v-if="loading" class="loading-overlay">
    <i class="pi pi-spin pi-spinner" style="font-size: 3rem"></i>
  </div>
</template>

<script setup>
import { useLoading } from "../composables/useLoading.js";

const { loading } = useLoading();
</script>

<style scoped>
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}
</style>
