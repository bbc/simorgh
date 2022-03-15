import React, { useContext } from 'react';
import styled from '@emotion/styled';
import clamp from 'ramda/src/clamp';
import { number } from 'prop-types';
import { getSansBold } from '@bbc/psammead-styles/font-styles';
import { C_EBON, C_WHITE } from '@bbc/psammead-styles/colours';

import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '@bbc/gel-foundations/breakpoints';
import { ServiceContext } from '#contexts/ServiceContext';

import buildBlocks, { TYPE, VISIBILITY, AVAILABILITY } from './buildBlocks';
import { Ellipsis, LeftChevron, RightChevron } from './icons';

const visibilityToMediaQuery = visibility =>
  ({
    // TODO: minimum width being specified here as a future PR is implementing a totally different design for group 1
    [VISIBILITY.MOBILE_ONLY]: `@media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
      display: inline-block;
    }`,
    // TODO: minimum width being specified here as a future PR is implementing a totally different design for group 1
    [VISIBILITY.TABLET_DOWN]: `@media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
      display: inline-block;
    }`,
    [VISIBILITY.TABLET_UP]: `@media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
      display: inline-block;
    }`,
    [VISIBILITY.DESKTOP_ONLY]: `@media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
      display: inline-block;
    }`,
  }[visibility] || '');

const OL = styled.ol`
  list-style: none;
  padding: 0;
  text-align: center;
`;

const Block = styled.li`
  ${({ service }) => getSansBold(service)};
  ${({ visibility }) => visibilityToMediaQuery(visibility)}
  display: inline-block;
  background: #eee;
  width: 2.5rem;
  height: 2.5rem;
  line-height: 2.5rem;
  text-align: center;
  margin-right: 0.25rem;
  &:last-of-type {
    margin-right: 0;
  }
  svg {
    fill: currentColor;
    width: 1rem;
    height: 1rem;
    position: relative;
    top: 0.2rem;
  }
`;

const ActiveBlock = styled(Block)`
  color: ${C_WHITE};
  background: #696969;
`;
const UnavailableBlock = styled(Block)`
  color: #bababa;
`;
const EllipsisBlock = styled(Block)`
  color: #8a8c8e;
  background: unset;
`;

const selectWrapper = availability =>
  ({
    [AVAILABILITY.ACTIVE]: ActiveBlock,
    [AVAILABILITY.UNAVAILABLE]: UnavailableBlock,
    [AVAILABILITY.AVAILABLE]: Block,
  }[availability]);

const A = styled.a`
  display: block;
  color: ${C_EBON};
  text-decoration: none;
  height: 100%;
  width: 100%;
  &:hover {
    color: white;
    background: #5a5a5a;
  }
`;

/* eslint-disable react/prop-types */
const LinkComponent = ({ children, availability, pageNumber }) => {
  if (availability === AVAILABILITY.AVAILABLE) {
    return <A href={`?page=${pageNumber}`}>{children}</A>;
  }
  return children;
};

const blockComponents = {
  [TYPE.NUMBER]: ({ availability, pageNumber, service }) => {
    const BlockComponent = selectWrapper(availability);
    return (
      <BlockComponent service={service}>
        <LinkComponent availability={availability} pageNumber={pageNumber}>
          {pageNumber}
        </LinkComponent>
      </BlockComponent>
    );
  },
  [TYPE.LEFT_ARROW]: ({ availability, activePage }) => {
    const BlockComponent = selectWrapper(availability);
    return (
      <BlockComponent>
        <LinkComponent availability={availability} pageNumber={activePage - 1}>
          <LeftChevron />
        </LinkComponent>
      </BlockComponent>
    );
  },
  [TYPE.RIGHT_ARROW]: ({ availability, activePage }) => {
    const BlockComponent = selectWrapper(availability);
    return (
      <BlockComponent>
        <LinkComponent availability={availability} pageNumber={activePage + 1}>
          <RightChevron />
        </LinkComponent>
      </BlockComponent>
    );
  },
  [TYPE.ELLIPSIS]: () => (
    <EllipsisBlock>
      <Ellipsis />
    </EllipsisBlock>
  ),
};
/* eslint-enable react/prop-types */

const Pagination = ({ activePage, pageCount }) => {
  const { service } = useContext(ServiceContext);
  const clampedPageCount = clamp(1, 99, pageCount);
  const clampedActivePage = clamp(1, clampedPageCount, activePage);
  const blocks = buildBlocks(clampedActivePage, clampedPageCount);
  if (!blocks) return null;

  return (
    <OL role="list">
      {blocks.map(block => {
        const Component = blockComponents[block.type];
        return (
          <Component {...block} activePage={activePage} service={service} />
        );
      })}
    </OL>
  );
};

Pagination.propTypes = {
  activePage: number,
  pageCount: number,
};

Pagination.defaultProps = {
  activePage: 1,
  pageCount: 1,
};

export default Pagination;
