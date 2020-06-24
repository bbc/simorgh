import React from 'react';
import styled from 'styled-components';
import { string } from 'prop-types';
import { GridItemConstrainedMedium } from '#lib/styledGrid';

const IncludeGrid = styled(GridItemConstrainedMedium)`
  display: grid;
`;

// currently ampSrc: 'http://localhost:7080 need to replace start of this with // https://news.test.files.bbci.co.uk

const VjAmp = ({ ampSrc, ampImage, ampImageHeight, ampImageWidth }) => {
  return (
    <IncludeGrid>
      <amp-iframe
        width={ampImageWidth}
        height={ampImageHeight}
        layout="responsive"
        sandbox="allow-scripts allow-same-origin allow-top-navigation-by-user-activation allow-forms"
        resizable
        src={ampSrc}
      >
        <div overflow="visible" />
        <amp-img
          width={ampImageWidth}
          height={ampImageHeight}
          layout="fill"
          placeholder
          src={ampImage}
        />
      </amp-iframe>
    </IncludeGrid>
  );
};

VjAmp.propTypes = {
  ampSrc: string.isRequired,
  ampImage: string.isRequired,
  ampImageHeight: string.isRequired,
  ampImageWidth: string.isRequired,
};

export default VjAmp;
