import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home/Home.vue'
import Login from '../views/auth/Login.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Verificar o token antes de cada navegação
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token'); // Aqui verifica o token

  // Se o token não existir e tentar acessar qualquer página diferente de /login, redireciona para /login
  if (!token && to.path !== '/login') {
    next('/login');
  } else if (token && to.path === '/login') {
    // Se já estiver autenticado e tentar acessar a página de login, redireciona para /
    next('/');
  } else {
    next(); // Se estiver tudo certo, segue a navegação
  }
});

export default router
