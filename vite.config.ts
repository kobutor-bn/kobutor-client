import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(() => {
    return {
        plugins: [react()],
        server: {
            proxy: {
                '/api': {
                    target: "http://localhost:2335",
                    changeOrigin: true,
                    secure: false,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                },
                '/api/v1': {
                    target: "http://localhost:2335",
                    changeOrigin: true,
                    secure: false,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                },
                '/api/cms': {
                    target: "http://localhost:2335",
                    changeOrigin: true,
                    secure: false,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                },
                '/kobutor': {
                    target: 'http://localhost:9000',
                    changeOrigin: true,
                    secure: false,
                    rewrite: (path) => path.replace(/^\//, ''),
                },
                '^/product/.*kobutor': {
                    target: 'http://localhost:9000',
                    changeOrigin: true,
                    secure: false,
                    rewrite: (path) => path.replace(/^\/product\/(.*\/)?kobutor/, '/kobutor'),
                },
                '^/cart/.*kobutor': {
                    target: 'http://localhost:9000',
                    changeOrigin: true,
                    secure: false,
                    rewrite: (path) => path.replace(/^\/cart\/(.*\/)?kobutor/, '/kobutor'),
                },
                '^/review/.*kobutor': {
                    target: 'http://localhost:9000',
                    changeOrigin: true,
                    secure: false,
                    rewrite: (path) => path.replace(/^\/review\/(.*\/)?kobutor/, '/kobutor'),
                },
                '^/order/.*kobutor': {
                    target: 'http://localhost:9000',
                    changeOrigin: true,
                    secure: false,
                    rewrite: (path) => path.replace(/^\/order\/(.*\/)?kobutor/, '/kobutor'),
                },
            },
        },
    };
});