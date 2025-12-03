/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { Services } from '#app/models/types/global';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';
import { AppleItunesApp, AlternateLink, IconSizes, IconType } from '../types';

export const getIconAssetUrl = (service: Services, size: string) =>
  `https://static.files.bbci.co.uk/ws/simorgh-assets/public/${service}/images/icons/icon-${size}.png`;

const createIconLinks = (
  service: Services,
  iconSizes: IconSizes,
  iconType: string,
) => {
  const iconSizesForType = iconSizes[iconType as IconType];

  return iconSizesForType.map(size => {
    const iconAssetUrl = getIconAssetUrl(service, size);
    const key = `${service}-${size}`;

    if (iconType === 'icon') {
      return (
        <link
          /* @ts-ignore:   Property 'key' does not exist on type 'LinkProps & { css?: Interpolation<Theme>; }'.ts(2322) */
          key={key}
          rel="icon"
          type="image/png"
          href={iconAssetUrl}
          sizes={size}
        />
      );
    }

    return (
      /* @ts-ignore:   Property 'key' does not exist on type 'LinkProps & { css?: Interpolation<Theme>; }'.ts(2322) */
      <link key={key} rel="apple-touch-icon" sizes={size} href={iconAssetUrl} />
    );
  });
};

export const getIconLinks = (service: Services, iconSizes: IconSizes) => {
  if (!iconSizes) {
    return null;
  }
  const iconTypes = Object.keys(iconSizes);
  return iconTypes.map(iconType => {
    return createIconLinks(service, iconSizes, iconType);
  });
};

export const getAppleTouchUrl = (service: Services) => {
  return [
    getEnvConfig().SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN,
    getEnvConfig().SIMORGH_PUBLIC_STATIC_ASSETS_PATH,
    service,
    '/images/icons/icon-192x192.png',
  ].join('');
};

export const renderAlternateLinks = (link: AlternateLink) => (
  <link
    rel="alternate"
    href={link.href}
    hrefLang={link.hrefLang || ''}
    /* @ts-ignore:   Property 'key' does not exist on type 'LinkProps & { css?: Interpolation<Theme>; }'.ts(2322) */
    key={link.hrefLang}
  />
);

export const renderAppleItunesApp = ({
  iTunesAppId,
  canonicalLink,
  isAmp,
  hasAppleItunesAppBanner,
}: AppleItunesApp) => {
  const isCanonical = !isAmp;

  const shouldRender = [
    iTunesAppId,
    canonicalLink,
    isCanonical,
    hasAppleItunesAppBanner,
  ].every(Boolean);

  if (shouldRender) {
    const content = `app-id=${iTunesAppId}, app-argument=${canonicalLink}?utm_medium=banner&utm_content=apple-itunes-app`;

    return <meta name="apple-itunes-app" content={content} />;
  }
  return null;
};
