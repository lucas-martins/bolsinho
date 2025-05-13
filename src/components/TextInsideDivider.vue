<template>
  <div class="flex container divider"><span>{{ nome }}</span></div>
</template>

<script>
export default {
  name: "TextInsideDivider",
  props: {
    nome: String,
  },
};
</script>

<style scoped>
.divider {
  margin: 1rem 0;
  color: #aaa;
  font-size: 0.9rem;
}

.divider::before,
.divider::after {
  content: "";
  flex: 1;
  border-bottom: 1px solid #ccc;
}

.divider:not(:empty)::before {
  margin-right: 0.75em;
}

.divider:not(:empty)::after {
  margin-left: 0.75em;
}
</style>
