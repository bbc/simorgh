import React from 'react';
import {
  BBC_BLOCKS,
  BBC_BLOCKS_DARK_MODE,
} from '#psammead/psammead-assets/src/svgs';

export { default as ImagePlaceholderAmp } from './index.amp';

const bgImageDark = `url(data:image/svg+xml;base64,${BBC_BLOCKS_DARK_MODE})`;
const bgImageRegular = `url(data:image/svg+xml;base64,${BBC_BLOCKS})`;

const StyledImagePlaceholder = ({ darkPlaceholder = false, children, ...props }) => {
  const bgClasses = darkPlaceholder ? 'bg-shadow' : 'bg-lunar';
  const bgImage = darkPlaceholder ? bgImageDark : bgImageRegular;
  
  return (
    <div
      className={`relative h-0 overflow-hidden ${bgClasses} bg-center bg-no-repeat w-full`}
      style={{
        backgroundImage: bgImage,
        backgroundSize: '60px 17px',
        '@media (min-width: 37.5rem)': {
          backgroundSize: '77px 22px',
        },
        '@media (min-width: 63rem)': {
          backgroundSize: '93px 27px',
        }
      }}
      {...props}
    >
      {children}
    </div>
  );
};

const ImagePlaceholder = props => {
  const { forwardStyle = null, ratio } = props;

  return (
    <StyledImagePlaceholder
      style={{ paddingBottom: `${ratio}%`, ...(forwardStyle || []) }}
      data-e2e="image-placeholder"
      {...props}
    />
  );
};

export default ImagePlaceholder;
