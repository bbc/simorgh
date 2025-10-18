import React from 'react';
import styled from '@emotion/styled';
import partition from 'ramda/src/partition';

import Image from './image';
import MediaIcon from './media-icon';
import Heading from './heading';
import Body from './body';
import Footer from './footer';
import A from './a';
import Timestamp from './timestamp';

const PromoContext = React.createContext({});
const withPromoContext = Component => props => (
  <PromoContext.Consumer>
    {context => <Component {...context} {...props} />}
  </PromoContext.Consumer>
);

const Wrapper = styled.div`
  position: relative;
`;

const Promo = ({ children, className }) => {
  // Image components are moved to a left column on mobile
  const [leftChildren, rightChildren] = partition(
    child => child.type === Promo.Image,
    children.filter(Boolean),
  );

  return (
    <Wrapper className={className}>
      <PromoContext.Provider>
        {leftChildren && <div className="promo-image">{leftChildren}</div>}
        {rightChildren && <div className="promo-text">{rightChildren}</div>}
      </PromoContext.Provider>
    </Wrapper>
  );
};

Promo.Image = withPromoContext(Image);
Promo.MediaIcon = withPromoContext(MediaIcon);
Promo.Heading = withPromoContext(Heading);
Promo.Body = withPromoContext(Body);
Promo.Footer = withPromoContext(Footer);
Promo.A = withPromoContext(A);
Promo.Timestamp = withPromoContext(Timestamp);

export default Promo;
