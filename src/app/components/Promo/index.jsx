import React from 'react';
import { string, shape, arrayOf, element } from 'prop-types';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';

const PromoContext = React.createContext({});
const withPromoContext = Component => props =>
  (
    <PromoContext.Consumer>
      {context => <Component {...context} {...props} />}
    </PromoContext.Consumer>
  );

const Wrapper = styled.section`
  background-color: ${C_LUNAR};
  padding: ${GEL_SPACING_DBL};
`;

const Promo = ({ script, service, children, ...props }) => (
  <PromoContext.Provider value={{ script, service }}>
    {children}
  </PromoContext.Provider>
);

Promo.propTypes = {
  children: arrayOf(element).isRequired,
  script: shape(scriptPropType).isRequired,
  service: string.isRequired,
};

Promo.defaultProps = {};

export default Promo;
