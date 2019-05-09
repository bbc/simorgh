import React from 'react';
import { string, number, objectOf, shape, any } from 'prop-types';
import Figure from '@bbc/psammead-figure';
import Image, { AmpImg } from '@bbc/psammead-image';
import ImagePlaceholder from '@bbc/psammead-image-placeholder';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import Copyright from '../Copyright';
import Caption from '../Caption';
import { RequestContextConsumer } from '../../contexts/RequestContext';

const renderCopyright = copyright =>
  copyright ? <Copyright>{copyright}</Copyright> : null;

const renderCaption = (block, script, type) =>
  block ? <Caption script={script} block={block} type={type} /> : null;

const FigureContainer = ({
  alt,
  copyright,
  captionBlock,
  ratio,
  src,
  height,
  width,
  script,
  type,
}) => (
  <Figure>
    <ImagePlaceholder ratio={ratio}>
      <RequestContextConsumer>
        {({ platform }) =>
          platform === 'amp' ? (
            <AmpImg
              alt={alt}
              attribution={copyright || ''}
              layout="responsive"
              src={src}
              height={height}
              width={width}
            />
          ) : (
            <Image alt={alt} src={src} width={width} />
          )
        }
      </RequestContextConsumer>
      {renderCopyright(copyright)}
    </ImagePlaceholder>
    {renderCaption(captionBlock, script, type)}
  </Figure>
);

FigureContainer.propTypes = {
  alt: string.isRequired,
  captionBlock: objectOf(any),
  copyright: string,
  ratio: number.isRequired,
  src: string.isRequired,
  height: number,
  width: number.isRequired,
  script: shape(scriptPropType).isRequired,
  type: string,
};

FigureContainer.defaultProps = {
  copyright: null,
  captionBlock: null,
  height: null,
  type: '',
};

export default FigureContainer;
