<template>
  <div>
    <h1>Olá, {{ nome }}!</h1>
  </div>
</template>

<script>
export default {
  name: "Main",
  props: {
    nome: String,
  },
};
</script>

<style scoped>
h1 {
  color: #42b983;
}
</style>
