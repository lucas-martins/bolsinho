<template>
  <Card>
    <template #content>
      <div class="flex justify-content-between">
        <div class="flex">
          <span class="description-operation mr-1">{{
            operation.description
          }}</span>
          <span>{{ formatDateToBR(operation.date) }}</span>
        </div>
        <div class="">
          <span :class="isOperationEntry() ? 'text-entry' : 'text-out'">
            {{ isOperationEntry() ? "+" : "-" }}
            R$ {{ operation.value }}
          </span>
          <i
            class="pi pi-pencil ml-1 pointer"
            @click="$emit('edit', operation)"
          ></i>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup>
import { formatDateToBR } from "../utils/dateUtils.js";

const props = defineProps({
  operation: Object,
});

function isOperationEntry() {
  return props.operation.type === "E";
}
</script>
