// src/components/PostCard.jsx
import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  // Generar imagen única basada en el ID del post
  const imageUrl = `https://picsum.photos/seed/${post.id}/400/250`;
  
  return (
    <Link to={`/blog/post/${post.id}`}>
      <div className="border border-gray-200 dark:border-gray-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-gray-800 overflow-hidden group hover:scale-105">
        {/* Imagen del post */}
        <div className="relative overflow-hidden">
          <img
            src={imageUrl}
            alt={post.title}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <div className="absolute top-4 right-4 bg-blue-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
            Post #{post.id}
          </div>
        </div>
        
        {/* Contenido del post */}
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {post.title}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 line-clamp-3">
            {post.body}
          </p>
          
          {/* Información adicional */}
          <div className="flex justify-between items-center pt-4 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                U{post.userId}
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Usuario {post.userId}
              </span>
            </div>
            <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 px-3 py-1 rounded-full font-medium group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
              Leer más →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}