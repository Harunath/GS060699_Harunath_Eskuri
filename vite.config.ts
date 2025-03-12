import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react(),
		tailwindcss(),
		VitePWA({
			devOptions: {
				enabled: true,
			},
			strategies: "injectManifest",
			srcDir: "src",
			filename: "sw.ts",
			registerType: "autoUpdate",
			injectManifest: {
				swDest: "dist/sw.js",
				maximumFileSizeToCacheInBytes: 15 * 1024 * 1024,
			},
			manifest: {
				name: "Data Viewer",
				short_name: "DV",
				icons: [
					{
						src: "/pwa-64x64.png",
						sizes: "64x64",
						type: "image/png",
						purpose: "any",
					},
					{
						src: "/pwa-192x192.png",
						sizes: "192x192",
						type: "image/png",
						purpose: "any",
					},
					{
						src: "/pwa-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "any",
					},
					{
						src: "/maskable-icon-512x512.png",
						sizes: "512x512",
						type: "image/png",
						purpose: "maskable",
					},
				],
				theme_color: "#fff",
				background_color: "#fff",
				start_url: "/",
				display: "standalone",
				orientation: "portrait",
			},
		}),
	],
});
