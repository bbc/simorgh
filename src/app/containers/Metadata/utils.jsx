import React from 'react';

export const getIconAssetUrl = (service, size) =>
  `https://news.files.bbci.co.uk/include/articles/public/${service}/images/icons/icon-${size}.png`;

const createIconLinks = (service, iconSizes, iconType) => {
  return iconSizes.map(size => {
    const iconAssetUrl = getIconAssetUrl(service, size);
    const key = `${service}-${size}`;

    if (iconType === 'icon') {
      return (
        <link
          key={key}
          rel="icon"
          type="image/png"
          href={iconAssetUrl}
          sizes={size}
        />
      );
    }

    return (
      <link key={key} rel="apple-touch-icon" sizes={size} href={iconAssetUrl} />
    );
  });
};

export const getIconLinks = (service, iconSizes) => {
  if (!iconSizes) {
    return null;
  }
  const iconTypes = Object.keys(iconSizes);
  return iconTypes.map(iconType => {
    return createIconLinks(service, iconSizes[iconType], iconType);
  });
};

export const renderAmpHtml = (ampLink, isAmp) => {
  if (isAmp) {
    return null;
  }
  return <link rel="amphtml" href={ampLink} />;
};

export const getAppleTouchUrl = service => {
  return [
    process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN,
    process.env.SIMORGH_PUBLIC_STATIC_ASSETS_PATH,
    service,
    '/images/icons/icon-192x192.png',
  ].join('');
};

export const renderAlternateLinks = link => (
  <link
    rel="alternate"
    href={link.href}
    hrefLang={link.hrefLang}
    key={link.hrefLang}
  />
);
