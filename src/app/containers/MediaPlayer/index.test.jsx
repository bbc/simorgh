import renderWithRouter from '#testHelpers/renderWithRouter';
import assertFirstChildIsNull from '#testHelpers/assertions';
import {
  VideoCanonicalWithPlaceholder,
  VideoCanonicalNoPlaceholder,
  VideoAmp,
  VideoCanonicalNoVersionId,
  VideoCanonicalToggledOff,
  VideoCanonicalWithCaption,
  VideoAmpWithCaption,
} from './fixtureData';

describe('MediaPlayer', () => {
  it('Calls the canonical placeholder when platform is canonical and showPlaceholder is true', () => {
    const { asFragment } = renderWithRouter(VideoCanonicalWithPlaceholder);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Does not Call the canonical placeholder when platform is canonical but showPlaceholder is false', () => {
    const { asFragment } = renderWithRouter(VideoCanonicalNoPlaceholder);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Renders the AMP player when platform is AMP', () => {
    const { asFragment } = renderWithRouter(VideoAmp);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Renders the canonical player with a caption', () => {
    const { asFragment } = renderWithRouter(VideoCanonicalWithCaption);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Renders the AMP player with a caption', () => {
    const { asFragment } = renderWithRouter(VideoAmpWithCaption);
    expect(asFragment()).toMatchSnapshot();
  });

  describe('Fails and returns early when', () => {
    it('there is no versionId', () => {
      const { container } = renderWithRouter(VideoCanonicalNoVersionId);
      assertFirstChildIsNull(container);
    });

    it('component is toggled off', () => {
      const { container } = renderWithRouter(VideoCanonicalToggledOff);
      assertFirstChildIsNull(container);
    });
  });
});
