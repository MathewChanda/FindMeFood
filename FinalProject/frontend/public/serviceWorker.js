// took inspiration from professor dominguez's lectures 

const STATIC_CACHE_NAME = 'findmefood';


// when we are installing the service worker 
self.addEventListener('install', e => {
    // saving the endpoint /api/offline 
    console.log("installing rn")
    e.waitUntil(
      caches.open(STATIC_CACHE_NAME).then(cache => {
        return cache.addAll([
          '/api/offline', 
          '/favicon.ico', 
          '/manifest.json', 
          '/favorites', 
          '/', 
          '/restaurant-cutlery-circular-symbol-of-a-spoon-and-a-fork-in-a-circle.png', 
          '/static/js/bundle.js'
        ]);
      })
    );
});

// this is for cleaning up previous service workers 
self.addEventListener('activate', e => {
    e.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.filter(cacheName => {
            return cacheName.startsWith('findmefood') && cacheName != STATIC_CACHE_NAME;
          }).map(cacheName => {
            return caches.delete(cacheName);
          })
        );
      })
    );
});

// intercepts fetch calls before we start
self.addEventListener('fetch', e => {
    console.log("fetch"); 
    // we grab the endpoint location 
    let endpoint = new URL(e.request.url);
    console.log(e.request.url)
    // this is an endpoint to our api 
    if(endpoint.origin === location.origin && endpoint.pathname.startsWith('/api/')) {
      console.log("we are currently using our api rn"); 
      if(e.request.method !== "GET") {
        caches.open(STATIC_CACHE_NAME).then((cache) => {
          console.log("we are deleting the cache now")
          cache.delete('/api/favorites');  
        })
      }

      e.respondWith(
        cacheFirst(e.request)
      );
    }

    // this is not an endpoint from our backend 
    else {
      console.log("we are hitting this other api")
      e.respondWith(
        cacheFirst(e.request) 
      );
    }
  });

// this checks if we found it in our cache, but if it does not appear, then we make a request. Anything occurs, we will go directly to /offline  
function cacheFirst(request) {
    return caches.match(request)
    .then(response => {
      //Return a response if we have one cached. Otherwise, get from the network
      if(response){
        console.log("we found the request")
      }
      return response || fetchAndCache(request);
    })
    .catch(error => {
      // network is down 
      return caches.match('/api/offline');
    })
}

// we fetch the call and then we cache if it's api/favorites 
function fetchAndCache(request) {
  return fetch(request).then(response => {
    var requestUrl = new URL(request.url);
    //Cache everything except login
    if(response.ok && requestUrl.pathname.startsWith('/api/favorites')) {
      console.log("we are storing it in the cache now")
      caches.open(STATIC_CACHE_NAME).then((cache) => {
        cache.put(request, response);
      });
    }

    return response.clone();
  });
} 