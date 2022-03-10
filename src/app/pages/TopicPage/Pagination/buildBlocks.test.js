import buildBlocks, { STATE, TYPE, VISIBILITY } from './buildBlocks';

const DEVICE = {
  MOBILE: 'MOBILE',
  TABLET: 'TABLET',
  DESKTOP: 'DESKTOP',
};

const isVisibleOnMobile = block =>
  [VISIBILITY.MOBILE_ONLY, VISIBILITY.TABLET_DOWN, VISIBILITY.ALL].includes(
    block.visibility,
  );

const isVisibleOnTablet = block =>
  [VISIBILITY.TABLET_DOWN, VISIBILITY.TABLET_UP, VISIBILITY.ALL].includes(
    block.visibility,
  );

const isVisibleOnDesktop = block =>
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
    if (expected === actual[i].number) {
      return true;
    }
    throw new Error(
      `On ${device}, given currentPage ${currentPage} and pageCount ${pageCount}, expected block ${i} to be ${expected} but got ${JSON.stringify(
        actual,
      )}`,
    );
  };

  return expectedOutput.every((block, i) =>
    compareBlock(i, block, filteredBlocks),
  );
};

const tests = [
  // Small page counts
  {
    currentPage: 1,
    pageCount: 1,
    expectedOutputMobile: null,
    expectedOutputTablet: null,
    expectedOutputDesktop: null,
  },
  {
    currentPage: 1,
    pageCount: 2,
    expectedOutputMobile: ['<', 1, 2, '>'],
    expectedOutputTablet: ['<', 1, 2, '>'],
    expectedOutputDesktop: ['<', 1, 2, '>'],
  },
  {
    currentPage: 1,
    pageCount: 4,
    expectedOutputMobile: ['<', 1, 2, 3, 4, '>'],
    expectedOutputTablet: ['<', 1, 2, 3, 4, '>'],
    expectedOutputDesktop: ['<', 1, 2, 3, 4, '>'],
  },
  {
    currentPage: 3,
    pageCount: 4,
    expectedOutputMobile: ['<', 1, 2, 3, 4, '>'],
    expectedOutputTablet: ['<', 1, 2, 3, 4, '>'],
    expectedOutputDesktop: ['<', 1, 2, 3, 4, '>'],
  },

  // Mobile ellipsis
  {
    currentPage: 1,
    pageCount: 5,
    expectedOutputMobile: ['<', 1, 2, '.', 5, '>'],
    expectedOutputTablet: ['<', 1, 2, 3, 4, 5, '>'],
    expectedOutputDesktop: ['<', 1, 2, 3, 4, 5, '>'],
  },
  {
    currentPage: 4,
    pageCount: 5,
    expectedOutputMobile: ['<', 1, '.', 4, 5, '>'],
    expectedOutputTablet: ['<', 1, 2, 3, 4, 5, '>'],
    expectedOutputDesktop: ['<', 1, 2, 3, 4, 5, '>'],
  },
  {
    debug: true,
    currentPage: 3,
    pageCount: 5,
    expectedOutputMobile: ['<', 1, '.', 3, '.', 5, '>'],
    expectedOutputTablet: ['<', 1, 2, 3, 4, 5, '>'],
    expectedOutputDesktop: ['<', 1, 2, 3, 4, 5, '>'],
  },
  {
    currentPage: 3,
    pageCount: 6,
    expectedOutputMobile: ['<', 1, '.', 3, '.', 6, '>'],
    expectedOutputTablet: ['<', 1, 2, 3, 4, 5, 6, '>'],
    expectedOutputDesktop: ['<', 1, 2, 3, 4, 5, 6, '>'],
  },
];

describe('Topic Pagination', () => {
  it('outputs correct blocks', () => {
    tests.forEach(
      ({
        currentPage,
        pageCount,
        expectedOutputMobile,
        expectedOutputTablet,
        expectedOutputDesktop,
        debug,
      }) => {
        const output = buildBlocks(currentPage, pageCount);
        if (debug) {
          console.log('Expectation', expectedOutputMobile);
          console.log('Actual', output);
        }
        expect(
          validate({
            currentPage,
            pageCount,
            device: DEVICE.MOBILE,
            output,
            expectedOutput: expectedOutputMobile,
          }),
        ).toBe(true);
        expect(
          validate({
            currentPage,
            pageCount,
            device: DEVICE.TABLET,
            output,
            expectedOutput: expectedOutputTablet,
          }),
        ).toBe(true);
        expect(
          validate({
            currentPage,
            pageCount,
            device: DEVICE.DESKTOP,
            output,
            expectedOutput: expectedOutputDesktop,
          }),
        ).toBe(true);
      },
    );
  });
});
