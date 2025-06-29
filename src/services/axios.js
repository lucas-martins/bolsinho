import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// ────────────────
// Request interceptor
// ────────────────
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ────────────────
// Response interceptor
// ────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // token expirado ou inválido → limpa e volta para login
      localStorage.removeItem("token");
      router.push("/login");
    }
    return Promise.reject(error);
  }
);

export default api;
