import React, { useContext } from 'react';
import styled from '@emotion/styled';
import pick from 'ramda/src/pick';
import pathOr from 'ramda/src/pathOr';
import BulletedList from '@bbc/psammead-bulleted-list';
import { GEL_SPACING_TRPL } from '@bbc/gel-foundations/spacings';
import { arrayOf, shape, oneOf, string } from 'prop-types';
import { ServiceContext } from '#contexts/ServiceContext';
import Blocks from '../Blocks';
import listItem, { ListItemPropTypes } from '../BulletedListItem';
import { GridItemMedium } from '#app/components/Grid';
import useViewTracker from '#hooks/useViewTracker';
import useClickTrackerHandler from '#hooks/useClickTrackerHandler';

const componentsToRender = { listItem };

const StyledGridItemMedium = styled(GridItemMedium)`
  margin-bottom: ${GEL_SPACING_TRPL};
`;

const BulletedListContainer = ({ blocks, className, ...rest }) => {
  const linkBlock = blocks.find(element => {
    const locator = pathOr(
      null,
      ['model', 'blocks', 0, 'model', 'blocks', 0, 'model', 'locator'],
      element,
    );
    return locator;
  });

  const blockId = pathOr('null', ['id'], linkBlock);

  const eventTrackingData = {
    componentName: `bullet${blockId}`,
    format: 'CHD=bullet',
  };
  const viewRef = useViewTracker(eventTrackingData);
  const { script, service, dir } = useContext(ServiceContext);
  const clickTrackerRef = useClickTrackerHandler(eventTrackingData);

  return (
    <StyledGridItemMedium className={className}>
      <BulletedList
        {...pick(['bulletPointShape', 'bulletPointColour'], rest)}
        script={script}
        service={service}
        dir={dir}
        ref={linkBlock ? viewRef : null}
        onClick={clickTrackerRef}
      >
        <Blocks blocks={blocks} componentsToRender={componentsToRender} />
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

BulletedListContainer.defualtProps = { className: null };

export default BulletedListContainer;
