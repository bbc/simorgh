import { cloneElement } from 'react';
import { readFileSync } from 'fs';
import path from 'path';
import { render } from '#app/components/react-testing-library-with-providers';
import { coreIcons, mediaIcons, navigationIcons } from '.';

const cases = [
  ['alert', coreIcons.alert, '0 0 32 32', '1rem', '1rem', 1],
  ['info', coreIcons.info, '0 0 32 32', '1rem', '1rem', 1],
  ['clock', coreIcons.clock, '0 0 13 13', '13', '13', 2],
  [
    'hamburger',
    navigationIcons.hamburger,
    '0 0 44 44',
    '2.75rem',
    '2.75rem',
    1,
  ],
  ['cross', navigationIcons.cross, '0 0 44 44', '2.75rem', '2.75rem', 1],
] as const;

describe.each(['news', 'arabic'] as const)('inline icons — %s', service => {
  it.each(cases)(
    'preserves %s artwork dimensions and decorative semantics',
    (_name, icon, viewBox, width, height, pathCount) => {
      const { container } = render(icon, { service });
      const svg = container.querySelector('svg');

      expect(svg).toHaveAttribute('viewBox', viewBox);
      expect(svg).toHaveAttribute('width', width);
      expect(svg).toHaveAttribute('height', height);
      expect(svg).toHaveAttribute('focusable', 'false');
      expect(svg).toHaveAttribute('aria-hidden', 'true');
      expect(svg?.querySelectorAll('path')).toHaveLength(pathCount);
      expect(container.querySelector('img')).not.toBeInTheDocument();
    },
  );
});

const mediaCases = [
  ['video', '0 0 12 12', 2],
  ['audio', '0 0 13 12', 2],
  ['photogallery', '0 0 32 26', 1],
  ['guidance', '0 0 32 32', 1],
  ['podcast', '0 0 32 32', 1],
  ['communication', '0 0 32 32', 1],
  ['elections', '0 0 32 32', 1],
  ['youtube', '0 0 16 16', 1],
  ['whatsapp', '0 0 32 32', 1],
  ['seriesstack', '0 0 32 32', 1],
] as const;

const readAsset = (name: string) =>
  new DOMParser().parseFromString(
    readFileSync(
      path.resolve(
        __dirname,
        `../../../../../public/images/icons/media-${name}.svg`,
      ),
      'utf8',
    ),
    'image/svg+xml',
  );

it.each(mediaCases)(
  'publishes the original %s artwork',
  (name, viewBox, pathCount) => {
    const asset = readAsset(name);

    expect(asset.querySelector('parsererror')).toBeNull();
    expect(asset.documentElement.getAttribute('viewBox')).toBe(viewBox);
    expect(asset.querySelectorAll('path')).toHaveLength(pathCount);
  },
);

it('preserves the external video fill and photo/series geometry', () => {
  const video = readAsset('video');
  const photo = readAsset('photogallery');
  const series = readAsset('seriesstack');

  expect(video.querySelector('g')?.getAttribute('fill')).toBe('none');
  expect(video.querySelector('g')?.getAttribute('fill-rule')).toBe('evenodd');
  expect(
    video.querySelector('path[fill="currentColor"]')?.getAttribute('d'),
  ).toBe('M2.144.96v11.28l8.712-5.64z');
  expect(photo.querySelector('circle')?.getAttribute('cx')).toBe('20');
  expect(photo.querySelector('circle')?.getAttribute('cy')).toBe('14.02');
  expect(photo.querySelector('circle')?.getAttribute('r')).toBe('5.5');
  expect(series.querySelectorAll('polygon')).toHaveLength(2);
});

describe.each([
  ['canonical', false, false],
  ['AMP', true, false],
  ['Lite', false, true],
] as const)('%s external media icons', (_edition, isAmp, isLite) => {
  it.each(mediaCases)(
    'renders %s without inline artwork or an accessible image name',
    name => {
      const { container, getByRole, queryByRole } = render(
        <button type="button" aria-label="Listen">
          {mediaIcons[name]}
        </button>,
        { service: 'arabic', isAmp, isLite },
      );
      const icon = container.querySelector('.external-svg');
      const image = icon?.querySelector('img');
      const src = `${process.env.SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN}${process.env.SIMORGH_PUBLIC_STATIC_ASSETS_PATH}images/icons/media-${name}.svg`;

      expect(icon).toHaveAttribute('aria-hidden', 'true');
      expect(icon).toHaveStyle({ '--icon-source': `url("${src}")` });
      expect(container.querySelector('svg')).not.toBeInTheDocument();
      expect(getByRole('button', { name: 'Listen' })).toBeInTheDocument();
      expect(queryByRole('img')).not.toBeInTheDocument();
      if (name === 'video') {
        expect(icon).toHaveAttribute('data-is-lite', String(isLite));
      }
      if (isAmp) {
        expect(image).not.toBeInTheDocument();
        expect(icon?.querySelector('span')).toHaveStyle({
          backgroundImage: `url("${src}")`,
        });
      } else {
        expect(image).toHaveAttribute('alt', '');
        expect(image).toHaveAttribute('aria-hidden', 'true');
        expect(image).toHaveAttribute('src', src);
        expect(image).toHaveAttribute('loading', 'eager');
        expect(image?.tabIndex).toBe(-1);
      }
    },
  );
});

it('keeps cloned navigation attributes on the SVG for AMP bindings', () => {
  const { container } = render(
    <>
      {cloneElement(navigationIcons.hamburger, {
        'data-amp-bind-hidden': 'menuState.expanded',
      })}
      {cloneElement(navigationIcons.cross, {
        hidden: true,
        'data-amp-bind-hidden': '!menuState.expanded',
      })}
    </>,
    { isAmp: true, service: 'arabic' },
  );
  const [hamburger, cross] = container.querySelectorAll('svg');

  expect(hamburger).toHaveAttribute(
    'data-amp-bind-hidden',
    'menuState.expanded',
  );
  expect(hamburger).not.toHaveAttribute('hidden');
  expect(cross).toHaveAttribute('data-amp-bind-hidden', '!menuState.expanded');
  expect(cross).toHaveAttribute('hidden');
  expect(cross.querySelector('path')).toHaveAttribute('fill-rule', 'evenodd');
});
