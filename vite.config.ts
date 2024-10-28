import {defineConfig, loadEnv} from 'vite'
// https://vitejs.dev/config/
import react from '@vitejs/plugin-react';

// Load environment variables from `.env` files (without exposing them to the client)
export default defineConfig(() => {
  // process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  return {
    plugins: [react()],
    server: {
      proxy: {
        // Forward /api requests to the backend
        '/api': {
          target: "http://127.0.0.1:2335",
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
        '/api/v1': {
          target: "http://127.0.0.1:2335",
          changeOrigin: true,  // Needed for cross-origin requests
          secure: false,       // If using HTTPS and self-signed certificates
          rewrite: (path) => path.replace(/^\/api/, ''),  // Optionally rewrite the path
        },
        '/api/cms': {
          target: "http://127.0.0.1:2335",
          changeOrigin: true,  // Needed for cross-origin requests
          secure: false,       // If using HTTPS and self-signed certificates
          rewrite: (path) => path.replace(/^\/api/, ''),  // Optionally rewrite the path
        }
      },
    },
  };
});