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

    it('should call the view tracking hook with the correct params with one list', () => {
      const viewTrackerSpy = jest.spyOn(viewTracking, 'default');
      render(<BulletsWithContext blocks={listItemD.model.blocks} />);

      expect(viewTrackerSpy).toHaveBeenCalledWith({
        componentName: 'bulletmock-id-d',
        format: 'CHD=bullet',
      });
    });

    it('should call the view tracking hook with the correct params with multiple lists', () => {
      const viewTrackerSpy = jest.spyOn(viewTracking, 'default');
      render(<BulletsWithContext blocks={listItemD.model.blocks} />);
      render(<BulletsWithContext blocks={listItemE.model.blocks} />);

      expect(viewTrackerSpy).toHaveBeenCalledTimes(2);
      expect(viewTrackerSpy).toHaveBeenCalledWith({
        componentName: 'bulletmock-id-d',
        format: 'CHD=bullet',
      });
      expect(viewTrackerSpy).toHaveBeenLastCalledWith({
        componentName: 'bulletmock-id-e',
        format: 'CHD=bullet',
      });
    });

    it('should call the click tracking hook with the correct params', () => {
      const clickTrackerSpy = jest.spyOn(clickTracking, 'default');
      render(<BulletsWithContext blocks={listItemD.model.blocks} />);

      expect(clickTrackerSpy).toHaveBeenCalledWith({
        componentName: 'bulletmock-id-d',
        format: 'CHD=bullet',
      });
    });
  });
});
