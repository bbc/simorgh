import getArticleAtiParams from './article';
import getFrontPageAtiParams from './frontpage';
import getMediaPageAtiParams from './media';

export const buildATIParams = ({ pageType, data }) => {
  const pageTypeHandlers = {
    article: getArticleAtiParams,
    frontPage: getFrontPageAtiParams,
    media: getMediaPageAtiParams,
  };

  const isValidPageType = Object.keys(pageTypeHandlers).includes(pageType);
  if (!isValidPageType) {
    return null;
  }

  return pageTypeHandlers[pageType](data);
};

export default buildATIParams;
