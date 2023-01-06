import React, { memo } from 'react';
import { string } from 'prop-types';
import styled from '@emotion/styled';
import {
  C_PEBBLE,
  C_METAL,
  C_EBON,
  C_SHADOW,
} from '#psammead/psammead-styles/src/colours';
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
  border: ${BORDER_WEIGHT} solid ${C_PEBBLE};
  border-radius: ${GEL_SPACING};
  color: ${C_SHADOW};
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
    color: ${C_EBON};
    text-decoration: none;

    &:visited {
      color: ${C_METAL};
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
  linkTextSuffixVisuallyHidden,
  linkHref,
  warningText,
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

Notice.defaultProps = {
  linkTextSuffixVisuallyHidden: null,
  warningText: null,
};

Notice.propTypes = {
  provider: string.isRequired,
  service: string.isRequired,
  text: string.isRequired,
  linkText: string.isRequired,
  linkTextSuffixVisuallyHidden: string,
  linkHref: string.isRequired,
  warningText: string,
};

export default memo(Notice);
