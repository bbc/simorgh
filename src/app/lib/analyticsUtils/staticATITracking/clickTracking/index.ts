/* istanbul ignore next */
export default () => {
  const clickTrackingFiredUrls: string[] = [];
  const STATIC_ATI_CLICK_TRACKING = 'data-static-ati-click';
  const STATIC_REVERB_CLICK_TRACKING = 'data-static-reverb-click';
  document.addEventListener('click', (event: MouseEvent) => {
    let targetElement;
    const clickedElement = event.target as HTMLElement;

    let currentElement = clickedElement;
    while (currentElement) {
      if (currentElement.tagName === 'A') {
        targetElement = currentElement;
        break;
      }
      currentElement = currentElement.parentElement as HTMLElement;
    }

    if (targetElement?.tagName === 'A') {
      event.stopPropagation();
      event.preventDefault();

      const atiURL = targetElement.getAttribute(
        STATIC_ATI_CLICK_TRACKING,
      ) as string;
      const reverbURL = targetElement.getAttribute(
        STATIC_REVERB_CLICK_TRACKING,
      ) as string;
      const primaryTrackingUrl = reverbURL ?? atiURL;

      const anchorElement = targetElement as HTMLAnchorElement;
      const nextPageUrl = anchorElement?.href;

      if (
        primaryTrackingUrl &&
        !clickTrackingFiredUrls.includes(primaryTrackingUrl)
      ) {
        window.processClientDeviceAndSendStaticBeacon(
          atiURL,
          reverbURL,
          nextPageUrl,
        );
        clickTrackingFiredUrls.push(primaryTrackingUrl);
      }

      window.location.assign(nextPageUrl);
    }
  });
};
