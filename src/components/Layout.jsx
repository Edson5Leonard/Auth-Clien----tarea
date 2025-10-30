// src/components/Layout.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../features/auth/context/AuthContext';

const Layout = ({ children }) => {
  const { isDark, toggleTheme } = useTheme();
  const { isAuthenticated, logout, user } = useAuth();
  const location = useLocation();

  // Obtener nombre para mostrar
  const getDisplayName = () => {
    if (!user) return 'Usuario';
    
    if (user.name && user.paternal_lastname) {
      return `${user.name} ${user.paternal_lastname}`;
    }
    
    return user.name || user.user_name || 'Usuario';
  };

  // Obtener iniciales para avatar - CORREGIDO (agregué "const")
  const getInitials = () => {
    if (!user) return 'U';
    
    const first = user.name?.charAt(0) || '';
    const last = user.paternal_lastname?.charAt(0) || '';
    
    return `${first}${last}`.toUpperCase() || 'U';
  };

  return (
    <>
      {/* Barra de navegación */}
      <nav className="bg-white dark:bg-gray-800 shadow-lg border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo y marca */}
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                  <span className="text-white font-bold text-lg">A</span>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  MiApp
                </span>
              </Link>
              
              {/* Navegación para usuarios autenticados */}
              {isAuthenticated && (
                <div className="hidden md:flex items-center space-x-6">
                  <Link 
                    to="/blog" 
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      location.pathname === '/blog' 
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow-inner' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    📝 Blog
                  </Link>
                  <Link 
                    to="/hub" 
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      location.pathname === '/hub' 
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow-inner' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    🚀 Hub
                  </Link>
                  <Link 
                    to="/profile" 
                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                      location.pathname === '/profile' 
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 shadow-inner' 
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-blue-600 dark:hover:text-blue-400'
                    }`}
                  >
                    👤 Perfil
                  </Link>
                </div>
              )}
            </div>

            {/* Controles de usuario y tema */}
            <div className="flex items-center space-x-4">
              {/* Botón de cambio de tema */}
              <button
                onClick={toggleTheme}
                className="p-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 shadow-sm hover:shadow-md"
                title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
              >
                {isDark ? '☀️' : '🌙'}
              </button>

              {/* Menú de usuario */}
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  {/* Información del usuario - CORREGIDO */}
                  <div className="hidden sm:flex items-center space-x-3 bg-gray-50 dark:bg-gray-700 px-4 py-2 rounded-xl">
                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {getInitials()}
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Hola, {getDisplayName()} {/* NOMBRE REAL */}
                    </span>
                  </div>
                  
                  {/* Botón de cerrar sesión */}
                  <button
                    onClick={logout}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
                  >
                    <span>🚪</span>
                    <span>Cerrar Sesión</span>
                  </button>
                </div>
              ) : (
                /* Menú para usuarios no autenticados */
                <div className="flex items-center space-x-3">
                  <Link 
                    to="/login" 
                    className="px-6 py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200"
                  >
                    Iniciar Sesión
                  </Link>
                  <Link 
                    to="/register" 
                    className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Registrarse
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      {isAuthenticated && (
        <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-16">
          <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-600 dark:text-gray-400">
            <p>© 2024 MiApp. Todos los derechos reservados.</p>
          </div>
        </footer>
      )}
    </>
  );
};

export default Layout;