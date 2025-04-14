/** @jsx jsx */
import { jsx } from '@emotion/react';
import { useContext, MouseEvent } from 'react';
import pathOr from 'ramda/src/pathOr';

import { RequestContext } from '#app/contexts/RequestContext';
import { LIVE_PAGE } from '#app/routes/utils/pageTypes';
import Text from '../Text';
import Paragraph from '../Paragraph';
import { ServiceContext } from '../../contexts/ServiceContext';
import { Translations } from '../../models/types/translations';
import useViewTracker from '../../hooks/useViewTracker';

import consentBannerCss from './ConsentBanner.styles';
import { ConsentBannerProviders, getEventTrackingData } from '.';

type BannerUrls = {
  cookiesUrl: {
    [_key in ConsentBannerProviders]: string;
  };
  privacyUrl: {
    [_key in ConsentBannerProviders]: string;
  };
};

const BANNER_URLS: BannerUrls = {
  cookiesUrl: {
    youtube: 'https://policies.google.com/technologies/cookies',
    tiktok: 'https://www.tiktok.com/legal/cookie-policy',
    facebook: 'https://www.facebook.com/privacy/policies/cookies',
    instagram: 'https://privacycenter.instagram.com/policies/cookies/',
    twitter: 'https://help.x.com/en/rules-and-policies/x-cookies',
  },
  privacyUrl: {
    youtube: 'https://policies.google.com/privacy',
    tiktok: 'https://www.tiktok.com/legal/privacy-policy',
    facebook: 'https://www.facebook.com/privacy/policy/',
    instagram: 'https://privacycenter.instagram.com/policy',
    twitter: 'https://x.com/en/privacy',
  },
};

const DEFAULT_TRANSLATIONS: Translations['socialEmbed']['consentBanner'] = {
  heading: 'Allow [social_media_site] content?',
  body: `This article contains content provided by [social_media_site].  We ask for your permission before anything is loaded, as they may be using cookies and other technologies.  You may want to read [social_media_site] [link] cookie policy [/link] and [link] privacy policy [/link] before accepting. To view this content choose 'accept and continue'.`,
  button: 'Accept and continue',
};

const getProviderName = (provider: ConsentBannerProviders) => {
  return {
    youtube: 'Google YouTube',
    tiktok: 'TikTok',
    facebook: 'Facebook',
    instagram: 'Instagram',
    twitter: 'X',
  }[provider];
};

const getTranslations = (
  provider: ConsentBannerProviders,
  translations: Translations,
  externalLinkText: string,
) => {
  const headingTranslations = pathOr(
    DEFAULT_TRANSLATIONS.heading,
    ['socialEmbed', 'consentBanner', 'heading'],
    translations,
  );

  const bodyTranslations = pathOr(
    DEFAULT_TRANSLATIONS.body,
    ['socialEmbed', 'consentBanner', 'body'],
    translations,
  );

  const buttonTranslations = pathOr(
    DEFAULT_TRANSLATIONS.button,
    ['socialEmbed', 'consentBanner', 'button'],
    translations,
  );

  const providerName = getProviderName(provider);
  const providerNameDelimiter = '[social_media_site]';

  const headerText = headingTranslations.replaceAll(
    providerNameDelimiter,
    providerName,
  );

  const bodyText = bodyTranslations.replaceAll(
    providerNameDelimiter,
    providerName,
  );
  const linkTextElements =
    bodyText?.match(/(\[link]|\[\/link])(.*?)(\[\/link]|\[link])/g) || [];
  if (!linkTextElements.length) {
    return {
      heading: headerText,
      body: bodyText,
      button: buttonTranslations,
    };
  }

  const cookiesUrl = BANNER_URLS.cookiesUrl?.[provider];
  const privacyUrl = BANNER_URLS.privacyUrl?.[provider];

  const linkHtmlElements = [
    linkTextElements.length > 0 && cookiesUrl && (
      <a
        href={cookiesUrl}
        className="focusIndicatorReducedWidth"
        aria-label={`${linkTextElements[0]
          ?.replaceAll('[link]', '')
          .replaceAll('[/link]', '')
          .trim()}${externalLinkText}`}
        key={cookiesUrl}
      >
        {linkTextElements[0]
          ?.replaceAll('[link]', '')
          .replaceAll('[/link]', '')
          .trim()}
      </a>
    ),
    linkTextElements.length > 1 && privacyUrl && (
      <a
        href={privacyUrl}
        className="focusIndicatorReducedWidth"
        aria-label={`${linkTextElements[1]
          ?.replaceAll('[link]', '')
          .replaceAll('[/link]', '')
          .trim()}${externalLinkText}`}
        key={privacyUrl}
      >
        {linkTextElements[1]
          ?.replaceAll('[link]', '')
          .replaceAll('[/link]', '')
          .trim()}
      </a>
    ),
  ].filter(Boolean);

  const splitBodyText = bodyText.split(/\[link](.*?)\[\/link]/g);

  const bodyTextElements = [
    splitBodyText[0],
    linkHtmlElements[0],
    splitBodyText[2],
    linkHtmlElements[1],
    splitBodyText[4],
  ].filter(Boolean);

  return {
    heading: headerText,
    body: bodyTextElements,
    button: buttonTranslations,
  };
};

type ConsentBannerContentProps = {
  provider: ConsentBannerProviders;
  clickHandler:
    | {
        on: string;
      }
    | {
        onClick: (e: MouseEvent<HTMLButtonElement>) => void;
      };
  id?: string;
};

const ConsentBanner = ({
  provider,
  clickHandler,
  id,
}: ConsentBannerContentProps) => {
  const { externalLinkText, translations } = useContext(ServiceContext);
  const { pageType } = useContext(RequestContext);
  const isLive = pageType === LIVE_PAGE;

  const consentTranslations = getTranslations(
    provider,
    translations,
    externalLinkText,
  );

  const viewRef = useViewTracker(getEventTrackingData(provider));

  return (
    <div
      data-testid="consentBanner"
      id={`consentBanner${id ? `-${id}` : ''}`}
      css={[
        consentBannerCss.parent,
        isLive && consentBannerCss.tranparentBorder,
      ]}
      ref={viewRef}
    >
      <Text
        as="strong"
        data-testid="banner-heading"
        fontVariant="sansBold"
        size="greatPrimer"
      >
        {consentTranslations.heading}
      </Text>
      <Paragraph data-testid="banner-body" css={consentBannerCss.textBody}>
        {consentTranslations.body}
      </Paragraph>
      <Text
        as="button"
        type="button"
        data-testid="banner-button"
        fontVariant="sansBold"
        css={consentBannerCss.button}
        {...clickHandler}
      >
        {consentTranslations.button}
      </Text>
    </div>
  );
};

export default ConsentBanner;
