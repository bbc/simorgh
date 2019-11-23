import React, { useContext } from 'react';
import BulletedList from '@bbc/psammead-bulleted-list';
import { ServiceContext } from '#contexts/ServiceContext';
import Blocks from '../Blocks';
import listItem from '../BulletedListItem';
import { GridItemConstrainedMedium } from '#lib/styledGrid';
import { listPropTypes } from '#models/propTypes/list';

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

BulletedListContainer.propTypes = { ...listPropTypes };

export default BulletedListContainer;
