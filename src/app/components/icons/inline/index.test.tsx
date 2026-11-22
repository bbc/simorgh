import { cloneElement } from 'react';
import { render } from '#app/components/react-testing-library-with-providers';
import { coreIcons, mediaIcons, navigationIcons } from '.';

const cases = [
  ['alert', coreIcons.alert, '0 0 32 32', '1rem', '1rem', 1],
  ['info', coreIcons.info, '0 0 32 32', '1rem', '1rem', 1],
  ['clock', coreIcons.clock, '0 0 13 13', '13', '13', 2],
  ['video', mediaIcons.video, '0 0 12 12', '12', '12', 2],
  ['audio', mediaIcons.audio, '0 0 13 12', '13px', '12px', 2],
  ['photogallery', mediaIcons.photogallery, '0 0 32 26', '16px', '13px', 1],
  ['guidance', mediaIcons.guidance, '0 0 32 32', '32', '32', 1],
  ['podcast', mediaIcons.podcast, '0 0 32 32', '32', '32', 1],
  ['communication', mediaIcons.communication, '0 0 32 32', '32', '32', 1],
  ['elections', mediaIcons.elections, '0 0 32 32', '32', '32', 1],
  ['youtube', mediaIcons.youtube, '0 0 16 16', '32', '32', 1],
  ['whatsapp', mediaIcons.whatsapp, '0 0 32 32', '32', '32', 1],
  ['seriesstack', mediaIcons.seriesstack, '0 0 32 32', '32', '32', 1],
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

it('preserves the video fill and photo/series geometry', () => {
  const { container } = render(
    <>
      {mediaIcons.video}
      {mediaIcons.photogallery}
      {mediaIcons.seriesstack}
    </>,
  );

  expect(container.querySelector('g')).toHaveAttribute('fill', 'none');
  expect(container.querySelector('g')).toHaveAttribute('fill-rule', 'evenodd');
  expect(container.querySelector('path[fill="currentColor"]')).toHaveAttribute(
    'd',
    'M2.144.96v11.28l8.712-5.64z',
  );
  expect(container.querySelector('circle')).toHaveAttribute('cx', '20');
  expect(container.querySelector('circle')).toHaveAttribute('cy', '14.02');
  expect(container.querySelector('circle')).toHaveAttribute('r', '5.5');
  expect(container.querySelectorAll('polygon')).toHaveLength(2);
});

it.each([
  ['canonical', false, false],
  ['AMP', true, false],
  ['Lite', false, true],
] as const)(
  'exposes the %s video colour state without changing geometry',
  (_edition, isAmp, isLite) => {
    const { container } = render(mediaIcons.video, { isAmp, isLite });

    expect(container.querySelector('svg')).toHaveAttribute(
      'data-is-lite',
      String(isLite),
    );
    expect(container.querySelector('svg')).toHaveAttribute(
      'viewBox',
      '0 0 12 12',
    );
  },
);

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
