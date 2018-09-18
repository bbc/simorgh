import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import Figure from '../../components/Figure';
import Image from '../../components/Figure/Image';
import Copyright from '../../components/Figure/Copyright';
import Caption from '../../components/Figure/Caption';
import Text from '../../components/Text';

const renderCopyright = copyright =>
  copyright ? <Copyright>{copyright}</Copyright> : null;

const renderCaption = captionValue =>
  captionValue ? (
    <Text text={captionValue} paragraphOverride={Caption} />
  ) : null;

const RelativeDiv = styled.div`
  position: relative;
`;

const FigureContainer = ({ src, lowResSrc, alt, copyright, caption }) => (
  <Figure>
    <RelativeDiv>
      <Image alt={alt} src={src} />
      <noscript>
        <Image alt={alt} src={lowResSrc} />
      </noscript>
      {renderCopyright(copyright)}
    </RelativeDiv>
    {renderCaption(caption)}
  </Figure>
);

FigureContainer.propTypes = {
  alt: string.isRequired,
  src: string.isRequired,
  lowResSrc: string.isRequired,
  copyright: string,
  caption: string,
};

FigureContainer.defaultProps = {
  copyright: null,
  caption: null,
};

export default FigureContainer;
