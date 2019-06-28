import React, { useContext } from 'react';
import BrandContainer from '../Brand';
import NavigationContainer from '../Navigation';
import { RequestContext } from '../../contexts/RequestContext';

const HeaderContainer = () => {
  const { pageType } = useContext(RequestContext);
  const borderBottom = pageType !== 'frontPage';

  return (
    <header role="banner">
      <BrandContainer borderBottom={borderBottom} />
      {pageType === 'frontPage' && <NavigationContainer />}
    </header>
  );
};

export default HeaderContainer;
