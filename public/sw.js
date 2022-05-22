/* eslint-disable */
var version = 'v0.0.2beta2';

const navigatorConnectionSupported = 'connection' in navigator;

const getSmallerSize = (initialSize, connectionType) => {
    switch (initialSize) {
        case '800':
            return connectionType == '2g' ? 480 : 800;
        break;
        case '660':
        case '480':
            return connectionType == '2g' ? 240 : initialSize;
        break;
        default:
            return connectionType == '2g' ? 72 : 480;
        break;
    }
};

const setReturnUrlIfBlank = returnUrl => returnUrl === '' ? event.request.url : returnUrl;

self.addEventListener('fetch', function(event) {
    // check if the request is an image
    if (/https:\/\/ichef.bbci.co.uk\/news\/.+\.jpg$|\.png$|\.webp$/.test(event.request.url)) {

        const req = event.request.clone();
        let returnUrl = '';
        const pathParts = event.request.url.match(/https:\/\/ichef.bbci.co.uk\/news\/(\d+)\/(.*)(\.jpg$|\.png$|\.webp$)/);

        // check if navigator.connection is supported
        if (navigatorConnectionSupported) {
            const connectionEffectiveType = navigator.connection.effectiveType;

            // check if effectiveType is supported
            if (connectionEffectiveType) {
                
                let imageResolution = '';

                switch (connectionEffectiveType) {
                    case "slow-2g":
                    case "2g":
                        imageResolution = getSmallerSize(pathParts[1], '2g');
                        break;
                    case "4g":
                        imageResolution = getSmallerSize(pathParts[1], '4g');
                        break;
                    default:
                        imageResolution = getSmallerSize(pathParts[1], null);
                }

                // Build the image we want to return based on connection
                returnUrl = 'https://ichef.bbci.co.uk/news/' + imageResolution + '/' + pathParts[2] + pathParts[3];
            }
        }
        if (/\.jpg$|.png$/.test(event.request.url)) {
            // Inspect the accept header for WebP support
            let supportsWebp = false;
            if (event.request.headers.has('accept')){
                supportsWebp = event.request.headers.get('accept').includes('webp');
            }
            console.log('supportsWebp', supportsWebp);

            // If we support WebP
            if (supportsWebp) {
                returnUrl = setReturnUrlIfBlank(returnUrl) + '.webp';
            }
        }
        console.log('replaced ' + event.request.url + ' with ' + setReturnUrlIfBlank(returnUrl));
        event.respondWith(
            fetch(setReturnUrlIfBlank(returnUrl), {
                mode: 'no-cors'
            })
        );
    }
});