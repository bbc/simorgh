import React from 'react';
// currently ampSrc: 'http://localhost:7080 need to replace start of this with // https://news.test.files.bbci.co.uk
// is this just a problem for localhost?

const VjAmp = ({ ampSrc, ampImage, ampImageHeight, ampImageWidth }) => {
  return (
    <amp-iframe
      src={ampSrc}
      width={ampImageWidth}
      layout="responsive"
      height={ampImageHeight}
      sandbox="allow-scripts allow-same-origin allow-top-navigation-by-user-activation allow-forms"
      frameborder="0"
    >
      <amp-img
        src={ampImage}
        width={ampImageWidth}
        height={ampImageHeight}
        layout="responsive"
        placeholder
      />
    </amp-iframe>
  );
};

export default VjAmp;
