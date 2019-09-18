import React, { useContext } from 'react';
import BrandContainer from '../Brand';
import NavigationContainer from '../Navigation';
import { RequestContext } from '#contexts/RequestContext';
import ConsentBanner from '../ConsentBanner';
import useToggle from '../Toggle/useToggle';

const HeaderContainer = () => {
  const { pageType } = useContext(RequestContext);
  const borderBottom = pageType !== 'frontPage';
  const { enabled } = useToggle('navOnArticles');
  const showNavBar =
    ['frontPage', 'media', 'error'].includes(pageType) || enabled;

  return (
    <header role="banner">
      <ConsentBanner />
      <BrandContainer borderBottom={borderBottom} />
      {showNavBar && <NavigationContainer />}
    </header>
  );
};

export default HeaderContainer;
