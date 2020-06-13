import router from "./assets/js/router.js";
import { registerServiceWorker, requestPermission } from "./assets/js/register.js";

// Service Worker
if ('serviceWorker' in navigator) {
  const service_worker = `./sw.js`;
  registerServiceWorker(service_worker);
  requestPermission();
} else {
  console.error("ServiceWorker belum didukung browser ini.")
}

document.addEventListener("DOMContentLoaded", router);