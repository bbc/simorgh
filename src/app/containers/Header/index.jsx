import React, { useContext } from 'react';
import SkipLink from '@bbc/psammead-brand/skip-link';
import BrandContainer from '../Brand';
import NavigationContainer from '../Navigation';
import { ServiceContext } from '#contexts/ServiceContext';
import { RequestContext } from '#contexts/RequestContext';
import ConsentBanner from '../ConsentBanner';
import ScriptLink from './ScriptLink';
import useToggle from '#hooks/useToggle';
import onClient from '#lib/utilities/onClient';

const HeaderContainer = () => {
  const { pageType } = useContext(RequestContext);
  const { service, script, translations, dir, scriptLink } = useContext(
    ServiceContext,
  );
  const { skipLinkText } = translations;
  const borderBottom = pageType !== 'frontPage';

  // The article page toggles the nav bar based on environment
  const showNavOnArticles = useToggle('navOnArticles').enabled;

  // All other page types show the nav bar at all times
  const showNav = showNavOnArticles || pageType !== 'article';

  const isOperaMini = onClient() && window.operamini;

  const skipLink = !isOperaMini && (
    <SkipLink service={service} script={script} dir={dir} href="#content">
      {skipLinkText}
    </SkipLink>
  );

  return (
    <header role="banner">
      <ConsentBanner />
      <BrandContainer
        borderBottom={borderBottom}
        skipLink={skipLink}
        scriptLink={scriptLink && <ScriptLink />}
      />
    </header>
  );
};

export default HeaderContainer;
