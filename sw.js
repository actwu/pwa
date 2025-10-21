const CACHE_VERSION = 'v2'; // bump this each update
const CACHE_NAME = `disp-cache-${CACHE_VERSION}`;
const ASSETS = [
'./',
'./index.html',
'./sw.js',
'./manifest.json',
'./192.png'
];

self.addEventListener('install', e => {
e.waitUntil(
caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
);
});

self.addEventListener('activate', e => {
e.waitUntil(
caches.keys().then(keys =>
Promise.all(
keys.map(k => k !== CACHE_NAME && caches.delete(k))
)
)
);
});

self.addEventListener('fetch', e => {
e.respondWith(
caches.match(e.request).then(res =>
res || fetch(e.request)
)
);
});
