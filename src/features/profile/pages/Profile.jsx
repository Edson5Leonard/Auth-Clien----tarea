// src/features/profile/pages/Profile.jsx
import React, { useState } from 'react';
import { useTheme } from '../../../contexts/ThemeContext';
import { useAuth } from '../../../features/auth/context/AuthContext';

const Profile = () => {
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');

  // Función para obtener iniciales
  const getUserInitials = () => {
    if (!user) return 'U';
    const first = user.name?.charAt(0) || '';
    const last = user.paternal_lastname?.charAt(0) || '';
    return `${first}${last}`.toUpperCase() || 'U';
  };

  // Función para obtener nombre completo
  const getUserFullName = () => {
    if (!user) return 'Usuario';
    if (user.name && user.paternal_lastname && user.maternal_lastname) {
      return `${user.name} ${user.paternal_lastname} ${user.maternal_lastname}`;
    }
    return user.name || user.user_name || 'Usuario';
  };

  // Datos de ejemplo para estadísticas
  const userStatistics = [
    { label: 'Posts Creados', value: '24', icon: '📝', color: 'from-blue-500 to-cyan-500' },
    { label: 'Comentarios', value: '156', icon: '💬', color: 'from-green-500 to-emerald-500' },
    { label: 'Días Activo', value: '89', icon: '🔥', color: 'from-orange-500 to-red-500' },
    { label: 'Seguidores', value: '1.2k', icon: '👥', color: 'from-purple-500 to-pink-500' }
  ];

  // Información adicional del usuario
  const userAdditionalInfo = [
    { label: 'Miembro desde', value: 'Enero 2024', icon: '📅' },
    { label: 'Última actividad', value: 'Hace 2 horas', icon: '🕒' },
    { label: 'Rol', value: 'Usuario Premium', icon: '⭐' },
    { label: 'Verificación', value: 'Email confirmado', icon: '✅' }
  ];

  // Configuración de pestañas
  const tabConfig = [
    { id: 'personal', label: 'Información Personal', icon: '👤' },
    { id: 'security', label: 'Seguridad', icon: '🔒' },
    { id: 'preferences', label: 'Preferencias', icon: '⚙️' },
    { id: 'notifications', label: 'Notificaciones', icon: '🔔' },
    { id: 'privacy', label: 'Privacidad', icon: '🛡️' },
    { id: 'activity', label: 'Actividad', icon: '📊' }
  ];

  // Estilos condicionales para tema
  const themeStyles = {
    background: isDark ? 'bg-gray-900' : 'bg-gray-50',
    card: isDark ? 'bg-gray-800' : 'bg-white',
    cardSecondary: isDark ? 'bg-gray-700' : 'bg-gray-100',
    text: isDark ? 'text-white' : 'text-gray-800',
    textSecondary: isDark ? 'text-gray-300' : 'text-gray-600',
    input: isDark 
      ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500 focus:ring-blue-500' 
      : 'bg-white border-gray-300 text-gray-800 focus:border-blue-500 focus:ring-blue-500',
    buttonActive: isDark 
      ? 'bg-blue-600 text-white shadow-lg' 
      : 'bg-blue-500 text-white shadow-lg',
    buttonInactive: isDark 
      ? 'hover:bg-gray-700 text-gray-300 hover:text-white' 
      : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900'
  };

  return (
    <div className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${themeStyles.background}`}>
      <div className="max-w-6xl mx-auto">
        
        {/* Header del Perfil */}
        <div className={`rounded-3xl shadow-2xl overflow-hidden mb-8 transition-all duration-300 ${
          isDark 
            ? 'bg-gradient-to-br from-gray-800 via-gray-700 to-gray-900 border border-gray-700' 
            : 'bg-gradient-to-br from-white via-blue-50 to-purple-50 border border-gray-200'
        }`}>
          <div className="p-8">
            <div className="flex flex-col lg:flex-row items-center lg:items-start space-y-8 lg:space-y-0 lg:space-x-8">
              
              {/* Avatar y Info Básica */}
              <div className="flex flex-col items-center text-center lg:text-left lg:items-start space-y-4">
                <div className="relative group">
                  <div className="w-40 h-40 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-3xl flex items-center justify-center text-white text-5xl font-bold shadow-2xl transition-transform duration-300 group-hover:scale-105">
                    {getUserInitials()}
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-12 h-12 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center shadow-lg">
                    <span className="text-white text-lg">✓</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h1 className={`text-4xl font-bold ${themeStyles.text}`}>
                    {getUserFullName()}
                  </h1>
                  <p className={`text-xl ${themeStyles.textSecondary} font-medium`}>
                    @{user?.user_name || 'usuario'}
                  </p>
                  <p className={`text-lg ${themeStyles.textSecondary} flex items-center justify-center lg:justify-start space-x-2`}>
                    <span>📧</span>
                    <span>{user?.email || 'email@ejemplo.com'}</span>
                  </p>
                </div>
              </div>

              {/* Información Adicional */}
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                {userAdditionalInfo.map((info, index) => (
                  <div key={index} className={`p-4 rounded-2xl transition-all duration-300 ${themeStyles.card} shadow-lg hover:shadow-xl`}>
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{info.icon}</span>
                      <div>
                        <div className={`text-sm ${themeStyles.textSecondary}`}>{info.label}</div>
                        <div className={`font-semibold ${themeStyles.text}`}>{info.value}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Estadísticas */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {userStatistics.map((stat, index) => (
                <div key={index} className={`text-center p-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl ${themeStyles.card} group hover:scale-105`}>
                  <div className={`text-3xl mb-3 transition-transform duration-300 group-hover:scale-110`}>
                    {stat.icon}
                  </div>
                  <div className={`text-3xl font-bold mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className={`text-sm font-medium ${themeStyles.textSecondary}`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Contenido Principal */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          
          {/* Barra Lateral */}
          <div className="xl:col-span-1 space-y-6">
            <div className={`rounded-3xl shadow-2xl p-6 sticky top-8 transition-all duration-300 ${themeStyles.card}`}>
              
              {/* Navegación */}
              <nav className="space-y-3">
                {tabConfig.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full text-left px-5 py-4 rounded-2xl transition-all duration-300 flex items-center space-x-4 group ${
                      activeTab === item.id
                        ? themeStyles.buttonActive
                        : themeStyles.buttonInactive
                    }`}
                  >
                    <span className="text-xl transition-transform duration-300 group-hover:scale-110">
                      {item.icon}
                    </span>
                    <span className="font-semibold">{item.label}</span>
                  </button>
                ))}
              </nav>

              {/* Configuración de Tema */}
              <div className={`mt-8 p-5 rounded-2xl transition-all duration-300 ${themeStyles.cardSecondary}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{isDark ? '🌙' : '☀️'}</span>
                    <span className={`font-semibold ${themeStyles.text}`}>
                      {isDark ? 'Modo Oscuro' : 'Modo Claro'}
                    </span>
                  </div>
                  <button
                    onClick={toggleTheme}
                    className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 ${
                      isDark ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-lg transition-transform duration-300 ${
                        isDark ? 'translate-x-8' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Acciones */}
              <div className="mt-8 space-y-4">
                <button className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center space-x-3">
                  <span>💾</span>
                  <span>Guardar Cambios</span>
                </button>
                <button 
                  onClick={logout}
                  className="w-full py-4 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center space-x-3"
                >
                  <span>🚪</span>
                  <span>Cerrar Sesión</span>
                </button>
              </div>
            </div>
          </div>

          {/* Contenido Dinámico */}
          <div className="xl:col-span-3">
            <div className={`rounded-3xl shadow-2xl p-8 transition-all duration-300 ${themeStyles.card}`}>
              
              {activeTab === 'personal' && (
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h2 className={`text-3xl font-bold ${themeStyles.text}`}>
                      Información Personal
                    </h2>
                    <span className="text-2xl">👤</span>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div>
                        <label className={`block text-lg font-semibold mb-3 ${themeStyles.text}`}>
                          Nombre
                        </label>
                        <input 
                          type="text" 
                          defaultValue={user?.name || ''}
                          className={`w-full px-5 py-4 rounded-2xl border-2 transition-all duration-300 ${themeStyles.input}`}
                          placeholder="Tu nombre"
                        />
                      </div>
                      <div>
                        <label className={`block text-lg font-semibold mb-3 ${themeStyles.text}`}>
                          Apellido Paterno
                        </label>
                        <input 
                          type="text" 
                          defaultValue={user?.paternal_lastname || ''}
                          className={`w-full px-5 py-4 rounded-2xl border-2 transition-all duration-300 ${themeStyles.input}`}
                          placeholder="Apellido paterno"
                        />
                      </div>
                      <div>
                        <label className={`block text-lg font-semibold mb-3 ${themeStyles.text}`}>
                          Apellido Materno
                        </label>
                        <input 
                          type="text" 
                          defaultValue={user?.maternal_lastname || ''}
                          className={`w-full px-5 py-4 rounded-2xl border-2 transition-all duration-300 ${themeStyles.input}`}
                          placeholder="Apellido materno"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <label className={`block text-lg font-semibold mb-3 ${themeStyles.text}`}>
                          Email
                        </label>
                        <input 
                          type="email" 
                          defaultValue={user?.email || ''}
                          className={`w-full px-5 py-4 rounded-2xl border-2 transition-all duration-300 ${themeStyles.input}`}
                          placeholder="tu@email.com"
                        />
                      </div>
                      <div>
                        <label className={`block text-lg font-semibold mb-3 ${themeStyles.text}`}>
                          Teléfono
                        </label>
                        <input 
                          type="tel" 
                          className={`w-full px-5 py-4 rounded-2xl border-2 transition-all duration-300 ${themeStyles.input}`}
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                      <div>
                        <label className={`block text-lg font-semibold mb-3 ${themeStyles.text}`}>
                          Fecha de Nacimiento
                        </label>
                        <input 
                          type="date" 
                          className={`w-full px-5 py-4 rounded-2xl border-2 transition-all duration-300 ${themeStyles.input}`}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className={`block text-lg font-semibold mb-3 ${themeStyles.text}`}>
                      Biografía
                    </label>
                    <textarea 
                      rows="5"
                      placeholder="Cuéntanos algo sobre ti, tus intereses, hobbies..."
                      className={`w-full px-5 py-4 rounded-2xl border-2 transition-all duration-300 resize-none ${themeStyles.input}`}
                    />
                  </div>
                </div>
              )}

              {/* Otras pestañas */}
              {activeTab !== 'personal' && (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">
                    {tabConfig.find(tab => tab.id === activeTab)?.icon}
                  </div>
                  <h2 className={`text-3xl font-bold mb-4 ${themeStyles.text}`}>
                    {tabConfig.find(tab => tab.id === activeTab)?.label}
                  </h2>
                  <p className={`text-xl ${themeStyles.textSecondary} max-w-md mx-auto`}>
                    Esta sección estará disponible en una próxima actualización.
                  </p>
                </div>
              )}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;