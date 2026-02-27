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

const InArticlePromoIcon = styled(MediaIcon)`
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
    <InArticlePromoIcon
      viewBox="0 0 32 32"
      width="32"
      height="32"
      {...defaultAttrs}
    >
      <path d="M18.7,31h-5.3l-2.3-10.4C12.3,19.5,14,19,16,19s3.7,0.5,4.9,1.7L18.7,31z M22,8.2c-1.7-1.7-3.9-2.5-6.1-2.5s-4.4,0.9-6,2.5 l1.7,1.7c1.2-1.2,2.7-1.8,4.3-1.8s3.1,0.6,4.3,1.8L22,8.2z M25.5,4.9c-2.6-2.7-6.1-4-9.5-4S9.1,2.3,6.5,4.9l1.7,1.7 c2.1-2.1,4.9-3.2,7.7-3.2c2.8,0,5.6,1.1,7.8,3.2L25.5,4.9z M12.4,14c0,2,1.5,3.6,3.6,3.6c2,0,3.6-1.5,3.6-3.6 c0-2.1-1.5-3.6-3.6-3.6C13.9,10.4,12.4,11.9,12.4,14z" />
    </InArticlePromoIcon>
  ),
  whatsapp: (
    <InArticlePromoIcon
      viewBox="0 0 32 32"
      width="32"
      height="32"
      {...defaultAttrs}
    >
      <path d="M26.576 5.363c-2.69-2.69-6.406-4.354-10.511-4.354-8.209 0-14.865 6.655-14.865 14.865 0 2.732 0.737 5.291 2.022 7.491l-0.038-0.070-2.109 7.702 7.879-2.067c2.051 1.139 4.498 1.809 7.102 1.809h0.006c8.209-0.003 14.862-6.659 14.862-14.868 0-4.103-1.662-7.817-4.349-10.507l0 0zM16.062 28.228h-0.005c-0 0-0.001 0-0.001 0-2.319 0-4.489-0.64-6.342-1.753l0.056 0.031-0.451-0.267-4.675 1.227 1.247-4.559-0.294-0.467c-1.185-1.862-1.889-4.131-1.889-6.565 0-6.822 5.531-12.353 12.353-12.353s12.353 5.531 12.353 12.353c0 6.822-5.53 12.353-12.353 12.353h-0zM22.838 18.977c-0.371-0.186-2.197-1.083-2.537-1.208-0.341-0.124-0.589-0.185-0.837 0.187-0.246 0.371-0.958 1.207-1.175 1.455-0.216 0.249-0.434 0.279-0.805 0.094-1.15-0.466-2.138-1.087-2.997-1.852l0.010 0.009c-0.799-0.74-1.484-1.587-2.037-2.521l-0.028-0.052c-0.216-0.371-0.023-0.572 0.162-0.757 0.167-0.166 0.372-0.434 0.557-0.65 0.146-0.179 0.271-0.384 0.366-0.604l0.006-0.017c0.043-0.087 0.068-0.188 0.068-0.296 0-0.131-0.037-0.253-0.101-0.357l0.002 0.003c-0.094-0.186-0.836-2.014-1.145-2.758-0.302-0.724-0.609-0.625-0.836-0.637-0.216-0.010-0.464-0.012-0.712-0.012-0.395 0.010-0.746 0.188-0.988 0.463l-0.001 0.002c-0.802 0.761-1.3 1.834-1.3 3.023 0 0.026 0 0.053 0.001 0.079l-0-0.004c0.131 1.467 0.681 2.784 1.527 3.857l-0.012-0.015c1.604 2.379 3.742 4.282 6.251 5.564l0.094 0.043c0.548 0.248 1.25 0.513 1.968 0.74l0.149 0.041c0.442 0.14 0.951 0.221 1.479 0.221 0.303 0 0.601-0.027 0.889-0.078l-0.031 0.004c1.069-0.223 1.956-0.868 2.497-1.749l0.009-0.017c0.165-0.366 0.261-0.793 0.261-1.242 0-0.185-0.016-0.366-0.047-0.542l0.003 0.019c-0.092-0.155-0.34-0.247-0.712-0.434z" />
    </InArticlePromoIcon>
  ),
  youtube: (
    <InArticlePromoIcon
      viewBox="0 0 16 16"
      width="32"
      height="32"
      {...defaultAttrs}
    >
      <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
    </InArticlePromoIcon>
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
