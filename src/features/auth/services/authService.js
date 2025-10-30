// src/features/auth/services/authService.js
import axios from 'axios';

// Para desarrollo - simulación de API
const API_URL = 'http://localhost:3000/api';

// Crear instancia de axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token a las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Sistema de usuarios en localStorage para desarrollo
const initializeMockUsers = () => {
  const existingUsers = localStorage.getItem('mockUsers');
  if (!existingUsers) {
    const defaultUsers = [
      {
        id: 1,
        name: "Juan",
        paternal_lastname: "Pérez",
        maternal_lastname: "García",
        email: "juan@ejemplo.com",
        phone: "+51 987 654 321",
        user_name: "juanperez",
        password: "password123",
        document_number: "87654321",
        role: { name: "Usuario Premium" },
        country: { name: "Perú" }
      }
    ];
    localStorage.setItem('mockUsers', JSON.stringify(defaultUsers));
  }
};

export const authService = {
  login: async (credentials) => {
    // INICIALIZAR USUARIOS MOCK
    initializeMockUsers();
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
        
        // VERIFICAR CREDENCIALES REALES
        const user = mockUsers.find(u => 
          u.email === credentials.email && u.password === credentials.password
        );
        
        if (user) {
          const mockResponse = {
            data: {
              token: 'mock-jwt-token-' + Date.now(),
              user: user // Devolver el usuario completo
            }
          };
          
          // Guardar en localStorage
          localStorage.setItem('token', mockResponse.data.token);
          localStorage.setItem('currentUser', JSON.stringify(user));
          
          console.log('✅ Login exitoso para:', user.email);
          resolve(mockResponse);
        } else {
          console.log('❌ Login fallido: credenciales incorrectas');
          reject(new Error('Credenciales incorrectas - Usuario no registrado'));
        }
      }, 1000);
    });
  },

  register: async (userData) => {
    initializeMockUsers();
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
        
        // Verificar si el usuario ya existe
        const existingUser = mockUsers.find(user => 
          user.email === userData.email || user.user_name === userData.user_name
        );
        
        if (existingUser) {
          reject(new Error('El usuario ya existe con ese email o nombre de usuario'));
          return;
        }
        
        // Crear nuevo usuario
        const newUser = {
          id: Date.now(),
          ...userData,
          created_at: new Date().toISOString(),
          role: { name: "Usuario" },
          country: { name: "Perú" }
        };
        
        // Guardar en mockUsers
        mockUsers.push(newUser);
        localStorage.setItem('mockUsers', JSON.stringify(mockUsers));
        
        // Iniciar sesión automáticamente después del registro
        const token = 'mock-jwt-token-' + Date.now();
        localStorage.setItem('token', token);
        localStorage.setItem('currentUser', JSON.stringify(newUser));
        
        const mockResponse = {
          data: {
            message: 'Usuario registrado exitosamente',
            token: token,
            user: newUser
          }
        };
        
        console.log('✅ Registro exitoso para:', newUser.email);
        resolve(mockResponse);
      }, 1500);
    });
  },

  logout: async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    console.log('🚪 Sesión cerrada');
    return Promise.resolve();
  },

  getProfile: async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        if (currentUser) {
          console.log('📊 Perfil cargado para:', currentUser.email);
          resolve(currentUser);
        } else {
          reject(new Error('No hay usuario autenticado'));
        }
      }, 800);
    });
  },

  // Método para verificar autenticación
  checkAuth: async () => {
    const token = localStorage.getItem('token');
    const currentUser = localStorage.getItem('currentUser');
    
    if (token && currentUser) {
      return JSON.parse(currentUser);
    }
    return null;
  }
};

export default authService;