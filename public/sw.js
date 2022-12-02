/* eslint-disable */
var version = 'v0.0.3';

self.addEventListener('fetch', function(event) {
    if (self.registration.scope.indexOf('/hindi/') && /^https:\/\/ichef\.bbci\.co\.uk\/news\/.+(\.jpg|\.png)$/.test(event.request.url)) {

        const req = event.request.clone();

        // Inspect the accept header for WebP support
        let supportsWebp = false;
        if (req.headers.has('accept')){
            supportsWebp = req.headers.get('accept').includes('webp');
        }
        // If we support WebP
        if (supportsWebp) {
            event.respondWith(
				fetch(`${req.url}.webp`, {
					mode: 'no-cors'
				})
			);
        }
        
    }
});