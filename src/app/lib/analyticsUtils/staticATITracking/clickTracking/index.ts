/* istanbul ignore next */
export default () => {
  const clickTrackingFiredUrls: string[] = [];
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

      const reverbUrl = targetElement.getAttribute(
        STATIC_REVERB_CLICK_TRACKING,
      ) as string;

      const anchorElement = targetElement as HTMLAnchorElement;
      const nextPageUrl = anchorElement?.href;

      if (reverbUrl && !clickTrackingFiredUrls.includes(reverbUrl)) {
        window.processClientDeviceAndSendStaticBeacon({
          reverbUrl,
          forwardingUrl: nextPageUrl,
        });
        clickTrackingFiredUrls.push(reverbUrl);
      }

      window.location.assign(nextPageUrl);
    }
  });
};
