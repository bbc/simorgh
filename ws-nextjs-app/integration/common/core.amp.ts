/**
 * @isInUK yes
 */

import { AMP_SCRIPT, AMP_NO_SCRIPT } from '#app/lib/amp/boilerplate';

export default () => {
  it('preserves the required AMP boilerplate and no-JavaScript CSS', () => {
    const boilerplate = document.querySelector('head > style[amp-boilerplate]');
    const fallback = document.querySelector(
      'head > noscript > style[amp-boilerplate]',
    );

    expect(boilerplate?.textContent).toBe(AMP_SCRIPT);
    expect(fallback?.textContent).toBe(AMP_NO_SCRIPT);
    expect(document.querySelectorAll('style[amp-boilerplate]')).toHaveLength(2);
  });

  it('Core scripts', () => {
    const ampScripts = [
      'https://cdn.ampproject.org/v0.js',
      'https://cdn.ampproject.org/v0/amp-analytics-0.1.js',
      'https://cdn.ampproject.org/v0/amp-geo-0.1.js',
    ];

    ampScripts.forEach(ampScript => {
      expect(
        document.querySelector(`head script[src="${ampScript}"]`),
      ).toBeInTheDocument();
    });
  });

  it('AMP Geo config', () => {
    const ampGeoScript = document.querySelector(
      'body amp-geo > script[type="application/json"]',
    );
    expect(ampGeoScript).toBeInTheDocument();
    expect(ampGeoScript?.textContent).toMatchSnapshot();
  });
};
