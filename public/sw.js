const CACHE_NAME = "gsynergy-pwa-cache-v1"; // Change version when updating cache
const ASSETS_TO_CACHE = [
	"/", // Cache homepage
	"/index.html",
	"/manifest.json",
	"/icons/logo.png",
];

// Install service worker and cache assets
self.addEventListener("install", (event) => {
	event.waitUntil(
		caches.open(CACHE_NAME).then((cache) => {
			console.log("Opened cache");
			return cache.addAll(ASSETS_TO_CACHE);
		})
	);
});

// Activate service worker and clean old caches
self.addEventListener("activate", (event) => {
	event.waitUntil(
		caches.keys().then((cacheNames) => {
			return Promise.all(
				cacheNames.map((cache) => {
					if (cache !== CACHE_NAME) {
						console.log("Clearing old cache:", cache);
						return caches.delete(cache);
					}
				})
			);
		})
	);
});

// Fetch event - Serve cached content when offline
self.addEventListener("fetch", (event) => {
	event.respondWith(
		caches.match(event.request).then((response) => {
			return response || fetch(event.request);
		})
	);
});
