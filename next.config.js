/** @type {import('next').NextConfig} */

const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	redirects() {
		return [
			process.env.MAINTENANCE_MODE === "1"
				? {
						source: "/((?!maintenance).*)",
						destination: "/maintenance.html",
						permanent: false,
				  }
				: null,
		].filter(Boolean);
	},
	serverRuntimeConfig: {
		cookie: {
			sameSite: "None",
			secure: true,
		},
	},
};

module.exports = nextConfig;
