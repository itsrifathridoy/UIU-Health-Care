import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';

export default defineConfig({
    plugins: [
        react(), // Add the React plugin here
        laravel({
<<<<<<< HEAD
            input: ['resources/css/app.css', 'resources/js/app.js'],
=======
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
>>>>>>> b554b9369538597f7651d3625f833c533250cf31
            refresh: true,
        }),
    ],
<<<<<<< HEAD
    
});
=======
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
>>>>>>> b554b9369538597f7651d3625f833c533250cf31
