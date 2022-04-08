import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { number } from 'prop-types';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import { getSansRegular, getSansBold } from '@bbc/psammead-styles/font-styles';
import {
  C_PHILIPPINE_GREY,
  C_GREY_10,
  C_GREY_6,
  C_POSTBOX,
} from '@bbc/psammead-styles/colours';

import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_1_SCREEN_WIDTH_MAX,
} from '@bbc/gel-foundations/breakpoints';
import { ServiceContext } from '#contexts/ServiceContext';

import buildBlocks, { TYPE, VISIBILITY } from './buildBlocks';
import { Ellipsis, LeftChevron, RightChevron } from './icons';

const visibilityToMediaQuery = visibility =>
  ({
    [VISIBILITY.MOBILE_ONLY]: `display: none; @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
      display: inline-block;
    }`,
    [VISIBILITY.TABLET_DOWN]: `display: none; @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
      display: inline-block;
    }`,
    [VISIBILITY.TABLET_UP]: `display: none; @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) {
      display: inline-block;
    }`,
    [VISIBILITY.DESKTOP_ONLY]: `display: none; @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
      display: inline-block;
    }`,
    [VISIBILITY.ALL]: `display: inline-block;`,
  }[visibility] || 'display: none;');

const Nav = styled.nav`
  display: block;
  margin: 0 auto 2.5rem auto;
  text-align: center;
`;
const StyledUnorderedList = styled.ul`
  display: inline-block;
  list-style: none;
  padding: 0;
  margin: 0;
  position: relative;
  top: 0.1rem;
  text-align: center;
  @media (max-width: ${GEL_GROUP_1_SCREEN_WIDTH_MAX}) {
    display: none;
  }
`;

const TextSummary = styled.div`
  ${({ service }) => getSansRegular(service)};
  color: ${C_GREY_6};
  display: inline-block;
  margin: 0 1.375rem;
  b {
    ${({ service }) => getSansBold(service)};
  }
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) {
    display: none;
  }
`;

const Block = styled.li`
  ${({ service }) => getSansBold(service)};
  ${({ visibility }) => visibilityToMediaQuery(visibility)}
  width: 2.5rem;
  height: 2.5rem;
  line-height: 2.5rem;
  text-align: center;
  margin: 0 0.125rem;
  svg {
    fill: currentColor;
    width: 1rem;
    height: 1rem;
    position: relative;
    top: 0.2rem;
  }
`;

const EllipsisBlock = styled(Block)`
  color: ${C_PHILIPPINE_GREY};
`;

const A = styled.a`
  display: block;
  color: ${C_GREY_10};
  text-decoration: none;
  height: 100%;
  width: 100%;

  ${({ isActive }) =>
    isActive
      ? `
        padding: 0.0625rem 0.625rem 0 0.625rem;
        border-bottom: 0.25rem ${C_POSTBOX} solid;
        &:hover,
        &:focus {
         padding: 0;
         border: 0.0625rem ${C_POSTBOX} solid;
         border-bottom-width: 0.25rem;
       }
      `
      : `
       padding: 0.0625rem;
       &:hover,
       &:focus {
         padding: 0;
         border: 0.0625rem ${C_POSTBOX} solid;
       }`}
`;

/* eslint-disable react/prop-types */
const LinkComponent = ({ children, pageNumber, isActive, ...rest }) => (
  <A
    href={`?page=${pageNumber}`}
    {...(isActive && { isActive: true, 'aria-current': 'page' })}
    {...rest}
  >
    {children}
  </A>
);

const LeftArrow = ({ activePage }) => (
  <Block as="span" visibility={VISIBILITY.ALL}>
    <LinkComponent
      pageNumber={activePage - 1}
      aria-labelledby="pagination-previous-page"
    >
      <span id="pagination-previous-page">
        <LeftChevron />
        <VisuallyHiddenText>Previous page</VisuallyHiddenText>
      </span>
    </LinkComponent>
  </Block>
);

const RightArrow = ({ activePage }) => (
  <Block as="span" visibility={VISIBILITY.ALL}>
    <LinkComponent
      pageNumber={activePage + 1}
      aria-labelledby="pagination-next-page"
    >
      <span id="pagination-next-page">
        <VisuallyHiddenText>Next page</VisuallyHiddenText>
        <RightChevron />
      </span>
    </LinkComponent>
  </Block>
);

const renderBlock = ({
  service,
  activePage,
  type,
  pageNumber,
  key,
  visibility,
}) => {
  if (type === TYPE.NUMBER) {
    return (
      <Block service={service} key={key} visibility={visibility}>
        <LinkComponent
          isActive={pageNumber === activePage}
          pageNumber={pageNumber}
        >
          {pageNumber}
        </LinkComponent>
      </Block>
    );
  }

  return (
    <EllipsisBlock
      role="separator"
      data-testid="topic-pagination-ellipsis"
      key={key}
      visibility={visibility}
    >
      <Ellipsis />
    </EllipsisBlock>
  );
};
/* eslint-enable react/prop-types */

const Pagination = ({ activePage, pageCount }) => {
  const { service } = useContext(ServiceContext);
  const blocks = buildBlocks(activePage, pageCount);
  if (!blocks) return null;

  const showLeftArrow = activePage > 1;
  const showRightArrow = activePage < pageCount;

  return (
    <Nav role="navigation" aria-label="Page" data-testid="topic-pagination">
      {showLeftArrow && <LeftArrow activePage={activePage} />}
      <TextSummary
        service={service}
        data-testid="topic-pagination-summary"
        // eslint-disable-next-line jsx-a11y/aria-role
        role="text"
      >
        Page <b>{activePage}</b> of <b>{pageCount}</b>
      </TextSummary>
      <StyledUnorderedList role="list">
        {blocks.map(block => renderBlock({ ...block, activePage, service }))}
      </StyledUnorderedList>
      {showRightArrow && <RightArrow activePage={activePage} />}
    </Nav>
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
