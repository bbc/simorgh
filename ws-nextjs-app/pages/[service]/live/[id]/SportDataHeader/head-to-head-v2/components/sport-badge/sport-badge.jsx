import React from 'react';
import { createSize, GROUP_3, GROUP_4 } from '@bbc/web-gel-foundations';
import styled from '@bbc/web-styled';
import { getImage } from './badges-map.js';

const BadgeContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-shrink: 0;

  width: ${({ size = 20 }) => createSize(size.small || size)};
  height: ${({ size = 20 }) => createSize(size.small || size)};

  @media (min-width: ${GROUP_3}) {
    width: ${({ size = 20 }) => createSize(size.medium || size)};
    height: ${({ size = 20 }) => createSize(size.medium || size)};
  }

  @media (min-width: ${GROUP_4}) {
    width: ${({ size = 27 }) => createSize(size.large || size)};
    height: ${({ size = 27 }) => createSize(size.large || size)};
  }
`;

const BadgeImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const getTestId = id => {
  const urnId = String(id)?.match(/urn:bbc:sportsdata:football:team:(.+)/) || [];

  return urnId[1] || id;
};

const SportBadge = ({ size, id, alt = '', usePlaceholderFallback = true, placeholderFallbackType = 'badge' }) => {
  const testId = getTestId(id);
  const src = getImage({ id, usePlaceholderFallback, placeholderFallbackType });

  if (!src) return null;

  return (
    <BadgeContainer size={size} data-testid={`badge-container-${testId}`}>
      {/* Empty alt string should hide images from assistive technology, but won't hide certain SVG contents in some browsers - e.g. Safari */}
      <BadgeImage alt={alt} data-testid={`badge-img-${testId}`} src={src} aria-hidden={!alt} />
    </BadgeContainer>
  );
};
export default SportBadge;
