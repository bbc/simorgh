import React from 'react';
import styled from '@emotion/styled';
import pick from 'ramda/src/pick';
import { GEL_SPACING_TRPL } from '#psammead/gel-foundations/src/spacings';
import { GridItemMedium } from '#components/Grid';
import useViewTracker from '#hooks/useViewTracker';
import useClickTrackerHandler from '#hooks/useClickTrackerHandler';
import { BulletedList } from '../../../components/BulletedList';
import Blocks from '../Blocks';
import listItem from '../BulletedListItem';

const StyledGridItemMedium = styled(GridItemMedium)`
  margin-bottom: ${GEL_SPACING_TRPL};
`;

const withClickHandler = (Component, clickHandler) => props => (
  <Component {...props} onClick={clickHandler} />
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
  const viewRef = useViewTracker(eventTrackingData);
  const handleClickTracking = useClickTrackerHandler(eventTrackingData);

  return (
    <StyledGridItemMedium {...(className && { className })}>
      <BulletedList
        {...pick(['bulletPointShape', 'bulletPointColour'], rest)}
        ref={blockGroupType === 'listWithLink' ? viewRef : null}
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
    </StyledGridItemMedium>
  );
};

export default BulletedListContainer;
