import { AUDIO_PAGE, ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import derivePageType from '#utilities/derivePageType';
import transformAnchorTags from '#utilities/transformAnchorTags';

export default transformAnchorTags({
  extension: 'app',
  isEligiblePath: pathname => {
    const pageType = derivePageType(pathname);

    return pageType === ARTICLE_PAGE || pageType === AUDIO_PAGE;
  },
});
