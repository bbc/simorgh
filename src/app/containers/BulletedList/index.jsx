import React, { useContext } from 'react';
import BulletedList from '@bbc/psammead-bulleted-list';
import { arrayOf, shape, oneOf } from 'prop-types';
import { ServiceContext } from '#contexts/ServiceContext';
import Blocks from '../Blocks';
import listItem, { ListItemPropTypes } from '../BulletedListItem';
import { GridItemConstrainedMedium } from '#lib/styledGrid';

const componentsToRender = { listItem };

const BulletedListContainer = ({ blocks }) => {
  const { script, service, dir } = useContext(ServiceContext);

  return (
    <GridItemConstrainedMedium>
      <BulletedList script={script} service={service} dir={dir}>
        <Blocks blocks={blocks} componentsToRender={componentsToRender} />
      </BulletedList>
    </GridItemConstrainedMedium>
  );
};

export const ListPropTypes = {
  blocks: arrayOf(
    shape({ type: oneOf(['listItem']), model: shape(ListItemPropTypes) }),
  ).isRequired,
};

BulletedListContainer.propTypes = { ...ListPropTypes };

export default BulletedListContainer;
