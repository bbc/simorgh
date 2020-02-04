import React, { useContext } from 'react';
import BrandContainer from '../Brand';
import NavigationContainer from '../Navigation';
import { RequestContext } from '#contexts/RequestContext';
import ConsentBanner from '../ConsentBanner';
import useToggle from '../Toggle/useToggle';

const HeaderContainer = () => {
  const { pageType } = useContext(RequestContext);
  const borderBottom = pageType !== 'frontPage';

  // The article page toggles the nav bar based on environment
  const showNavOnArticles = useToggle('navOnArticles').enabled;

  // All other page types show the nav bar at all times
  const showNav = showNavOnArticles || pageType !== 'article';

  return (
    <header role="banner">
      <ConsentBanner />
      <BrandContainer borderBottom={borderBottom} />
      {showNav && <NavigationContainer />}
    </header>
  );
};

export default HeaderContainer;
