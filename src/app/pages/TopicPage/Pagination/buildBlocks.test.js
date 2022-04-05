import buildBlocks, { TYPE, VISIBILITY } from './buildBlocks';

const DEVICE = {
  MOBILE: 'MOBILE',
  TABLET: 'TABLET',
  DESKTOP: 'DESKTOP',
};

export const isVisibleOnMobile = block =>
  [VISIBILITY.MOBILE_ONLY, VISIBILITY.TABLET_DOWN, VISIBILITY.ALL].includes(
    block.visibility,
  );

export const isVisibleOnTablet = block =>
  [VISIBILITY.TABLET_DOWN, VISIBILITY.TABLET_UP, VISIBILITY.ALL].includes(
    block.visibility,
  );

export const isVisibleOnDesktop = block =>
  [VISIBILITY.DESKTOP_ONLY, VISIBILITY.TABLET_UP, VISIBILITY.ALL].includes(
    block.visibility,
  );

const isVisible = (block, device) =>
  ({
    [DEVICE.MOBILE]: isVisibleOnMobile,
    [DEVICE.TABLET]: isVisibleOnTablet,
    [DEVICE.DESKTOP]: isVisibleOnDesktop,
  }[device](block));

const validate = ({
  output,
  expectedOutput,
  device,
  currentPage,
  pageCount,
}) => {
  if (!output && !expectedOutput) return true;
  const filteredBlocks = output.filter(block => isVisible(block, device));
  const compareBlock = (i, expected, actual) => {
    if (expected === '<' && actual[i].type === TYPE.LEFT_ARROW) {
      return true;
    }
    if (expected === '>' && actual[i].type === TYPE.RIGHT_ARROW) {
      return true;
    }
    if (expected === '.' && actual[i].type === TYPE.ELLIPSIS) {
      return true;
    }
    if (expected === actual[i].pageNumber) {
      return true;
    }
    throw new Error(
      `On ${device}, given currentPage ${currentPage} and pageCount ${pageCount}, expected block ${i} to be ${expected} but got ${JSON.stringify(
        actual[i],
      )}`,
    );
  };

  return expectedOutput.every((block, i) =>
    compareBlock(i, block, filteredBlocks),
  );
};

const smallPageCounts = [
  {
    currentPage: 1,
    pageCount: 1,
    mobileOutput: null,
    tabletOutput: null,
    desktopOutput: null,
  },
  {
    currentPage: 1,
    pageCount: 2,
    mobileOutput: ['<', 1, 2, '>'],
    tabletOutput: ['<', 1, 2, '>'],
    desktopOutput: ['<', 1, 2, '>'],
  },
  {
    currentPage: 1,
    pageCount: 4,
    mobileOutput: ['<', 1, 2, '.', 4, '>'],
    tabletOutput: ['<', 1, 2, 3, 4, '>'],
    desktopOutput: ['<', 1, 2, 3, 4, '>'],
  },
  {
    currentPage: 3,
    pageCount: 4,
    mobileOutput: ['<', 1, '.', 3, 4, '>'],
    tabletOutput: ['<', 1, 2, 3, 4, '>'],
    desktopOutput: ['<', 1, 2, 3, 4, '>'],
  },
];

const bigPageCounts = [
  {
    currentPage: 1,
    pageCount: 100,
    mobileOutput: ['<', 1, 2, '.', 100, '>'],
    tabletOutput: ['<', 1, 2, 3, '.', 100, '>'],
    desktopOutput: ['<', 1, 2, 3, 4, 5, 6, 7, '.', 100, '>'],
  },
  {
    currentPage: 2,
    pageCount: 100,
    mobileOutput: ['<', 1, 2, '.', 100, '>'],
    tabletOutput: ['<', 1, 2, 3, 4, '.', 100, '>'],
    desktopOutput: ['<', 1, 2, 3, 4, 5, 6, 7, 8, '.', 100, '>'],
  },
  {
    currentPage: 50,
    pageCount: 100,
    mobileOutput: ['<', 1, '.', 50, '.', 100, '>'],
    tabletOutput: ['<', 1, '.', 49, 50, 51, '.', 100, '>'],
    desktopOutput: ['<', 1, '.', 47, 48, 49, 50, 51, 52, 53, '.', 100, '>'],
  },
  {
    currentPage: 99,
    pageCount: 100,
    mobileOutput: ['<', 1, '.', 99, 100, '>'],
    tabletOutput: ['<', 1, '.', 97, 98, 99, 100, '>'],
    desktopOutput: ['<', 1, '.', 93, 94, 95, 96, 97, 98, 99, 100, '>'],
  },
  {
    currentPage: 100,
    pageCount: 100,
    mobileOutput: ['<', 1, '.', 99, 100, '>'],
    tabletOutput: ['<', 1, '.', 98, 99, 100, '>'],
    desktopOutput: ['<', 1, '.', 94, 95, 96, 97, 98, 99, 100, '>'],
  },
];

const tests = [...smallPageCounts, ...bigPageCounts];

describe('Topic Pagination', () => {
  it('outputs correct blocks', () => {
    tests.forEach(
      ({
        currentPage,
        pageCount,
        mobileOutput,
        tabletOutput,
        desktopOutput,
      }) => {
        const output = buildBlocks(currentPage, pageCount);

        expect(
          validate({
            currentPage,
            pageCount,
            device: DEVICE.MOBILE,
            output,
            expectedOutput: mobileOutput,
          }),
        ).toBe(true);
        expect(
          validate({
            currentPage,
            pageCount,
            device: DEVICE.TABLET,
            output,
            expectedOutput: tabletOutput,
          }),
        ).toBe(true);
        expect(
          validate({
            currentPage,
            pageCount,
            device: DEVICE.DESKTOP,
            output,
            expectedOutput: desktopOutput,
          }),
        ).toBe(true);
      },
    );
  });
});
