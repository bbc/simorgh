import React from 'react';

export const iconAssetUrl = (service, size) =>
  `https://news.files.bbci.co.uk/include/articles/public/${service}/images/icons/icon-${size}.png`;

const createIconLinks = (service, iconSizes, iconType) => {
  return iconSizes.map(size => {
    if (iconType === 'icon') {
      return (
        <link
          rel="icon"
          type="image/png"
          href={iconAssetUrl(service, size)}
          sizes={size}
        />
      );
    }

    return (
      <link
        rel="apple-touch-icon"
        sizes={size}
        href={iconAssetUrl(service, size)}
      />
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
