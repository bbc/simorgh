import path from 'ramda/src/path';
import { INCLUDE_MISSING_URL, INCLUDE_UNSUPPORTED } from '#lib/logger.const';
import nodeLogger from '#lib/logger.node';
import ampMetadataExtractor from './ampMetadataExtractor';
import includeClassifier from './includeClassifier';
import getImageBlock from './getImageBlock';
import isAmpPath from '#app/routes/utils/isAmpPath';

import buildIncludeUrl from './buildIncludeUrl';
import fetchMarkup from './fetchMarkup';

import { isAmpSupported, getIncludeIndex } from './utils';

const logger = nodeLogger(__filename);

const convertInclude = async (includeBlock, pageData, ...restParams) => {
  const { href, type } = includeBlock;

  if (!href) {
    logger.error(INCLUDE_MISSING_URL, includeBlock);
    return null;
  }

  // Here pathname is passed as a prop specifically for CPS includes
  // This will most likely change in issue #6784 so it is temporary for now
  const pathname = restParams[1];
  const blocks = path(['content', 'blocks'], pageData);

  const isAmp = isAmpPath(pathname);

  if (!href) {
    logger.error(INCLUDE_MISSING_URL, includeBlock);
    return null;
  }

  const { includeType, classification } = includeClassifier({ href, isAmp });

  if (classification === 'not-supported') {
    logger.info(INCLUDE_UNSUPPORTED, {
      type,
      classification,
      url: href,
    });
    return null;
  }

  const ampMetadata = ampMetadataExtractor(
    href,
    process.env.SIMORGH_INCLUDES_BASE_AMP_URL,
    classification,
  );
  const html =
    !isAmp && (await fetchMarkup(buildIncludeUrl(href, includeType, pathname)));

  const imageBlock = getImageBlock(includeType, includeBlock, isAmp);
  return {
    type,
    model: {
      href,
      index: getIncludeIndex(blocks, includeBlock),
      type: includeType,
      isAmpSupported: isAmpSupported(classification),
      ...(ampMetadata && { ampMetadata }),
      ...(html && { html }),
      ...(imageBlock && { imageBlock }), // needed for IDT2 on amp an canonical
    },
  };
};

export default convertInclude;
