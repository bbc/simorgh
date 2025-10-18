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
      {leftChildren && <div className="promo-image">{leftChildren}</div>}
      {rightChildren && <div className="promo-text">{rightChildren}</div>}
    </Wrapper>
  );
};

Promo.Image = Image;
Promo.MediaIcon = MediaIcon;
Promo.Heading = Heading;
Promo.Body = Body;
Promo.Footer = Footer;
Promo.A = A;
Promo.Timestamp = Timestamp;

export default Promo;
