import React from 'react';
import styled from '@emotion/styled';

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
      <OnwardLink href={href} />
    </>
  );
};

export default StoryPromo;
