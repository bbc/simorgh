import React, { useMemo } from 'react';
import * as viewTracking from '#hooks/useViewTracker';
import * as clickTracking from '#hooks/useClickTrackerHandler';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { suppressPropWarnings } from '#psammead/psammead-test-helpers/src';
import { render } from '../../../components/react-testing-library-with-providers';
import BulletedListContainer from './index';
import { listItemD, listItemE, orderedList } from './fixtures';
import { ServiceContext } from '../../../contexts/ServiceContext';
import arabic from '../../../components/ThemeProvider/fontScripts/arabic';

const BulletsWithContext = ({ blocks, blockGroupIndex }) => {
  const memoizedToggleContextValue = useMemo(
    () => ({ script: arabic, service: 'arabic', dir: 'rtl' }),
    [],
  );
  return (
    <ToggleContextProvider>
      <ServiceContext.Provider value={memoizedToggleContextValue}>
        <BulletedListContainer
          blocks={blocks}
          blockGroupIndex={blockGroupIndex}
        />
      </ServiceContext.Provider>
    </ToggleContextProvider>
  );
};

describe('BulletedListContainer', () => {
  suppressPropWarnings(['blocks', 'supplied']);

  it('should render ltr correctly', () => {
    const { container } = render(
      <BulletsWithContext
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
      <BulletsWithContext
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
        <BulletsWithContext
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
        <BulletsWithContext
          blocks={listItemD.model.blocks}
          blockGroupIndex={1}
        />,
      );
      render(
        <BulletsWithContext
          blocks={listItemE.model.blocks}
          blockGroupIndex={2}
        />,
      );

      expect(viewTrackerSpy).toHaveBeenCalledTimes(2);
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
        <BulletsWithContext
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
