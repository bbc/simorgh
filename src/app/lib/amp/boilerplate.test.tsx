import { createHash } from 'crypto';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  AMP_SCRIPT,
  AMP_NO_SCRIPT,
  AMP_JS,
  AMP_ACCESS_JS,
  AMP_ANALYTICS_JS,
  AMP_BIND_JS,
  AMP_LIST_JS,
  AMP_MUSTACHE_JS,
  AMP_ADS_JS,
  AMP_SCRIPT_JS,
} from './boilerplate';

describe('AMP boilerplate output', () => {
  it('preserves the exact required CSS bytes in the head and noscript fallback', () => {
    const html = renderToStaticMarkup(
      <html lang="en">
        <head>
          <style amp-boilerplate="">{AMP_SCRIPT}</style>
          <noscript>
            <style amp-boilerplate="">{AMP_NO_SCRIPT}</style>
          </noscript>
        </head>
        <body />
      </html>,
    );
    const document = new DOMParser().parseFromString(html, 'text/html');
    const scriptCss = document.querySelector('head > style')?.textContent;
    const noScriptCss = document.querySelector('noscript > style')?.textContent;

    expect(
      document.querySelector('head > style')?.getAttribute('amp-boilerplate'),
    ).toBe('');
    expect(
      document
        .querySelector('noscript > style')
        ?.getAttribute('amp-boilerplate'),
    ).toBe('');
    expect(
      createHash('sha256')
        .update(scriptCss || '')
        .digest('hex'),
    ).toBe('d3e7945971332336b25edc1bb38aa01aa714ae8076db6be2799d503fb7d0eaca');
    expect(
      createHash('sha256')
        .update(noScriptCss || '')
        .digest('hex'),
    ).toBe('1fe319307023c6d5f9d410f9350bd1d9504461d664adaeda0ae0a0374b2e09f9');
  });

  it.each([
    ['runtime', AMP_JS, 'https://cdn.ampproject.org/v0.js', null],
    [
      'access',
      AMP_ACCESS_JS,
      'https://cdn.ampproject.org/v0/amp-access-0.1.js',
      'amp-access',
    ],
    [
      'analytics',
      AMP_ANALYTICS_JS,
      'https://cdn.ampproject.org/v0/amp-analytics-0.1.js',
      'amp-analytics',
    ],
    [
      'bind',
      AMP_BIND_JS,
      'https://cdn.ampproject.org/v0/amp-bind-0.1.js',
      'amp-bind',
    ],
    [
      'list',
      AMP_LIST_JS,
      'https://cdn.ampproject.org/v0/amp-list-0.1.js',
      'amp-list',
    ],
    [
      'mustache',
      AMP_MUSTACHE_JS,
      'https://cdn.ampproject.org/v0/amp-mustache-0.2.js',
      'amp-mustache',
    ],
    [
      'ads',
      AMP_ADS_JS,
      'https://cdn.ampproject.org/v0/amp-ad-0.1.js',
      'amp-ad',
    ],
    [
      'script',
      AMP_SCRIPT_JS,
      'https://cdn.ampproject.org/v0/amp-script-0.1.js',
      'amp-script',
    ],
  ] as const)(
    'renders the %s script with its version and AMP registration',
    (_name, element, src, extension) => {
      const document = new DOMParser().parseFromString(
        renderToStaticMarkup(element),
        'text/html',
      );
      const script = document.querySelector('script');

      expect(script?.getAttribute('async')).toBe('');
      expect(script?.getAttribute('src')).toBe(src);
      expect(script?.getAttribute('custom-element')).toBe(
        extension === 'amp-mustache' ? null : extension,
      );
      expect(script?.getAttribute('custom-template')).toBe(
        extension === 'amp-mustache' ? extension : null,
      );
    },
  );
});
