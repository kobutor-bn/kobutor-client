import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],

    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:2335',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },

            '/kobutor': {
                target: 'https://kobutor.s3.us-east-1.amazonaws.com',
                changeOrigin: true,
                secure: true,
                rewrite: (path) => path.replace(/^\/kobutor/, ''),
            },
        },
    },
});