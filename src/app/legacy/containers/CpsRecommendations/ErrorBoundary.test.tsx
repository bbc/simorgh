/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';

import { suppressPropWarnings } from '../../psammead/psammead-test-helpers/src';
import recommendationsData from '#data/mundo/recommendations/index.json';
import { render } from '#components/react-testing-library-with-providers';
import nodeLogger from '../../../../testHelpers/loggerMock';
import { RECOMMENDATIONS_MISSING_DATA } from '#lib/logger.const';

import CpsRecommendations from '.';

describe('Recommendations - Error Boundary', () => {
  it('should render recommendations when recommendation data is valid', () => {
    suppressPropWarnings(['optimizely', 'null']);

    const { getByRole } = render(
      <CpsRecommendations items={recommendationsData} />,
      {
        service: 'mundo',
        toggles: {
          cpsRecommendations: {
            enabled: true,
          },
        },
      },
    );

    const section = getByRole('region');

    expect(section).toBeInTheDocument();
  });

  it('should not render recommendations when recommendation data is invalid', () => {
    const invalidRecommendationsData = recommendationsData.map(
      (item, index) => {
        // Fake the last item to be invalid
        if (recommendationsData.length - 1 === index) {
          return {};
        }
        return item;
      },
    );

    const { queryByRole } = render(
      // @ts-ignore - Force invalid data
      <CpsRecommendations items={invalidRecommendationsData} />,
      {
        service: 'mundo',
        pathname: '/mundo/23263889',
        toggles: {
          cpsRecommendations: {
            enabled: true,
          },
        },
      },
    );

    const section = queryByRole('region');

    expect(section).not.toBeInTheDocument();

    expect(nodeLogger.error).toHaveBeenCalledWith(
      RECOMMENDATIONS_MISSING_DATA,
      {
        url: `/mundo/23263889`,
      },
    );
  });
});
