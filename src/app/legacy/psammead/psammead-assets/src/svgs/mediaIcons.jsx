import React from 'react';
import styled from '@emotion/styled';
import {
  GEL_SPACING_HLF,
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
} from '#psammead/gel-foundations/src/spacings';

const GEL_GROUP_1_WIDTH_260PX = '16.25rem';

const defaultAttrs = {
  focusable: 'false',
  'aria-hidden': 'true',
};

// `currentColor` has been used to better reflect user colour choices in Firefox.
const MediaIcon = styled.svg`
  vertical-align: middle;
  margin: 0 ${GEL_SPACING_HLF};
  color: ${props => props.theme.palette.EBON};
  fill: currentColor;
`;

const VideoMediaIcon = styled(MediaIcon)`
  width: 0.75rem;
  height: 0.75rem;
`;

const AudioMediaIcon = styled(MediaIcon)`
  width: 0.75rem;
  height: 0.75rem;
`;

const PhotoMediaIcon = styled(MediaIcon)`
  width: ${GEL_SPACING_DBL};
  height: 0.8125rem;
`;

const GuidanceIcon = styled(MediaIcon)`
  width: ${GEL_SPACING_DBL};
  height: ${GEL_SPACING_DBL};
`;

const PodcastIcon = styled(MediaIcon)`
  width: ${GEL_SPACING_DBL};
  height: ${GEL_SPACING_DBL};
  .podcastIconWrapper & {
    width: ${GEL_SPACING_QUAD};
    height: ${GEL_SPACING_QUAD};
    margin: auto;
    @media (max-width: ${GEL_GROUP_1_WIDTH_260PX}) {
      width: ${GEL_SPACING_TRPL};
      height: ${GEL_SPACING_TRPL};
    }
  }
`;

const SeriesStackIcon = styled(MediaIcon)`
  width: ${GEL_SPACING_DBL};
  height: ${GEL_SPACING_DBL};
`;

const mediaIcons = {
  video: (
    <VideoMediaIcon
      viewBox="0 0 12 12"
      width="12"
      height="12"
      xmlns="http://www.w3.org/2000/svg"
      {...defaultAttrs}
    >
      <g fill="none" fillRule="evenodd">
        <path d="M.5.6h12v12H.5z" />
        <path fill="currentColor" d="M2.144.96v11.28l8.712-5.64z" />
      </g>
    </VideoMediaIcon>
  ),
  audio: (
    <AudioMediaIcon
      viewBox="0 0 13 12"
      width="13px"
      height="12px"
      {...defaultAttrs}
    >
      <path d="M9.021 1.811l-.525.525c.938.938 1.5 2.25 1.5 3.675s-.563 2.738-1.5 3.675l.525.525c1.05-1.087 1.725-2.55 1.725-4.2s-.675-3.112-1.725-4.2z" />
      <path d="M10.596.199l-.525.562c1.35 1.35 2.175 3.225 2.175 5.25s-.825 3.9-2.175 5.25l.525.525c1.5-1.462 2.4-3.525 2.4-5.775s-.9-4.312-2.4-5.812zM6.996 1.511l-2.25 2.25H.996v4.5h3.75l2.25 2.25z" />
    </AudioMediaIcon>
  ),
  photogallery: (
    <PhotoMediaIcon
      viewBox="0 0 32 26"
      width="16px"
      height="13px"
      {...defaultAttrs}
    >
      <path d="M9,2V0H4V2H0V26H32V2ZM6.5,10A2.5,2.5,0,1,1,9,7.52,2.5,2.5,0,0,1,6.5,10ZM20,23a9,9,0,1,1,9-9A9,9,0,0,1,20,23Z" />
      <circle cx="20" cy="14.02" r="5.5" />
    </PhotoMediaIcon>
  ),
  guidance: (
    <GuidanceIcon viewBox="0 0 32 32" width="32" height="32" {...defaultAttrs}>
      <path d="M32,16A16,16,0,1,1,16,0,16,16,0,0,1,32,16Zm-8.6-.8H16.6v3.1h2.9c-.2,1.5-1.6,2.4-3.7,2.4s-3.7-2.4-3.7-4.7,1-4.7,3.7-4.7,3,.8,3.2,2.2h4.2c-.4-4-3.9-5.8-7.2-5.8-4.8,0-8,3.7-8,8.3s3.1,8.3,8,8.3a5.4,5.4,0,0,0,4.5-2.1l.2,1.7h2.7Z" />
    </GuidanceIcon>
  ),
  podcast: (
    <PodcastIcon viewBox="0 0 32 32" width="32" height="32" {...defaultAttrs}>
      <path d="M18.7,31h-5.3l-2.3-10.4C12.3,19.5,14,19,16,19s3.7,0.5,4.9,1.7L18.7,31z M22,8.2c-1.7-1.7-3.9-2.5-6.1-2.5s-4.4,0.9-6,2.5 l1.7,1.7c1.2-1.2,2.7-1.8,4.3-1.8s3.1,0.6,4.3,1.8L22,8.2z M25.5,4.9c-2.6-2.7-6.1-4-9.5-4S9.1,2.3,6.5,4.9l1.7,1.7 c2.1-2.1,4.9-3.2,7.7-3.2c2.8,0,5.6,1.1,7.8,3.2L25.5,4.9z M12.4,14c0,2,1.5,3.6,3.6,3.6c2,0,3.6-1.5,3.6-3.6 c0-2.1-1.5-3.6-3.6-3.6C13.9,10.4,12.4,11.9,12.4,14z" />
    </PodcastIcon>
  ),
  seriesstack: (
    <SeriesStackIcon
      viewBox="0 0 32 32"
      width="32"
      height="32"
      {...defaultAttrs}
    >
      <polygon points="4 6 11.1 6 26 6 26 28 28 28 28 4 4 4 4 6" />
      <polygon points="8 0 8 2 30 2 30 24 32 24 32 0 8 0" />
      <path d="M0,32H24V8H0ZM4,12H20V28H4Z" />
    </SeriesStackIcon>
  ),
};

export default mediaIcons;
