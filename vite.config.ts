/// <reference types="vitest" />
import { defineConfig, loadEnv, type ServerOptions } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

type TMode = 'development' | 'test' | 'production'

interface AppEnv {
    PORT: string
    BACKEND_URL: string
    VITE_ENV: TMode
}

function validateEnv(envMode: TMode, env: AppEnv): void {
    const requiredEnvs: (keyof AppEnv)[] = ['PORT', 'BACKEND_URL', 'VITE_ENV']

    for (const key of requiredEnvs) {
        if (!env[key]) {
            throw new Error(
                `${key} is missing in the .env.${envMode} file. Please fix!`
            )
        }
    }
}

function normalizePort(port: string): number {
    const portValue: number = parseInt(port)

    if (isNaN(portValue)) {
        throw new Error(`Invalid port value: ${port}`)
    }
    return portValue
}

export default defineConfig(({ mode }) => {
    const envMode: TMode = mode as TMode
    const env: AppEnv = loadEnv(envMode, process.cwd(), '') as unknown as AppEnv

    validateEnv(envMode, env)

    const port: number = normalizePort(env.PORT)
    const options: ServerOptions = {
        port,
        open: true,
        proxy: {
            '/api': {
                target: env.BACKEND_URL,
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, ''),
            },
        },
    }

    return {
        plugins: [react(), tailwindcss()],
        test: {
            globals: true,
            environment: 'jsdom',
            setupFiles: 'src/setupTests.ts',
            include: ['src/**/*.{test,spec}.{ts,tsx}'],
            coverage: {
                reporter: ['json', 'html'],
                include: ['src/**/*.ts', 'src/**/*.tsx'],
                exclude: [
                    'coverage',
                    'build',
                    'dist',
                    'node_modules',
                    'src/**/types/**',
                    'src/**/interfaces/**',
                    'src/**/constants/**',
                    'src/**/*.d.ts',
                    'src/setupTests.ts',
                    'src/**/*.{test,spec}.{ts,tsx}',
                ],
                thresholds: {
                    statements: 80,
                    branches: 80,
                    functions: 80,
                    lines: 80,
                },
            },
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
        server: options,
        preview: options,
        build: {
            minify: true,
            cssMinify: true,
            rollupOptions: {
                external: [/.*\.(test|spec)\.(ts|tsx)$/],
            },
        },
    }
})
