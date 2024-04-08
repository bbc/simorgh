import buildBlocks, { VISIBILITY, ResultItem } from './buildBlocks';

type ValidateProps = {
  output: Array<ResultItem> | null;
  expectedOutput: Array<number | '.'> | null;
  device: string;
  currentPage: number;
  pageCount: number;
};

type PageCountType = {
  currentPage: number;
  pageCount: number;
  mobileOutput: null | Array<number | '.'>;
  tabletOutput: null | Array<number | '.'>;
  desktopOutput: null | Array<number | '.'>;
};

const DEVICE = {
  MOBILE: 'MOBILE',
  TABLET: 'TABLET',
  DESKTOP: 'DESKTOP',
};

export const isVisibleOnMobile = (block: ResultItem) =>
  [VISIBILITY.MOBILE_ONLY, VISIBILITY.TABLET_DOWN, VISIBILITY.ALL].includes(
    block.visibility,
  );

export const isVisibleOnTablet = (block: ResultItem) =>
  [VISIBILITY.TABLET_DOWN, VISIBILITY.TABLET_UP, VISIBILITY.ALL].includes(
    block.visibility,
  );

export const isVisibleOnDesktop = (block: ResultItem) =>
  [VISIBILITY.DESKTOP_ONLY, VISIBILITY.TABLET_UP, VISIBILITY.ALL].includes(
    block.visibility,
  );

const isVisible = (block: ResultItem, device: string) =>
  ({
    [DEVICE.MOBILE]: isVisibleOnMobile,
    [DEVICE.TABLET]: isVisibleOnTablet,
    [DEVICE.DESKTOP]: isVisibleOnDesktop,
  })[device](block);

const validate = ({
  output,
  expectedOutput,
  device,
  currentPage,
  pageCount,
}: ValidateProps) => {
  if (output && expectedOutput) {
    const filteredBlocks = output.filter(block => isVisible(block, device));
    const compareBlock = (
      i: number,
      expected: number | '.',
      actual: Array<ResultItem>,
    ) => {
      if (expected === '.' && actual[i].type === 'ELLIPSIS') {
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
  }
  return true;
};

const smallPageCounts: Array<PageCountType> = [
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
    mobileOutput: [1, 2],
    tabletOutput: [1, 2],
    desktopOutput: [1, 2],
  },
  {
    currentPage: 1,
    pageCount: 4,
    mobileOutput: [1, 2, 3, 4],
    tabletOutput: [1, 2, 3, 4],
    desktopOutput: [1, 2, 3, 4],
  },
  {
    currentPage: 3,
    pageCount: 4,
    mobileOutput: [1, 2, 3, 4],
    tabletOutput: [1, 2, 3, 4],
    desktopOutput: [1, 2, 3, 4],
  },
  {
    currentPage: 2,
    pageCount: 5,
    mobileOutput: [1, 2, '.', 5],
    tabletOutput: [1, 2, 3, 4, 5],
    desktopOutput: [1, 2, 3, 4, 5],
  },
  {
    currentPage: 3,
    pageCount: 5,
    mobileOutput: [1, 2, 3, 4, 5],
    tabletOutput: [1, 2, 3, 4, 5],
    desktopOutput: [1, 2, 3, 4, 5],
  },
  {
    currentPage: 4,
    pageCount: 5,
    mobileOutput: [1, '.', 4, 5],
    tabletOutput: [1, 2, 3, 4, 5],
    desktopOutput: [1, 2, 3, 4, 5],
  },
  {
    currentPage: 4,
    pageCount: 7,
    mobileOutput: [1, '.', 4, '.', 7],
    tabletOutput: [1, 2, 3, 4, 5, 6, 7],
    desktopOutput: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    currentPage: 5,
    pageCount: 9,
    mobileOutput: [1, '.', 5, '.', 9],
    tabletOutput: [1, '.', 4, 5, 6, '.', 9],
    desktopOutput: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  },
  {
    currentPage: 6,
    pageCount: 11,
    mobileOutput: [1, '.', 6, '.', 11],
    tabletOutput: [1, '.', 5, 6, 7, '.', 11],
    desktopOutput: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
  },
  {
    currentPage: 7,
    pageCount: 13,
    mobileOutput: [1, '.', 7, '.', 13],
    tabletOutput: [1, '.', 6, 7, 8, '.', 13],
    desktopOutput: [1, '.', 4, 5, 6, 7, 8, 9, 10, '.', 13],
  },
];

const bigPageCounts: Array<PageCountType> = [
  {
    currentPage: 1,
    pageCount: 100,
    mobileOutput: [1, 2, '.', 100],
    tabletOutput: [1, 2, 3, '.', 100],
    desktopOutput: [1, 2, 3, 4, 5, 6, 7, '.', 100],
  },
  {
    currentPage: 2,
    pageCount: 100,
    mobileOutput: [1, 2, '.', 100],
    tabletOutput: [1, 2, 3, 4, '.', 100],
    desktopOutput: [1, 2, 3, 4, 5, 6, 7, 8, '.', 100],
  },
  {
    currentPage: 50,
    pageCount: 100,
    mobileOutput: [1, '.', 50, '.', 100],
    tabletOutput: [1, '.', 49, 50, 51, '.', 100],
    desktopOutput: [1, '.', 47, 48, 49, 50, 51, 52, 53, '.', 100],
  },
  {
    currentPage: 99,
    pageCount: 100,
    mobileOutput: [1, '.', 99, 100],
    tabletOutput: [1, '.', 97, 98, 99, 100],
    desktopOutput: [1, '.', 93, 94, 95, 96, 97, 98, 99, 100],
  },
  {
    currentPage: 100,
    pageCount: 100,
    mobileOutput: [1, '.', 99, 100],
    tabletOutput: [1, '.', 98, 99, 100],
    desktopOutput: [1, '.', 94, 95, 96, 97, 98, 99, 100],
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
