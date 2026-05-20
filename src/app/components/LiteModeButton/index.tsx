import { use } from 'react';
import { RequestContext } from '#app/contexts/RequestContext';
import { MEDIA_ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import CallToActionLink from '../CallToActionLink';
import style from './index.styles';

export default () => {
  const { canonicalLink, isLite, pageType } = use(RequestContext);
  const liteLink = `${canonicalLink}.lite`;

  if (pageType === MEDIA_ARTICLE_PAGE) {
    return null;
  }

  return (
    <CallToActionLink
      url={isLite ? canonicalLink : liteLink}
      {...(isLite && { 'data-ignore-lite': true })}
      css={style.container}
    >
      <span css={[style.mode, !isLite && style.on]}>Pro</span>
      <span css={[style.mode, isLite && style.on]}>Lite</span>
    </CallToActionLink>
  );
};
