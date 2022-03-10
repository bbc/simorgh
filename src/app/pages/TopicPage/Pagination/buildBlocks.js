export const STATE = {
  AVAILABLE: 'AVAILABLE',
  UNAVAILABLE: 'UNAVAILABLE',
  ACTIVE: 'ACTIVE',
};

export const TYPE = {
  ELLIPSIS: 'ELLIPSIS',
  LEFT_ARROW: 'LEFT_ARROW',
  RIGHT_ARROW: 'RIGHT_ARROW',
  NUMBER: 'NUMBER',
};

export const VISIBILITY = {
  ALL: 'ALL',
  MOBILE_ONLY: 'MOBILE_ONLY',
  TABLET_DOWN: 'TABLET_DOWN',
  TABLET_UP: 'TABLET_UP',
  DESKTOP_ONLY: 'DESKTOP_ONLY',
};

const createLeftArrow = currentPage => ({
  type: TYPE.LEFT_ARROW,
  visibility: VISIBILITY.ALL,
  state: currentPage === 1 ? STATE.DISABLED : STATE.AVAILABLE,
});

const createRightArrow = (currentPage, pageCount) => ({
  type: TYPE.RIGHT_ARROW,
  visibility: VISIBILITY.ALL,
  state: currentPage === pageCount ? STATE.DISABLED : STATE.AVAILABLE,
});

const createPage = ({ pageNumber, isCurrent, visibility = VISIBILITY.ALL }) => {
  return {
    type: TYPE.NUMBER,
    number: pageNumber,
    visibility,
    state: isCurrent ? STATE.ACTIVE : STATE.AVAILABLE,
  };
};

const createEllipsis = visibility => {
  if (!visibility) return null;
  return {
    type: TYPE.ELLIPSIS,
    visibility,
  };
};

const countDesktopBlocks = (currentPage, pageCount) => {
  if (currentPage >= 6 && pageCount - currentPage >= 5) return 9;
  return 8;
};

const countMobileBlocks = (currentPage, pageCount) => {
  if (currentPage >= 3 && pageCount - currentPage >= 2) return 5;
  return 4;
};

const showTwoEllipsisMobile = (currentPage, pageCount) => {
  return countMobileBlocks(currentPage, pageCount) === 5;
};

const showTwoEllipsisDesktop = (currentPage, pageCount) => {
  return countDesktopBlocks(currentPage, pageCount) === 9;
};

const determineEllipsisVisibility = ({
  distance,
  showTwoEllipsisOnMobile,
  showTwoEllipsisOnDesktop,
}) => {
  if (distance <= 2) return null;
  if (distance === 3 && showTwoEllipsisOnMobile) return VISIBILITY.MOBILE_ONLY;
  if (distance === 3) return null;
  if (distance === 4) return VISIBILITY.MOBILE_ONLY;
  if (distance === 5) return VISIBILITY.TABLET_DOWN;
  if (distance === 6 && showTwoEllipsisOnDesktop) return VISIBILITY.ALL;
  if (distance === 6) return VISIBILITY.TABLET_DOWN;
  return VISIBILITY.ALL;
};

const determinePageVisibility = ({
  currentPage,
  pageNumber,
  pageCount,
  hasEllipsis,
}) => {
  if (pageCount <= 4) return VISIBILITY.ALL;
  console.log('determiningPageVisibility', currentPage, pageNumber, pageCount);
  const distanceBetweenPages = Math.abs(currentPage - pageNumber);
  const distanceToEdge = Math.min(pageNumber, pageCount - pageNumber);
  const currentPageOnEdge = currentPage === 1 || currentPage === pageCount;
  console.log('distanceBetween', distanceBetweenPages);
  console.log('distanceToEdge', distanceToEdge);
  if (currentPageOnEdge && distanceBetweenPages === 1) return VISIBILITY.ALL;
  // if (distanceBetweenPages === 1 && distanceToEdge === 2) return VISIBILITY.ALL;
  if (distanceBetweenPages === 1 && !hasEllipsis) return VISIBILITY.ALL;
  return VISIBILITY.TABLET_UP;
};

