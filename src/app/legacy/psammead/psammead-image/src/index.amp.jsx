import React from 'react';
import omit from 'ramda/src/omit';

// Prevents component outputting invalid HTML when styled with emotion
const omitInvalidProps = omit([
  'classname',
  'primaryMimeType',
  'fallbackMimeType',
]);

const AmpImg = props => {
  const { srcset, fallbackSrcset, attribution = '', ...otherProps } = props;

  return (
    <amp-img
      fallback=""
      srcSet={fallbackSrcset}
      attribution={attribution}
      {...omitInvalidProps(otherProps)}
    />
  );
};

export default AmpImg;
