import React from 'react';
import pick from 'ramda/src/pick';
import { GridItemMedium } from '#components/Grid';
import useViewTracker from '#hooks/useViewTracker';
import useClickTrackerHandler from '#hooks/useClickTrackerHandler';
import { BulletedList } from '../../../components/BulletedList';
import Blocks from '../Blocks';
import listItem from '../BulletedListItem';

const withClickHandler = (Component, clickHandler) => props => (
  <Component {...props} {...clickHandler} />
);

const BulletedListContainer = ({
  blocks,
  className = '',
  blockGroupType,
  blockGroupIndex,
  ...rest
}) => {
  const eventTrackingData = {
    componentName: `bullet${blockGroupIndex}`,
    format: 'CHD=bullet',
  };
  const viewTracker = useViewTracker(eventTrackingData);
  const handleClickTracking = useClickTrackerHandler(eventTrackingData);

  const listWithLinkViewTracker =
    blockGroupType === 'listWithLink' ? viewTracker : null;

  return (
    <GridItemMedium className={`mb-triple ${className}`}>
      <BulletedList
        {...pick(['bulletPointShape', 'bulletPointColour'], rest)}
        {...listWithLinkViewTracker}
      >
        <Blocks
          blocks={blocks}
          componentsToRender={{
            listItem:
              blockGroupType === 'listWithLink'
                ? withClickHandler(listItem, handleClickTracking)
                : listItem,
          }}
        />
      </BulletedList>
    </GridItemMedium>
  );
};

export default BulletedListContainer;
