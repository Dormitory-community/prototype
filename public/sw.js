const CACHE_NAME = "my-app-cache-v2.1.27.34"
const urlsToCache = [
    "/",
    "/index.html",
    "/manifest.json",
    "/logo.png",
]

// 설치 단계
self.addEventListener("install", (event) => {
    self.skipWaiting() // 새로운 SW 즉시 활성화 대기
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(urlsToCache)
        })
    )
})

// 활성화 단계
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) =>
            Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName)
                    }
                })
            )
        )
    )
    self.clients.claim() // 새 SW가 즉시 모든 클라이언트 제어
})

// 요청 가로채기
self.addEventListener("fetch", (event) => {
    // SPA 라우팅 처리: navigation 요청은 index.html 반환
    if (event.request.mode === "navigate") {
        event.respondWith(
            caches.match("/index.html").then((response) => {
                return (
                    response ||
                    fetch("/index.html").then((res) => {
                        return caches.open(CACHE_NAME).then((cache) => {
                            cache.put("/index.html", res.clone())
                            return res
                        })
                    })
                )
            })
        )
        return
    }

    // 그 외 리소스는 캐시 우선, 없으면 네트워크
    event.respondWith(
        caches.match(event.request).then((response) => {
            return (
                response ||
                fetch(event.request).then((res) => {
                    // 네트워크 응답을 캐시에 저장 (옵션)
                    return caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, res.clone())
                        return res
                    })
                })
            )
        })
    )
})
