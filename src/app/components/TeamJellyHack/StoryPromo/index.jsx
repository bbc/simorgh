import React from 'react';
import styled from '@emotion/styled';
import { string } from 'prop-types';
import { C_BLACK, C_WHITE } from '@bbc/psammead-styles/dist/colours';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '@bbc/gel-foundations/dist/spacings';
import { getSansRegular } from '@bbc/psammead-styles/dist/font-styles';

const Container = styled.div`
  ${getSansRegular('hindi')}
  color: ${C_WHITE};
`;

const Picture = styled.div`
  margin: 0 -${GEL_SPACING_DBL};
`;

const Image = styled.img`
  display: block;
  width: 100%;
`;

const Title = styled.h2`
  /* Title styles */
`;

const Description = styled.p`
  /* Description styles */
`;

const Anchor = styled.a`
  background: ${C_WHITE};
  padding: ${GEL_SPACING} ${GEL_SPACING_DBL};
  color: ${C_BLACK};
  text-decoration: none;
`;

const StoryPromo = ({ src, title, description, href }) => {
  return (
    <Container>
      <Picture>
        <Image src={src} alt={title} />
      </Picture>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Anchor href={href}>पूरा लेख</Anchor>
    </Container>
  );
};

StoryPromo.propTypes = {
  src: string.isRequired,
  title: string.isRequired,
  description: string.isRequired,
  href: string.isRequired,
};

export default StoryPromo;
