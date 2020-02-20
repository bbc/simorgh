/* eslint-disable react/no-danger */
import React from 'react';
import { string, number } from 'prop-types';
import DOMPurify from 'dompurify';
import styled from 'styled-components';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import {
  GEL_SPACING_TRPL,
  GEL_SPACING_DBL,
  GEL_SPACING,
} from '@bbc/gel-foundations/spacings';
import { C_SHADOW } from '@bbc/psammead-styles/colours';
import { GEL_BODY_COPY } from '@bbc/gel-foundations/typography';

const twitterStyles = `
  .twitter-tweet {
    margin: 0;
    padding: ${GEL_SPACING_DBL};

    > p {
      margin-top: 0;
      margin-bottom: ${GEL_SPACING};
    }

    > a {
      display: block;
      margin-top: ${GEL_SPACING};
    }
  }
`;

const OEmbedWrapper = styled.div`
  border: 1px solid #eee;
  border-radius: 5px;
  color: ${C_SHADOW};
  margin-bottom: ${GEL_SPACING_TRPL};
  max-width: ${({ providerWidth }) => `${providerWidth}px`};
  ${({ service }) => getSansRegular(service)}
  ${GEL_BODY_COPY}
  ${twitterStyles}
`;

const OEmbed = ({ service, width, html }) => {
  const sanitizedHtml = DOMPurify.sanitize(html, { FORBID_TAGS: ['script'] });
  return (
    <OEmbedWrapper service={service} providerWidth={width}>
      <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
    </OEmbedWrapper>
  );
};

OEmbed.defaultProps = {};

OEmbed.propTypes = {
  service: string.isRequired,
  width: number.isRequired,
  html: string.isRequired,
};

export default OEmbed;
