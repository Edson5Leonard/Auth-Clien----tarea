// src/App.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './features/auth/context/AuthContext';
import { useTheme } from './contexts/ThemeContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import Profile from './features/profile/pages/Profile';
import Posts from './features/blog/pages/Posts';
import PostDetail from './features/blog/pages/PostDetail';
import Hub from './features/hub/pages/Hub';
import Layout from './components/Layout';
import './index.css';

// Error Boundary mejorado
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error capturado:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <div className="text-6xl mb-4">😵</div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Algo salió mal
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {this.state.error?.message || 'Error inesperado'}
            </p>
            <div className="flex gap-4 justify-center">
              <button 
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Recargar página
              </button>
              <button 
                onClick={() => this.setState({ hasError: false, error: null })}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Intentar de nuevo
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  const { isAuthenticated, loading } = useAuth();
  const { isDark } = useTheme();

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className={`text-lg ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Iniciando aplicación...</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className={isDark ? 'dark' : ''}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
          <Layout>
            <Routes>
              {/* Rutas públicas */}
              <Route path="/login" element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } />
              <Route path="/register" element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              } />
              
              {/* Rutas protegidas - Blog (cumple con el ejercicio) */}
              <Route path="/blog" element={
                <ProtectedRoute>
                  <Posts />
                </ProtectedRoute>
              } />
              <Route path="/blog/post/:id" element={
                <ProtectedRoute>
                  <PostDetail />
                </ProtectedRoute>
              } />
              
              {/* Rutas adicionales de tu app */}
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/hub" element={
                <ProtectedRoute>
                  <Hub />
                </ProtectedRoute>
              } />
              
              {/* Rutas por defecto */}
              <Route path="/" element={
                isAuthenticated ? 
                  <Navigate to="/blog" replace /> : 
                  <Navigate to="/login" replace />
              } />
              <Route path="*" element={
                isAuthenticated ? 
                  <Navigate to="/blog" replace /> : 
                  <Navigate to="/login" replace />
              } />
            </Routes>
          </Layout>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;