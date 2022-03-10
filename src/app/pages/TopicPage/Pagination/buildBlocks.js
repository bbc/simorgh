export const AVAILABILITY = {
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

let state;

// this can be generalised and moved out of here
const findNClosestIndices = n => {
  const results = [];
  let leftPointer = state.activePageIndex - 1;
  let rightPointer = state.activePageIndex + 1;

  while (leftPointer > 0 || rightPointer < state.result.length) {
    const searchLeft = leftPointer > 0;
    if (searchLeft > 0 && !state.result[leftPointer].visibility) {
      results.push(leftPointer);
    }

    const searchRight = rightPointer < state.result.length;
    if (searchRight && !state.result[rightPointer].visibility) {
      results.push(rightPointer);
    }

    if (results.length >= n) break;
    leftPointer -= 1;
    rightPointer += 1;
  }
  return results.slice(0, n).filter(Boolean);
};

const createPage = index => {
  const isActivePage = index + 1 === state.activePage;
  if (isActivePage) {
    state.activePageIndex = index;
  }
  return {
    type: TYPE.NUMBER,
    pageNumber: index + 1,
    availability: isActivePage ? AVAILABILITY.ACTIVE : AVAILABILITY.AVAILABLE,
  };
};

const setRequiredVisibility = () => {
  state.result[0].visibility = VISIBILITY.ALL;
  state.result[state.activePageIndex].visibility = VISIBILITY.ALL;
  state.result[state.activePageIndex].availability = AVAILABILITY.ACTIVE;
  state.result[state.result.length - 1].visibility = VISIBILITY.ALL;
};

const setDynamicVisibility = () => {
  const iterations = [
    [VISIBILITY.ALL, state.activePageOnEdge ? 1 : 0],
    [VISIBILITY.TABLET_UP, state.activePageOnEdge ? 1 : 2],
    [VISIBILITY.DESKTOP_ONLY, 4],
  ];

  iterations.forEach(([deviceSize, additionalPagesToShow]) =>
    findNClosestIndices(additionalPagesToShow).forEach(index => {
      if (index < state.activePageIndex) {
        state.highestVisibilityOnLeft = deviceSize;
      } else {
        state.highestVisibilityOnRight = deviceSize;
      }
      state.result[index].visibility = deviceSize;
    }),
  );
};

const pruneInvisible = () => {
  state.result = state.result.filter((page, index) => {
    if (!page.visibility) {
      if (index < state.activePageIndex) {
        state.pagesTruncatedOnLeft = true;
      } else {
        state.pagesTruncatedOnRight = true;
      }
      return false;
    }
    return true;
  });
};

const getEllipsisVisibility = side => {
  const wasTruncated =
    side === 'left' ? state.pagesTruncatedOnLeft : state.pagesTruncatedOnRight;
  if (wasTruncated) return VISIBILITY.ALL;

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

const insertEllipsis = () => {
  const leftEllipsisVisibility = getEllipsisVisibility('left');
  const rightEllipsisVisibility = getEllipsisVisibility('right');
  if (leftEllipsisVisibility) {
    state.result.splice(1, 0, {
      type: TYPE.ELLIPSIS,
      visibility: leftEllipsisVisibility,
      side: 'left',
    });
  }

  if (rightEllipsisVisibility) {
    state.result.splice(state.result.length - 1, 0, {
      type: TYPE.ELLIPSIS,
      visibility: rightEllipsisVisibility,
      side: 'right',
    });
  }
};

const insertArrows = () => {
  state.result.unshift({
    type: TYPE.LEFT_ARROW,
    visibility: VISIBILITY.ALL,
    availability:
      state.activePage === 1
        ? AVAILABILITY.UNAVAILABLE
        : AVAILABILITY.AVAILABLE,
  });
  state.result.push({
    type: TYPE.RIGHT_ARROW,
    visibility: VISIBILITY.ALL,
    availability:
      state.activePage === state.pageCount
        ? AVAILABILITY.UNAVAILABLE
        : AVAILABILITY.AVAILABLE,
  });
};

const addKeys = () =>
  state.result.forEach((result, i) => {
    // eslint-disable-next-line no-param-reassign
    result.key = i;
  });

const buildBlocks = (activePage, pageCount) => {
  if (pageCount <= 1) return null;
  state = {
    activePage,
    pageCount,
    activePageOnEdge: activePage === 1 || activePage === pageCount,
  };
  state.result = Array(pageCount)
    .fill()
    .map((_, i) => createPage(i));

  setRequiredVisibility();
  setDynamicVisibility();
  pruneInvisible();
  insertEllipsis();
  insertArrows();
  addKeys();

  return state.result;
};

export default buildBlocks;
