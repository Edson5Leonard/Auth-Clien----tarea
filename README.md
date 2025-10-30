# 🧠 Proyecto: Frontend React + Tailwind (Diseño Minimal)

Este proyecto es una **Single Page Application (SPA)** hecha con **React y Vite**, usando **TailwindCSS** para los estilos.  
El objetivo es crear una interfaz limpia y minimalista que permita **registrarse, iniciar sesión y ver el perfil del usuario**.

---

## 🚀 ¿Qué hace este proyecto?

- Permite **registrar nuevos usuarios** y **loguearse**.
- Usa un **contexto de autenticación** para mantener la sesión activa.
- Se conecta a una **API REST** mediante **Axios**.
- Maneja **rutas públicas y protegidas** (login, registro, perfil).
- Presenta un **diseño simple, claro y funcional**.

## Características
- Rutas públicas y protegidas: `login`, `register`, `profile`.
- Estado de autenticación con contexto React.
- Consumo de API con Axios y token `Bearer`.
- Estilos minimalistas con tarjetas blancas, bordes grises y tipografía sobria.

## ⚙️ Requisitos

Antes de ejecutar el proyecto, asegúrate de tener instalado:

- **Node.js v18 o superior**
- **npm**


## Inicio Rápido
1. Instalar dependencias:
   ```bash
   npm install
   ```
2. Ejecutar entorno de desarrollo:
   ```bash
   npm run dev
   ```
3. Abre `http://localhost:5174/`.

## Scripts
- `npm run dev`: servidor de desarrollo (Vite).
- `npm run build`: build de producción.
- `npm run preview`: vista previa del build.

## Estructura
```
src/
  features/
    auth/        → Login, registro y contexto de sesión
    profile/     → Página de perfil del usuario
  components/    → Componentes comunes (como ProtectedRoute)
  router.jsx     → Definición de rutas
  main.jsx       → Punto de entrada principal
  index.css      → Estilos globales con Tailwind
```

## Rutas
- `/login`: inicia sesión y almacena el token en `localStorage`.
- `/register`: registro de usuario (no inicia sesión automáticamente).
- `/profile`: requiere autenticación; muestra datos del usuario.

## Configuración de API
El endpoint base está definido en `src/features/auth/services/authService.js`:
```js
const BASE_URL = 'https://reflexoperu-v3.marketingmedico.vip/backend/public/api';
```
- El token se envía en cada request con `Authorization: Bearer <token>`.
- Si el backend responde `401`, el token se limpia automáticamente del `localStorage`.

## Estilo y Diseño
- Fondo gris claro (bg-gray-100)
- Tarjetas blancas con bordes grises y esquinas suaves
- Tipografía sobria y legible.
- Formularios simples, sin efectos llamativos

## Problemas Comunes
- `422 Unprocessable Entity` en registro: el backend valida campos. Por ejemplo, "The email has already been taken" o contraseñas que no coinciden.
- `401 Unauthenticated` en login/perfil: credenciales inválidas o token vencido/invalidado.
- Solución rápida:
  - Usa un correo único y completa campos requeridos.
  - Asegura que `password` y `password_confirmation` coincidan.
  - Limpia el token si persiste el error: `localStorage.removeItem('token')` y vuelve a iniciar sesión.

## Licencia
Sin licencia específica. Usa y adapta según tus necesidades.

