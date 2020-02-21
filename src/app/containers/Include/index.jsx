import React, { useState } from 'react';
import styled from 'styled-components';
import { GridItemConstrainedMedium } from '#lib/styledGrid';
import onClient from '#lib/utilities/onClient';

const StyledIframe = styled.iframe`
  border: 0;
  left: 0;
  overflow: hidden;
  width: 100%;
`;

const Include = ({ href }) => {
  const [frameHeight, setFrameHeight] = useState('100');

  if (onClient()) {
    window.addEventListener(
      'message',
      msg => {
        const { data } = msg;

        if (data.docHeight) {
          const height = data.docHeight;

          if (height > frameHeight) {
            setFrameHeight(height);
          }
        }
      },
      false,
    );
  }

  const encodedHref = encodeURIComponent(href);
  const includeUrl = `http://localhost:4000/view/bbc-morph-news-vj-includes/path/${encodedHref}`;
  return (
    <GridItemConstrainedMedium>
      <StyledIframe height={`${frameHeight}px`} src={includeUrl} />
    </GridItemConstrainedMedium>
  );
};

export default Include;
