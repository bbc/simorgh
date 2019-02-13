/* eslint-disable */
var version = 'v0.0.1';

self.addEventListener('install', function (event) {
  console.log('SW ' + version + ': install event.');
});

self.addEventListener('fetch', function (event) {
  console.debug('SW ' + version + ': fetch event for ' + event.request.url);
});

self.addEventListener('activate', function (event) {
  console.log('SW ' + version + ': activate event.');
});
