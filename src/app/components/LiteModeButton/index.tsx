import { use } from 'react';
import { RequestContext } from '#app/contexts/RequestContext';
import { AUDIO_PAGE, MEDIA_ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import { PageTypes } from '#app/models/types/global';
import CallToActionLink from '../CallToActionLink';
import style from './index.styles';

const ignoreList = [MEDIA_ARTICLE_PAGE, AUDIO_PAGE] as PageTypes[];

export default () => {
  const { canonicalLink, isLite, pageType } = use(RequestContext);
  const clickTrackerHandler = useClickTrackerHandler({
    componentName: `switch-to-${isLite ? 'canonical' : 'lite'}`,
  });

  if (ignoreList.includes(pageType)) {
    return null;
  }

  const liteLink = `${canonicalLink}.lite`;

  return (
    <CallToActionLink
      url={isLite ? canonicalLink : liteLink}
      {...(isLite && { 'data-ignore-lite': true })}
      css={[style.container, style.containerWithAccount]}
      {...clickTrackerHandler}
    >
      <span css={[style.mode, !isLite && style.on]}>Classic</span>
      <span css={[style.mode, isLite && style.on]}>Lite</span>
    </CallToActionLink>
  );
};
