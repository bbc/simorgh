import { render } from '@testing-library/react';
import { shouldMatchSnapshot, isNull } from '@bbc/psammead-test-helpers';
import {
  VideoCanonicalWithPlaceholder,
  VideoCanonicalNoPlaceholder,
  VideoAmp,
  VideoCanonicalNoVersionId,
  VideoAmpNoBlockId,
  VideoCanonicalToggledOff,
  VideoCanonicalWithCaption,
  VideoAmpWithCaption,
  UnavailableVideoCanonical,
  UnavailableVideoAmp,
} from './fixtureData';
import logMissingMediaId from './helpers/logMissingMediaId';

jest.mock('./helpers/logMissingMediaId');
jest.mock('#lib/utilities/onClient');

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

it('should render the Media Message when the video is not available Canonical', () => {
  const { getByText } = render(UnavailableVideoCanonical);
  const mediaMessage = `This content is no longer available`;
  expect(logMissingMediaId).toHaveBeenCalledTimes(0);
  expect(getByText(mediaMessage)).toBeInTheDocument();
});

it('should render the Media Message when the video is not available AMP', () => {
  const { getByText } = render(UnavailableVideoAmp);
  const mediaMessage = `This content is no longer available`;
  expect(logMissingMediaId).toHaveBeenCalledTimes(0);
  expect(getByText(mediaMessage)).toBeInTheDocument();
});

it('should render the Media Message when there is no versionId', () => {
  jest.clearAllMocks();
  const { getByText } = render(VideoCanonicalNoVersionId);
  const mediaMessage = `This content is no longer available`;
  expect(logMissingMediaId).toHaveBeenCalledTimes(0);
  expect(getByText(mediaMessage)).toBeInTheDocument();
});

it('should render the Media Message when there is no blockId', () => {
  jest.clearAllMocks();
  const { getByText } = render(VideoAmpNoBlockId);
  const mediaMessage = `This content is no longer available`;
  expect(logMissingMediaId).toHaveBeenCalledTimes(1);
  expect(logMissingMediaId).toHaveBeenCalledWith({
    url: 'persian/afghanistan/2013/04/130429_l42_vid_afgh_corruption',
    assetType: 'legacy',
  });
  expect(getByText(mediaMessage)).toBeInTheDocument();
});

it('should not render the iframe when showPlaceholder is set to true', () => {
  render(VideoCanonicalWithCaption);

  expect(document.querySelector('iframe')).not.toBeInTheDocument();
});

it('should contain the noscript tag for no-JS scenarios ', () => {
  render(VideoCanonicalWithCaption);

  expect(document.querySelector('noscript')).toBeInTheDocument();
});
