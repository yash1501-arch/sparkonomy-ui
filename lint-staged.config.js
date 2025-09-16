const config = {
    '*.{js,jsx,ts,tsx,html,json,yml,yaml,md,mdx}': ['npm run format:fix'],
    '*.{js,jsx,ts,tsx}': ['npm run lint:eslint', 'npm run format:check'],
}

export default config
