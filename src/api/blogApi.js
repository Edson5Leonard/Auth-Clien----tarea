// src/api/blogApi.js
import axios from "axios";

// Configuración mejorada de axios
export const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Simulación de errores aleatorios (20% de probabilidad - requisito del ejercicio)
const simulateRandomError = () => {
  if (Math.random() < 0.2) {
    throw new Error("Falla simulada del servicio - Error 503 Service Unavailable");
  }
};

// Interceptor para simular errores (requerimiento del ejercicio)
api.interceptors.request.use((config) => {
  simulateRandomError();
  
  // Agregar timestamp para evitar cache
  config.params = {
    ...config.params,
    _t: Date.now()
  };
  
  console.log(`🔄 Realizando petición: ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

// Interceptor de respuesta para manejar errores globalmente
api.interceptors.response.use(
  (response) => {
    console.log(`✅ Petición exitosa: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(`❌ Error en petición:`, error.message);
    
    if (error.code === 'ECONNABORTED') {
      error.message = "Timeout: La petición tardó demasiado tiempo";
    }
    
    if (!error.response) {
      error.message = "Error de conexión: No se pudo conectar al servidor";
    }
    
    return Promise.reject(error);
  }
);

// Servicios del blog
export const getPosts = (page = 1, limit = 10) => {
  return api.get("/posts", {
    params: {
      _page: page,
      _limit: limit,
    },
  });
};

export const getPostById = (id) => {
  return api.get(`/posts/${id}`);
};

// Servicio adicional para demostrar modularidad
export const getPostComments = (postId) => {
  return api.get(`/posts/${postId}/comments`);
};

// Servicio para usuarios (potencial extensión)
export const getUserById = (userId) => {
  return api.get(`/users/${userId}`);
};