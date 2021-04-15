import React from 'react';
import styled from '@emotion/styled';
import { string } from 'prop-types';

const PromoTitle = styled.h2`
  /* Title styles */
`;

const PromoDescription = styled.h4`
  /* Description styles */
`;

const OnwardLink = styled.a`
  /* Anchorgit  styles */
`;

const StoryPromo = ({ src, title, description, href }) => {
  return (
    <>
      <img src={src} alt={title} />
      <PromoTitle>{title}</PromoTitle>
      <PromoDescription>{description}</PromoDescription>
      <OnwardLink href={href}>Full story</OnwardLink>
    </>
  );
};

StoryPromo.propTypes = {
  src: string.isRequired,
  title: string.isRequired,
  description: string.isRequired,
  href: string.isRequired,
};

export default StoryPromo;
