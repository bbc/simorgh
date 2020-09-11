import React from 'react';
import { renderAppleItunesApp } from './utils';

describe('Metadata utils', () => {
  describe('renderAppleItunesApp', () => {
    it('should return null when iTunesAppId is empty', () => {
      expect(renderAppleItunesApp(null, 'not-empty')).toBeNull();
    });

    it('should return null when canonicalUrl is empty', () => {
      expect(renderAppleItunesApp('not-empty', null)).toBeNull();
    });

    it('should return the apple-itunes-app meta tag when iTunesAppId and canonicalUrl provided', () => {
      expect(
        renderAppleItunesApp(12345678, 'https://www.bbc.com/test'),
      ).toEqual(
        <meta
          name="apple-itunes-app"
          content="app-id=12345678, app-argument=https://www.bbc.com/test?utm_medium=banner&utm_content=apple-itunes-app"
        />,
      );
    });
  });
});
