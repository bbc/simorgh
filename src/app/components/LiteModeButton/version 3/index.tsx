import { use } from 'react';
import { RequestContext } from '#app/contexts/RequestContext';
import { AUDIO_PAGE, MEDIA_ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import { PageTypes } from '#app/models/types/global';
import { ServiceContext } from '#app/contexts/ServiceContext';
import CallToActionLink from '../../CallToActionLink';
import style from './index.styles';
import defaultTranslations from '../../LiteSiteSummary/defaultTranslations';
import Text from '../../Text';

const ignoreList = [MEDIA_ARTICLE_PAGE, AUDIO_PAGE] as PageTypes[];

export default () => {
  const { canonicalLink, isLite, pageType } = use(RequestContext);
  const { translations } = use(ServiceContext);
  const { liteSite = defaultTranslations } = translations;
  const { informationPage, informationPageLink } = liteSite;

  const clickTrackerHandler = useClickTrackerHandler({
    componentName: `switch-to-${isLite ? 'canonical' : 'lite'}`,
  });

  if (ignoreList.includes(pageType)) {
    return null;
  }

  const liteLink = `${canonicalLink}.lite`;

  const onboardingMessage =
    'Lite loads a stripped back version of this page for faster loading times and lower data usage.';

  return (
    <div
      css={[
        style.container,
        isLite ? style.liteBackground : style.standardBackground,
      ]}
    >
      <div css={style.onboardingContainer}>
        {informationPageLink && (
          <CallToActionLink
            url={informationPageLink}
            alignWithMargin
            size="brevier"
            fontVariant="sansRegular"
          >
            <CallToActionLink.Text css={style.moreInfoLink}>
              {informationPage}
            </CallToActionLink.Text>
          </CallToActionLink>
        )}
      </div>
      <CallToActionLink
        url={isLite ? canonicalLink : liteLink}
        {...(isLite && { 'data-ignore-lite': true })}
        css={style.switch}
        {...clickTrackerHandler}
      >
        <span css={[style.mode, !isLite && style.on]}>Pro</span>
        <span css={[style.mode, isLite && style.on]}>Lite</span>
      </CallToActionLink>
    </div>
  );
};
