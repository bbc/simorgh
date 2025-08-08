import React from 'react';
import isLive from '#lib/utilities/isLive';
import * as viewTracking from '#hooks/useViewTracker';
import * as clickTracking from '#hooks/useClickTrackerHandler';
import { render, screen } from '../react-testing-library-with-providers';
import { topStoriesBlocks } from './helpers/fixtureData';
import TopBarOJs from '.';

jest.mock('#lib/utilities/isLive', () => jest.fn());

describe('TopBarOJs', () => {
  it('it should display Top Stories label', () => {
    const { getByText, queryByText } = render(
      <TopBarOJs blocks={topStoriesBlocks} />,
    );
    expect(getByText('Top Stories')).toBeVisible();
    expect(queryByText('Popular Reads')).toBeNull();
  });

  it('it should display 3 promo items with Top Stories', () => {
    const { getAllByRole } = render(<TopBarOJs blocks={topStoriesBlocks} />);
    expect(getAllByRole('listitem')).toHaveLength(3);
  });

  it('it should display Top Stories content', () => {
    const { getAllByRole } = render(<TopBarOJs blocks={topStoriesBlocks} />);
    const expectedFirstHeadline =
      topStoriesBlocks[0].headlines.promoHeadline.blocks[0].model.blocks[0]
        .model.text;
    expect(getAllByRole('listitem')[0]).toHaveTextContent(
      expectedFirstHeadline,
    );
  });

  it('should return null if no data is passed', () => {
    const { container } = render(<TopBarOJs blocks={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should not render TopBarOJs component when isLive is true', () => {
    isLive.mockReturnValue(true);
    const { container } = render(
      <>{!isLive() && <TopBarOJs blocks={topStoriesBlocks} />}</>,
    );

    expect(
      screen.queryByTestId('top-bar-onward-journeys'),
    ).not.toBeInTheDocument();
    expect(container).toBeEmptyDOMElement();
    expect(isLive()).toBe(true);
  });

  it('should render TopBarOJs component when isLive is false', () => {
    isLive.mockReturnValue(false);
    const { container } = render(
      <>{!isLive() && <TopBarOJs blocks={topStoriesBlocks} />}</>,
    );

    expect(screen.queryByTestId('top-bar-onward-journeys')).toBeInTheDocument();
    expect(container).not.toBeEmptyDOMElement();
    expect(isLive()).toBe(false);
  });
});
