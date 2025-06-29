<template>
  <div>
    <MenuBar></MenuBar>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from '../../services/axios.js';
import MenuBar from "../../components/MenuBar.vue";

const operations = ref([]);

onMounted(async () => {
  try {
    const { data } = await api.get("/operations");   // token já vai junto
    operations.value = data;
    console.log(operations.value)
  } catch (err) {
    console.error(err);
  }
});
</script>

<script>
export default {
  name: "Home",
};
</script>
