<template>
  <div>
    <MenuBar></MenuBar>
    <div class="flex justify-content-between align-items-center p-1">
      <h1>Extrato</h1>
      <Button
        class="btn-add"
        label="Adicionar"
        severity="info"
        @click="visible = true"
      />
    </div>
    <CreateDialog v-model:visible="visible" @close="handleClose">
    </CreateDialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../../services/axios.js";
import MenuBar from "../../components/MenuBar.vue";
import CreateDialog from "./create-dialog/CreateDialog.vue";

const operations = ref([]);
const visible = ref(false);

onMounted(async () => {
  try {
    const { data } = await api.get("/operations"); // token já vai junto
    operations.value = data;
    console.log(operations.value);
  } catch (err) {
    console.error(err);
  }
});

function handleClose() {
  // aqui você recarrega a lista ou executa qualquer ação
  console.log("Dialog fechado");
}
</script>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
.btn-add {
  width: 100px;
  height: 50px;
  border-radius: 1rem;
}
</style>
