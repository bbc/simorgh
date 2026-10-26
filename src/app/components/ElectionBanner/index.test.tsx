import type { ComponentProps } from 'react';
import {
  render,
  waitFor,
} from '#app/components/react-testing-library-with-providers';
import { Tag } from '#app/components/Metadata/types';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { ServiceConfig } from '#app/models/types/serviceConfig';
import ElectionBanner, { DEFAULT_HEIGHTS_AP } from '.';

const MOCK_ELECTION_THING_ID = '647d5613-e0e2-4ef5-b0ce-b491de38bdbd';
const MOCK_TITLE = 'Elecciones de mitad de período en Estados Unidos 2026';
const MOCK_IFRAME_LIVE_SRC =
  'include/vjafwest/1365-2024-us-presidential-election-banner/mundo/app';
const MOCK_IFRAME_DEV_SRC =
  'include/vjafwest/1365-2024-us-presidential-election-banner/develop/mundo/app';
const MOCK_ASSOC_PRESS_IFRAME_SRC =
  'https://interactives.apelections.org/election-results/customers/layouts/organization-layouts/published/108620/33021.html';
const ASSOC_PRESS_RESIZE_SCRIPT_SRC =
  'https://interactives.apelections.org/election-results/assets/microsite/resizeClient.js';
const mockAboutTags = [
  { thingId: 'thing1' },
  { thingId: 'thing2' },
  { thingId: MOCK_ELECTION_THING_ID, thingLabel: 'Election banner' },
] as Tag[];

const ELEMENT_ID = 'election-banner';

const mockServiceContext = {
  electionBanner: {
    title: MOCK_TITLE,
    electionThingIds: [MOCK_ELECTION_THING_ID],
    iframeSrc: MOCK_IFRAME_LIVE_SRC,
    iframeDevSrc: MOCK_IFRAME_DEV_SRC,
  },
} as ServiceConfig;

const mockServiceContextWithoutTitle = {
  electionBanner: {
    electionThingIds: [MOCK_ELECTION_THING_ID],
    iframeSrc: MOCK_IFRAME_LIVE_SRC,
    iframeDevSrc: MOCK_IFRAME_DEV_SRC,
  },
} as ServiceConfig;

const mockAssocPressServiceContext = {
  electionBanner: {
    title: MOCK_TITLE,
    electionThingIds: [MOCK_ELECTION_THING_ID],
    iframeSrc: MOCK_IFRAME_LIVE_SRC,
    iframeDevSrc: MOCK_IFRAME_DEV_SRC,
    assocPressIframeSrc: MOCK_ASSOC_PRESS_IFRAME_SRC,
  },
} as ServiceConfig;

const renderElectionBanner = (
  props: ComponentProps<typeof ElectionBanner>,
  options?: Parameters<typeof render>[1],
  serviceContext: ServiceConfig = mockServiceContext,
) =>
  render(
    <ServiceContext.Provider value={serviceContext}>
      <ElectionBanner {...props} />
    </ServiceContext.Provider>,
    options,
  );

