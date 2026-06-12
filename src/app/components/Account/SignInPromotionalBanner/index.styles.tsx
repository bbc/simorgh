import { css } from '@emotion/react';
import {
  GROUP_B_MIN_WIDTH,
  GROUP_B_ONLY,
} from '#app/components/ThemeProvider/fontMediaQueries';
import {
  GROUP_3_ONLY,
  GROUP_4_MIN_WIDTH,
} from '#app/components/ThemeProvider/mediaQueries';
import pixelsToRem from '#app/utilities/pixelsToRem';
import { getEnvConfig } from '#app/lib/utilities/getEnvConfig';

const {
  SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN,
  SIMORGH_PUBLIC_STATIC_ASSETS_PATH,
} = getEnvConfig();
const imagesPath = `${SIMORGH_PUBLIC_STATIC_ASSETS_ORIGIN}${SIMORGH_PUBLIC_STATIC_ASSETS_PATH}images`;

const signInImage = css({
  display: 'none',
  [GROUP_B_MIN_WIDTH]: {
    display: 'block',
    width: '100%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  },
  [GROUP_B_ONLY]: {
    marginBottom: `${pixelsToRem(20)}rem`,
    marginTop: `${pixelsToRem(16)}rem`,
    aspectRatio: '256 / 242',
    backgroundImage: `url(${imagesPath}/news_mobile_image.webp)`,
  },
  [GROUP_3_ONLY]: {
    marginBottom: `${pixelsToRem(24)}rem`,
    marginTop: `${pixelsToRem(16)}rem`,
    aspectRatio: '395 / 328',
    backgroundImage: `url(${imagesPath}/news_tablet_image.webp)`,
  },
  [GROUP_4_MIN_WIDTH]: {
    gridColumn: 2,
    gridRow: '1 / span 2',
    aspectRatio: '274 / 400',
    backgroundImage: `url(${imagesPath}/news_desktop_image.webp)`,
  },
});

export default { signInImage };
