const CACHE_NAME = 'takt-time-calc-v1';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
];

// Service Workerのインストール
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Opened cache');
      return cache.addAll(urlsToCache);
    })
  );
  // 新しいService Workerを即座にアクティブにする
  self.skipWaiting();
});

// 古いキャッシュの削除
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // 新しいService Workerをすぐに有効にする
  return self.clients.claim();
});

// Network First戦略（ネットワークを優先し、オフライン時はキャッシュを使用）
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // レスポンスが正常な場合、キャッシュに保存
        if (response && response.status === 200) {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return response;
      })
      .catch(() => {
        // ネットワークエラーの場合、キャッシュから取得
        return caches.match(event.request).then((response) => {
          if (response) {
            return response;
          }
          // キャッシュにもない場合、オフラインページを返す（オプション）
          return new Response('オフラインです', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/plain; charset=utf-8',
            }),
          });
        });
      })
  );
});
