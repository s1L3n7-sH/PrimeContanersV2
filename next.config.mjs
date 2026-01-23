/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: {
            bodySizeLimit: '10mb', // Allow up to 10MB for file uploads (including form data overhead)
        },
    },
};

export default nextConfig;
