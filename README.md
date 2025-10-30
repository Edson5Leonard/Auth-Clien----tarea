# 💻 MiApp - Cliente React con Autenticación JWT

## 📋 Descripción del Proyecto
**MiApp** es una aplicación **React moderna** que implementa un **sistema completo de autenticación JWT**, conectado a un **backend Django**.  
El proyecto cumple con todos los requisitos del **ejercicio del Día 2 (Frontend)**, demostrando manejo de autenticación, **rutas protegidas** y **persistencia de sesión**.

---

## 🚀 Características Principales

### 🔐 Sistema de Autenticación
- Registro de usuarios con formulario completo  
- Inicio de sesión con validación **JWT**  
- Persistencia de sesión automática  
- Logout seguro con limpieza de tokens  
- Rutas protegidas y públicas  

### 🎨 Interfaz de Usuario
- Diseño **responsive** con **Tailwind CSS**  
- Tema **claro/oscuro** intercambiable  
- Componentes modernos con animaciones  
- Experiencia de usuario optimizada  

### 📱 Funcionalidades Adicionales
- Blog de publicaciones con API externa  
- Perfil de usuario editable  
- Hub de aplicaciones (extensible)  
- Manejo de errores robusto  

---

## 🛠️ Tecnologías Utilizadas

### **Frontend**
- React 18 + Vite  
- React Router DOM v6  
- Tailwind CSS (con modo oscuro)  
- Context API para manejo de estado global  
- Axios para peticiones HTTP  

### **Estado y Autenticación**
- **JWT Tokens** (Access + Refresh)  
- **LocalStorage** para persistencia  
- **Protected Routes** para seguridad  
- **Auto-refresh** de tokens  

---

## 📁 Estructura del Proyecto

src/
├── components/                 # Componentes reutilizables
│   ├── Layout.jsx             # Layout principal con navegación
│   ├── ProtectedRoute.jsx     # Ruta protegida
│   ├── PublicRoute.jsx        # Ruta pública
│   ├── PostCard.jsx           # Tarjeta de publicación
│   ├── ErrorMsg.jsx           # Mensaje de error
│   └── Loader.jsx             # Componente de carga
├── contexts/                  # Contextos de React
│   ├── ThemeContext.jsx       # Tema claro/oscuro
│   └── AuthContext.jsx        # Autenticación global
├── features/                  # Funcionalidades por dominio
│   ├── auth/                  # Autenticación
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   └── api/               # Llamadas al backend
│   ├── blog/                  # Blog de publicaciones
│   │   ├── api/
│   │   │   └── blogApi.js
│   │   ├── hooks/
│   │   │   ├── usePost.js
│   │   │   └── usePosts.js
│   │   ├── pages/
│   │   │   ├── Posts.jsx
│   │   │   └── PostDetail.jsx
│   │   └── components/
│   │       └── PostCard.jsx
│   └── profile/               # Perfil de usuario
│       └── pages/
│           └── Profile.jsx
├── App.jsx                    # Componente principal
├── main.jsx                   # Punto de entrada
└── index.css                  # Estilos globales


---

## ⚙️ Instalación y Configuración

### 🧩 Prerrequisitos
- Node.js **v16+**
- npm o yarn
- Backend Django Auth ejecutándose en:  
  👉 **http://localhost:8000**

### 🪜 Pasos de instalación

1. **Clonar el repositorio**
   ```bash
   git clone https://github.com/tuusuario/miapp-react.git
   cd miapp-react


2. Instalar dependencias

npm install

3. Configurar variables de entorno

VITE_API_URL=http://localhost:8000/api

4. Iniciar el servidor de desarrollo

npm run dev

5. Abre en tu navegador:

http://localhost:5173
