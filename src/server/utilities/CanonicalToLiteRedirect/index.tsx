import React from 'react';

export const redirectScript = (window: Window) => {
  const { pathname } = window.location;

  const allowList = ['/pidgin/articles/czrzwn80zjmo'];
  const isOptedIntoLiteRedirect =
    window.localStorage.isOptedIntoLiteRedirect ?? 'true';

  if (
    window?.navigator?.connection?.effectiveType &&
    allowList.includes(pathname)
  ) {
    const toLitePath = `${pathname}.lite`;
    const ect = window.navigator.connection.effectiveType;
    const normalisedEct = ect.toLocaleLowerCase();

    switch (normalisedEct) {
      case 'slow-2g':
      case '2g':
      case '3g':
        if (isOptedIntoLiteRedirect === 'true') {
          window.localStorage.setItem('isOptedIntoLiteRedirect', 'true');
          window.location.replace(toLitePath);
        }
        break;
      default:
        break;
    }
  }
};

export const optOutScript = (window: Window, event: MouseEvent) => {
  let targetElement;
  const clickedElement = event.target as HTMLElement;
  const STATIC_REVERB_CLICK_TRACKING = 'data-static-reverb-click';

  let currentElement = clickedElement;
  while (currentElement) {
    if (currentElement.tagName === 'A') {
      targetElement = currentElement;
      break;
    }
    currentElement = currentElement.parentElement as HTMLElement;
  }

  if (targetElement?.tagName === 'A') {
    const reverbUrl = targetElement.getAttribute(
      STATIC_REVERB_CLICK_TRACKING,
    ) as string;

    if (reverbUrl?.includes('lite-site-summary')) {
      window.localStorage.setItem('isOptedIntoLiteRedirect', 'false');
    }
  }
};

export const OptOutOfLiteRedirect = () => {
  return (
    <script>
      {`
        document.addEventListener('click', (event) => {
          (${optOutScript.toString()})(window,event)
        })
      `}
    </script>
  );
};

// THIS COMPONENT IS ONLY TO BE USED WITH CANONICAL RENDERERS
// DO NOT USE IT WITH LITE AND AMP RENDERERS
export default () => {
  return (
    <script>
      {`
        window.addEventListener('load', () => {
          (${redirectScript.toString()})(window)
        })
      `}
    </script>
  );
};
