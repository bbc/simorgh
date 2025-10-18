import React from 'react';
import * as viewTracking from '#hooks/useViewTracker';
import * as clickTracking from '#hooks/useClickTrackerHandler';
import { suppressPropWarnings } from '#psammead/psammead-test-helpers/src';
import { render } from '../../../components/react-testing-library-with-providers';
import BulletedListContainer from './index';
import { listItemD, listItemE, orderedList } from './fixtures';

describe('BulletedListContainer', () => {
  suppressPropWarnings(['blocks', 'supplied']);

  it('should render ltr correctly', () => {
    const { container } = render(
      <BulletedListContainer
        blocks={orderedList.model.blocks}
        blockGroupIndex={1}
      />,
      {
        service: 'arabic',
      },
    );
    expect(container).toMatchSnapshot();
  });

  it('should render rtl correctly', () => {
    const { container } = render(
      <BulletedListContainer
        blocks={orderedList.model.blocks}
        blockGroupIndex={2}
      />,
      {
        service: 'arabic',
      },
    );
    expect(container).toMatchSnapshot();
  });

  describe('getEventTrackingData', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call the view tracking hook with the correct params with one list with at least one link', () => {
      const viewTrackerSpy = jest.spyOn(viewTracking, 'default');
      render(
        <BulletedListContainer
          blocks={listItemD.model.blocks}
          blockGroupIndex={1}
        />,
      );

      expect(viewTrackerSpy).toHaveBeenCalledWith({
        componentName: 'bullet1',
        format: 'CHD=bullet',
      });
    });

    it('should call the view tracking hook with the correct params with multiple lists with at least one link', () => {
      const viewTrackerSpy = jest.spyOn(viewTracking, 'default');
      render(
        <BulletedListContainer
          blocks={listItemD.model.blocks}
          blockGroupIndex={1}
        />,
      );
      render(
        <BulletedListContainer
          blocks={listItemE.model.blocks}
          blockGroupIndex={2}
        />,
      );

      expect(viewTrackerSpy).toHaveBeenCalledTimes(4);
      expect(viewTrackerSpy).toHaveBeenCalledWith({
        componentName: 'bullet1',
        format: 'CHD=bullet',
      });
      expect(viewTrackerSpy).toHaveBeenLastCalledWith({
        componentName: 'bullet2',
        format: 'CHD=bullet',
      });
    });

    it('should call the click tracking hook with the correct params', () => {
      const clickTrackerSpy = jest.spyOn(clickTracking, 'default');
      render(
        <BulletedListContainer
          blocks={listItemD.model.blocks}
          blockGroupIndex={1}
        />,
      );

      expect(clickTrackerSpy).toHaveBeenCalledWith({
        componentName: 'bullet1',
        format: 'CHD=bullet',
      });
    });
  });
});
