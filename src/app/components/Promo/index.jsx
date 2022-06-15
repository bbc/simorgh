import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { arrayOf, element } from 'prop-types';
import partition from 'ramda/src/partition';

import { GEL_GROUP_2_SCREEN_WIDTH_MAX } from '#legacy/gel-foundations/src/breakpoints';

import { ServiceContext } from '#contexts/ServiceContext';

import Image from './image';
import MediaIcon, { TYPES } from './media-icon';
import Heading from './heading';
import Body from './body';
import Footer from './footer';
import A from './a';
import Timestamp from './timestamp';

const PromoContext = React.createContext({});
const withPromoContext = Component => props =>
  (
    <PromoContext.Consumer>
      {context => <Component {...context} {...props} />}
    </PromoContext.Consumer>
  );

const Wrapper = styled.div`
  position: relative;
`;

const Left = styled.div`
  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    width: 33%;
    display: inline-block;
    vertical-align: top;
  }
`;
const Right = styled.div`
  @media (max-width: ${GEL_GROUP_2_SCREEN_WIDTH_MAX}) {
    padding-left: 0.5rem;
    width: 67%;
    display: inline-block;
    vertical-align: top;
  }
`;

const Promo = ({ children }) => {
  const { script, service } = useContext(ServiceContext);

  // Image components are moved to a left column on mobile
  const [leftChildren, rightChildren] = partition(
    child => child.type === Promo.Image,
    children,
  );
  return (
    <Wrapper>
      <PromoContext.Provider value={{ script, service }}>
        {leftChildren && <Left>{leftChildren}</Left>}
        {rightChildren && <Right>{rightChildren}</Right>}
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

Promo.propTypes = {
  children: arrayOf(element).isRequired,
};

export const MEDIA_TYPES = TYPES;
export default Promo;
