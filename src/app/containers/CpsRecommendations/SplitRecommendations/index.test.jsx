/* eslint-disable react/prop-types */
import React from 'react';
import { render } from '@testing-library/react';

// contexts
import { ServiceContextProvider } from '#contexts/ServiceContext';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContext } from '#contexts/ToggleContext';

import hindiRecommendationsData from '#data/hindi/recommendations/index.json';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';

import SplitRecommendations from '.';

const defaultToggleState = {
  cpsRecommendations: {
    enabled: true,
  },
};

const PageWithContext = ({ items, toggles = defaultToggleState, ...props }) => {
  return (
    <ServiceContextProvider service="hindi">
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.co.uk"
        isAmp={false}
        pageType={STORY_PAGE}
        pathname="/service/085965"
        service="hindi"
        statusCode={200}
      >
        <ToggleContext.Provider
          value={{ toggleState: toggles, toggleDispatch: jest.fn() }}
        >
          <SplitRecommendations items={items} {...props} />
        </ToggleContext.Provider>
      </RequestContextProvider>
    </ServiceContextProvider>
  );
};

describe('Optimizely Experiments', () => {
  describe('003_hindi_experiment_feature', () => {
    describe('variation_1', () => {
      it('should have two parts with two recommendations each when four recommendations are in the data', async () => {
        const { getAllByRole } = render(
          <>
            <PageWithContext items={hindiRecommendationsData} part={1} />
            <PageWithContext items={hindiRecommendationsData} part={2} />
          </>,
        );

        const RecommendationsRegions = getAllByRole('region').filter(
          item =>
            item.getAttribute('aria-labelledby') === 'recommendations-heading',
        );
        expect(RecommendationsRegions).toHaveLength(2);

        const firstPart = RecommendationsRegions[0];
        expect(firstPart.getAttribute('aria-labelledby')).toEqual(
          'recommendations-heading',
        );

        const firstPartRecommendations =
          firstPart.firstChild.childNodes[2].children;
        expect(firstPartRecommendations).toHaveLength(2);

        const secondPart = RecommendationsRegions[1];
        expect(secondPart.getAttribute('aria-labelledby')).toEqual(
          'recommendations-heading',
        );

        const secondPartRecommendations =
          secondPart.firstChild.childNodes[2].children;
        expect(secondPartRecommendations).toHaveLength(2);
      });

      it('should have the skip link on both blocks of the recommendations', () => {
        const { container } = render(
          <>
            <PageWithContext
              items={hindiRecommendationsData}
              showForVariation="variation_1"
              part={1}
            />
            )
            <PageWithContext
              items={hindiRecommendationsData}
              showForVariation="variation_1"
              part={2}
            />
          </>,
        );

        const links = container.querySelectorAll('a');

        const firstRecommendationBlockSkipLink = links[0];
        const secondRecommendationBlockSkipLink = links[3];

        expect(firstRecommendationBlockSkipLink.getAttribute('href')).toEqual(
          '#end-of-recommendations-1',
        );
        expect(firstRecommendationBlockSkipLink.textContent).toEqual(
          'छोड़कर ये भी पढ़ें आगे बढ़ें',
        );

        expect(secondRecommendationBlockSkipLink.getAttribute('href')).toEqual(
          '#end-of-recommendations-2',
        );
        expect(secondRecommendationBlockSkipLink.textContent).toEqual(
          'छोड़कर कुछ और जानिए आगे बढ़ें',
        );
      });

      it('should have ये भी पढ़ें as title in the first block', () => {
        const { container } = render(
          <>
            <PageWithContext items={hindiRecommendationsData} part={1} />
          </>,
        );

        const [firstBlockHeading] = container.querySelectorAll(
          '#recommendations-heading',
        );

        expect(firstBlockHeading.textContent).toEqual('ये भी पढ़ें');
      });

      it('should have कुछ और जानिए as title in the second block', () => {
        const { container } = render(
          <>
            <PageWithContext
              items={hindiRecommendationsData}
              showForVariation="variation_1"
              part={1}
            />
            <PageWithContext
              items={hindiRecommendationsData}
              showForVariation="variation_1"
              part={2}
            />
          </>,
        );

        const [, secondBlockHeading] = container.querySelectorAll(
          '#recommendations-heading',
        );

        expect(secondBlockHeading.textContent).toEqual('कुछ और जानिए');
      });

      it('should have two parts with two recommendations each when more than four recommendations in the data', async () => {
        const FIVE_RECOMMENDATIONS_FIXTURE = [
          ...hindiRecommendationsData,
          {
            headlines: {
              shortHeadline:
                'कोविड-19 महामारीः तो सबसे ज़्यादा मौतों की वजह वायरस नहीं होगा',
              headline:
                'कोविड-19 महामारीः तो सबसे ज़्यादा मौतों की वजह वायरस नहीं होगा',
            },
            locators: {
              assetUri: '/hindi/vert-fut-53035307',
              cpsUrn: 'urn:bbc:content:assetUri:hindi/vert-fut-53035307',
              curie:
                'http://www.bbc.co.uk/asset/d581a169-118c-ac47-a910-7268cfb693de',
              assetId: '53035307',
            },
            summary:
              'कोरोना वायरस की वजह से भुखमरी के कगार पर पहुंच सकती है दुनिया.',
            timestamp: 1593077447000,
            language: 'hi',
            byline: {
              name: 'ज़ारिया गोर्वेट',
              title: ' बीबीसी फ्यूचर',
              persons: [
                {
                  name: 'Dan Egan',
                  function: '',
                },
              ],
            },
            passport: {
              category: {
                categoryId:
                  'http://www.bbc.co.uk/ontologies/applicationlogic-news/Feature',
                categoryName: 'Feature',
              },
              campaigns: [
                {
                  campaignId: '5a988e3739461b000e9dabfa',
                  campaignName: 'WS - Give me perspective',
                },
              ],
              taggings: [],
            },
            indexImage: {
              id: '113093139',
              subType: 'index',
              href: 'http://c.files.bbci.co.uk/16BD3/production/_113093139_694cda5f-d84d-4d58-8459-62f6b47cea3c.jpg',
              path: '/cpsprodpb/16BD3/production/_113093139_694cda5f-d84d-4d58-8459-62f6b47cea3c.jpg',
              height: 549,
              width: 976,
              altText: 'गोद में बच्चे को लिए मां',
              copyrightHolder: 'EPA',
              type: 'image',
            },
            id: 'urn:bbc:ares::asset:hindi/vert-fut-53035307',
            type: 'cps',
          },
        ];

        const { getAllByRole } = render(
          <>
            <PageWithContext items={FIVE_RECOMMENDATIONS_FIXTURE} part={1} />)
            <PageWithContext items={FIVE_RECOMMENDATIONS_FIXTURE} part={2} />
          </>,
        );

        const RecommendationsRegions = getAllByRole('region').filter(
          item =>
            item.getAttribute('aria-labelledby') === 'recommendations-heading',
        );
        expect(RecommendationsRegions).toHaveLength(2);

        const firstPart = RecommendationsRegions[0];
        expect(firstPart.getAttribute('aria-labelledby')).toEqual(
          'recommendations-heading',
        );

        const firstPartRecommendations =
          firstPart.firstChild.childNodes[2].children;
        expect(firstPartRecommendations).toHaveLength(2);

        const secondPart = RecommendationsRegions[1];
        expect(secondPart.getAttribute('aria-labelledby')).toEqual(
          'recommendations-heading',
        );

        const secondPartRecommendations =
          secondPart.firstChild.childNodes[2].children;
        expect(secondPartRecommendations).toHaveLength(2);
      });

      it('should have two parts, firstPart with two recommendations and secondPart with one recommendation when there are three recommendations in the data', async () => {
        const { getAllByRole } = render(
          <>
            <PageWithContext items={hindiRecommendationsData} part={1} />)
            <PageWithContext
              items={hindiRecommendationsData.slice(0, 3)}
              part={2}
            />
          </>,
        );

        const RecommendationsRegions = getAllByRole('region').filter(
          item =>
            item.getAttribute('aria-labelledby') === 'recommendations-heading',
        );
        expect(RecommendationsRegions).toHaveLength(2);

        const firstPart = RecommendationsRegions[0];
        expect(firstPart.getAttribute('aria-labelledby')).toEqual(
          'recommendations-heading',
        );

        const firstPartRecommendations =
          firstPart.firstChild.childNodes[2].children;
        expect(firstPartRecommendations).toHaveLength(2);

        const secondPart = RecommendationsRegions[1];
        expect(secondPart.getAttribute('aria-labelledby')).toEqual(
          'recommendations-heading',
        );

        const secondPartRecommendations =
          secondPart.firstChild.childNodes[2].children;
        expect(secondPartRecommendations).toHaveLength(1);
      });

      it('should have one part with two recommendations when only two recommendations are in the data', async () => {
        const { getAllByRole } = render(
          <>
            <PageWithContext
              items={hindiRecommendationsData.slice(0, 2)}
              part={1}
            />
            <PageWithContext
              items={hindiRecommendationsData.slice(0, 2)}
              part={2}
            />
          </>,
        );

        const RecommendationsRegions = getAllByRole('region').filter(
          item =>
            item.getAttribute('aria-labelledby') === 'recommendations-heading',
        );
        expect(RecommendationsRegions).toHaveLength(1);

        const firstPart = RecommendationsRegions[0];
        expect(firstPart.getAttribute('aria-labelledby')).toEqual(
          'recommendations-heading',
        );

        const firstPartRecommendations =
          firstPart.firstChild.childNodes[2].children;

        expect(firstPartRecommendations).toHaveLength(2);
      });

      it('should have the skip link on one block when only one block is shown', () => {
        const { container } = render(
          <>
            <PageWithContext
              items={hindiRecommendationsData}
              showForVariation="variation_1"
              part={1}
            />
          </>,
        );

        const links = container.querySelectorAll('a');

        const firstRecommendationBlockSkipLink = links[0];

        expect(firstRecommendationBlockSkipLink.getAttribute('href')).toEqual(
          '#end-of-recommendations-1',
        );
        expect(firstRecommendationBlockSkipLink.textContent).toEqual(
          'छोड़कर ये भी पढ़ें आगे बढ़ें',
        );
      });

      it('should have one part with one recommendation when only a single recommendation in the data', async () => {
        const { getAllByRole } = render(
          <>
            <PageWithContext
              items={hindiRecommendationsData.slice(0, 1)}
              part={1}
            />
          </>,
        );

        const RecommendationsRegions = getAllByRole('region').filter(
          item =>
            item.getAttribute('aria-labelledby') === 'recommendations-heading',
        );

        const firstPart = RecommendationsRegions[0];
        expect(RecommendationsRegions).toHaveLength(1);
        expect(firstPart.getAttribute('aria-labelledby')).toEqual(
          'recommendations-heading',
        );

        const firstPartRecommendations =
          firstPart.firstChild.childNodes[2].children;
        expect(firstPartRecommendations).toHaveLength(1);
      });

      it('should have no list and listitem when no recommendations are in the data', async () => {
        const { queryByRole } = render(<PageWithContext items={[]} part={1} />);

        expect(queryByRole('list')).not.toBeInTheDocument();
        expect(queryByRole('listitem')).not.toBeInTheDocument();
      });

      it('should have no recommendations-heading when recommendations are invalid data in the data', async () => {
        const { queryByRole } = render(
          <PageWithContext items="invalid data" part={1} />,
        );

        expect(queryByRole('list')).not.toBeInTheDocument();
        expect(queryByRole('listitem')).not.toBeInTheDocument();
      });
    });
  });
});
