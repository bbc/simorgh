/* eslint-disable react/no-danger */
import React from 'react';
import { string, number } from 'prop-types';
import DOMPurify from 'dompurify';
import styled from 'styled-components';
import { GEL_SPACING_TRPL } from '@bbc/gel-foundations/spacings';

const OEmbedWrapper = styled.div`
  margin-bottom: ${GEL_SPACING_TRPL};
  max-width: ${({ providerWidth }) => `${providerWidth}px`};
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
