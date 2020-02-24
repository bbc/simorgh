import React, { useContext } from 'react';
import SkipLink from '@bbc/psammead-brand/skip-link';
import ScriptLink from '@bbc/psammead-script-link';
import VisuallyHiddenText from '@bbc/psammead-visually-hidden-text';
import BrandContainer from '../Brand';
import NavigationContainer from '../Navigation';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import { UserContext } from '#contexts/UserContext';
import { getOtherVariant } from '#lib/utilities/variantHandler';
import ConsentBanner from '../ConsentBanner';
import useToggle from '../Toggle/useToggle';

const renderScriptLink = (
  script,
  service,
  scriptLink,
  setPreferredVariantCookie,
  variant,
) => {
  const { text, offscreenText } = scriptLink;
  const otherVariant = getOtherVariant(service, variant);

  return (
    <ScriptLink
      script={script}
      service={service}
      href={`/${service}/${otherVariant}`}
      variant={otherVariant}
      onClick={() => setPreferredVariantCookie(service, otherVariant)}
    >
      <span aria-hidden="true">{text}</span>
      <VisuallyHiddenText> {offscreenText} </VisuallyHiddenText>
    </ScriptLink>
  );
};

const HeaderContainer = () => {
  const { pageType, variant } = useContext(RequestContext);
  const { setPreferredVariantCookie } = useContext(UserContext);
  const { service, script, translations, dir, scriptLink } = useContext(
    ServiceContext,
  );
  const { skipLinkText } = translations;
  const borderBottom = pageType !== 'frontPage';

  // The article page toggles the nav bar based on environment
  const showNavOnArticles = useToggle('navOnArticles').enabled;

  // All other page types show the nav bar at all times
  const showNav = showNavOnArticles || pageType !== 'article';

  const skipLink = (
    <SkipLink service={service} script={script} dir={dir} href="#content">
      {skipLinkText}
    </SkipLink>
  );

  const scriptLinkComponent =
    scriptLink &&
    renderScriptLink(
      script,
      service,
      scriptLink,
      setPreferredVariantCookie,
      variant,
    );

  return (
    <header role="banner">
      <ConsentBanner />
      <BrandContainer
        borderBottom={borderBottom}
        skipLink={skipLink}
        scriptLink={scriptLinkComponent}
      />
      {showNav && <NavigationContainer />}
    </header>
  );
};

export default HeaderContainer;
