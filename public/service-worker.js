const CACHE_NAME = "devmastery-v1";
const STATIC_CACHE = "devmastery-static-v1";
const DYNAMIC_CACHE = "devmastery-dynamic-v1";

// Assets to cache immediately
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/manifest.json",
  "/assets/css/main.css",
  "/assets/js/main.js",
];

// Install event - cache static assets
self.addEventListener("install", (event) => {
  console.log("[SW] Installing service worker...");

  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log("[SW] Caching static assets");
      return cache.addAll(STATIC_ASSETS);
    }),
  );

  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("[SW] Activating service worker...");

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== STATIC_CACHE && name !== DYNAMIC_CACHE)
          .map((name) => {
            console.log("[SW] Removing old cache:", name);
            return caches.delete(name);
          }),
      );
    }),
  );

  self.clients.claim();
});

// Fetch event - network first, then cache
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Skip non-GET requests
  if (request.method !== "GET") return;

  // Skip external API calls (Piston, etc.)
  if (request.url.includes("emkc.org")) return;

  event.respondWith(
    fetch(request)
      .then((response) => {
        // Clone the response
        const responseClone = response.clone();

        // Cache dynamic content
        if (request.url.includes("/content/")) {
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, responseClone);
          });
        }

        return response;
      })
      .catch(() => {
        // Network failed, try cache
        return caches.match(request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }

          // Return offline page for navigation requests
          if (request.mode === "navigate") {
            return caches.match("/offline.html");
          }

          return new Response("Network error", {
            status: 408,
            headers: { "Content-Type": "text/plain" },
          });
        });
      }),
  );
});

// Background sync for offline code execution (future enhancement)
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-code-execution") {
    event.waitUntil(syncCodeExecution());
  }
});

async function syncCodeExecution() {
  // TODO: Implement offline code execution sync
  console.log("[SW] Syncing offline code executions...");
}
