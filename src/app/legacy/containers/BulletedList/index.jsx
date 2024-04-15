import React, { useContext } from 'react';
import styled from '@emotion/styled';
import pick from 'ramda/src/pick';
import BulletedList from '#psammead/psammead-bulleted-list/src';
import { GEL_SPACING_TRPL } from '#psammead/gel-foundations/src/spacings';
import { arrayOf, shape, oneOf, string } from 'prop-types';
import { GridItemMedium } from '#components/Grid';
import useViewTracker from '#hooks/useViewTracker';
import useClickTrackerHandler from '#hooks/useClickTrackerHandler';
import { ServiceContext } from '../../../contexts/ServiceContext';
import Blocks from '../Blocks';
import listItem, { ListItemPropTypes } from '../BulletedListItem';

const StyledGridItemMedium = styled(GridItemMedium)`
  margin-bottom: ${GEL_SPACING_TRPL};
`;

const withClickHandler = (Component, clickHandler) => props => (
  <Component {...props} onClick={clickHandler} />
);

const BulletedListContainer = ({
  blocks,
  className,
  blockGroupType,
  blockGroupIndex,
  ...rest
}) => {
  const eventTrackingData = {
    componentName: `bullet${blockGroupIndex}`,
    format: 'CHD=bullet',
  };
  const viewRef = useViewTracker(eventTrackingData);
  const { script, service, dir } = useContext(ServiceContext);
  const handleClickTracking = useClickTrackerHandler(eventTrackingData);

  return (
    <StyledGridItemMedium className={className}>
      <BulletedList
        {...pick(['bulletPointShape', 'bulletPointColour'], rest)}
        script={script}
        service={service}
        dir={dir}
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

export const ListPropTypes = {
  blocks: arrayOf(
    shape({ type: oneOf(['listItem']), model: shape(ListItemPropTypes) }),
  ).isRequired,
  class: string,
};

BulletedListContainer.propTypes = { ...ListPropTypes };

BulletedListContainer.defaultProps = { className: null };

export default BulletedListContainer;
