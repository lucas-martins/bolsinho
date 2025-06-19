<template>
  <div>
    <h1>Home!</h1>
    <Button @click="logout" label="Sair" severity="danger" class="mt-3" />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const logout = () => {
  localStorage.removeItem("token");
  router.push("/login");
};
</script>

<script>
export default {
  name: "Home",
};
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>
