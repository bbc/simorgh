import React, { useContext } from 'react';
import styled from '@emotion/styled';
import pick from 'ramda/src/pick';
import BulletedList from '@bbc/psammead-bulleted-list';
import { GEL_SPACING_TRPL } from '@bbc/gel-foundations/spacings';
import { arrayOf, shape, oneOf, string } from 'prop-types';
import { ServiceContext } from '#contexts/ServiceContext';
import Blocks from '../Blocks';
import listItem, { ListItemPropTypes } from '../BulletedListItem';
import { GridItemMedium } from '#app/components/Grid';

const componentsToRender = { listItem };

const StyledGridItemMedium = styled(GridItemMedium)`
  margin-bottom: ${GEL_SPACING_TRPL};
`;

const BulletedListContainer = ({ blocks, className, ...rest }) => {
  const { script, service, dir } = useContext(ServiceContext);

  return (
    <StyledGridItemMedium className={className}>
      <BulletedList
        {...pick(['bulletPointShape', 'bulletPointColour'], rest)}
        script={script}
        service={service}
        dir={dir}
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
