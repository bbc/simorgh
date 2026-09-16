import { PageTypes } from '#app/models/types/global';
import {
  LIVE_TV_PAGE,
  MEDIA_ARTICLE_PAGE,
  TOPIC_PAGE,
  TV_PAGE,
} from '#app/routes/utils/pageTypes';

export default ({
  pageType,
  primaryMediaType,
}: {
  pageType: PageTypes;
  primaryMediaType?: string | null;
}) =>
  (primaryMediaType === 'video' && pageType === TOPIC_PAGE) ||
  ([MEDIA_ARTICLE_PAGE, TV_PAGE, LIVE_TV_PAGE] as PageTypes[]).includes(
    pageType,
  );
