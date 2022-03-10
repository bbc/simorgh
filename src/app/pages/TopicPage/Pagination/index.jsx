/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from '@emotion/styled';

import buildBlocks, { TYPE, VISIBILITY, AVAILABILITY } from './buildBlocks';

// TODO - use media queries
export const isVisibleOnMobile = block =>
  [VISIBILITY.MOBILE_ONLY, VISIBILITY.TABLET_DOWN, VISIBILITY.ALL].includes(
    block.visibility,
  );

export const isVisibleOnTablet = block =>
  [VISIBILITY.TABLET_DOWN, VISIBILITY.TABLET_UP, VISIBILITY.ALL].includes(
    block.visibility,
  );

const Wrapper = styled.div``;
const Block = styled.button``;

const Pagination = ({ activePage, pageCount, deviceSize }) => {
  const filterer =
    deviceSize === 'mobile'
      ? isVisibleOnMobile
      : deviceSize === 'tablet'
      ? isVisibleOnTablet
      : () => true;
  const blocks = buildBlocks(activePage, pageCount).filter(filterer);

  const componentsToRender = {
    [TYPE.NUMBER]: ({ availability, pageNumber }) => (
      <Block isActive={availability === AVAILABILITY.ACTIVE}>
        {pageNumber}
      </Block>
    ),
    [TYPE.LEFT_ARROW]: ({ availability }) => (
      <Block disabled={availability === AVAILABILITY.UNAVAILABLE}>{'<'}</Block>
    ),
    [TYPE.RIGHT_ARROW]: ({ availability }) => (
      <Block disabled={availability === AVAILABILITY.UNAVAILABLE}>{'>'}</Block>
    ),
    [TYPE.ELLIPSIS]: () => <Block>...</Block>,
  };

  return (
    <Wrapper>
      {blocks.map(block => {
        const Component = componentsToRender[block.type];
        return <Component {...block} />;
      })}
    </Wrapper>
  );
};

export default Pagination;
