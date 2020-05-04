import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { shouldMatchSnapshot, isNull } from '@bbc/psammead-test-helpers';
import {
  VideoCanonicalWithPlaceholder,
  VideoCanonicalNoPlaceholder,
  VideoAmp,
  VideoCanonicalNoVersionId,
  VideoCanonicalToggledOff,
  VideoCanonicalWithCaption,
  VideoAmpWithCaption,
} from './fixtureData';
import logEmbedSourceStatus from './helpers/logEmbedSourceStatus';

jest.mock('./helpers/logEmbedSourceStatus');

describe('MediaPlayer', () => {
  shouldMatchSnapshot(
    'Calls the canonical placeholder when platform is canonical and showPlaceholder is true',
    VideoCanonicalWithPlaceholder,
  );

  shouldMatchSnapshot(
    'Does not Call the canonical placeholder when platform is canonical but showPlaceholder is false',
    VideoCanonicalNoPlaceholder,
  );

  shouldMatchSnapshot('Renders the AMP player when platform is AMP', VideoAmp);

  describe('Fails and returns early when', () => {
    isNull('there is no versionId', VideoCanonicalNoVersionId);
    isNull('component is toggled off', VideoCanonicalToggledOff);
  });
});

it('should display the AMP media caption', () => {
  const { getByText } = render(VideoAmpWithCaption);

  const mediaCaptionAMP = getByText('Media Player With Caption');
  expect(mediaCaptionAMP).toBeInTheDocument();
});

it('should display the Canonical media caption', () => {
  const { getByText } = render(VideoCanonicalWithCaption);

  const mediaCaptionCanonical = getByText('Media Player With Caption');
  expect(mediaCaptionCanonical).toBeInTheDocument();
});

it('should render the iframe when showPlaceholder is set to false', () => {
  render(VideoCanonicalNoPlaceholder);

  expect(document.querySelector('iframe')).toBeInTheDocument();
});

it('should not render the iframe when showPlaceholder is set to true', () => {
  render(VideoCanonicalWithCaption);

  expect(document.querySelector('iframe')).not.toBeInTheDocument();
});

it('should contain the noscript tag for no-JS scenarios ', () => {
  render(VideoCanonicalWithCaption);

  expect(document.querySelector('noscript')).toBeInTheDocument();
});

it('should log embed source status code when player is loaded', () => {
  logEmbedSourceStatus.mockImplementation(() => jest.fn());
  render(VideoCanonicalWithCaption);

  expect(logEmbedSourceStatus.mock.calls.length).toBeGreaterThan(0);
  logEmbedSourceStatus.mock.calls.forEach(call => {
    const { url, assetType, embedUrl } = call[0];
    expect(url).toBe('c123456789o');
    expect(embedUrl.includes('test.bbc.co.uk')).toBe(true);
    expect(assetType).toBe('articles');
  });
});