const createLeftEllipsis = (currentPage, pageCount) =>
  createEllipsis(
    determineEllipsisVisibility({
      distance: currentPage,
      showTwoEllipsisOnMobile: showTwoEllipsisMobile(currentPage, pageCount),
      showTwoEllipsisOnDesktop: showTwoEllipsisDesktop(currentPage, pageCount),
    }),
  );

const createRightEllipsis = (currentPage, pageCount) =>
  createEllipsis(
    determineEllipsisVisibility({
      distance: pageCount - currentPage,
      showTwoEllipsisOnMobile: showTwoEllipsisMobile(currentPage, pageCount),
      showTwoEllipsisOnDesktop: showTwoEllipsisDesktop(currentPage, pageCount),
    }),
  );

// Determine how many additional blocks are displayed to the left and right of the current page
const determineSurroundingNumbers = (
  currentPage,
  pageCount,
  availableBlocks,
) => {
  const spaceOnLeft = currentPage - 1;
  const spaceOnRight = pageCount - currentPage - 1;

  const proportionLeft = Math.ceil(
    (Math.min(3, spaceOnLeft) /
      (Math.min(3, spaceOnLeft) + Math.min(3, spaceOnRight))) *
      availableBlocks,
  );

  const proportionRight = availableBlocks - proportionLeft;

  return [proportionLeft, proportionRight];
};

const createIntermediatePages = ({
  currentPage,
  pageCount,
  hasLeftEllipsis,
  hasRightEllipsis,
}) => {
  // There are no intermediate pages if the pageCount is 2
  if (pageCount <= 2) return [];

  const returnValue = [];

  // we can have a maximum of 8 numbered pages
  // this is reduced by 3 because we're always showing the 1st, last, and current number
  let availableBlocks = Math.min(pageCount, 8) - 3;

  // We can recover a block if the current page is either the first or last page
  if (currentPage === 1 || currentPage === pageCount) {
    availableBlocks += 1;
  } else {
    // Otherwise, lets insert it
    returnValue.push(createPage({ pageNumber: currentPage, isCurrent: true }));
  }

  // Space is reduced by 1 if we're showing at least one ellipsis
  // if (hasLeftEllipsis || hasRightEllipsis) availableBlocks -= 1;

  // Determining what proportion of the available space is used to the left and right of the current page
  const [proportionLeft, proportionRight] = determineSurroundingNumbers(
    currentPage,
    pageCount,
    availableBlocks,
  );

  returnValue.unshift(
    ...Array(proportionLeft)
      .fill()
      .map((_, index) => {
        const pageNumber = currentPage - (proportionLeft - index);
        return createPage({
          pageNumber,
          visibility: determinePageVisibility({
            currentPage,
            pageNumber,
            pageCount,
            hasEllipsis: hasLeftEllipsis || hasRightEllipsis,
          }),
        });
      }),
  );

  returnValue.push(
    ...Array(proportionRight)
      .fill()
      .map((_, index) => {
        const pageNumber = currentPage + (index + 1);
        return createPage({
          pageNumber,
          visibility: determinePageVisibility({
            currentPage,
            pageNumber,
            pageCount,
            hasEllipsis: hasLeftEllipsis || hasRightEllipsis,
          }),
        });
      }),
  );

  /*
  console.log('currentPage', currentPage, 'pageCount', pageCount);
  console.log('proportionLeft', proportionLeft);
  console.log('proportionRight', proportionRight);
  console.log('availableBlocks', availableBlocks);
  */

  return returnValue;
};

const buildBlocks = (currentPage, pageCount) => {
  if (pageCount <= 1) return null;
  const leftEllipsis = createLeftEllipsis(currentPage, pageCount);
  const rightEllipsis = createRightEllipsis(currentPage, pageCount);

  return [
    createLeftArrow(currentPage),
    createPage({ pageNumber: 1, isCurrent: currentPage === 1 }),
    leftEllipsis,
    ...createIntermediatePages({
      currentPage,
      pageCount,
      hasLeftEllipsis: Boolean(leftEllipsis),
      hasRightEllipsis: Boolean(rightEllipsis),
    }),
    rightEllipsis,
    createPage({ pageNumber: pageCount, isCurrent: currentPage === pageCount }),
    createRightArrow(currentPage, pageCount),
  ].filter(Boolean);
};

export default buildBlocks;
