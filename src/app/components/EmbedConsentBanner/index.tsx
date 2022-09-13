import React, { useState, PropsWithChildren } from 'react';
import { ARTICLE_PAGE } from '../../routes/utils/pageTypes';
import { PageTypes, SocialEmbedProviders } from '../../models/types/global';

import ConsentBanner from './ConsentBanner';

interface ConsentBannerProps {
  pageType: PageTypes;
  provider: SocialEmbedProviders;
  id?: string;
}

const EmbedConsentBannerAmp = ({
  pageType,
  provider,
  id,
  children,
}: PropsWithChildren<ConsentBannerProps>) => {
  if (pageType !== ARTICLE_PAGE || provider !== 'youtube')
    return children as JSX.Element;

  return (
    <>
      <ConsentBanner
        provider={provider}
        clickHandler={{
          on: `tap:consentBanner${id ? `-${id}` : ''}.hide,embed${
            id ? `-${id}` : ''
          }.show`,
        }}
        id={id}
      />
      <div id={`embed${id ? `-${id}` : ''}`} hidden>
        {children}
      </div>
    </>
  );
};

const EmbedConsentBannerCanonical = ({
  pageType,
  provider,
  children,
}: PropsWithChildren<Partial<ConsentBannerProps>>) => {
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
