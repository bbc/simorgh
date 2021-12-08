import React from 'react';
import { render } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { arabic } from '@bbc/gel-foundations/scripts';
import BulletedListContainer from './index';
import { ServiceContext } from '#contexts/ServiceContext';
import { listItemD, listItemE, orderedList } from './fixtures';
import * as viewTracking from '#hooks/useViewTracker';
import * as clickTracking from '#hooks/useClickTrackerHandler';
import { ToggleContextProvider } from '#contexts/ToggleContext';

// eslint-disable-next-line react/prop-types
const BulletsWithContext = ({ blocks, ...rest }) => (
  <ToggleContextProvider>
    <ServiceContext.Provider
      value={{ script: arabic, service: 'arabic', dir: 'rtl' }}
    >
      <BulletedListContainer blocks={blocks} position={rest.position} />
    </ServiceContext.Provider>
  </ToggleContextProvider>
);

describe('BulletedListContainer', () => {
  shouldMatchSnapshot(
    'should render ltr correctly',
    <BulletsWithContext blocks={orderedList.model.blocks} position={[1, 1]} />,
  );

  shouldMatchSnapshot(
    'should render rtl correctly',
    <BulletsWithContext blocks={orderedList.model.blocks} position={[2, 1]} />,
  );

  describe('getEventTrackingData', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    const positionD = [3, 1];
    const positionE = [4, 1];

    it('should call the view tracking hook with the correct params with one list', () => {
      const viewTrackerSpy = jest.spyOn(viewTracking, 'default');
      render(
        <BulletsWithContext
          blocks={listItemD.model.blocks}
          position={positionD}
        />,
      );

      expect(viewTrackerSpy).toHaveBeenCalledWith({
        componentName: 'bullet301',
        format: 'CHD=bullet',
      });
    });

    it('should call the view tracking hook with the correct params with multiple lists', () => {
      const viewTrackerSpy = jest.spyOn(viewTracking, 'default');
      render(
        <BulletsWithContext
          blocks={listItemD.model.blocks}
          position={positionD}
        />,
      );
      render(
        <BulletsWithContext
          blocks={listItemE.model.blocks}
          position={positionE}
        />,
      );

      expect(viewTrackerSpy).toHaveBeenCalledTimes(2);
      expect(viewTrackerSpy).toHaveBeenCalledWith({
        componentName: 'bullet301',
        format: 'CHD=bullet',
      });
      expect(viewTrackerSpy).toHaveBeenLastCalledWith({
        componentName: 'bullet401',
        format: 'CHD=bullet',
      });
    });

    it('should call the click tracking hook with the correct params', () => {
      const clickTrackerSpy = jest.spyOn(clickTracking, 'default');
      render(
        <BulletsWithContext
          blocks={listItemD.model.blocks}
          position={positionD}
        />,
      );

      expect(clickTrackerSpy).toHaveBeenCalledWith({
        componentName: 'bullet301',
        format: 'CHD=bullet',
      });
    });
  });
});
