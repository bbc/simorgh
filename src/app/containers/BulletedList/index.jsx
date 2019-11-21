import React, { useContext } from 'react';
import BulletedList from '@bbc/psammead-bulleted-list';
import { ServiceContext } from '#contexts/ServiceContext';
import Blocks from '../Blocks';
import listItem from '../BulletedListItem';
import { listBlockPropTypes } from '#models/propTypes/list';
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

BulletedListContainer.propTypes = { ...listBlockPropTypes };

export default BulletedListContainer;
