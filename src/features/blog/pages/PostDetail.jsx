// src/features/blog/pages/PostDetail.jsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPostById } from "../../../api/blogApi";
import Loader from "../../../components/Loader";
import ErrorMsg from "../../../components/ErrorMsg";

export default function PostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [readTime, setReadTime] = useState(0);

  const fetchPost = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getPostById(id);
      setPost(response.data);
      
      // Calcular tiempo de lectura
      const words = response.data.body.split(' ').length;
      setReadTime(Math.ceil(words / 200));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const simulateError = () => {
    setError("Error simulado en detalle del post - Prueba de manejo de errores");
  };

  useEffect(() => {
    if (id) {
      fetchPost();
    }
  }, [id]);

  if (loading) return <Loader />;
  if (error) return <ErrorMsg error={{ message: error }} onRetry={fetchPost} />;
  if (!post) return <div>No se encontró el post</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header con navegación */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => navigate('/blog')}
          className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
        >
          <span>←</span>
          <span>Volver al blog</span>
        </button>
        
        <button
          onClick={simulateError}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors text-sm"
        >
          Simular Error
        </button>
      </div>

      <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        {/* Header del post */}
        <div className="relative">
          <img
            src={`https://picsum.photos/seed/post-${post.id}/1200/400`}
            alt={post.title}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center space-x-2 bg-black bg-opacity-50 px-3 py-1 rounded-full">
                <span>👤 Usuario {post.userId}</span>
              </div>
              <div className="flex items-center space-x-2 bg-black bg-opacity-50 px-3 py-1 rounded-full">
                <span>⏱️ {readTime} min lectura</span>
              </div>
              <div className="flex items-center space-x-2 bg-black bg-opacity-50 px-3 py-1 rounded-full">
                <span>📝 Post #{post.id}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Contenido del post */}
        <div className="p-8">
          <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed">
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-xl">
              {post.body}
            </p>
            
            {/* Contenido extendido simulado */}
            <div className="space-y-6 mt-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Contenido Adicional Simulado
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400">
                Este contenido adicional demuestra cómo se vería un artículo completo 
                en una aplicación real. El ejercicio se enfoca en la estructura modular 
                y el manejo de estado del frontend.
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
                <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
                  🎯 Características Implementadas
                </h4>
                <ul className="text-blue-800 dark:text-blue-200 space-y-2">
                  <li>• Estructura modular de componentes</li>
                  <li>• Manejo de errores con simulación</li>
                  <li>• Estados de carga y empty states</li>
                  <li>• Navegación entre páginas</li>
                  <li>• Diseño responsive</li>
                </ul>
              </div>
              
              <p className="text-gray-600 dark:text-gray-400">
                La aplicación utiliza JSONPlaceholder como API simulada y está lista 
                para conectarse con un backend real en el futuro.
              </p>
            </div>
          </div>

          {/* Información técnica */}
          <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Información Técnica
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <div className="font-medium text-gray-900 dark:text-white">ID</div>
                <div className="text-gray-600 dark:text-gray-400">#{post.id}</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <div className="font-medium text-gray-900 dark:text-white">Usuario</div>
                <div className="text-gray-600 dark:text-gray-400">{post.userId}</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <div className="font-medium text-gray-900 dark:text-white">Palabras</div>
                <div className="text-gray-600 dark:text-gray-400">{post.body.split(' ').length}</div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg">
                <div className="font-medium text-gray-900 dark:text-white">Tiempo lectura</div>
                <div className="text-gray-600 dark:text-gray-400">{readTime} min</div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}