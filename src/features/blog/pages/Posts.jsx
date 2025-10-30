// src/features/blog/pages/Posts.jsx
import { useState, useEffect } from "react";
import { getPosts } from "../../../api/blogApi";
import PostCard from "../../../components/PostCard";
import Loader from "../../../components/Loader";
import ErrorMsg from "../../../components/ErrorMsg";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [performanceStats, setPerformanceStats] = useState({
    loadTime: 0,
    requests: 0,
    totalPosts: 0
  });

  // Función para cargar posts
  const fetchPosts = async (pageNum = 1, isRefresh = false) => {
    try {
      setLoading(true);
      setError(null);
      const startTime = performance.now();
      
      const response = await getPosts(pageNum, 12);
      const endTime = performance.now();
      
      setPosts(isRefresh ? response.data : [...posts, ...response.data]);
      setPerformanceStats(prev => ({
        loadTime: endTime - startTime,
        requests: prev.requests + 1,
        totalPosts: response.data.length
      }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Función para simular error (requerimiento del ejercicio)
  const simulateError = () => {
    setError("Error simulado: Fallo del servicio - Esta es una prueba de manejo de errores");
  };

  useEffect(() => {
    fetchPosts(page, true);
  }, [page]);

  // Filtrar posts basado en búsqueda
  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const handleRefresh = () => {
    setPage(1);
    fetchPosts(1, true);
  };

  if (loading && posts.length === 0) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header con controles */}
      <div className="mb-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-6">
          <div className="flex-1">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white text-xl">📝</span>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                  Blog de Publicaciones
                </h1>
                <p className="text-gray-600 dark:text-gray-300 mt-2 text-lg">
                  Microservicio Frontend - Ejercicio Día 3
                </p>
              </div>
            </div>
          </div>
          
          {/* Estadísticas de rendimiento */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4 min-w-48">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                  {performanceStats.requests}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Requests</div>
              </div>
              <div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">
                  {performanceStats.loadTime.toFixed(2)}ms
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Tiempo</div>
              </div>
            </div>
          </div>
        </div>

        {/* Barra de búsqueda y controles */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="flex-1 w-full sm:max-w-md">
            <input
              type="text"
              placeholder="Buscar en posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={simulateError}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors flex items-center space-x-2"
            >
              <span>🚨</span>
              <span>Simular Error</span>
            </button>
            
            <button
              onClick={handleRefresh}
              disabled={loading}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg disabled:bg-gray-400 transition-colors flex items-center space-x-2"
            >
              <span>🔄</span>
              <span>Recargar</span>
            </button>
          </div>
        </div>

        {/* Info de estado */}
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
            Página {page}
          </span>
          <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm">
            {filteredPosts.length} posts mostrados
          </span>
          {searchTerm && (
            <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm">
              Buscando: "{searchTerm}"
            </span>
          )}
        </div>
      </div>

      {/* Manejo de errores */}
      {error && (
        <ErrorMsg error={{ message: error }} onRetry={handleRefresh} />
      )}

      {/* Grid de posts */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {filteredPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        !loading && (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
              {searchTerm ? 'No se encontraron posts con tu búsqueda' : 'No hay posts disponibles'}
            </h3>
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors mt-4"
              >
                Limpiar búsqueda
              </button>
            )}
          </div>
        )
      )}

      {/* Paginación */}
      <div className="flex justify-between items-center bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <button
          onClick={handleRefresh}
          disabled={loading}
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-xl disabled:bg-gray-300 disabled:cursor-not-allowed hover:from-green-600 hover:to-blue-700 transition-all duration-200 flex items-center space-x-2"
        >
          <span>🔄</span>
          <span>Recargar Todo</span>
        </button>
        
        <div className="flex items-center space-x-4">
          <span className="text-gray-600 dark:text-gray-300 font-medium">
            Página {page} • {posts.length} posts cargados
          </span>
          {loading && (
            <div className="flex items-center space-x-2 text-blue-500">
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-sm">Cargando...</span>
            </div>
          )}
        </div>
        
        <button
          onClick={handleLoadMore}
          disabled={loading}
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl disabled:bg-gray-300 disabled:cursor-not-allowed hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2"
        >
          <span>Cargar más</span>
          <span>➡️</span>
        </button>
      </div>
    </div>
  );
}