describe('ElectionBanner', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv, SIMORGH_APP_ENV: 'test' };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should not render when isLite is true', () => {
    const { queryByTestId } = renderElectionBanner({}, { isLite: true });

    expect(queryByTestId(ELEMENT_ID)).not.toBeInTheDocument();
  });

  it('should not render when electionBanner is not configured', () => {
    const { queryByTestId } = renderElectionBanner(
      {},
      undefined,
      {} as ServiceConfig,
    );

    expect(queryByTestId(ELEMENT_ID)).not.toBeInTheDocument();
  });

  describe.each(['canonical', 'amp'])('%s', platform => {
    const isAmp = platform === 'amp';

    it.each(['local', 'test'])(
      'should use the correct URL for the iframe when SIMORGH_APP_ENV is "%s"',
      appEnv => {
        process.env.SIMORGH_INCLUDES_BASE_URL =
          'https://www.test.bbc.com/ws/includes';
        process.env.SIMORGH_INCLUDES_BASE_AMP_URL =
          'https://news.test.files.bbci.co.uk';
        process.env.SIMORGH_APP_ENV = appEnv;

        const { getByTestId } = renderElectionBanner(
          { aboutTags: mockAboutTags },
          { isAmp, service: 'mundo' },
        );

        const wrappingEl = getByTestId(ELEMENT_ID);

        const iframe = wrappingEl.querySelector('iframe, amp-iframe');
        const iframeSrc = iframe?.getAttribute('src');

        const domain = isAmp
          ? process.env.SIMORGH_INCLUDES_BASE_AMP_URL
          : process.env.SIMORGH_INCLUDES_BASE_URL;

        expect(iframeSrc).toEqual(
          `${domain}/${MOCK_IFRAME_DEV_SRC}${isAmp ? '/amp' : ''}`,
        );
      },
    );

    it.each([
      ['VJ', mockServiceContext],
      ['Associated Press', mockAssocPressServiceContext],
    ])('should not render the %s banner in Live', (_, serviceContext) => {
      process.env.SIMORGH_APP_ENV = 'live';

      const { container } = renderElectionBanner(
        { aboutTags: mockAboutTags },
        { isAmp, service: 'mundo' },
        serviceContext,
      );

      expect(container).toBeEmptyDOMElement();
    });

    it('should use the matching aboutTag as the banner title when provided', () => {
      const { getByTestId } = renderElectionBanner(
        { aboutTags: mockAboutTags },
        { isAmp, service: 'mundo' },
      );

      const wrappingEl = getByTestId(ELEMENT_ID);
      const iframe = wrappingEl.querySelector('iframe, amp-iframe');

      expect(iframe).toHaveAttribute('title', 'Election banner');
    });

    it('should fall back to the configured banner title when no aboutTag matches', () => {
      const { getByTestId } = renderElectionBanner(
        { aboutTags: [{ thingLabel: 'thing1' }] as Tag[] },
        { isAmp, service: 'mundo' },
      );

      const wrappingEl = getByTestId(ELEMENT_ID);
      const iframe = wrappingEl.querySelector('iframe, amp-iframe');

      expect(iframe).toHaveAttribute('title', MOCK_TITLE);
    });

    it('should fall back to the generic banner title when nothing else matches', () => {
      const { getByTestId } = renderElectionBanner(
        {},
        { isAmp, service: 'mundo' },
        mockServiceContextWithoutTitle,
      );

      const wrappingEl = getByTestId(ELEMENT_ID);
      const iframe = wrappingEl.querySelector('iframe, amp-iframe');

      expect(iframe).toHaveAttribute('title', 'Election banner');
    });
  });

  describe('Association Press', () => {
    const renderAssocPressBanner = (isAmp: boolean) =>
      renderElectionBanner(
        { aboutTags: mockAboutTags },
        { isAmp, service: 'mundo' },
        mockAssocPressServiceContext,
      );

    it('should render the Association Press iframe on canonical', async () => {
      const { getByTestId } = renderAssocPressBanner(false);
      const wrappingEl = getByTestId(ELEMENT_ID);
      const iframe = wrappingEl.querySelector('iframe');

      expect(iframe).toHaveAttribute('src', MOCK_ASSOC_PRESS_IFRAME_SRC);
      expect(iframe).toHaveClass('ap-embed');
      expect(iframe).toHaveAttribute('title', 'Election banner');
      expect(iframe).not.toHaveAttribute('height');
      await waitFor(() => {
        expect(
          document.querySelector(
            `script[src="${ASSOC_PRESS_RESIZE_SCRIPT_SRC}"]`,
          ),
        ).toBeInTheDocument();
      });
    });

    it('should render the Association Press iframe on AMP', () => {
      const { getByTestId } = renderAssocPressBanner(true);
      const wrappingEl = getByTestId(ELEMENT_ID);
      const iframe = wrappingEl.querySelector('amp-iframe');

      expect(iframe).toHaveAttribute('src', MOCK_ASSOC_PRESS_IFRAME_SRC);
      expect(iframe).toHaveAttribute('height', `${DEFAULT_HEIGHTS_AP.mobile}`);
      expect(iframe).toHaveAttribute('layout', 'fixed-height');
      expect(iframe).not.toHaveAttribute('width');
    });

    it('should render the title from service config on canonical', () => {
      const { getByText } = renderAssocPressBanner(false);

      const title = getByText(MOCK_TITLE);

      expect(title).toBeInTheDocument();
    });

    it('should render the title from service config on AMP', () => {
      const { getByText } = renderAssocPressBanner(true);

      const title = getByText(MOCK_TITLE);

      expect(title).toBeInTheDocument();
    });
  });

  describe('overrideClassnames', () => {
    it('should apply a consumer-provided wrapper override class for the VJ banner', () => {
      const { getByTestId } = renderElectionBanner(
        { overrideClassnames: { wrapper: 'custom' } },
        { service: 'mundo' },
      );

      expect(getByTestId(ELEMENT_ID)).toHaveClass('custom');
    });

    it('should apply a consumer-provided wrapper override class for the Associated Press banner', () => {
      const { getByTestId } = renderElectionBanner(
        { overrideClassnames: { assocPressWrapper: 'custom' } },
        { service: 'mundo' },
        mockAssocPressServiceContext,
      );

      expect(getByTestId(ELEMENT_ID)).toHaveClass('custom');
    });

    it('should apply a consumer-provided iframe override class', () => {
      const { getByTestId } = renderElectionBanner(
        { overrideClassnames: { iframe: 'custom' } },
        { service: 'mundo' },
        mockAssocPressServiceContext,
      );

      const iframe = getByTestId(ELEMENT_ID).querySelector('iframe');

      expect(iframe).toHaveClass('custom');
    });
  });
});
