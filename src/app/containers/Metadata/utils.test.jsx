import React from 'react';
import { renderAppleItunesApp } from './utils';

describe('Metadata utils', () => {
  describe('renderAppleItunesApp', () => {
    it('should return null when iTunesAppId is empty', () => {
      expect(renderAppleItunesApp({ iTunesAppId: null })).toBeNull();
    });

    it('should return null when canonicalLink is empty', () => {
      expect(renderAppleItunesApp({ canonicalLink: null })).toBeNull();
    });

    it('should return null when platform is AMP', () => {
      expect(
        renderAppleItunesApp({
          isAmp: true,
        }),
      ).toBeNull();
    });

    it('should return null when apple_itunes_app feature toggle is disabled', () => {
      expect(
        renderAppleItunesApp({
          appleItunesAppToggleEnabled: false,
        }),
      ).toBeNull();
    });

    it('should return null when hasAppleItunesAppBanner is false', () => {
      expect(
        renderAppleItunesApp({
          hasAppleItunesAppBanner: false,
        }),
      ).toBeNull();
    });

    it('should return the apple-itunes-app meta tag when iTunesAppId and canonicalLink exist, is canonical page, apple_itunes_app toggle is enabled and hasAppleItunesAppBanner is true', () => {
      expect(
        renderAppleItunesApp({
          iTunesAppId: 12345678,
          canonicalLink: 'https://www.bbc.com/test',
          isAmp: false,
          appleItunesAppToggleEnabled: true,
          hasAppleItunesAppBanner: true,
        }),
      ).toEqual(
        <meta
          name="apple-itunes-app"
          content="app-id=12345678, app-argument=https://www.bbc.com/test?utm_medium=banner&utm_content=apple-itunes-app"
        />,
      );
    });
  });
});
