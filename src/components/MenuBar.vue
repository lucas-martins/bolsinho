<template>
  <Menubar :model="items">
    <template #end>
      <Button @click="logout" label="Sair" severity="danger" />
    </template>
  </Menubar>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Menubar from 'primevue/menubar';
import Button from 'primevue/button';

const router = useRouter();

const logout = () => {
  localStorage.removeItem("token");
  router.push("/login");
};

const items = ref([
  {
    label: "Home",
    icon: "pi pi-home",
    command: () => router.push("/")
  },
]);
</script>
