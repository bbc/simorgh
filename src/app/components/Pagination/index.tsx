/** @jsx jsx */
import { Theme, jsx } from '@emotion/react';
import React, { useContext } from 'react';
import { number, string } from 'prop-types';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#app/legacy/psammead/gel-foundations/src/breakpoints';
import { ServiceContext } from '../../contexts/ServiceContext';
import buildBlocks, { TYPE, VISIBILITY } from './buildBlocks';
import { Ellipsis, LeftChevron, RightChevron } from '../icons';
import VisuallyHiddenText from '../VisuallyHiddenText';
import styles from './index.styles';

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

/* eslint-disable react/prop-types */
const LinkComponent = ({ children, pageNumber, isActive, ...rest }) => (
  <a
    css={isActive ? styles.activeA : styles.inactiveA}
    href={`?page=${pageNumber}`}
    className="focusIndicatorOutlineBlack"
    {...(isActive && { isActive: true, 'aria-current': 'page' })}
    {...rest}
  >
    {children}
  </a>
);

const PreviousArrow = ({ activePage, children, dir }) => (
  <li
    css={() => [styles.block, visibilityToMediaQuery(VISIBILITY.ALL)]}
    as="span"
  >
    <LinkComponent
      pageNumber={activePage - 1}
      aria-labelledby="pagination-previous-page"
    >
      <span id="pagination-previous-page">
        {dir === 'ltr' ? <LeftChevron /> : <RightChevron />}
        <VisuallyHiddenText>{children}</VisuallyHiddenText>
      </span>
    </LinkComponent>
  </li>
);

const NextArrow = ({ activePage, children, dir }) => (
  <li
    css={() => [styles.block, visibilityToMediaQuery(VISIBILITY.ALL)]}
    as="span"
  >
    <LinkComponent
      pageNumber={activePage + 1}
      aria-labelledby="pagination-next-page"
    >
      <span id="pagination-next-page">
        <VisuallyHiddenText>{children}</VisuallyHiddenText>
        {dir === 'ltr' ? <RightChevron /> : <LeftChevron />}
      </span>
    </LinkComponent>
  </li>
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
      <li
        css={() => [styles.block, visibilityToMediaQuery(visibility)]}
        key={key}
      >
        <LinkComponent
          isActive={pageNumber === activePage}
          pageNumber={pageNumber}
        >
          {pageNumber}
        </LinkComponent>
      </li>
    );
  }

  return (
    <li
      css={() => [styles.elipsisBlock, visibilityToMediaQuery(visibility)]}
      role="separator"
      data-testid="topic-pagination-ellipsis"
      key={key}
    >
      <Ellipsis />
    </li>
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
    <nav
      css={styles.nav}
      role="navigation"
      aria-label={page}
      data-testid="topic-pagination"
    >
      {showPreviousArrow && (
        <PreviousArrow activePage={activePage} dir={dir}>
          {previousPage}
        </PreviousArrow>
      )}
      <div
        css={styles.textSummary}
        data-testid="topic-pagination-summary"
        // eslint-disable-next-line jsx-a11y/aria-role
        role="text"
      >
        {tokens}
      </div>
      <ul css={styles.unorderedList} role="list">
        {blocks.map(block => renderBlock({ ...block, activePage, service }))}
      </ul>
      {showNextArrow && (
        <NextArrow activePage={activePage} dir={dir}>
          {nextPage}
        </NextArrow>
      )}
    </nav>
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
