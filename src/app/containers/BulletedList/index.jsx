import React, { useContext } from 'react';
import BulletedList from '@bbc/psammead-bulleted-list';
import { arrayOf, oneOf, shape } from 'prop-types';
import { ServiceContext } from '#contexts/ServiceContext';
import Blocks from '../Blocks';
import listItem, { ListItemPropTypes } from '../BulletedListItem';
import Grid, { ArticlePageGrid } from '#app/components/Grid';

const componentsToRender = { listItem };

const BulletedListContainer = ({ blocks }) => {
  const { script, service, dir } = useContext(ServiceContext);

  return (
    <ArticlePageGrid>
      <Grid
        item
        startOffset={{
          group0: 1,
          group1: 1,
          group2: 1,
          group3: 1,
          group4: 2,
          group5: 5,
        }}
        columns={{
          group0: 6,
          group1: 6,
          group2: 6,
          group3: 5,
          group4: 5,
          group5: 10,
        }}
        margins={{
          group0: true,
          group1: true,
          group2: true,
          group3: true,
        }}
      >
        <BulletedList script={script} service={service} dir={dir}>
          <Blocks blocks={blocks} componentsToRender={componentsToRender} />
        </BulletedList>
      </Grid>
    </ArticlePageGrid>
  );
};

export const ListPropTypes = {
  blocks: arrayOf(
    shape({ type: oneOf(['listItem']), model: shape(ListItemPropTypes) }),
  ).isRequired,
};

BulletedListContainer.propTypes = { ...ListPropTypes };

export default BulletedListContainer;
