import React, { PropsWithChildren } from 'react';
import styled from '@emotion/styled';

import { SocialEmbedProviders } from '#app/models/types/global';
import {
  detokenise,
  dictionaryFactory,
  visuallyHiddenStyle,
} from '../utilities';

const BORDER_WEIGHT = '0.125rem';
const GEL_SPACING_THREE_QRTS = `0.75rem`;

const Wrapper = styled.div`
  position: relative;
`;

const SkipLink = styled.a`
  ${({ theme }) => theme.fontVariants.sansRegular}
  ${({ theme }) => theme.fontSizes.brevier}
  background-color: ${({ theme }) => theme.palette.WHITE};
  border: ${BORDER_WEIGHT} solid ${({ theme }) => theme.palette.EBON};
  display: block;
  left: 0;
  line-height: 1;
  padding: ${GEL_SPACING_THREE_QRTS};
  position: absolute;
  text-decoration: none;
  top: 0;
  z-index: 10;

  span {
    color: ${({ theme }) => theme.palette.EBON};
  }

  &:hover,
  &:focus {
    span {
      color: ${({ theme }) => theme.palette.POSTBOX};
      border-bottom: 2px solid ${({ theme }) => theme.palette.POSTBOX};
    }
  }

  &:not(:focus):not(:active) {
    ${visuallyHiddenStyle}
  }
`;

const EndText = styled.p`
  ${visuallyHiddenStyle}
`;

type Props = {
  provider: SocialEmbedProviders;
  endTextId: string;
  text: string;
  endTextVisuallyHidden: string;
};

const SkipLinkWrapper = ({
  provider,
  endTextId,
  text,
  children,
  endTextVisuallyHidden,
}: PropsWithChildren<Props>) => {
  const dictionary = dictionaryFactory({ provider });

  const detokenisedText = detokenise(endTextId, dictionary);

  return (
    <Wrapper>
      <SkipLink href={`#${detokenisedText}`} className="focusIndicatorRemove">
        <span>{detokenise(text, dictionary)}</span>
      </SkipLink>
      {children}
      <EndText tabIndex={-1} {...(detokenisedText && { id: detokenisedText })}>
        {detokenise(endTextVisuallyHidden, dictionary)}
      </EndText>
    </Wrapper>
  );
};

export default SkipLinkWrapper;
