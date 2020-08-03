import loggerMock from '#testHelpers/loggerMock'; // Must be imported before convertInclude

import convertInclude from '.';
import pageData from './fixtures';
import { INCLUDE_MISSING_URL, INCLUDE_UNSUPPORTED } from '#lib/logger.const';

import * as fetchMarkup from './fetchMarkup';
import * as getImageBlock from './getImageBlock';

const includeMarkup = `<div>INCLUDE Markup</div><script type="text/javascript" src="localhost/idt1.js"></script>`;

const canonicalPathname = 'https://www.bbc.com/service/foo';

const ampPathname = 'https://www.bbc.com/service/foo.amp';

const [
  idt1Block,
  idt2Block,
  vjBlock,
  unsupportedIncludeBlock,
  noHrefIncludeBlock,
  vjAmpSupportedBlock,
  vjAmpNoSupportBlock,
] = pageData.content.blocks;

const runUnsupportedBlockAssertions = () => {
  expect(loggerMock.error).not.toHaveBeenCalled();
  expect(loggerMock.info).toHaveBeenCalledTimes(1);
  expect(loggerMock.info).toBeCalledWith(INCLUDE_UNSUPPORTED, {
    type: 'include',
    classification: 'not-supported',
    url: '/idt3/111-222-333-444-555',
  });
};

const runNoHrefBlockAssertions = () => {
  expect(loggerMock.info).not.toHaveBeenCalled();
  expect(loggerMock.error).toHaveBeenCalledTimes(1);
  expect(loggerMock.error).toHaveBeenCalledWith(INCLUDE_MISSING_URL, {
    required: false,
    tile: 'An include with no href',
    href: null,
    platform: 'highweb',
    type: 'include',
  });
};

const expectations = [
  {
    block: idt1Block,
    pathname: canonicalPathname,
    expectation: 'a valid IDT1 block on canonical',
  },
  {
    block: idt2Block,
    pathname: canonicalPathname,
    expectation: 'a valid IDT2 block on canonical',
  },
  {
    block: vjBlock,
    pathname: canonicalPathname,
    expectation: 'a valid VJ block on canonical',
  },
  {
    block: unsupportedIncludeBlock,
    pathname: canonicalPathname,
    expectation: 'null for non-supported include block on canonical',
    runAdditionalExpectations: runUnsupportedBlockAssertions,
  },
  {
    block: noHrefIncludeBlock,
    pathname: canonicalPathname,
    expectation: 'null include block without href on canonical',
    runAdditionalExpectations: runNoHrefBlockAssertions,
  },
  {
    block: vjAmpSupportedBlock,
    pathname: ampPathname,
    expectation: 'a valid VJ supported block on amp',
  },
  {
    block: vjAmpNoSupportBlock,
    pathname: ampPathname,
    expectation: 'null non-supported VJ block on amp',
  },
];

describe('Convert Include block', () => {
  const initialIncludesBaseUrl = process.env.SIMORGH_INCLUDES_BASE_URL;
  const initialIncludesAmpBaseUrl = process.env.SIMORGH_INCLUDES_BASE_AMP_URL;

  beforeEach(() => {
    process.env.SIMORGH_INCLUDES_BASE_URL = 'https://foobar.com/includes';
    process.env.SIMORGH_INCLUDES_BASE_AMP_URL = 'https://news.files.bbci.co.uk';
  });

  afterEach(() => {
    fetch.resetMocks();
    loggerMock.error.mockClear();
    loggerMock.info.mockClear();
    process.env.SIMORGH_INCLUDES_BASE_URL = initialIncludesBaseUrl;
    process.env.SIMORGH_INCLUDES_BASE_AMP_URL = initialIncludesAmpBaseUrl;
  });

  describe('Data dependent conditions', () => {
    beforeEach(() => {
      fetchMarkup.default = jest.fn().mockReturnValue(includeMarkup);
    });
    expectations.forEach(
      ({
        block,
        pathname,
        expectation,
        runAdditionalExpectations = () => {},
      }) => {
        it(`should return ${expectation}`, async () => {
          fetch.mockResponse(() => Promise.resolve(includeMarkup));
          expect(
            await convertInclude(block, pageData, null, pathname),
          ).toMatchSnapshot();
          runAdditionalExpectations();
        });
      },
    );
  });

  describe('Special conditions', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });
    it(`when fetchMarkup returns null`, async () => {
      fetchMarkup.default = jest.fn().mockReturnValue(null);
      expect(
        await convertInclude(idt2Block, pageData, null, canonicalPathname),
      ).toMatchSnapshot();
    });

    it(`when getImageBlock returns null`, async () => {
      getImageBlock.default = jest.fn().mockReturnValue(null);
      fetchMarkup.default = jest.fn().mockReturnValue(includeMarkup);
      expect(
        await convertInclude(idt2Block, pageData, null, canonicalPathname),
      ).toMatchSnapshot();
    });
  });
});
