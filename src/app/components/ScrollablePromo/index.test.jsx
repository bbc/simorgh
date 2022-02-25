/* eslint-disable react/prop-types */
import React from 'react';
import { render } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import * as viewTracking from '#hooks/useViewTracker';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { ServiceContext } from '#contexts/ServiceContext';
import * as clickTracking from '#hooks/useClickTrackerHandler';
import mundoRecommendationsData from '#pages/StoryPage/fixtureData/recommendations.ltr.json';
import {
  threeLinks,
  oneLinkOnly,
  moreThanThreeLinks,
} from './helpers/fixtureData';
import ScrollablePromo from '.';
import { edOjA, edOjB } from './fixtures';

const ScrollablePromoWithContext = ({
  blocks,
  blockGroupIndex,
  isRecommendationType,
  translations,
  service,
}) => (
  <ToggleContextProvider>
    <ServiceContext.Provider
      value={{
        service,
        translations,
      }}
    >
      <ScrollablePromo
        blocks={blocks}
        blockGroupIndex={blockGroupIndex}
        isRecommendationType={isRecommendationType}
      />
    </ServiceContext.Provider>
  </ToggleContextProvider>
);

describe('ScrollablePromo', () => {
  it('should return null if no data is passed', () => {
    const { container } = render(
      <ScrollablePromoWithContext blocks={{}} service="news" />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('should render max 3 promo items', () => {
    const { getAllByRole } = render(
      <ScrollablePromoWithContext blocks={moreThanThreeLinks} service="news" />,
    );
    expect(getAllByRole('listitem').length).toEqual(3);
  });

  it('should render single promo item', () => {
    const { container } = render(
      <ScrollablePromoWithContext blocks={oneLinkOnly} service="news" />,
    );
    expect(container.childElementCount).toEqual(1);
  });

  it('should not render a list when there is only one promo', () => {
    const { queryByRole } = render(
      <ScrollablePromoWithContext blocks={oneLinkOnly} service="news" />,
    );

    expect(queryByRole('list')).not.toBeInTheDocument();
    expect(queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('should render unordered list if more than 1 item', () => {
    const { queryByRole, getAllByRole } = render(
      <ScrollablePromoWithContext blocks={threeLinks} service="news" />,
    );
    expect(queryByRole('list')).toBeInTheDocument();
    expect(getAllByRole('listitem').length).toEqual(3);
  });

  describe('event tracking in editorial onward journeys', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call the view tracking hook with the correct params with one editorial onward journey', () => {
      const viewTrackerSpy = jest.spyOn(viewTracking, 'default');

      render(
        <ScrollablePromoWithContext
          blocks={edOjA.model.blocks}
          blockGroupIndex={1}
          service="news"
        />,
      );

      expect(viewTrackerSpy).toHaveBeenCalledWith({
        componentName: 'edoj1',
        format: 'CHD=edoj',
      });
    });

    it('should call the view tracking hook with the correct params with multiple editorial onward journeys', () => {
      const viewTrackerSpy = jest.spyOn(viewTracking, 'default');
      render(
        <ScrollablePromoWithContext
          blocks={edOjA.model.blocks}
          blockGroupIndex={1}
          service="news"
        />,
      );
      render(
        <ScrollablePromoWithContext
          blocks={edOjB.model.blocks}
          blockGroupIndex={2}
          service="news"
        />,
      );

      expect(viewTrackerSpy).toHaveBeenCalledTimes(2);
      expect(viewTrackerSpy).toHaveBeenCalledWith({
        componentName: 'edoj1',
        format: 'CHD=edoj',
      });
      expect(viewTrackerSpy).toHaveBeenCalledWith({
        componentName: 'edoj2',
        format: 'CHD=edoj',
      });
    });

    it('should call the click tracking hook with one editorial onward journey', () => {
      const clickTrackerSpy = jest.spyOn(clickTracking, 'default');
      render(
        <ScrollablePromoWithContext
          blocks={edOjA.model.blocks}
          blockGroupIndex={1}
          service="news"
        />,
      );

      expect(clickTrackerSpy).toHaveBeenCalledWith({
        componentName: 'edoj1',
        format: 'CHD=edoj',
      });
    });

    it('should call the click tracking hook with multiple editorial onward journeys', () => {
      const clickTrackerSpy = jest.spyOn(clickTracking, 'default');
      render(
        <ScrollablePromoWithContext
          blocks={edOjA.model.blocks}
          blockGroupIndex={1}
          service="news"
        />,
      );
      render(
        <ScrollablePromoWithContext
          blocks={edOjB.model.blocks}
          blockGroupIndex={2}
          service="news"
        />,
      );

      expect(clickTrackerSpy).toHaveBeenCalledTimes(2);
      expect(clickTrackerSpy).toHaveBeenCalledWith({
        componentName: 'edoj1',
        format: 'CHD=edoj',
      });
      expect(clickTrackerSpy).toHaveBeenCalledWith({
        componentName: 'edoj2',
        format: 'CHD=edoj',
      });
    });
  });

  it('it should not be a list if a single card is displayed (a11y)', () => {
    const { queryByRole } = render(
      <ScrollablePromoWithContext blocks={oneLinkOnly} service="news" />,
    );
    expect(queryByRole('list')).toBeNull();
  });
});

describe('recommendationEOJ', () => {
  it('should render recommendation variation when recommendation && recommendation data are passed', () => {
    const { getAllByRole, queryByRole, queryByText } = render(
      <ScrollablePromoWithContext
        blocks={mundoRecommendationsData}
        isRecommendationType
        service="news"
      />,
    );
    expect(getAllByRole('listitem').length).toEqual(3);
    expect(queryByRole('region')).toBeInTheDocument();
    expect(queryByText('Related stories')).toBeInTheDocument();
  });

  it('should render translated title', () => {
    const { queryByText } = render(
      <ScrollablePromoWithContext
        blocks={mundoRecommendationsData}
        isRecommendationType
        service="mundo"
        translations={{ relatedContent: 'contenido relacionado' }}
      />,
    );
    expect(queryByText('contenido relacionado')).toBeInTheDocument();
  });

  it('should have a section with a "region" role (a11y)', () => {
    const { getByRole } = render(
      <ScrollablePromoWithContext
        blocks={mundoRecommendationsData}
        isRecommendationType
        service="news"
      />,
    );
    expect(getByRole('region', { elementType: 'section' })).toBeInTheDocument();
  });

  it('the section with role region should be correctly labelledBy the strong element (a11y)', () => {
    const { getByRole } = render(
      <ScrollablePromoWithContext
        blocks={mundoRecommendationsData}
        isRecommendationType
        service="news"
      />,
    );
    const region = getByRole('region');
    expect(region.getAttribute('aria-labelledBy')).toEqual(
      'recommendations-heading',
    );
  });
});
