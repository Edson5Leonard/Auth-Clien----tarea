// src/features/hub/pages/Hub.jsx
import React from 'react';

const Hub = () => {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          🚀 Hub para Desarrolladores y Diseñadores
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          Centro de recursos y herramientas para profesionales creativos
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <div className="text-4xl mb-4">💻</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Para Desarrolladores</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Componentes, APIs, y herramientas de desarrollo
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Para Diseñadores</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Recursos de diseño, iconos y plantillas
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg">
            <div className="text-4xl mb-4">🤝</div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Comunidad</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Colabora y comparte con otros profesionales
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hub;