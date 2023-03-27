/* eslint react/prop-types: 0 */
import React from 'react';
import { bool } from 'prop-types';
import {
  BBC_BLOCKS,
  BBC_BLOCKS_DARK_MODE,
} from '#psammead/psammead-assets/src/svgs';
import {
  GEL_GROUP_1_SCREEN_WIDTH_MAX,
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#psammead/gel-foundations/src/breakpoints';

const bgImageDark = `data:image/svg+xml;base64,${BBC_BLOCKS_DARK_MODE}`;
const bgImageRegular = `data:image/svg+xml;base64,${BBC_BLOCKS}`;

const AmpImgPlaceholderContainer = ({
  darkMode,
  fallback,
  placeholder,
  children,
}) => {
  return (
    <div
      css={({ palette }) => ({
        backgroundColor: `${darkMode ? palette.SHADOW : palette.LUNAR}`,
      })}
      fallback={fallback}
      placeholder={placeholder}
    >
      {children}
    </div>
  );
};

const AmpImgPlaceholder = props => (
  <amp-img
    style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    }}
    {...props}
  />
);

const AmpImgMediaQueries = ({ darkMode }) => {
  return (
    <>
      <AmpImgPlaceholder
        media={`(max-width: ${GEL_GROUP_1_SCREEN_WIDTH_MAX})`}
        width="60px"
        height="17px"
        src={darkMode ? bgImageDark : bgImageRegular}
      />
      <AmpImgPlaceholder
        media={`(min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX})`}
        width="77px"
        height="22px"
        src={darkMode ? bgImageDark : bgImageRegular}
      />
      <AmpImgPlaceholder
        media={`(min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN})`}
        width="93px"
        height="27px"
        src={darkMode ? bgImageDark : bgImageRegular}
      />
    </>
  );
};

const ImagePlaceholderAmp = ({ darkMode }) => {
  return (
    <>
      <AmpImgPlaceholderContainer darkMode={darkMode} placeholder="">
        <AmpImgMediaQueries darkMode={darkMode} />
      </AmpImgPlaceholderContainer>
      <AmpImgPlaceholderContainer darkMode={darkMode} fallback="">
        <AmpImgMediaQueries darkMode={darkMode} />
      </AmpImgPlaceholderContainer>
    </>
  );
};

ImagePlaceholderAmp.propTypes = {
  darkMode: bool,
};

ImagePlaceholderAmp.defaultProps = {
  darkMode: false,
};

export default ImagePlaceholderAmp;
