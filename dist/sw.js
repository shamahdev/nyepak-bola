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

precacheAndRoute([
  {
    "url": "apple-touch-icon-180x180.787eadc6.png",
    "revision": "c5676f7a1ae6cc4d047581cede2bf8be"
  },
  {
    "url": "favorite.16cf9a8f.png",
    "revision": "e4d845f9d4cec1250e6cb1382adb340d"
  },
  {
    "url": "Gilroy-Bold.9c59699c.woff",
    "revision": "9747c2216b2edf059481d6d212864734"
  },
  {
    "url": "index.html",
    "revision": "ad2f795a2a4813d4bff3c70eeadf4781"
  },
  {
    "url": "league.a78e99f4.png",
    "revision": "c478b6d0d22a724ef2fa6213cdb2e10f"
  },
  {
    "url": "leagues.html",
    "revision": "21df5a1bc4aa196ab2fde74f0e340b9f"
  },
  {
    "url": "main.min.a47c41bf.css",
    "revision": "1ee41d132ac1f554c1f4dcf1056234bb"
  },
  {
    "url": "match.9a337016.png",
    "revision": "d1a989b255dd60668324ac805f3888bb"
  },
  {
    "url": "material-icons.538770b3.woff2",
    "revision": "d7e60f9d1433a45ed71817f6d23abeca"
  },
  {
    "url": "notavailable.6b91ce2a.jpg",
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
    "revision": "6c6c9f3a810d4744d3eeecdc002ad58d"
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
    "url": "product_sans_regular.6b9fb08e.woff",
    "revision": "f242ebd585568bb555e99517fb139727"
  },
  {
    "url": "pwa-192x192.8ad9f177.png",
    "revision": "f993a6d60bcd00d14e99d73aab53f5da"
  },
  {
    "url": "pwa-48x48.b15da64e.png",
    "revision": "9b5831925b0499fc9e5ef134b405093a"
  },
  {
    "url": "pwa-512x512.da738887.png",
    "revision": "4f683024a23530fce0e000c9f4c79a95"
  },
  {
    "url": "pwa-96x96.9a60b83c.png",
    "revision": "645b90844977031fc133a9a408ffba95"
  },
  {
    "url": "src.1fc070e2.js",
    "revision": "bad07f0c5e04c2a00b1ddd0b9b313870"
  },
  {
    "url": "team.html",
    "revision": "1083c2e45af5015321349643ef485fdb"
  },
  {
    "url": "/",
    "revision": "e12361a071fc7034390ad74b17f07dba"
  }
], {
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