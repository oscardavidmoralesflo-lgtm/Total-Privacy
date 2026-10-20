/* BASTIÓN ACADEMY · Service worker: funciona sin conexión.
   Al publicar una actualización, sube VERSION para que los móviles descarguen la nueva. */
var VERSION = "bastion-v4.1";
var ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./assets/styles.css?v=4.1",
  "./assets/app.js?v=4.1",
  "./assets/data/modules-a.js?v=4.1",
  "./assets/data/modules-b.js?v=4.1",
  "./assets/data/modules-c.js?v=4.1",
  "./assets/data/modules-d.js?v=4.1",
  "./assets/data/modules-e.js?v=4.1",
  "./assets/data/extras.js?v=4.1",
  "./assets/data/refs.js?v=4.1",
  "./assets/data/modules-f.js?v=4.1",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png",
  "./assets/icons/icon-maskable-512.png",
  "./assets/icons/apple-touch-icon.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(ASSETS); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  if (req.mode === "navigate") {
    e.respondWith(fetch(req).catch(function () { return caches.match("./index.html"); }));
    return;
  }
  e.respondWith(caches.match(req).then(function (hit) {
    return hit || fetch(req).then(function (res) {
      if (res && res.ok) { var copy = res.clone(); caches.open(VERSION).then(function (c) { c.put(req, copy); }); }
      return res;
    });
  }));
});
