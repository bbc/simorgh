import { render } from '#components/react-testing-library-with-providers';
import {
  VideoCanonicalWithPlaceholder,
  VideoCanonicalNoPlaceholder,
  VideoLivePageCanonicalWithPlaceholder,
  VideoAmp,
  VideoCanonicalNoVersionId,
  VideoAmpNoBlockId,
  VideoCanonicalWithCaption,
  VideoAmpWithCaption,
  UnavailableVideoCanonical,
  UnavailableVideoAmp,
} from './fixtureData';
import logMissingMediaId from './helpers/logMissingMediaId';

jest.mock('./helpers/logMissingMediaId');
jest.mock('#lib/utilities/onClient');

describe('MediaPlayer', () => {
  it('Calls the canonical placeholder when platform is canonical and showPlaceholder is true', () => {
    const { container } = render(VideoCanonicalWithPlaceholder);
    expect(container).toMatchSnapshot();
  });

  it('Does not Call the canonical placeholder when platform is canonical but showPlaceholder is false', () => {
    const { container } = render(VideoCanonicalNoPlaceholder);
    expect(container).toMatchSnapshot();
  });

  it('Renders the AMP player when platform is AMP', () => {
    const { container } = render(VideoAmp);
    expect(container).toMatchSnapshot();
  });

  it('Calls the canonical placeholder when platform is canonical and showPlaceholder is true for a Live Page video clip', () => {
    const { container } = render(VideoLivePageCanonicalWithPlaceholder);
    expect(container).toMatchSnapshot();
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

it('should display the Canonical media caption for a Live Page media', () => {
  const { getByText } = render(VideoLivePageCanonicalWithPlaceholder);

  const mediaCaptionCanonical = getByText(
    'BBC launch trailer for We Know Our Place women\'s sport campaign"',
  );

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
