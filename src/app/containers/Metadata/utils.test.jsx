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

    it('should not render on AMP', () => {
      expect(
        renderAppleItunesApp({
          iTunesAppId: 12345678,
          canonicalLink: 'https://www.bbc.com/test',
          isAmp: true,
        }),
      ).toBeNull();
    });

    it('should return the apple-itunes-app meta tag when iTunesAppId and canonicalLink are provided, and is a canonical page', () => {
      expect(
        renderAppleItunesApp({
          iTunesAppId: 12345678,
          canonicalLink: 'https://www.bbc.com/test',
          isAmp: false,
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
