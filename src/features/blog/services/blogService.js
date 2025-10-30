// src/features/blog/services/blogService.js
import { getPosts, getPostById } from '../../../api/blogApi';

export const blogService = {
  getPosts: async (page = 1, limit = 10) => {
    try {
      const response = await getPosts(page, limit);
      return {
        data: response.data,
        totalCount: parseInt(response.headers['x-total-count'] || '100')
      };
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },

  getPostById: async (id) => {
    try {
      const response = await getPostById(id);
      return response.data;
    } catch (error) {
      console.error(`Error fetching post ${id}:`, error);
      throw error;
    }
  },

  // Método auxiliar para formatear posts
  formatPost: (post) => ({
    ...post,
    excerpt: post.body.substring(0, 150) + '...',
    readTime: Math.ceil(post.body.length / 200) // estimar tiempo lectura
  })
};