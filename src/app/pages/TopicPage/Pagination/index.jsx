/* eslint-disable no-nested-ternary */
/* eslint-disable react/prop-types */
import React from 'react';
import styled from '@emotion/styled';
import clamp from 'ramda/src/clamp';

import buildBlocks, { TYPE, VISIBILITY, AVAILABILITY } from './buildBlocks';

// TODO - use media queries
const isVisibleOnMobile = block =>
  [VISIBILITY.MOBILE_ONLY, VISIBILITY.TABLET_DOWN, VISIBILITY.ALL].includes(
    block.visibility,
  );

const isVisibleOnTablet = block =>
  [VISIBILITY.TABLET_DOWN, VISIBILITY.TABLET_UP, VISIBILITY.ALL].includes(
    block.visibility,
  );

const isVisibleOnDesktop = block =>
  [VISIBILITY.DESKTOP_ONLY, VISIBILITY.TABLET_UP, VISIBILITY.ALL].includes(
    block.visibility,
  );

const Wrapper = styled.div``;
const Block = styled.button`
  display: inline-block;
  background: rgba(0, 0, 0, 0.1);
  width: 3rem;
  text-align: center;
  font-family: sans-serif;
  font-weight: bold;
  margin-right: 0.3rem;
  padding: 0.7rem 0;
  border: none;
  outline: none;
  cursor: pointer;

  ${({ isActive }) =>
    isActive
      ? `
    color: white;
    background: rgba(0,0,0,0.6);
  `
      : `&:hover {
    background: rgba(0, 0, 0, 0.2);
  } &:active {
    background: rgba(0, 0, 0, 0.4);
  }`}
  ${({ disabled }) =>
    disabled &&
    `
    cursor: not-allowed;
     opacity: 0.5;
   `}
`;

const Pagination = ({ activePage, pageCount, deviceSize }) => {
  const clampedPageCount = clamp(2, 100, pageCount);
  const clampedActivePage = clamp(1, clampedPageCount, activePage);
  const filterer =
    deviceSize === 'mobile'
      ? isVisibleOnMobile
      : deviceSize === 'tablet'
      ? isVisibleOnTablet
      : isVisibleOnDesktop;
  const blocks = buildBlocks(clampedActivePage, clampedPageCount).filter(
    filterer,
  );

  const components = {
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
    [TYPE.ELLIPSIS]: () => <Block as="div">...</Block>,
  };

  return (
    <Wrapper>
      {blocks.map(block => {
        const Component = components[block.type];
        return <Component {...block} />;
      })}
    </Wrapper>
  );
};

export default Pagination;
