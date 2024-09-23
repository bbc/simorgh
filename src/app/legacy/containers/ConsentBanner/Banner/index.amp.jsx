import React, { useContext } from 'react';
import { ConsentBanner } from '#psammead/psammead-consent-banner/src';
import { navigationIcons } from '#app/legacy/psammead/psammead-assets/src/svgs';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import { ServiceContext } from '../../../../contexts/ServiceContext';
import AmpCookieBanner from './cookie.amp';
import BannerText from './Text';
import getDataAttribute from './getDataAttribute';

const Button = (message, onClick, dataAttribute) => (
  // eslint-disable-next-line react/no-unknown-property
  <button type="button" on={onClick} {...dataAttribute}>
    {message}
  </button>
);

const HideButton = (onClick, dataAttribute, type) => (
  <button
    className="focusIndicatorRemove"
    type="button"
    // eslint-disable-next-line react/no-unknown-property
    on={onClick}
    {...dataAttribute}
  >
    {navigationIcons.cross}
    <VisuallyHiddenText>
      {type === 'cookie' ? 'Close cookie banner' : 'Close privacy banner'}
    </VisuallyHiddenText>
  </button>
);

const Anchor = (message, href, onClick, dataAttribute) => (
  // eslint-disable-next-line react/no-unknown-property
  <a href={href} on={onClick} {...dataAttribute}>
    {message}
  </a>
);

const AmpConsentBannerContainer = ({
  type,
  acceptAction,
  rejectAction,
  hideAction = null,
  promptId,
  hidden = null,
}) => {
  const { dir, translations, script, service } = useContext(ServiceContext);

  const dataAttribute = getDataAttribute(type);
  return type === 'cookie' ? (
    <AmpCookieBanner
      id={promptId}
      translations={[
        translations.consentBanner.cookie.amp.initial,
        translations.consentBanner.cookie.amp.manage,
      ]}
      accept={Button(
        translations.consentBanner.cookie.amp.accept,
        acceptAction,
        dataAttribute('accept'),
      )}
      reject={Button(
        translations.consentBanner.cookie.amp.reject,
        rejectAction,
        dataAttribute('reject'),
      )}
      hide={HideButton(hideAction, dataAttribute('hide'), type)}
      hidden={hidden}
      script={script}
      service={service}
    />
  ) : (
    <ConsentBanner
      dir={dir}
      id={promptId}
      title={translations.consentBanner[type].title}
      text={BannerText(translations.consentBanner[type].description)}
      accept={Button(
        translations.consentBanner[type].accept,
        acceptAction,
        dataAttribute('accept'),
      )}
      reject={Anchor(
        translations.consentBanner[type].reject,
        translations.consentBanner[type].rejectUrl,
        rejectAction,
        dataAttribute('reject'),
      )}
      hide={HideButton(hideAction, dataAttribute('hide'), type)}
      hidden={hidden}
      script={script}
      service={service}
    />
  );
};

export default AmpConsentBannerContainer;
