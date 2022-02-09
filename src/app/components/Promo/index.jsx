import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { arrayOf, element } from 'prop-types';
import { ServiceContext } from '#contexts/ServiceContext';

import Image from './image';
import Heading from './heading';
import Body from './body';
import Footer from './footer';
import A from './a';

const PromoContext = React.createContext({});
const withPromoContext = Component => props =>
  (
    <PromoContext.Consumer>
      {context => <Component {...context} {...props} />}
    </PromoContext.Consumer>
  );

const Wrapper = styled.section`
  position: relative;
`;

const Promo = ({ children }) => {
  const { script, service } = useContext(ServiceContext);
  return (
    <Wrapper>
      <PromoContext.Provider value={{ script, service }}>
        {children}
      </PromoContext.Provider>
    </Wrapper>
  );
};

Promo.Image = withPromoContext(Image);
Promo.Heading = withPromoContext(Heading);
Promo.Body = withPromoContext(Body);
Promo.Footer = withPromoContext(Footer);
Promo.A = withPromoContext(A);

Promo.propTypes = {
  children: arrayOf(element).isRequired,
};

Promo.defaultProps = {};

export default Promo;
