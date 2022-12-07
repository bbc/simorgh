import React from 'react';
import { render, screen } from '@testing-library/react';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import * as clickTracking from '#hooks/useClickTrackerHandler';
import * as viewTracking from '#hooks/useViewTracker';
import { ServiceContextProvider } from '../../../../contexts/ServiceContext';
import TopStoriesSection from '.';
import { topStoriesList, topStoriesSingleItem } from './fixture';

// eslint-disable-next-line react/prop-types
const TopStoriesSectionFixture = ({ fixtureData, service = 'mundo' }) => (
  <ServiceContextProvider service={service}>
    <ToggleContextProvider>
      <TopStoriesSection content={fixtureData} />
    </ToggleContextProvider>
  </ServiceContextProvider>
);

describe('Optimo Top Stories Promo', () => {
  it('should return null if no data is passed', () => {
    const { container } = render(<TopStoriesSectionFixture fixtureData={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should render Related Content Ul when given More than one Related Content', () => {
    const { container } = render(
      <TopStoriesSectionFixture fixtureData={topStoriesList} />,
    );
    const listItems = screen.getAllByRole('listitem');
    const list = container.querySelector('ul');
    expect(listItems.length).toBe(3);
    expect(list).toBeInTheDocument();
  });

  it('should render a default title if translations are not available', () => {
    render(
      <TopStoriesSectionFixture fixtureData={topStoriesList} service="news" />,
    );

    const label = screen.getByText(`Top Stories`);
    expect(label).toBeInTheDocument();
  });

  it('should have a "region" role', () => {
    render(<TopStoriesSectionFixture fixtureData={topStoriesList} />);
    const region = screen.getByRole('region');
    expect(region).toBeInTheDocument();
  });

  it("should have a section labelled-by the section label's id", () => {
    render(<TopStoriesSectionFixture fixtureData={topStoriesList} />);
    const regionLabelId = screen
      .getByRole('region')
      .getAttribute('aria-labelledBy');
    const LabelLabelId = screen
      .getByText('Principales noticias')
      .getAttribute('id');
    expect(regionLabelId).toBe(LabelLabelId);
  });

  it('should render RelatedContent component without <ul> and <li> when given single item in collection', () => {
    render(<TopStoriesSectionFixture fixtureData={topStoriesSingleItem} />);
    const listItems = screen.queryAllByRole('listitem');
    const list = screen.queryByRole('list');

    expect(listItems.length).toBe(0);
    expect(list).toBeNull();
  });
});

describe('Event Tracking', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should implement 3 BLOCK level click trackers(1 for each promo item) and 0 link level click trackers', () => {
    const expected = {
      componentName: 'top-stories',
      preventNavigation: true,
    };
    const clickTrackerSpy = jest.spyOn(clickTracking, 'default');

    render(<TopStoriesSectionFixture fixtureData={topStoriesList} />);

    const [
      [blockLevelTrackingItem1],
      [linkLevelTrackingItem1],

      [blockLevelTrackingItem2],
      [linkLevelTrackingItem2],

      [blockLevelTrackingItem3],
      [linkLevelTrackingItem3],
    ] = clickTrackerSpy.mock.calls;

    expect(blockLevelTrackingItem1).toEqual(expected);
    expect(linkLevelTrackingItem1).toEqual({});

    expect(blockLevelTrackingItem2).toEqual(expected);
    expect(linkLevelTrackingItem2).toEqual({});

    expect(blockLevelTrackingItem3).toEqual(expected);
    expect(linkLevelTrackingItem3).toEqual({});
  });

  it('should implement 1 BLOCK level view tracker', () => {
    const expected = {
      componentName: 'top-stories',
    };
    const viewTrackerSpy = jest.spyOn(viewTracking, 'default');

    render(<TopStoriesSectionFixture fixtureData={topStoriesList} />);

    const [[blockLevelTracking]] = viewTrackerSpy.mock.calls;

    expect(blockLevelTracking).toEqual(expected);
  });

  it('should call view tracker once when multiple items are present', () => {
    const viewTrackerSpy = jest.spyOn(viewTracking, 'default');

    render(<TopStoriesSectionFixture fixtureData={topStoriesList} />);

    expect(viewTrackerSpy).toHaveBeenCalledTimes(1);
  });
});
