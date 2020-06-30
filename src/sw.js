importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');
 
if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

const {cacheNames, setCacheNameDetails} = workbox.core;
const {precacheAndRoute} = workbox.precaching;
const {registerRoute} = workbox.routing;
const {StaleWhileRevalidate, CacheFirst} = workbox.strategies;
const {ExpirationPlugin} = workbox.expiration;

setCacheNameDetails({
	prefix: 'nyepak-bola',
	suffix: 'v1',
	precache: 'app-shell',
});

precacheAndRoute([], {
ignoreURLParametersMatching: [/.*/]
});

registerRoute(
    ({url}) => url.pathname.startsWith('/v2/'),
    new StaleWhileRevalidate({
      cacheName: `${cacheNames.prefix}-api-${cacheNames.suffix}`,
    }),
);

registerRoute(
	/\.(?:png|gif|jpg|jpeg|svg)$/,
	new CacheFirst({
		plugins: [
			new ExpirationPlugin({
			  maxAgeSeconds: 7 * 24 * 60 * 60,
			  maxEntries: 10,
			}),
		  ]
	})
	
);

self.addEventListener('push', event => {
	let body;
	if (event.data) {
	  body = event.data.text();
	} else {
	  body = 'Push message no payload';
	}
	const options = {
	  body: body,
	  icon: 'img/notification.png',
	  vibrate: [100, 50, 100],
	  data: {
		dateOfArrival: Date.now(),
		primaryKey: 1
	  }
	};
	event.waitUntil(
	  self.registration.showNotification('Nyepak Bola Push Notification', options)
	);
  });