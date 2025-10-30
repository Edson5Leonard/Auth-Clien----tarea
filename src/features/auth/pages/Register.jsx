// src/features/auth/pages/Register.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../../../contexts/ThemeContext';

const Register = () => {
  const { register } = useAuth();
  const { isDark } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    paternal_lastname: '',
    maternal_lastname: '',
    email: '',
    user_name: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      setLoading(false);
      return;
    }

    try {
      await register(formData);
    } catch (err) {
      setError(err.message || 'Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  // Estilos condicionales para tema
  const themeStyles = {
    background: isDark ? 'bg-gray-900' : 'bg-gray-50',
    card: isDark ? 'bg-gray-800' : 'bg-white',
    text: isDark ? 'text-white' : 'text-gray-900',
    textSecondary: isDark ? 'text-gray-300' : 'text-gray-600',
    input: isDark 
      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500' 
      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500',
    button: isDark 
      ? 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500' 
      : 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-400',
  };

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${themeStyles.background}`}>
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">A</span>
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                MiApp
              </span>
            </Link>
          </div>
          <h2 className={`mt-6 text-center text-3xl font-extrabold ${themeStyles.text}`}>
            Crear tu cuenta
          </h2>
          <p className={`mt-2 text-center text-sm ${themeStyles.textSecondary}`}>
            O{' '}
            <Link to="/login" className="font-medium text-blue-500 hover:text-blue-400 transition-colors">
              inicia sesión en tu cuenta
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className={`rounded-md shadow-sm -space-y-px ${themeStyles.card} p-6 space-y-4`}>
            
            {/* Nombre */}
            <div>
              <label htmlFor="name" className="sr-only">Nombre</label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className={`relative block w-full px-3 py-2 border rounded-t-md ${themeStyles.input} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10`}
                placeholder="Nombre"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            {/* Apellido Paterno */}
            <div>
              <label htmlFor="paternal_lastname" className="sr-only">Apellido Paterno</label>
              <input
                id="paternal_lastname"
                name="paternal_lastname"
                type="text"
                required
                className={`relative block w-full px-3 py-2 border ${themeStyles.input} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10`}
                placeholder="Apellido Paterno"
                value={formData.paternal_lastname}
                onChange={handleChange}
              />
            </div>

            {/* Apellido Materno */}
            <div>
              <label htmlFor="maternal_lastname" className="sr-only">Apellido Materno</label>
              <input
                id="maternal_lastname"
                name="maternal_lastname"
                type="text"
                className={`relative block w-full px-3 py-2 border ${themeStyles.input} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10`}
                placeholder="Apellido Materno"
                value={formData.maternal_lastname}
                onChange={handleChange}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={`relative block w-full px-3 py-2 border ${themeStyles.input} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10`}
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {/* Usuario */}
            <div>
              <label htmlFor="user_name" className="sr-only">Usuario</label>
              <input
                id="user_name"
                name="user_name"
                type="text"
                required
                className={`relative block w-full px-3 py-2 border ${themeStyles.input} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10`}
                placeholder="Usuario"
                value={formData.user_name}
                onChange={handleChange}
              />
            </div>

            {/* Contraseña */}
            <div>
              <label htmlFor="password" className="sr-only">Contraseña</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className={`relative block w-full px-3 py-2 border ${themeStyles.input} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10`}
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            {/* Confirmar Contraseña */}
            <div>
              <label htmlFor="confirmPassword" className="sr-only">Confirmar Contraseña</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className={`relative block w-full px-3 py-2 border rounded-b-md ${themeStyles.input} focus:outline-none focus:ring-2 focus:ring-blue-500 focus:z-10`}
                placeholder="Confirmar Contraseña"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Mensaje de error */}
          {error && (
            <div className={`rounded-md p-4 ${isDark ? 'bg-red-900/20 border border-red-800' : 'bg-red-50 border border-red-200'}`}>
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className={`text-sm font-medium ${isDark ? 'text-red-200' : 'text-red-800'}`}>
                    {error}
                  </h3>
                </div>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${themeStyles.button} focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-300 ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
              }`}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Registrando...
                </div>
              ) : (
                'Registrarse'
              )}
            </button>
          </div>

          <div className="text-center">
            <p className={`text-sm ${themeStyles.textSecondary}`}>
              ¿Ya tienes una cuenta?{' '}
              <Link to="/login" className="font-medium text-blue-500 hover:text-blue-400 transition-colors">
                Inicia sesión aquí
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;