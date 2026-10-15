/* Kremlings Games — service worker volontairement minimal.
   Il ne garde AUCUNE copie des pages : chaque ouverture charge la dernière version en ligne,
   donc une mise à jour sur GitHub arrive sans manipulation. Il sert seulement à rendre le site
   installable comme une application et à afficher un message clair quand il n'y a pas de réseau. */
var HORS_LIGNE = '<!doctype html><html lang="fr"><head><meta charset="utf-8">' +
  '<meta name="viewport" content="width=device-width,initial-scale=1">' +
  '<title>Pas de connexion</title><style>body{margin:0;min-height:100vh;display:grid;place-items:center;' +
  'background:#f4ead0;color:#2e2a22;font:18px/1.45 system-ui,sans-serif;text-align:center;padding:24px;box-sizing:border-box}' +
  'h1{color:#0e5626;font-size:26px;margin:0 0 8px}button{margin-top:18px;font:inherit;font-weight:700;padding:10px 20px;' +
  'border-radius:14px;border:2px solid #0e5626;background:#fbf5e4;color:#0e5626;box-shadow:2px 3px 0 #0e5626}</style></head>' +
  '<body><div><h1>Pas de connexion</h1><p>Les jeux se jouent en ligne : reconnecte-toi à internet, puis réessaie.</p>' +
  '<button onclick="location.reload()">Réessayer</button></div></body></html>';

self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', function (e) {
  if (e.request.mode !== 'navigate') return;
  e.respondWith(fetch(e.request).catch(function () {
    return new Response(HORS_LIGNE, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  }));
});
