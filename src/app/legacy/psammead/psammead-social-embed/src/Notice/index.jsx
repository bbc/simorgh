import React, { memo } from 'react';
import styled from '@emotion/styled';
import {
  getSansRegular,
  getSansBold,
} from '#psammead/psammead-styles/src/font-styles';
import {
  GEL_SPACING_DBL,
  GEL_SPACING,
} from '#psammead/gel-foundations/src/spacings';
import {
  GEL_BODY_COPY,
  GEL_MINION,
} from '#psammead/gel-foundations/src/typography';

import { detokenise, dictionaryFactory } from '../utilities';

const BORDER_WEIGHT = '0.0625rem';

const Wrapper = styled.div`
  ${({ service }) => getSansRegular(service)}
  ${GEL_BODY_COPY}
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
    ${({ service }) => getSansBold(service)}
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
    ${GEL_MINION}
  }
`;

const Notice = ({
  provider,
  service,
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
    <Wrapper service={service}>
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
