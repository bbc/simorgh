import { useContext } from 'react';
import pathOr from 'ramda/src/pathOr';

import { ServiceContext } from '../../contexts/ServiceContext';
import { SocialEmbedProviders } from '../../models/types/global';

import {
  getBodyCopy,
  getGreatPrimer,
  getPica,
} from '../../legacy/psammead/gel-foundations/src/typography';
import {
  getSansBold,
  getSansRegular,
} from '../../legacy/psammead/psammead-styles/src/font-styles';

import consentBannerCss from './ConsentBanner.styles';

interface ConsentBannerTranslationProps {
  heading: string;
  body: string;
  cookiesUrl: {
    [key in SocialEmbedProviders]?: string;
  };
  privacyUrl: {
    [key in SocialEmbedProviders]?: string;
  };
}

interface TranslationsProps {
  socialEmbed: {
    consentBanner: ConsentBannerTranslationProps;
  };
}

const getProviderName = (provider: SocialEmbedProviders) => {
  return {
    instagram: 'Instagram',
    twitter: 'Twitter',
    youtube: 'YouTube',
    facebook: 'Facebook',
  }[provider];
};

const getTranslations = (
  provider: SocialEmbedProviders,
  translations: TranslationsProps,
) => {
  const consentTranslations = pathOr<ConsentBannerTranslationProps>(
    {
      heading: 'Allow YouTube content?',
      body: `This article contains content provided by YouTube.  We ask for your permission before anything is loaded, as they may be using cookies and other technologies.  You may want to read Google's [link] cookie policy [/link] and [link] privacy policy [/link] before accepting. To view this content choose 'accept and continue'.`,
      cookiesUrl: {
        youtube: 'https://policies.google.com/technologies/cookies',
      },
      privacyUrl: {
        youtube: 'https://policies.google.com/privacy',
      },
    },
    ['socialEmbed', 'consentBanner'],
    translations,
  );

  const providerName = getProviderName(provider);
  const providerNameDelimiter = '[social_media_site]';

  const headerText = consentTranslations.heading?.replaceAll(
    providerNameDelimiter,
    providerName,
  );

  const bodyText = consentTranslations.body?.replaceAll(
    providerNameDelimiter,
    providerName,
  );

  const linkTextElements =
    bodyText?.match(/(\[link]|\[\/link])(.*?)(\[\/link]|\[link])/g) || [];

  if (!linkTextElements.length) {
    return {
      heading: headerText,
      body: bodyText,
    };
  }

  const linkHtmlElements = [
    linkTextElements.length > 0 && (
      <a
        href={consentTranslations.cookiesUrl[provider]}
        target="_blank"
        rel="noreferrer"
        key={consentTranslations.cookiesUrl[provider]}
      >
        {linkTextElements[0]
          .replaceAll('[link]', '')
          .replaceAll('[/link]', '')
          .trim()}
      </a>
    ),
    linkTextElements.length > 1 && (
      <a
        href={consentTranslations.privacyUrl[provider]}
        target="_blank"
        rel="noreferrer"
        key={consentTranslations.privacyUrl[provider]}
      >
        {linkTextElements[1]
          .replaceAll('[link]', '')
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
  };
};

interface ConsentBannerContentProps {
  provider: SocialEmbedProviders;
  clickHandler:
    | {
        on: string;
      }
    | {
        onClick: () => void;
      };
}

const Content = ({ provider, clickHandler }: ConsentBannerContentProps) => {
  const { service, script, translations } = useContext(ServiceContext) as {
    script: string;
    service: string;
    translations: TranslationsProps;
  };

  const consentTranslations = getTranslations(provider, translations);

  return (
    <div id="consentBanner" css={consentBannerCss.self}>
      <strong
        data-testid="banner-heading"
        css={[
          consentBannerCss.heading,
          getSansBold(service),
          getGreatPrimer(script),
        ]}
      >
        {consentTranslations.heading}
      </strong>
      <p
        data-testid="banner-body"
        css={[
          consentBannerCss.textBody,
          getSansRegular(service),
          getBodyCopy(script),
        ]}
      >
        {consentTranslations.body}
      </p>
      <button
        data-testid="banner-button"
        css={[consentBannerCss.button, getSansBold(service), getPica(script)]}
        type="button"
        {...clickHandler}
      >
        Accept and continue
      </button>
    </div>
  );
};

export default Content;
