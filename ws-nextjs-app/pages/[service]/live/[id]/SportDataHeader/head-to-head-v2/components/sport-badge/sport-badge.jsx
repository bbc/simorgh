// import React from 'react';
// import { createSize, GROUP_3, GROUP_4 } from '@bbc/web-gel-foundations';
// import styled from '@bbc/web-styled';
import styled from '@emotion/styled';

import { getImage } from './badges-map';

// eslint-disable-next-line import/no-relative-packages
import pixelsToRem from '../../../../../../../../../src/app/utilities/pixelsToRem';

const BadgeContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-shrink: 0;

  width: ${({ size = 20 }) => pixelsToRem(size.small || size)}rem;
  height: ${({ size = 20 }) => pixelsToRem(size.small || size)}rem;

  @media (min-width: ${pixelsToRem(600)}rem) {
    width: ${({ size = 20 }) => pixelsToRem(size.medium || size)}rem;
    height: ${({ size = 20 }) => pixelsToRem(size.medium || size)}rem;
  }

  @media (min-width: ${pixelsToRem(900)}rem) {
    width: ${({ size = 27 }) => pixelsToRem(size.large || size)}rem;
    height: ${({ size = 27 }) => pixelsToRem(size.large || size)}rem;
  }
`;

const BadgeImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const getTestId = id => {
  const urnId =
    String(id)?.match(/urn:bbc:sportsdata:football:team:(.+)/) || [];

  return urnId[1] || id;
};

const SportBadge = ({
  size,
  id,
  alt = '',
  usePlaceholderFallback = true,
  placeholderFallbackType = 'badge',
}) => {
  const testId = getTestId(id);
  const src = getImage({ id, usePlaceholderFallback, placeholderFallbackType });

  if (!src) return null;

  return (
    <BadgeContainer size={size} data-testid={`badge-container-${testId}`}>
      {/* Empty alt string should hide images from assistive technology, but won't hide certain SVG contents in some browsers - e.g. Safari */}
      <BadgeImage
        alt={alt}
        data-testid={`badge-img-${testId}`}
        aria-hidden={!alt}
        src={src}
      />
    </BadgeContainer>
  );
};
export default SportBadge;
