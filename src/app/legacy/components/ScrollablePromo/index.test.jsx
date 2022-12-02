import React from 'react';
import { render } from '@testing-library/react';
import { shouldMatchSnapshot } from '#psammead/psammead-test-helpers/src';
import * as viewTracking from '#hooks/useViewTracker';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import * as clickTracking from '#hooks/useClickTrackerHandler';
import { ServiceContext } from '../../../contexts/ServiceContext';
import {
  threeLinks,
  oneLinkOnly,
  oneLinkWithNoTitle,
  moreThanThreeLinks,
} from './helpers/fixtureData';
import ScrollablePromo from '.';
import { edOjA, edOjB } from './fixtures';

// eslint-disable-next-line react/prop-types
const ScrollablePromoWithContext = ({ blocks, blockGroupIndex }) => (
  <ToggleContextProvider>
    <ServiceContext.Provider value={{ service: 'news' }}>
      <ScrollablePromo blocks={blocks} blockGroupIndex={blockGroupIndex} />
    </ServiceContext.Provider>
  </ToggleContextProvider>
);

describe('ScrollablePromo', () => {
  it('should return null if no data is passed', () => {
    const { container } = render(<ScrollablePromoWithContext blocks={{}} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('should render max 3 promo items', () => {
    const { getAllByRole } = render(
      <ScrollablePromoWithContext blocks={moreThanThreeLinks} />,
    );
    expect(getAllByRole('listitem').length).toEqual(3);
  });

  it('should render single promo item', () => {
    const { container } = render(
      <ScrollablePromoWithContext blocks={oneLinkOnly} />,
    );
    expect(container.childElementCount).toEqual(1);
  });

  it('should render single promo item with a title', () => {
    const { container, getByTestId } = render(
      <ScrollablePromoWithContext blocks={oneLinkOnly} />,
    );
    expect(container.childElementCount).toEqual(1);
    expect(getByTestId('eoj-recommendations-heading')).toBeInTheDocument();
  });

  it('should render single promo item without a title', () => {
    const { container, queryByTestId } = render(
      <ScrollablePromoWithContext blocks={oneLinkWithNoTitle} />,
    );
    expect(container.childElementCount).toEqual(1);
    expect(
      queryByTestId('eoj-recommendations-heading'),
    ).not.toBeInTheDocument();
  });

  it('should not render a list when there is only one promo', () => {
    const { queryByRole } = render(
      <ScrollablePromoWithContext blocks={oneLinkOnly} />,
    );

    expect(queryByRole('list')).not.toBeInTheDocument();
    expect(queryByRole('listitem')).not.toBeInTheDocument();
  });

  it('should render unordered list if more than 1 item', () => {
    const { queryByRole, getAllByRole } = render(
      <ScrollablePromoWithContext blocks={threeLinks} />,
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
        />,
      );
      render(
        <ScrollablePromoWithContext
          blocks={edOjB.model.blocks}
          blockGroupIndex={2}
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
        />,
      );
      render(
        <ScrollablePromoWithContext
          blocks={edOjB.model.blocks}
          blockGroupIndex={2}
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

  shouldMatchSnapshot(
    'it should match a11y snapshot for single card',
    <ScrollablePromoWithContext blocks={oneLinkOnly} />,
  );

  shouldMatchSnapshot(
    'it should match a11y snapshot for list',
    <ScrollablePromoWithContext blocks={threeLinks} />,
  );
  shouldMatchSnapshot(
    'it should match a11y snapshot for list with no title',
    <ScrollablePromoWithContext blocks={oneLinkWithNoTitle} />,
  );
});
