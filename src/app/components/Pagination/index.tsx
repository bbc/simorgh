import React, { PropsWithChildren, use } from 'react';
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

const visibilityToClasses = (visibility: string) => {
  const visibilityMap = {
    [VISIBILITY.MOBILE_ONLY]: 'hidden group-2:inline-block group-3:hidden',
    [VISIBILITY.TABLET_DOWN]: 'hidden group-3:inline-block group-4:hidden',
    [VISIBILITY.TABLET_UP]: 'hidden group-3:inline-block',
    [VISIBILITY.DESKTOP_ONLY]: 'hidden group-4:inline-block',
    [VISIBILITY.ALL]: 'inline-block',
  };
  return visibilityMap[visibility] || 'hidden';
};

const LinkComponent = ({
  children,
  pageNumber,
  isActive,
  ...rest
}: PropsWithChildren<LinkComponentProps>) => (
  <a
    className={`block h-full w-full no-underline ${
      isActive
        ? 'text-grey-10 px-2.5 py-1 border-b-4 border-postbox hover:p-0 hover:border hover:border-postbox hover:border-b-4 focus:p-0 focus:border focus:border-postbox focus:border-b-4'
        : 'text-grey-10 p-1 hover:p-0 hover:border hover:border-postbox focus:p-0 focus:border focus:border-postbox'
    } focusIndicatorOutlineBlack`}
    href={`?page=${pageNumber}`}
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
  <span className={`font-sans-bold w-11 h-11 leading-11 text-center mx-0.5 ${visibilityToClasses(VISIBILITY.ALL)}`}>
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
  <span className={`font-sans-bold w-11 h-11 leading-11 text-center mx-0.5 ${visibilityToClasses(VISIBILITY.ALL)}`}>
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
        className={`font-sans-bold w-11 h-11 leading-11 text-center mx-0.5 ${visibilityToClasses(visibility)}`}
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
      className={`font-sans-bold w-11 h-11 leading-11 text-center mx-0.5 text-grey-5 ${visibilityToClasses(visibility)}`}
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
  const { dir } = use(ServiceContext);
  const { pageType } = use(RequestContext);
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
      className={`block mx-auto text-center ${
        isLive ? 'mb-8' : 'mb-10'
      }`}
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
        className="font-sans-regular text-grey-6 inline-block mx-5.5 group-2:hidden"
        data-testid="topic-pagination-summary"
        // eslint-disable-next-line jsx-a11y/aria-role
        role="text"
      >
        {tokens}
      </div>
      <ul
        className="inline-block list-none p-0 m-0 relative top-0.5 text-center group-1:hidden"
        role="list"
      >
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
