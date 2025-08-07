import React from 'react';
// import * as viewTracking from '#hooks/useViewTracker';
// import * as clickTracking from '#hooks/useClickTrackerHandler';
import { render } from '../react-testing-library-with-providers';
import { topStoriesBlocks } from './helpers/fixtureData';
import TopBarOJs from '.';

describe('TopBarOJs', () => {
  // describe('Mid Page ScrollablePromo', () => {

  //   it('should render unordered list if more than 1 item', () => {
  //     const { queryByRole, getAllByRole } = render(
  //       <ScrollablePromo blocks={threeLinks} />,
  //     );
  //     expect(queryByRole('list')).toBeInTheDocument();
  //     expect(getAllByRole('listitem').length).toEqual(3);
  //   });

  //   describe('event tracking in editorial onward journeys', () => {
  //     afterEach(() => {
  //       jest.clearAllMocks();
  //     });

  // it('should call the view tracking hook with the correct params with one editorial onward journey', () => {
  //   const viewTrackerSpy = jest.spyOn(viewTracking, 'default');

  //   render(
  //     <ScrollablePromo blocks={edOjA.model.blocks} blockGroupIndex={1} />,
  //   );

  //       expect(viewTrackerSpy).toHaveBeenCalledWith({
  //         componentName: 'edoj1',
  //         format: 'CHD=edoj',
  //       });
  //     });

  //     it('should call the view tracking hook with the correct params with multiple editorial onward journeys', () => {
  //       const viewTrackerSpy = jest.spyOn(viewTracking, 'default');
  //       render(
  //         <ScrollablePromo blocks={edOjA.model.blocks} blockGroupIndex={1} />,
  //       );
  //       render(
  //         <ScrollablePromo blocks={edOjB.model.blocks} blockGroupIndex={2} />,
  //       );

  //       expect(viewTrackerSpy).toHaveBeenCalledTimes(4);
  //       expect(viewTrackerSpy).toHaveBeenCalledWith({
  //         componentName: 'edoj1',
  //         format: 'CHD=edoj',
  //       });
  //       expect(viewTrackerSpy).toHaveBeenCalledWith({
  //         componentName: 'edoj2',
  //         format: 'CHD=edoj',
  //       });
  //     });

  //     it('should call the click tracking hook with one editorial onward journey', () => {
  //       const clickTrackerSpy = jest.spyOn(clickTracking, 'default');
  //       render(
  //         <ScrollablePromo blocks={edOjA.model.blocks} blockGroupIndex={1} />,
  //       );

  //       expect(clickTrackerSpy).toHaveBeenCalledWith({
  //         componentName: 'edoj1',
  //         format: 'CHD=edoj',
  //       });
  //     });

  //     it('should call the click tracking hook with multiple editorial onward journeys', () => {
  //       const clickTrackerSpy = jest.spyOn(clickTracking, 'default');
  //       render(
  //         <ScrollablePromo blocks={edOjA.model.blocks} blockGroupIndex={1} />,
  //       );
  //       render(
  //         <ScrollablePromo blocks={edOjB.model.blocks} blockGroupIndex={2} />,
  //       );

  //       expect(clickTrackerSpy).toHaveBeenCalledTimes(4);
  //       expect(clickTrackerSpy).toHaveBeenCalledWith({
  //         componentName: 'edoj1',
  //         format: 'CHD=edoj',
  //       });
  //       expect(clickTrackerSpy).toHaveBeenCalledWith({
  //         componentName: 'edoj2',
  //         format: 'CHD=edoj',
  //       });
  //     });
  //   });
  // });
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
});
