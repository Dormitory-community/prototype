// This is a basic service worker example.
// In a real application, you would use a library like Workbox for more robust caching strategies.

const CACHE_NAME = "my-app-cache-v1"
const urlsToCache = [
    "/",
    "/index.html",
    "/src/main.tsx",
    "/src/App.tsx",
    "/src/index.css",
    "/vite.svg",
    // Add other assets you want to cache
]

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Opened cache")
            return cache.addAll(urlsToCache)
        }),
    )
})

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            // Cache hit - return response
            if (response) {
                return response
            }
            // No cache hit - fetch from network
            return fetch(event.request)
        }),
    )
})

self.addEventListener("activate", (event) => {
    const cacheWhitelist = [CACHE_NAME]
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName)
                    }
                }),
            )
        }),
    )
})
