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
