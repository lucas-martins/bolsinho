/// <reference types="vite/client" />
// src/env.d.ts ou src/shims-vue.d.ts

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

