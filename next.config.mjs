/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'hotelsblacksea.ru',
                pathname: '/uploads/**', // Определяет путь, с которого можно загружать изображения
            },
        ],
    },
};

export default nextConfig;
