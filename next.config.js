/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    turbopack: {
        resolveAlias: {
            "@": "./src",
        },
    }
}

module.exports = nextConfig
