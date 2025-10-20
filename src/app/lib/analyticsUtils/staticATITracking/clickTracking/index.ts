/* istanbul ignore next */
export default () => {
  const clickTrackingFiredUrls: string[] = [];
  const STATIC_ATI_CLICK_TRACKING = 'data-static-ati-click';

  document.addEventListener('click', (event: MouseEvent) => {
    console.log('CLICK DETECTED...');
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

      const atiURL = targetElement.getAttribute(STATIC_ATI_CLICK_TRACKING);
      const anchorElement = targetElement as HTMLAnchorElement;
      const nextPageUrl = anchorElement?.href;

      if (atiURL && !clickTrackingFiredUrls.includes(atiURL)) {
        window.processClientDeviceAndSendStaticBeacon(atiURL as string);
        clickTrackingFiredUrls.push(atiURL);
      }

      window.location.assign(nextPageUrl);
    }
  });
};
