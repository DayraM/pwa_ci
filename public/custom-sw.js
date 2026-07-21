console.log('[SW] Archivo custom-sw.js cargado');

//Eventon install: se ejecuta cuando el Service Worker se instala 
self.addEventListener('install', (event) => {
    console.log('[SW] Evento install ejecutado');
    console.log('[SW] El Service Worker se esta instalando');
    
    //Forzar al nuevo Service Worker a activarse sin esperar
    self.skipWaiting();
});

//Evento activate: se ejecuta cuando el Service Worker toma el control
self.addEventListener('activate', (event) => {
    console.log('[SW] Evento activate ejecutado');
    console.log('[SW] El Service Worker esta activo');

    //Permitir que el Service Worker controle las pestañas abiertas
    event.waitUntil(self.clients.claim());
});

//Evento fetch: se ejecuta cada vez que la app solicita un recurso 
self.addEventListener('fetch', (event) => {
    console.log('[SW] Evento fetch:', event.request.url);
});

//Evento message: permite recibir mensajes desde la aplicacion 
self.addEventListener('message', (event) => {
    console.log('[SW] Mensaje recibido:', event.data);
});
//importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js');
importScripts('./ngsw-worker.js');