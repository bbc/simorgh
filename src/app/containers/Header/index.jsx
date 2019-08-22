import React, { useContext } from 'react';
import BrandContainer from '../Brand';
import NavigationContainer from '../Navigation';
import { RequestContext } from '../../contexts/RequestContext';
import ConsentBanner from '../ConsentBanner';

const HeaderContainer = () => {
  const { pageType } = useContext(RequestContext);
  const borderBottom = pageType !== 'frontPage';
  const showNavBar = ['frontPage', 'media'].includes(pageType);

  return (
    <header role="banner">
      <ConsentBanner />
      <BrandContainer borderBottom={borderBottom} />
      {showNavBar && <NavigationContainer />}
    </header>
  );
};

export default HeaderContainer;
