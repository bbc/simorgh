import path from 'ramda/src/path';
import { INCLUDE_MISSING_URL, INCLUDE_UNSUPPORTED } from '#lib/logger.const';
import nodeLogger from '#lib/logger.node';
import isAmpPath from '#app/routes/utils/isAmpPath';
import ampMetadataExtractor from './ampMetadataExtractor';
import includeClassifier from './includeClassifier';
import getImageBlock from './getImageBlock';

import buildIncludeUrl from './buildIncludeUrl';
import fetchMarkup from './fetchMarkup';

import { isAmpSupported, getIncludeBlockIndex } from './utils';

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
  const assetId = path(['metadata', 'id'], pageData);

  const isAmp = isAmpPath(pathname);

  const { includeType, classification } = includeClassifier({
    href,
    isAmpRequest: isAmp,
  });

  if (classification === 'not-supported') {
    logger.info(INCLUDE_UNSUPPORTED, {
      type,
      classification,
      url: href,
    });
    return null;
  }

  let ampMetadata;
  let html;

  if (classification === 'vj-supports-amp') {
    ampMetadata = ampMetadataExtractor(
      href,
      process.env.SIMORGH_INCLUDES_BASE_AMP_URL,
    );
  }

  if (!isAmp) {
    html = await fetchMarkup(
      buildIncludeUrl(href, includeType, pathname),
      assetId,
    );
  }

  const imageBlock = getImageBlock(includeType, includeBlock, isAmp);
  return {
    type,
    model: {
      href,
      index: getIncludeBlockIndex(blocks, includeBlock),
      type: includeType,
      isAmpSupported: isAmpSupported(classification),
      ...(ampMetadata && { ampMetadata }),
      ...(html && { html }),
      ...(imageBlock && { imageBlock }), // needed for IDT2 on both amp and canonical
    },
  };
};

export default convertInclude;
