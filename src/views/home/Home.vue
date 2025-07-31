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
    <DatePicker class="p-1" v-model="date" view="month" dateFormat="mm/yy" />
    <div v-if="operations.length" class="grid p-2">
      <div
        class="col-12 md:col-6 lg:col-4 pl-1 pr-1 pb-075"
        v-for="operation in operations"
        :key="operation.id"
      >
        <OperationCard :operation="operation" @edit="handleEdit" />
      </div>
    </div>
    <div v-else class="p-1 text-center text-gray-500">
      Nenhuma operação encontrada.
    </div>

    <CreateDialog
      v-model:visible="visible"
      :operation="editingOperation"
      @close="handleClose"
    >
    </CreateDialog>
  </div>
</template>

<script setup>
import { ref, onMounted, watch  } from "vue";
import { format } from "date-fns";
import api from "../../services/axios.js";
import MenuBar from "../../components/MenuBar.vue";
import CreateDialog from "./create-dialog/CreateDialog.vue";
import OperationCard from "../../components/OperationCard.vue";

const date = ref(new Date());
const operations = ref([]);
const visible = ref(false);
const editingOperation = ref(null);

onMounted(async () => {
  await carregarOperacoes();
});

async function carregarOperacoes() {
  try {
    const selectedDate = format(date.value, "MM/yyyy"); // Gera "07/2025"
    const { data } = await api.get("/operations", {
      params: { month_year: selectedDate },
    });
    operations.value = data.operations;
  } catch (err) {
    console.error(err);
  }
}

watch(date, () => {
  carregarOperacoes();
});

function handleEdit(op) {
  editingOperation.value = op;
  visible.value = true;
}

function handleClose() {
  editingOperation.value = null;
  carregarOperacoes();
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
