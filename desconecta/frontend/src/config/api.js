// URL base da API.
// - Em desenvolvimento (npm run dev): usa http://localhost:8080 por padrão.
// - No build de produção servido pelo próprio Spring Boot: VITE_API_URL="" (mesma origem).
// - Para apontar para outro backend, defina VITE_API_URL no .env do frontend.
export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:8080';
