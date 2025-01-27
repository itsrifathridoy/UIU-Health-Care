import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        react(), // Add the React plugin here
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
        }),
    ],
    resolve: {
        alias: {
            '@': '/resources/js',
        }
    },
    optimizeDeps: {
        include: ['@inertiajs/core']
    },
    build: {
        commonjsOptions: {
            include: [/node_modules/],
            transformMixedEsModules: true,
            defaultIsModuleExports: true,
            requireReturnsDefault: 'auto'
        }
    }
});