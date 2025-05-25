import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000', // Altere se sua API estiver em outro endereço
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
