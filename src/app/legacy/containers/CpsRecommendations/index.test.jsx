import React from 'react';
import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContext } from '#contexts/ToggleContext';
import ltrRecommendationsData from '#data/mundo/recommendations/index.json';
import rtlRecommendationsData from '#data/arabic/recommendations/index.json';
import { STORY_PAGE } from '#app/routes/utils/pageTypes';
import { suppressPropWarnings } from '#psammead/psammead-test-helpers/src';
import { render } from '../../../components/react-testing-library-with-providers';
import { ServiceContextProvider } from '../../../contexts/ServiceContext';

import CpsRecommendations from '.';

const parentColumns = {
  group0: 8,
  group1: 8,
  group2: 8,
  group3: 8,
  group4: 12,
  group5: 12,
};

const renderContainer = (items, service, toggleEnabled) => {
  const toggleState = {
    cpsRecommendations: {
      enabled: toggleEnabled,
    },
  };
  return render(
    <ServiceContextProvider service={service}>
      <RequestContextProvider
        bbcOrigin="https://www.test.bbc.co.uk"
        isAmp={false}
        pageType={STORY_PAGE}
        pathname="/service/085965"
        service={service}
        statusCode={200}
      >
        <ToggleContext.Provider
          value={{ toggleState, toggleDispatch: jest.fn() }}
        >
          <CpsRecommendations items={items} parentColumns={parentColumns} />
        </ToggleContext.Provider>
      </RequestContextProvider>
    </ServiceContextProvider>,
  );
};

describe('CpsRecommendations', () => {
  suppressPropWarnings(['optimizely', 'null']);

  it('should not render when cpsRecommendations toggle is disabled', () => {
    const toggleEnabled = false;

    const { container } = renderContainer(
      ltrRecommendationsData,
      'mundo',
      toggleEnabled,
    );
    expect(container).toMatchSnapshot();
  });
  it('should not render when the service does not support recommendations', () => {
    const toggleEnabled = true;

    const { container } = renderContainer(
      ltrRecommendationsData,
      'news',
      toggleEnabled,
    );
    expect(container).toMatchSnapshot();
  });

  it('should contain a region landmark role', () => {
    const toggleEnabled = true;

    const { getByRole } = renderContainer(
      ltrRecommendationsData,
      'mundo',
      toggleEnabled,
    );

    const section = getByRole('region');
    expect(section.getAttribute('aria-labelledby')).toBe(
      'recommendations-heading',
    );
  });

  it('should contain a link to skip to end of recommendations component', () => {
    const toggleEnabled = true;

    const { container } = renderContainer(
      ltrRecommendationsData,
      'mundo',
      toggleEnabled,
    );

    const links = container.querySelectorAll('a');
    const skipLink = links[0];

    expect(skipLink.getAttribute('href')).toEqual('#end-of-recommendations');
    expect(skipLink.textContent).toEqual(
      'Saltar Recomendamos y continuar leyendo',
    );
  });

  it('should not render a list when there is only one promo', () => {
    const toggleEnabled = true;
    const { queryByRole } = renderContainer(
      [ltrRecommendationsData[0]],
      'mundo',
      toggleEnabled,
    );

    expect(queryByRole('list')).not.toBeInTheDocument();
    expect(queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('should not render when there is no recommendations data', () => {
    const toggleEnabled = true;

    const { container } = renderContainer([], 'mundo', toggleEnabled);
    expect(container).toMatchSnapshot();
  });

  describe('should render when cpsRecommendations toggle is enabled and the service supports recommendations', () => {
    const toggleEnabled = true;

    it('for multiple items', () => {
      const { container } = renderContainer(
        ltrRecommendationsData,
        'mundo',
        toggleEnabled,
      );
      expect(container).toMatchSnapshot();
    });
    it('for a single item', () => {
      const { container } = renderContainer(
        [ltrRecommendationsData[0]],
        'mundo',
        toggleEnabled,
      );
      expect(container).toMatchSnapshot();
    });
    it('for rtl service', () => {
      const { container } = renderContainer(
        rtlRecommendationsData,
        'arabic',
        toggleEnabled,
      );
      expect(container).toMatchSnapshot();
    });
  });
});
