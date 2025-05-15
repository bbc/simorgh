import React from 'react';
import { render } from '#app/components/react-testing-library-with-providers';
import { Tag } from '#app/components/Metadata/types';
import { MetadataTaggings } from '#app/models/types/metadata';
import BANNER_CONFIG from './config';
import ElectionBanner from '.';

const mockAboutTags = [
  { thingId: 'thing1' },
  { thingId: 'thing2' },
  { thingId: BANNER_CONFIG.usElectionThingId },
] as Tag[];

const mockTaggings: MetadataTaggings = [
  {
    predicate: 'http://www.bbc.co.uk/ontologies/bbc/infoClass',
    value:
      'http://www.bbc.co.uk/things/0db2b959-cbf8-4661-965f-050974a69bb5#id',
  },
  {
    predicate: 'http://www.bbc.co.uk/ontologies/bbc/assetType',
    value:
      'http://www.bbc.co.uk/things/22ea958e-2004-4f34-80a7-bf5acad52f6f#id',
  },
  {
    predicate: 'http://www.bbc.co.uk/ontologies/creativework/about',
    value:
      'http://www.bbc.co.uk/things/647d5613-e0e2-4ef5-b0ce-b491de38bdbd#id',
  },
];

const ELEMENT_ID = 'election-banner';

describe('ElectionBanner', () => {
  const originalEnv = process.env;

  afterEach(() => {
    process.env = originalEnv;
  });

  it('should not render ElectionBanner when isLite is true', () => {
    const { queryByTestId } = render(
      <ElectionBanner aboutTags={mockAboutTags} taggings={mockTaggings} />,
      { isLite: true },
    );

    expect(queryByTestId(ELEMENT_ID)).not.toBeInTheDocument();
  });

  describe.each(['canonical', 'amp'])('%s', platform => {
    const isAmp = platform === 'amp';

    it.each(['live', 'test'])(
      'should use the correct URL for the iframe when SIMORGH_APP_ENV is "%s"',
      appEnv => {
        if (appEnv === 'live') {
          process.env.SIMORGH_INCLUDES_BASE_URL =
            'https://www.bbc.com/ws/includes';
          process.env.SIMORGH_INCLUDES_BASE_AMP_URL =
            'https://news.files.bbci.co.uk';
        }

        if (appEnv === 'test') {
          process.env.SIMORGH_INCLUDES_BASE_URL =
            'https://www.test.bbc.com/ws/includes';
          process.env.SIMORGH_INCLUDES_BASE_AMP_URL =
            'https://news.test.files.bbci.co.uk';
        }

        process.env.SIMORGH_APP_ENV = appEnv;

        const { getByTestId } = render(
          <ElectionBanner aboutTags={mockAboutTags} taggings={mockTaggings} />,
          {
            toggles: { electionBanner: { enabled: true } },
            isAmp,
          },
        );

        const wrappingEl = getByTestId(ELEMENT_ID);

        const iframe = wrappingEl.querySelector('iframe, amp-iframe');
        const iframeSrc = iframe?.getAttribute('src');

        const configSrc = BANNER_CONFIG[
          appEnv === 'live' ? 'iframeSrc' : 'iframeDevSrc'
        ].replace('{service}', 'english');

        const domain = isAmp
          ? process.env.SIMORGH_INCLUDES_BASE_AMP_URL
          : process.env.SIMORGH_INCLUDES_BASE_URL;

        expect(iframeSrc).toEqual(
          `${domain}/${configSrc}${isAmp ? '/amp' : ''}`,
        );
      },
    );

    it('should render ElectionBanner when aboutTags contain the correct thingLabel', () => {
      const { getByTestId } = render(
        <ElectionBanner aboutTags={mockAboutTags} taggings={mockTaggings} />,
        {
          toggles: { electionBanner: { enabled: true } },
          isAmp,
        },
      );

      expect(getByTestId(ELEMENT_ID)).toBeInTheDocument();
    });

    it('should render the correct VJ URL for Turkce service', () => {
      const { getByTestId } = render(
        <ElectionBanner aboutTags={mockAboutTags} taggings={mockTaggings} />,
        {
          toggles: { electionBanner: { enabled: true } },
          isAmp,
          service: 'turkce',
        },
      );

      const wrappingEl = getByTestId(ELEMENT_ID);

      const iframe = wrappingEl.querySelector('iframe, amp-iframe');
      const iframeSrc = iframe?.getAttribute('src');

      expect(iframeSrc).not.toContain('/turkce/');
      expect(iframeSrc).toContain('turkish');
    });

    it('should render the correct VJ URL for News service', () => {
      const { getByTestId } = render(
        <ElectionBanner aboutTags={mockAboutTags} taggings={mockTaggings} />,
        {
          toggles: { electionBanner: { enabled: true } },
          isAmp,
          service: 'news',
        },
      );

      const wrappingEl = getByTestId(ELEMENT_ID);

      const iframe = wrappingEl.querySelector('iframe, amp-iframe');
      const iframeSrc = iframe?.getAttribute('src');

      expect(iframeSrc).not.toContain('/news/');
      expect(iframeSrc).toContain('english');
    });

    it('should not render ElectionBanner when taggings contain the editorialSensitivityId', () => {
      const { queryByTestId } = render(
        <ElectionBanner
          aboutTags={mockAboutTags}
          taggings={[
            ...mockTaggings,
            {
              predicate:
                'http://www.bbc.co.uk/ontologies/bbc/editorialSensitivity',
              value:
                'http://www.bbc.co.uk/things/f2b5dd0e-dda0-454c-893d-792d46ff48c3#id',
            },
          ]}
        />,
        {
          toggles: { electionBanner: { enabled: true } },
          isAmp,
        },
      );

      expect(queryByTestId(ELEMENT_ID)).not.toBeInTheDocument();
    });

    it('should not render ElectionBanner when aboutTags do not contain the correct thingLabel', () => {
      const { queryByTestId } = render(
        <ElectionBanner
          aboutTags={[{ thingLabel: 'thing1' }] as Tag[]}
          taggings={mockTaggings}
        />,
        { isAmp },
      );

      expect(queryByTestId(ELEMENT_ID)).not.toBeInTheDocument();
    });

    it('should not render ElectionBanner when aboutTags is empty', () => {
      const { queryByTestId } = render(
        <ElectionBanner aboutTags={[]} taggings={mockTaggings} />,
        {
          isAmp,
        },
      );

      expect(queryByTestId(ELEMENT_ID)).not.toBeInTheDocument();
    });

    it('should not render ElectionBanner when toggle is disabled', () => {
      const { queryByTestId } = render(
        <ElectionBanner aboutTags={mockAboutTags} taggings={mockTaggings} />,
        {
          toggles: { electionBanner: { enabled: false } },
          isAmp,
        },
      );

      expect(queryByTestId(ELEMENT_ID)).not.toBeInTheDocument();
    });

    it('should not render ElectionBanner when toggle is null', () => {
      const { queryByTestId } = render(
        <ElectionBanner aboutTags={mockAboutTags} taggings={mockTaggings} />,
        {
          toggles: {
            someOtherToggle: { enabled: true },
          },
          isAmp,
        },
      );

      expect(queryByTestId(ELEMENT_ID)).not.toBeInTheDocument();
    });
  });
});
