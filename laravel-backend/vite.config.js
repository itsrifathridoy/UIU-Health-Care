import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    // server: {
    //     host: '0.0.0.0', // Bind to all available interfaces
    //     port: 5173, // Optional: Specify the port
    //     strictPort: true, // Ensure the port doesn't change
    //     https: true, // Enable HTTPS
    //     hmr: {
    //         host: 'uiuhealthcare.uiuss.tech', // Specify the host for Hot Module Replacement
    //     },
    // },
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),

        react(),
    ],
});
