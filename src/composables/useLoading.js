// src/composables/useLoading.js
import { ref } from 'vue';

const loading = ref(false);

export function useLoading() {
  function showLoading() {
    loading.value = true;
  }
  function hideLoading() {
    loading.value = false;
  }
  return {
    loading,
    showLoading,
    hideLoading
  };
}
