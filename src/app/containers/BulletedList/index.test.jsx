import React from 'react';
import { render } from '@testing-library/react';
import { shouldMatchSnapshot } from '@bbc/psammead-test-helpers';
import { latin, arabic } from '@bbc/gel-foundations/scripts';
import BulletedListContainer from './index';
import { ServiceContext } from '#contexts/ServiceContext';
import { listItemB, listItemC, orderedList } from './fixtures';
import * as viewTracking from '#hooks/useViewTracker';
import { ToggleContextProvider } from '#contexts/ToggleContext';

// eslint-disable-next-line react/prop-types
const BulletsWithContext = ({ blocks }) => (
  <ToggleContextProvider>
    <ServiceContext.Provider
      value={{ script: arabic, service: 'arabic', dir: 'rtl' }}
    >
      <BulletedListContainer blocks={blocks} />
    </ServiceContext.Provider>
  </ToggleContextProvider>
);

describe('BulletedListContainer', () => {
  shouldMatchSnapshot(
    'should render ltr correctly',
    <BulletsWithContext blocks={orderedList.model.blocks} />,
  );

  shouldMatchSnapshot(
    'should render rtl correctly',
    <BulletsWithContext blocks={orderedList.model.blocks} />,
  );

  describe('getEventTrackingData', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should call the view tracking hook with the correct params with one lists', () => {
      const viewTrackerSpy = jest.spyOn(viewTracking, 'default');
      render(<BulletsWithContext blocks={orderedList.model.blocks} />);

      expect(viewTrackerSpy).toHaveBeenCalledWith({
        componentName: 'bulletmock-id-2',
        format: 'CHD=bullet',
      });
    });

    it('should call the view tracking hook with the correct params with multiple lists', () => {
      const viewTrackerSpy = jest.spyOn(viewTracking, 'default');
      render(<BulletsWithContext blocks={listItemB.model.blocks} />);
      render(<BulletsWithContext blocks={listItemC.model.blocks} />);

      expect(viewTrackerSpy).toHaveBeenCalledTimes(2);
      expect(viewTrackerSpy).toHaveBeenCalledWith({
        componentName: 'bulletmock-id-b',
        format: 'CHD=bullet',
      });
      expect(viewTrackerSpy).toHaveBeenLastCalledWith({
        componentName: 'bulletmock-id-c',
        format: 'CHD=bullet',
      });
    });
  });
});
