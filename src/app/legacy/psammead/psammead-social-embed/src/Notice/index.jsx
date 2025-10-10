import React, { memo } from 'react';
import styled from '@emotion/styled';
import {
  GEL_SPACING_DBL,
  GEL_SPACING,
} from '#psammead/gel-foundations/src/spacings';

import { detokenise, dictionaryFactory } from '../utilities';

const BORDER_WEIGHT = '0.0625rem';

const Wrapper = styled.div`
  ${({ theme: { fontVariants } }) => fontVariants.sansRegular}
  ${({ theme: { fontSizes } }) => fontSizes.bodyCopy}
  border: ${BORDER_WEIGHT} solid ${props => props.theme.palette.PEBBLE};
  border-radius: ${GEL_SPACING};
  color: ${props => props.theme.palette.SHADOW};
  padding: ${GEL_SPACING_DBL};

  p {
    margin-top: 0;
    margin-bottom: ${GEL_SPACING};
  }

  a,
  small {
    display: block;
  }

  a {
    ${({ theme: { fontVariants } }) => fontVariants.sansBold}
    color: ${props => props.theme.palette.EBON};
    text-decoration: none;

    &:visited {
      color: ${props => props.theme.palette.METAL};
    }

    &:hover,
    &:focus {
      text-decoration: underline;
    }
  }

  small {
    margin-top: ${GEL_SPACING};
    ${({ theme: { fontSizes } }) => fontSizes.minion}
  }
`;

const Notice = ({
  provider,
  text,
  linkText,
  linkTextSuffixVisuallyHidden = null,
  linkHref,
  warningText = null,
}) => {
  const dictionary = dictionaryFactory({ provider });
  const [detokenisedLinkText, detokenisedLinkTextSuffix] = [
    detokenise(linkText, dictionary),
    detokenise(linkTextSuffixVisuallyHidden, dictionary),
  ];

  return (
    <Wrapper>
      <p data-testid="social-embed-fallback-title">
        {detokenise(text, dictionary)}
      </p>
      <a
        href={linkHref}
        aria-label={
          detokenisedLinkTextSuffix &&
          `${detokenisedLinkText}${detokenisedLinkTextSuffix}`
        }
      >
        {detokenisedLinkText}
      </a>
      {warningText && <small>{warningText}</small>}
    </Wrapper>
  );
};

export default memo(Notice);
