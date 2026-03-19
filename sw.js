const CACHE_NAME = 'time-tracker-v1';
const urlsToCache = [
  '/',
  '/manifest.json',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // 返回缓存的响应，如果没有则发起网络请求
        return response || fetch(event.request);
      }
    )
  );
});

// 后台同步功能（如果浏览器支持）
if ('sync' in self.registration) {
  self.addEventListener('sync', (event) => {
    if (event.tag === 'time-sync') {
      event.waitUntil(syncTimeData());
    }
  });
}

async function syncTimeData() {
  try {
    // 这里可以实现后台同步逻辑
    // 从localStorage获取数据并同步到服务器（如果有）
    const timeData = await getTimeDataFromStorage();
    // 发送到服务器的逻辑
    console.log('后台同步时间数据:', timeData);
  } catch (error) {
    console.error('后台同步失败:', error);
  }
}

async function getTimeDataFromStorage() {
  // Service Worker不能直接访问localStorage，这里仅作示例
  // 实际实现需要通过postMessage与主页面通信
  return {};
}
