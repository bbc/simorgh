/** @jsx jsx */
import { jsx } from '@emotion/react';
import { PropsWithChildren, useContext } from 'react';
import {
  GROUP_2_MIN_WIDTH_BP,
  GROUP_2_MAX_WIDTH_BP,
  GROUP_3_MIN_WIDTH_BP,
  GROUP_3_MAX_WIDTH_BP,
  GROUP_4_MIN_WIDTH_BP,
} from '#app/components/ThemeProvider/mediaQueries';
import { RequestContext } from '#app/contexts/RequestContext';
import { LIVE_PAGE } from '#app/routes/utils/pageTypes';
import { Direction } from '#app/models/types/global';
import { ServiceContext } from '../../contexts/ServiceContext';
import buildBlocks, { VISIBILITY } from './buildBlocks';
import { Ellipsis, LeftChevron, RightChevron } from '../icons';
import VisuallyHiddenText from '../VisuallyHiddenText';
import styles from './index.styles';

interface LinkComponentProps {
  pageNumber: number;
  isActive?: boolean;
}

interface ArrowProps {
  activePage: number;
  dir: Direction;
}

interface RenderBlockProps {
  type: string;
  pageNumber: number;
  key: number;
  visibility: string;
  activePage: number;
}

interface PaginationProps {
  activePage?: number;
  pageCount?: number;
  pageXOfY: string;
  previousPage: string;
  nextPage: string;
  page: string;
}

const visibilityToMediaQuery = (visibility: string) =>
  ({
    [VISIBILITY.MOBILE_ONLY]: `display: none; @media (min-width: ${GROUP_2_MIN_WIDTH_BP}rem) and (max-width: ${GROUP_2_MAX_WIDTH_BP}rem) {
      display: inline-block;
    }`,
    [VISIBILITY.TABLET_DOWN]: `display: none; @media (max-width: ${GROUP_3_MAX_WIDTH_BP}rem) {
      display: inline-block;
    }`,
    [VISIBILITY.TABLET_UP]: `display: none; @media (min-width: ${GROUP_3_MIN_WIDTH_BP}rem) {
      display: inline-block;
    }`,
    [VISIBILITY.DESKTOP_ONLY]: `display: none; @media (min-width: ${GROUP_4_MIN_WIDTH_BP}rem) {
      display: inline-block;
    }`,
    [VISIBILITY.ALL]: `display: inline-block;`,
  })[visibility] || 'display: none;';

const LinkComponent = ({
  children,
  pageNumber,
  isActive,
  ...rest
}: PropsWithChildren<LinkComponentProps>) => (
  <a
    css={isActive ? styles.activeA : styles.inactiveA}
    href={`?page=${pageNumber}`}
    className="focusIndicatorOutlineBlack"
    {...(isActive && { 'aria-current': 'page' })}
    {...rest}
  >
    {children}
  </a>
);

const PreviousArrow = ({
  activePage,
  children,
  dir,
}: PropsWithChildren<ArrowProps>) => (
  <span css={() => [styles.block, visibilityToMediaQuery(VISIBILITY.ALL)]}>
    <LinkComponent
      pageNumber={activePage - 1}
      aria-labelledby="pagination-previous-page"
    >
      <span id="pagination-previous-page">
        {dir === 'ltr' ? <LeftChevron /> : <RightChevron />}
        <VisuallyHiddenText>{children}</VisuallyHiddenText>
      </span>
    </LinkComponent>
  </span>
);

const NextArrow = ({
  activePage,
  children,
  dir,
}: PropsWithChildren<ArrowProps>) => (
  <span css={() => [styles.block, visibilityToMediaQuery(VISIBILITY.ALL)]}>
    <LinkComponent
      pageNumber={activePage + 1}
      aria-labelledby="pagination-next-page"
    >
      <span id="pagination-next-page">
        <VisuallyHiddenText>{children}</VisuallyHiddenText>
        {dir === 'ltr' ? <RightChevron /> : <LeftChevron />}
      </span>
    </LinkComponent>
  </span>
);

const renderBlock = ({
  activePage,
  key,
  type,
  pageNumber,
  visibility,
}: RenderBlockProps) => {
  if (type === 'NUMBER') {
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

const Pagination = ({
  activePage = 1,
  pageCount = 1,
  pageXOfY = 'Page {x} of {y}',
  previousPage = 'Previous Page',
  nextPage = 'Next Page',
  page = 'Page',
}: PaginationProps) => {
  const { dir } = useContext(ServiceContext);
  const { pageType } = useContext(RequestContext);
  const blocks = buildBlocks(activePage, pageCount);
  const isLive = pageType === LIVE_PAGE;
  if (!blocks) return null;
  const tokenMapper = (token: string, key: number) =>
    ({
      '{x}': <b key={key}>{activePage}</b>,
      '{y}': <b key={key}>{pageCount}</b>,
    })[token] || <span key={key}>{token}</span>;

  const tokens = pageXOfY.split(/(\{.\})/).map(tokenMapper);

  const showPreviousArrow = activePage > 1;
  const showNextArrow = activePage < pageCount;

  return (
    <nav
      css={[styles.nav, isLive && styles.liveNavMargin]}
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
        {blocks.map(block => renderBlock({ ...block, activePage }))}
      </ul>
      {showNextArrow && (
        <NextArrow activePage={activePage} dir={dir}>
          {nextPage}
        </NextArrow>
      )}
    </nav>
  );
};

export default Pagination;
