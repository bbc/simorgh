import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { number, string } from 'prop-types';
import VisuallyHiddenText from '#psammead/psammead-visually-hidden-text/src';
import {
  getSansRegular,
  getSansBold,
} from '#psammead/psammead-styles/src/font-styles';

import {
  C_GREY_5,
  C_GREY_10,
  C_GREY_6,
  C_POSTBOX,
} from '#psammead/psammead-styles/src/colours';

import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  GEL_GROUP_1_SCREEN_WIDTH_MAX,
} from '#psammead/gel-foundations/src/breakpoints';
import { ServiceContext } from '../../../contexts/ServiceContext';

import buildBlocks, { TYPE, VISIBILITY } from './buildBlocks';
import { Ellipsis, LeftChevron, RightChevron } from '../../../components/icons';

const visibilityToMediaQuery = visibility =>
  ({
    [VISIBILITY.MOBILE_ONLY]: `display: none; @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
      display: inline-block;
    }`,
    [VISIBILITY.TABLET_DOWN]: `display: none; @media (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
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
  width: 2.75rem;
  height: 2.75rem;
  line-height: 2.75rem;
  text-align: center;
  margin: 0 0.125rem;
  svg {
    @media screen and (forced-colors: active) {
      fill: linkText;
    }
    fill: currentColor;
    width: 1rem;
    height: 1rem;
    position: relative;
    top: 0.2rem;
  }
`;

const EllipsisBlock = styled(Block)`
  color: ${C_GREY_5};
  svg {
    @media screen and (forced-colors: active) {
      fill: canvasText;
    }
  }
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

const PreviousArrow = ({ activePage, children, dir }) => (
  <Block as="span" visibility={VISIBILITY.ALL}>
    <LinkComponent
      pageNumber={activePage - 1}
      aria-labelledby="pagination-previous-page"
    >
      <span id="pagination-previous-page">
        {dir === 'ltr' ? <LeftChevron /> : <RightChevron />}
        <VisuallyHiddenText>{children}</VisuallyHiddenText>
      </span>
    </LinkComponent>
  </Block>
);

const NextArrow = ({ activePage, children, dir }) => (
  <Block as="span" visibility={VISIBILITY.ALL}>
    <LinkComponent
      pageNumber={activePage + 1}
      aria-labelledby="pagination-next-page"
    >
      <span id="pagination-next-page">
        <VisuallyHiddenText>{children}</VisuallyHiddenText>
        {dir === 'ltr' ? <RightChevron /> : <LeftChevron />}
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

const Pagination = ({
  activePage,
  pageCount,
  pageXOfY,
  previousPage,
  nextPage,
  page,
}) => {
  const { service, dir } = useContext(ServiceContext);
  const blocks = buildBlocks(activePage, pageCount);
  if (!blocks) return null;

  const tokenMapper = (token, key) =>
    ({
      '{x}': <b key={key}>{activePage}</b>,
      '{y}': <b key={key}>{pageCount}</b>,
    }[token] || <span key={key}>{token}</span>);

  const tokens = pageXOfY.split(/(\{.\})/).map(tokenMapper);

  const showPreviousArrow = activePage > 1;
  const showNextArrow = activePage < pageCount;

  return (
    <Nav role="navigation" aria-label={page} data-testid="topic-pagination">
      {showPreviousArrow && (
        <PreviousArrow activePage={activePage} dir={dir}>
          {previousPage}
        </PreviousArrow>
      )}
      <TextSummary
        service={service}
        data-testid="topic-pagination-summary"
        // eslint-disable-next-line jsx-a11y/aria-role
        role="text"
      >
        {tokens}
      </TextSummary>
      <StyledUnorderedList role="list">
        {blocks.map(block => renderBlock({ ...block, activePage, service }))}
      </StyledUnorderedList>
      {showNextArrow && (
        <NextArrow activePage={activePage} dir={dir}>
          {nextPage}
        </NextArrow>
      )}
    </Nav>
  );
};

Pagination.propTypes = {
  activePage: number,
  pageCount: number,
  pageXOfY: string,
  previousPage: string,
  nextPage: string,
  page: string,
};

Pagination.defaultProps = {
  activePage: 1,
  pageCount: 1,
  pageXOfY: 'Page {x} of {y}',
  previousPage: 'Previous Page',
  nextPage: 'Next Page',
  page: 'Page',
};

export default Pagination;
