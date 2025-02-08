self.addEventListener('install', (event) => {
  console.log('Service Worker installiert');
});

self.addEventListener('fetch', (event) => {
  console.log('Fetch-Ereignis:', event.request.url);
});
