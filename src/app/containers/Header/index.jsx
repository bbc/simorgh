import React, { useContext } from 'react';
import BrandContainer from '../Brand';
import NavigationContainer from '../Navigation';
import { RequestContext } from '../../contexts/RequestContext';

const HeaderContainer = () => {
  const { pageType } = useContext(RequestContext);

  return (
    <header role="banner">
      <BrandContainer {...(pageType !== 'frontPage' && { isHeader: true })} />
      {pageType === 'frontPage' && <NavigationContainer />}
    </header>
  );
};

export default HeaderContainer;
