import { useState, PropsWithChildren } from 'react';
import { ARTICLE_PAGE } from '../../routes/utils/pageTypes';
import { PageTypes, SocialEmbedProviders } from '../../models/types/global';

import ConsentBanner from './ConsentBanner';

interface ConsentBannerProps {
  pageType: PageTypes;
  provider: SocialEmbedProviders;
}

const EmbedConsentBannerAmp = ({
  pageType,
  provider,
  children,
}: PropsWithChildren<ConsentBannerProps>) => {
  if (pageType !== ARTICLE_PAGE || provider !== 'youtube')
    return children as JSX.Element;

  return (
    <>
      <ConsentBanner
        provider={provider}
        clickHandler={{ on: 'tap:consentBanner.hide,embed.show' }}
      />
      <div id="embed" hidden>
        {children}
      </div>
    </>
  );
};

const EmbedConsentBannerCanonical = ({
  pageType,
  provider,
  children,
}: PropsWithChildren<ConsentBannerProps>) => {
  const [consented, setConsented] = useState(false);

  const showConsentBanner =
    pageType === ARTICLE_PAGE && provider === 'youtube' && !consented;

  if (!showConsentBanner) return children as JSX.Element;

  return (
    <ConsentBanner
      provider={provider}
      clickHandler={{ onClick: () => setConsented(true) }}
    />
  );
};

export { EmbedConsentBannerCanonical, EmbedConsentBannerAmp };
