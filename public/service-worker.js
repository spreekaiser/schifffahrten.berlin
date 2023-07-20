// Versionsname des ServiceWorker
const CACHE_NAME = "geolocation-caching-v1";

// Seiten und Daten zu cachen
const cacheFiles = [
  "components/WelcomeAudio/index.js",
  "audios/welcomeAudio_de.m4a",
  "audios/welcomeAudio_en.m4a",
  "audios/welcomeAudio_es.m4a",
  "audios/welcomeAudio_fr.m4a",
  "audios/welcomeAudio_gr.m4a",
  "audios/welcomeAudio_ir.m4a",
  "audios/welcomeAudio_isr.m4a",
  "audios/welcomeAudio_it.m4a",
  "audios/welcomeAudio_pl.m4a",
  "audios/welcomeAudio_pt.m4a",
];

// ServiceWorker installieren
self.addEventListener("install", (event) => {
  event.waitIntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(cacheFiles))
      .then(() => console.log("Cache erfolgreich erstellt:", CACHE_NAME))
      .catch((error) => console.error("Error caching files: ", error))
  );
});

// ServiceWorker aktivieren und Cache von anderer Version des ServiceWorkers löschen
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cache) => {
            if (cache !== CACHE_NAME) {
              return caches.delete(cache);
            }
          })
        );
      })
      .catch((error) => console.error("Error deleting old caches: ", error))
  );
});

// Ereignisse fetchen und Ressourcen aus Cache zurückgeben
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
      .catch((error) => console.error("Error fetching and caching", error))
  );
});
