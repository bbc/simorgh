import React from 'react';
import styled from 'styled-components';
import { shape, string } from 'prop-types';
import { GridItemConstrainedMedium } from '#lib/styledGrid';

const IncludeGrid = styled(GridItemConstrainedMedium)`
  display: grid;
`;

const PocketTapArea = styled.div`
  &&& {
    display: block;
    height: 70px;
    background: linear-gradient(
      0deg,
      #fff 0%,
      rgba(255, 255, 255, 0.816947) 66%,
      rgba(255, 255, 255, 0.0718488) 100%
    );
    &:after {
      display: inline-block;
      content: '';
      width: 100vw;
      border-bottom: 2px solid #1380a1;
      transform: translateY(2.4rem);
    }
  }
`;

const PocketButton = styled.button`
  background: #1380a1;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  padding: 1rem 2rem;
  font-size: 1rem;
  color: #fff;
  top: 1.2rem;
  border: 0;
  cursor: pointer;
`;

const VjAmp = ({ ampMetadata: { imageWidth, imageHeight, image, src } }) => {
  return (
    <IncludeGrid>
      <amp-iframe
        width={imageWidth}
        height={imageHeight}
        layout="responsive"
        sandbox="allow-scripts allow-same-origin allow-top-navigation-by-user-activation allow-forms"
        resizable
        src={src}
      >
        <PocketTapArea overflow="true">
          <PocketButton aria-label="Read more">Show more</PocketButton>
        </PocketTapArea>

        <amp-img layout="fill" src={image} placeholder />
      </amp-iframe>
    </IncludeGrid>
  );
};

VjAmp.propTypes = {
  ampMetadata: shape({
    imageWidth: string,
    imageHeight: string,
    image: string,
    src: string,
  }).isRequired,
};

export default VjAmp;
