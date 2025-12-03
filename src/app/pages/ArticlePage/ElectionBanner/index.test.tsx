import React from 'react';
import { render } from '#app/components/react-testing-library-with-providers';
import { Tag } from '#app/components/Metadata/types';
import { MetadataTaggings } from '#app/models/types/metadata';
import ElectionBanner from '.';

const MOCK_ELECTION_THING_ID = '647d5613-e0e2-4ef5-b0ce-b491de38bdbd';
const MOCK_IFRAME_LIVE_SRC =
  'include/vjafwest/1365-2024-us-presidential-election-banner/mundo/app';
const MOCK_IFRAME_DEV_SRC =
  'include/vjafwest/1365-2024-us-presidential-election-banner/develop/mundo/app';
const mockAboutTags = [
  { thingId: 'thing1' },
  { thingId: 'thing2' },
  { thingId: MOCK_ELECTION_THING_ID },
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
        let expectedIframeSrc = '';
        if (appEnv === 'live') {
          process.env.SIMORGH_INCLUDES_BASE_URL =
            'https://www.bbc.com/ws/includes';
          process.env.SIMORGH_INCLUDES_BASE_AMP_URL =
            'https://news.files.bbci.co.uk';
          expectedIframeSrc = MOCK_IFRAME_LIVE_SRC;
        }

        if (appEnv === 'test') {
          process.env.SIMORGH_INCLUDES_BASE_URL =
            'https://www.test.bbc.com/ws/includes';
          process.env.SIMORGH_INCLUDES_BASE_AMP_URL =
            'https://news.test.files.bbci.co.uk';
          expectedIframeSrc = MOCK_IFRAME_DEV_SRC;
        }

        process.env.SIMORGH_APP_ENV = appEnv;

        const { getByTestId } = render(
          <ElectionBanner aboutTags={mockAboutTags} taggings={mockTaggings} />,
          {
            toggles: {
              electionBanner: { enabled: true },
            },
            isAmp,
            service: 'mundo',
          },
        );

        const wrappingEl = getByTestId(ELEMENT_ID);

        const iframe = wrappingEl.querySelector('iframe, amp-iframe');
        const iframeSrc = iframe?.getAttribute('src');

        const domain = isAmp
          ? process.env.SIMORGH_INCLUDES_BASE_AMP_URL
          : process.env.SIMORGH_INCLUDES_BASE_URL;

        expect(iframeSrc).toEqual(
          `${domain}/${expectedIframeSrc}${isAmp ? '/amp' : ''}`,
        );
      },
    );

    it('should render ElectionBanner when aboutTags contain the correct thingLabel', () => {
      const { getByTestId } = render(
        <ElectionBanner aboutTags={mockAboutTags} taggings={mockTaggings} />,
        {
          toggles: {
            electionBanner: { enabled: true },
          },
          isAmp,
          service: 'mundo',
        },
      );

      expect(getByTestId(ELEMENT_ID)).toBeInTheDocument();
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
