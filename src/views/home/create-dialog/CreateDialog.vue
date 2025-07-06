<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="localVisible"
      modal
      header="Adicionar Operação"
      :style="{ width: '30rem' }"
      @hide="emitClose"
    >
      <!-- FORMULÁRIO -->
      <div class="p-fluid">
        <!-- Descrição -->
        <div class="field">
          <label for="desc">Descrição</label>
          <InputText id="desc" v-model="form.description" autofocus />
        </div>

        <!-- Valor -->
        <div class="field">
          <label for="valor">Valor</label>
          <InputNumber
            id="valor"
            v-model="form.value"
            mode="currency"
            currency="BRL"
            locale="pt-BR"
            :minFractionDigits="2"
          />
        </div>

        <!-- Tipo -->
        <div class="field">
          <label class="block mb-2">Tipo</label>
          <div class="flex align-items-center gap-3">
            <RadioButton inputId="tipoE" name="tipo" value="E" v-model="form.type" />
            <label for="tipoE" class="mr-3">Entrada</label>

            <RadioButton inputId="tipoS" name="tipo" value="S" v-model="form.type" />
            <label for="tipoS">Saída</label>
          </div>
        </div>

        <!-- Data -->
        <div class="field">
          <label for="data">Data</label>
          <DatePicker
            id="data"
            v-model="form.date"
            showIcon
            dateFormat="dd/mm/yy"
          />
        </div>
      </div>

      <!-- BOTÕES -->
      <div class="flex justify-end gap-2 mt-4">
        <Button label="Cancelar" severity="secondary" @click="close" />
        <Button label="Salvar" @click="save" />
      </div>
    </Dialog>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useToast } from "primevue/usetoast";
import api from "../../../services/axios.js";

const props = defineProps({ visible: Boolean });
const emit = defineEmits(["update:visible", "close"]);

const localVisible = computed({
  get: () => props.visible,
  set: (val) => emit("update:visible", val),
});

const form = ref({
  description: "",
  value: null,
  type: "E",
  date: null,
});

const toast = useToast();

async function save() {
  if (!form.value.description || !form.value.value || !form.value.date || !form.value.type) {
    toast.add({
      severity: "warn",
      summary: "Campos obrigatórios",
      detail: "Preencha descrição, valor, data e tipo.",
      life: 3000,
    });
    return;
  }

  // converte Date → "YYYY-MM-DD"
  const dateStr = form.value.date.toISOString().slice(0, 10);

  try {
    await api.post("/operations", {
      description: form.value.description,
      value: form.value.value,
      type: form.value.type,
      date: dateStr,
    });

    toast.add({ severity: "success", summary: "Sucesso", detail: "Operação criada.", life: 3000 });
    resetForm();
    close();
  } catch (err) {
    console.error(err);
    toast.add({ severity: "error", summary: "Erro", detail: "Não foi possível salvar.", life: 3000 });
  }
}

function resetForm() {
  form.value = { description: "", value: null, type: "E", date: null };
}

/* dispara ao clicar em Cancelar/Salvar */
function close() {
  emit("update:visible", false);
  emit("close");
  resetForm();
}

/* dispara ao fechar pelo X ou ESC */
function emitClose() {
  emit("close");
  resetForm();
}
</script>
