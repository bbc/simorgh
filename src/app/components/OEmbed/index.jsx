/* eslint-disable react/no-danger */
import React from 'react';
import { string, number } from 'prop-types';
// import DOMPurify from 'dompurify';
import styled from 'styled-components';
import { GEL_SPACING_TRPL } from '@bbc/gel-foundations/spacings';

const OEmbedWrapper = styled.div`
  margin-bottom: ${GEL_SPACING_TRPL};
  max-width: ${({ width }) => `${width}px`};
`;

const OEmbed = ({ width, html }) => {
  // const sanitizedHtml = DOMPurify.sanitize(html, { FORBID_TAGS: ['script'] });
  return (
    <OEmbedWrapper width={width}>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </OEmbedWrapper>
  );
};

OEmbed.defaultProps = {};

OEmbed.propTypes = {
  width: number.isRequired,
  html: string.isRequired,
};

export default OEmbed;
