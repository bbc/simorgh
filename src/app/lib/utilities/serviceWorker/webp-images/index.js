const webPImages = event => {
  if (
    /^https:\/\/ichef\.bbci\.co\.uk\/(news|ace\/standard)\/.+(\.jpg|\.png)$/.test(
      event.request.url,
    )
  ) {
    const req = event.request.clone();

    // Inspect the accept header for WebP support
    let supportsWebp = false;
    if (req.headers.has('accept')) {
      supportsWebp = req.headers.get('accept').includes('webp');
    }

    // If we support WebP
    if (supportsWebp && !/\/amz\/worldservice\/.*/.test(event.request.url)) {
      event.respondWith(
        fetch(`${req.url}.webp`, {
          mode: 'no-cors',
        }),
      );
    }
  }
};

export default webPImages;
