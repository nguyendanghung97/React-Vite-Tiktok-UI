import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        tsconfigPaths(),
        svgr({
            include: '**/*.svg',
            exclude: '',
        }),
    ],
    build: {
        rollupOptions: {
            output: {
                // Cấu hình manualChunks để tách thư viện lớn:  Giảm tải JS chính, tối ưu cache
                manualChunks(id) {
                    if (id.includes('node_modules')) {
                        if (id.includes('react') || id.includes('react-dom')) return 'vendor-react';
                        if (id.includes('lodash')) return 'vendor-lodash';
                        return 'vendor'; // Tách thư viện ngoài vào chunk riêng
                    }
                },
            },
        },
    },
});
