/* eslint-disable no-param-reassign */
import pipe from 'ramda/src/pipe';
import findNClosestIndices from '#lib/utilities/findNClosestIndicies';

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

// we're returning an array of page elements to be consumed by the renderer
const createPage = (index, state) => {
  const isActivePage = index + 1 === state.activePage;
  if (isActivePage) {
    state.activePageIndex = index;
  }
  return {
    type: TYPE.NUMBER,
    pageNumber: index + 1,
  };
};

// The first page, last page, and active page should always be visible
const setRequiredVisibility = state => {
  state.result[0].visibility = VISIBILITY.ALL;
  state.result[state.activePageIndex].visibility = VISIBILITY.ALL;
  state.result[state.result.length - 1].visibility = VISIBILITY.ALL;

  return state;
};

// Iteratively radiate out from the active page, setting the visibility of pages
// Pages closer to the active page are visible on more devices
const setDynamicVisibility = state => {
  const iterations = [
    [VISIBILITY.ALL, state.activePageOnEdge ? 1 : 0],
    [VISIBILITY.TABLET_UP, state.activePageOnEdge ? 1 : 2],
    [VISIBILITY.DESKTOP_ONLY, 4],
  ];

  iterations.forEach(([deviceSize, additionalPagesToShow]) =>
    findNClosestIndices({
      n: additionalPagesToShow,
      startingIndex: state.activePageIndex,
      predicate: e => !e.visibility,
      array: state.result,
    }).forEach(index => {
      // keeping track of the visibility level we are setting
      // this will help us determine on which devices we need to display an ellipsis
      if (index < state.activePageIndex) {
        state.highestVisibilityOnLeft = deviceSize;
      } else {
        state.highestVisibilityOnRight = deviceSize;
      }
      state.result[index].visibility = deviceSize;
    }),
  );

  return state;

  // TODO - if there is just a single number missing at a boundary, fill it in?
  // eg if we have 1, 2, 3, 5 - should we just add the 4?
  // Otherwise, we'll have an ellipsis being used to fill in a gap of only one number
};

// After setting the visibility of all the pages we want to show, we can remove the others
const pruneInvisible = state => {
  state.result = state.result.filter((page, index) => {
    if (!page.visibility) {
      // if an element is being filtered out, we need to remember we did this
      // this is so we can display an ellipsis in this position
      if (index < state.activePageIndex) {
        state.pagesTruncatedOnLeft = true;
      } else {
        state.pagesTruncatedOnRight = true;
      }
      return false;
    }
    return true;
  });

  return state;
};

// Determine the devices that an ellipsis is displayed on
const getEllipsisVisibility = (side, state) => {
  // If we pruned some pages on this side, we display an ellipsis on all devices
  const wasTruncated =
    side === 'left' ? state.pagesTruncatedOnLeft : state.pagesTruncatedOnRight;
  if (wasTruncated) return VISIBILITY.ALL;

  // Otherwise, the ellipsis visibility is based on the visibility of the page on that edge
  // eg, if page 2 is visible on all devices, there will never be an ellipsis on the left
  // if it is only visible on tablets and up, there will be an ellipsis on mobile
  const highestVisibility =
    side === 'left'
      ? state.highestVisibilityOnLeft
      : state.highestVisibilityOnRight;

  if (!highestVisibility || highestVisibility === VISIBILITY.ALL) return null;
  if (highestVisibility === VISIBILITY.TABLET_UP) return VISIBILITY.MOBILE_ONLY;
  if (highestVisibility === VISIBILITY.DESKTOP_ONLY)
    return VISIBILITY.TABLET_DOWN;
  return null;
};

// Conditionally adding the ellipsis blocks to our return value
const insertEllipsis = state => {
  const leftEllipsisVisibility = getEllipsisVisibility('left', state);
  const rightEllipsisVisibility = getEllipsisVisibility('right', state);
  if (leftEllipsisVisibility) {
    state.result.splice(1, 0, {
      type: TYPE.ELLIPSIS,
      visibility: leftEllipsisVisibility,
    });
  }

  if (rightEllipsisVisibility) {
    state.result.splice(state.result.length - 1, 0, {
      type: TYPE.ELLIPSIS,
      visibility: rightEllipsisVisibility,
    });
  }

  return state;
};

const addKeys = state => ({
  ...state,
  result: state.result.map((page, i) => ({ ...page, key: i })),
});

export default (activePage, pageCount) => {
  if (pageCount <= 1) return null;
  const initialState = {
    activePage,
    pageCount,
    activePageOnEdge: activePage === 1 || activePage === pageCount,
  };

  initialState.result = Array(pageCount)
    .fill()
    .map((_, i) => createPage(i, initialState));

  return pipe(
    setRequiredVisibility,
    setDynamicVisibility,
    pruneInvisible,
    insertEllipsis,
    addKeys,
  )(initialState).result;
};
