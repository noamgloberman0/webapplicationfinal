import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    process.env.NODE_ENV !== 'production' && require('@vitejs/plugin-react')()
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, '../client-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, '../client-cert.pem')),
    },
    // Make sure the server is accessible over the local network
    host: 'node107.cs.colman.ac.il',
    hmr: {
      protocol: 'wss', // Use 'ws' if HTTPS is not enforced
      host: 'node107.cs.colman.ac.il',
      port: 443, // Match your HTTPS port
    }
  },
});
