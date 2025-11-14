/// <reference types="vite/client" />
import {defineConfig, loadEnv} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode}) => {
    const env = loadEnv(mode, process.cwd(), '');

    return {
        plugins: [react()],
        build: {
            outDir: 'dist',
        },
        server: {
            proxy: {
                '/api': {
                    target: env.VITE_API_BACKEND_BASE_URL,
                    changeOrigin: true,
                    secure: false,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                },
                '/kobutor': {
                    target: env.VITE_S3_BASE_URL,
                    changeOrigin: true,
                    secure: true, // Changed to true for S3
                    rewrite: (path) => path.replace(/^\/kobutor/, ''),
                },
            },
        },
    };
});