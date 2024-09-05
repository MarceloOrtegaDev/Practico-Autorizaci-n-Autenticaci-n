import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        port: 3000,  // El puerto 3000 se especifica directamente como un número
        open: '/index.html',  // Configura Vite para abrir automáticamente /index.html al iniciar el servidor
    },
    root: './',
    base: '/',
    publicDir: 'public',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
    },
    plugins: [],
});
