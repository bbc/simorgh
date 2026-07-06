import { use } from 'react';
import { RequestContext } from '#app/contexts/RequestContext';
import { AUDIO_PAGE, MEDIA_ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import { PageTypes } from '#app/models/types/global';
import { ServiceContext } from '#app/contexts/ServiceContext';
import pixelsToRem from '#app/utilities/pixelsToRem';
import CallToActionLink from '../../CallToActionLink';
import style from './index.styles';
import defaultTranslations from '../../LiteSiteSummary/defaultTranslations';
import Text from '../../Text';

const ignoreList = [MEDIA_ARTICLE_PAGE, AUDIO_PAGE] as PageTypes[];

const InfoSvg = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={`${pixelsToRem(20)}rem`}
    height={`${pixelsToRem(20)}rem`}
    viewBox="0 0 32 32"
  >
    <path d="M16 31c8.5 0 15-6.5 15-15S24.5 1 16 1 1 7.5 1 16s6.5 15 15 15m-2.2-5.5V12.7h4.4v12.9h-4.4zM16 10c-1.7 0-2.7-.9-2.7-2.4s1-2.4 2.7-2.4 2.7.9 2.7 2.4-1 2.4-2.7 2.4" />
  </svg>
);

export default () => {
  const { canonicalLink, isLite, pageType } = use(RequestContext);
  const { translations } = use(ServiceContext);
  const { liteSite = defaultTranslations } = translations;
  const { informationPageLink } = liteSite;

  const clickTrackerHandler = useClickTrackerHandler({
    componentName: `switch-to-${isLite ? 'canonical' : 'lite'}`,
  });

  if (ignoreList.includes(pageType)) {
    return null;
  }

  const liteLink = `${canonicalLink}.lite`;
  const learnMore = 'Learn more.';
  const canonicalText = 'Classic';
  const liteText = 'Lite';
  return (
    <div
      css={[
        style.container,
        isLite ? style.liteBackground : style.standardBackground,
      ]}
    >
      <div css={style.onboardingContainer}>
        {/* <Text css={style.indicator} size="brevier" fontVariant="sansRegular">
          {isLite ? liteText : canonicalText} Mode
        </Text> */}
        <Text
          css={style.onboardingText}
          size="brevier"
          fontVariant="sansRegular"
        >
          You are now on the {isLite ? liteText : canonicalText} site
        </Text>
      </div>
      <div css={style.switchContainer}>
        {informationPageLink && (
          <CallToActionLink
            url={informationPageLink}
            alignWithMargin
            css={style.moreInfoLink}
          >
            <InfoSvg />
          </CallToActionLink>
        )}
        <CallToActionLink
          url={isLite ? canonicalLink : liteLink}
          {...(isLite && { 'data-ignore-lite': true })}
          css={[style.switch, isLite ? style.lite : style.canonical]}
          {...clickTrackerHandler}
        >
          <span>Go to {isLite ? 'Classic' : 'Lite'}</span>
        </CallToActionLink>
      </div>
    </div>
  );
};
