/* istanbul ignore next */
export default () => {
  const clickTrackingFiredUrls: string[] = [];
  const STATIC_ATI_CLICK_TRACKING = 'data-static-ati-click';

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

<<<<<<<< HEAD:src/app/lib/analyticsUtils/staticATITracking/clickTracking/index.ts
      const atiURL = targetElement.getAttribute(STATIC_ATI_CLICK_TRACKING);
========
      const atiURL = targetElement.getAttribute('data-static-ati-click');
>>>>>>>> 6ab6f3db1add8163fb91a70de3378ac3fcd0a3c9:src/server/utilities/staticATITracking/clickTracking/index.ts
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
