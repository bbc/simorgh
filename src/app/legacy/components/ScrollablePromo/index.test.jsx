import React from 'react';
import * as viewTracking from '#hooks/useViewTracker';
import * as clickTracking from '#hooks/useClickTrackerHandler';
import { render } from '../../../components/react-testing-library-with-providers';
import {
  threeLinks,
  oneLinkOnly,
  oneLinkWithNoTitle,
  moreThanThreeLinks,
  topStoriesBlocks,
  mostReadBlocks,
} from './helpers/fixtureData';
import ScrollablePromo from '.';
import { edOjA, edOjB } from './fixtures';
import { MEDIA_ARTICLE_PAGE } from '../../../routes/utils/pageTypes';

describe('ScrollablePromo', () => {
  describe('Mid Page ScrollablePromo', () => {
    it('should return null if no data is passed', () => {
      const { container } = render(<ScrollablePromo blocks={[]} />);
      expect(container).toBeEmptyDOMElement();
    });

    it('should render max 3 promo items', () => {
      const { getAllByRole } = render(
        <ScrollablePromo blocks={moreThanThreeLinks} />,
      );
      expect(getAllByRole('listitem').length).toEqual(3);
    });

    it('should render single promo item', () => {
      const { container } = render(<ScrollablePromo blocks={oneLinkOnly} />);
      expect(container.childElementCount).toEqual(1);
    });

    it('should render single promo item with a title', () => {
      const { container, getByTestId } = render(
        <ScrollablePromo blocks={oneLinkOnly} />,
      );
      expect(container.childElementCount).toEqual(1);
      expect(getByTestId('eoj-recommendations-heading')).toBeInTheDocument();
    });

    it('should render single promo item without a title', () => {
      const { container, queryByTestId } = render(
        <ScrollablePromo blocks={oneLinkWithNoTitle} />,
      );
      expect(container.childElementCount).toEqual(1);
      expect(
        queryByTestId('eoj-recommendations-heading'),
      ).not.toBeInTheDocument();
    });

    it('should not render a list when there is only one promo', () => {
      const { queryByRole } = render(<ScrollablePromo blocks={oneLinkOnly} />);

      expect(queryByRole('list')).not.toBeInTheDocument();
      expect(queryByRole('listitem')).not.toBeInTheDocument();
    });

    it('should render unordered list if more than 1 item', () => {
      const { queryByRole, getAllByRole } = render(
        <ScrollablePromo blocks={threeLinks} />,
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
          <ScrollablePromo blocks={edOjA.model.blocks} blockGroupIndex={1} />,
        );

        expect(viewTrackerSpy).toHaveBeenCalledWith({
          componentName: 'edoj1',
          format: 'CHD=edoj',
        });
      });

      it('should call the view tracking hook with the correct params with multiple editorial onward journeys', () => {
        const viewTrackerSpy = jest.spyOn(viewTracking, 'default');
        render(
          <ScrollablePromo blocks={edOjA.model.blocks} blockGroupIndex={1} />,
        );
        render(
          <ScrollablePromo blocks={edOjB.model.blocks} blockGroupIndex={2} />,
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
          <ScrollablePromo blocks={edOjA.model.blocks} blockGroupIndex={1} />,
        );

        expect(clickTrackerSpy).toHaveBeenCalledWith({
          componentName: 'edoj1',
          format: 'CHD=edoj',
        });
      });

      it('should call the click tracking hook with multiple editorial onward journeys', () => {
        const clickTrackerSpy = jest.spyOn(clickTracking, 'default');
        render(
          <ScrollablePromo blocks={edOjA.model.blocks} blockGroupIndex={1} />,
        );
        render(
          <ScrollablePromo blocks={edOjB.model.blocks} blockGroupIndex={2} />,
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

    it('it should match a11y snapshot for single card', () => {
      const { container } = render(<ScrollablePromo blocks={oneLinkOnly} />);
      expect(container).toMatchSnapshot();
    });

    it('it should match a11y snapshot for list', () => {
      const { container } = render(<ScrollablePromo blocks={threeLinks} />);
      expect(container).toMatchSnapshot();
    });

    it('it should match a11y snapshot for list with no title', () => {
      const { container } = render(
        <ScrollablePromo blocks={oneLinkWithNoTitle} />,
      );
      expect(container).toMatchSnapshot();
    });

    it('it should match snapshot when in dark ui mode', () => {
      const { container } = render(
        <ScrollablePromo blocks={oneLinkWithNoTitle} />,
        {
          pageType: MEDIA_ARTICLE_PAGE,
        },
      );
      expect(container).toMatchSnapshot();
    });
  });

  describe('OJ Top Bar ScrollablePromo', () => {
    it('it should display Top Stories label when experimentVariant is top_bar_top_stories', () => {
      const { getByText, queryByText } = render(
        <ScrollablePromo
          blocks={topStoriesBlocks}
          experimentVariant="top_bar_top_stories"
        />,
      );
      expect(getByText('Top Stories')).toBeVisible();
      expect(queryByText('Popular Reads')).toBeNull();
    });

    it('it should display Most Read label when experimentVariant is top_bar_most_read', () => {
      const { getByText, queryByText } = render(
        <ScrollablePromo
          blocks={mostReadBlocks}
          experimentVariant="top_bar_most_read"
        />,
      );
      expect(getByText('Popular Reads')).toBeVisible();
      expect(queryByText('Top Stories')).toBeNull();
    });

    it('it should display 3 promo items with Top Stories when experimentVariant is top_bar_top_stories', () => {
      const { getAllByRole } = render(
        <ScrollablePromo
          blocks={topStoriesBlocks}
          experimentVariant="top_bar_top_stories"
        />,
      );
      expect(getAllByRole('listitem')).toHaveLength(3);
    });

    it('it should display 5 promo items with Most Read when experimentVariant is top_bar_most_read', () => {
      const { getAllByRole } = render(
        <ScrollablePromo
          blocks={mostReadBlocks}
          experimentVariant="top_bar_most_read"
        />,
      );
      expect(getAllByRole('listitem')).toHaveLength(5);
    });

    it('it should display Top Stories content when experimentVariant is top_bar_top_stories', () => {
      const { getAllByRole } = render(
        <ScrollablePromo
          blocks={topStoriesBlocks}
          experimentVariant="top_bar_top_stories"
        />,
      );
      const expectedFirstHeadline =
        topStoriesBlocks[0].headlines.promoHeadline.blocks[0].model.blocks[0]
          .model.text;
      expect(getAllByRole('listitem')[0]).toHaveTextContent(
        expectedFirstHeadline,
      );
    });

    it('it should display Most Read content when experimentVariant is top_bar_most_read', () => {
      const { getAllByRole } = render(
        <ScrollablePromo
          blocks={mostReadBlocks}
          experimentVariant="top_bar_most_read"
        />,
      );
      const expectedFirstHeadline = mostReadBlocks[0].title;
      expect(getAllByRole('listitem')[0]).toHaveTextContent(
        expectedFirstHeadline,
      );
    });
  });
});
