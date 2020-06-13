importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');
 
if (workbox)
  console.log(`Workbox berhasil dimuat`);
else
  console.log(`Workbox gagal dimuat`);

const {cacheNames, setCacheNameDetails} = workbox.core;
const {precacheAndRoute} = workbox.precaching;
const {registerRoute} = workbox.routing;
const {StaleWhileRevalidate} = workbox.strategies;

setCacheNameDetails({
	prefix: 'nyepak-bola',
	suffix: 'v1',
	precache: 'app-shell',
});

precacheAndRoute([
  {
    "url": "apple-touch-icon-180x180.202bd096.png",
    "revision": "c5676f7a1ae6cc4d047581cede2bf8be"
  },
  {
    "url": "favorite.ad219d9b.png",
    "revision": "e4d845f9d4cec1250e6cb1382adb340d"
  },
  {
    "url": "Gilroy-Bold.8ab3ce74.woff",
    "revision": "9747c2216b2edf059481d6d212864734"
  },
  {
    "url": "index.html",
    "revision": "8852f753891af15c43047c318d1b4e97"
  },
  {
    "url": "league.cc3eed80.png",
    "revision": "c478b6d0d22a724ef2fa6213cdb2e10f"
  },
  {
    "url": "leagues.html",
    "revision": "3bd9d2796b6ac8d76cd06e1826834686"
  },
  {
    "url": "main.min.7d42a647.css",
    "revision": "55dbbbe8afd67a06c2c34a7f5dbb388e"
  },
  {
    "url": "match.e03b11af.png",
    "revision": "d1a989b255dd60668324ac805f3888bb"
  },
  {
    "url": "material-icons.ea60b895.woff2",
    "revision": "d7e60f9d1433a45ed71817f6d23abeca"
  },
  {
    "url": "notavailable.688f0ff8.jpg",
    "revision": "246a8f325034ccf3f7d71d182a020744"
  },
  {
    "url": "pages/browse.html",
    "revision": "8bc9286fcc1b36eb6a240e48391f73ed"
  },
  {
    "url": "pages/favorite.html",
    "revision": "309be0674b6619ba80524fcef334658f"
  },
  {
    "url": "pages/home.html",
    "revision": "7c99ccfa3e85210975d31fed4ebc64c3"
  },
  {
    "url": "pages/matches.html",
    "revision": "5719c5ce928dc476f8061489c54150b2"
  },
  {
    "url": "pages/nav.html",
    "revision": "26f8c5bc2d45b7e41680aa5bb8d6f8f3"
  },
  {
    "url": "product_sans_regular.e34487e8.woff",
    "revision": "f242ebd585568bb555e99517fb139727"
  },
  {
    "url": "pwa-192x192.c9af178f.png",
    "revision": "f993a6d60bcd00d14e99d73aab53f5da"
  },
  {
    "url": "pwa-48x48.bda25db5.png",
    "revision": "9b5831925b0499fc9e5ef134b405093a"
  },
  {
    "url": "pwa-512x512.552899be.png",
    "revision": "4f683024a23530fce0e000c9f4c79a95"
  },
  {
    "url": "pwa-96x96.b461e3da.png",
    "revision": "645b90844977031fc133a9a408ffba95"
  },
  {
    "url": "src.e31bb0bc.js",
    "revision": "6fcc0e5228978dab6bf2720cf06c15f7"
  },
  {
    "url": "team.html",
    "revision": "7ef6ca551083279bb3a8203ee914a130"
  },
  {
    "url": "/",
    "revision": "8b441743dee4804f4219028fc7a7fbbc"
  }
]);

registerRoute(
    /https:\/\/api\.football-data\.org\/v2/,
    new StaleWhileRevalidate({
      cacheName: `${cacheNames.prefix}-api-${cacheNames.suffix}`,
    }),
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