import React from 'react';
import styled from '@emotion/styled';
import { string } from 'prop-types';
import { C_WHITE } from '@bbc/psammead-styles/dist/colours';

const Container = styled.div`
  color: ${C_WHITE};
`;

const Image = styled.img`
  max-width: 100%;
`;

const Title = styled.h2`
  /* Title styles */
`;

const Description = styled.p`
  /* Description styles */
`;

const Anchor = styled.a`
  /* Anchor styles */
`;

const StoryPromo = ({ src, title, description, href }) => (
  <Container>
    <Image src={src} alt={title} />
    <Title>{title}</Title>
    <Description>{description}</Description>
    <Anchor href={href}>Full story</Anchor>
  </Container>
);

StoryPromo.propTypes = {
  src: string.isRequired,
  title: string.isRequired,
  description: string.isRequired,
  href: string.isRequired,
};

export default StoryPromo;
