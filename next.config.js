/** @type {import('next').NextConfig} */

const path = require('path')

const nextConfig = {
    reactStrictMode: true,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'lf-next-project.up.railway.app',
            },
        ],
    },
    optimizeFonts: false,
}

module.exports = nextConfig
