import styled from '@emotion/styled';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN, // 37.5rem = 600px
  GEL_GROUP_3_SCREEN_WIDTH_MIN, // 48rem = 768px
} from '#psammead/gel-foundations/src/breakpoints';
import {
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '#psammead/gel-foundations/src/spacings';

const Banner = styled.div`
  background: #fff;
  width: 100%;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 4rem;
`;

/**
 * Match Brand's internal content width so the logo aligns with brandSvg
 * This mirrors SVG_WRAPPER_MAX_WIDTH_ABOVE_1280PX used by Brand/SvgWrapper
 */
const SVG_WRAPPER_MAX_WIDTH_ABOVE_1280PX = '63rem';

const Inner = styled.div`
  /* Constrain to the same column as Brand's SvgWrapper */
  width: 100%;
  max-width: ${SVG_WRAPPER_MAX_WIDTH_ABOVE_1280PX};
  margin: 0 auto;

  /* Center by default */
  display: flex;
  justify-content: center;

  /**
   * Between 600px (37.5rem) and 1008px (63rem),
   * left-align and apply the same horizontal paddings as Brand Banner
   */
  @media (min-width: ${GEL_GROUP_2_SCREEN_WIDTH_MIN}) and (max-width: ${SVG_WRAPPER_MAX_WIDTH_ABOVE_1280PX}) {
    justify-content: flex-start;
    padding: 0 ${GEL_SPACING};
  }

  /* Match Brand's double padding from 768px upwards within this band */
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${SVG_WRAPPER_MAX_WIDTH_ABOVE_1280PX}) {
    padding: 0 ${GEL_SPACING_DBL};
  }
`;

const LOGO_ASPECT_RATIO = 168 / 48;
const SVG_HEIGHT = 38;

const LogoSvg = styled.svg`
  box-sizing: content-box;
  color: #000;
  fill: currentColor;
  height: ${SVG_HEIGHT}px;
  max-width: ${LOGO_ASPECT_RATIO * SVG_HEIGHT}px;
  width: 100%;
  display: block;
`;

const NewLogoBanner = () => (
  <Banner data-testid="logo-banner">
    {/* ✅ Inner wrapper controls alignment and width per breakpoint */}
    <Inner>
      <LogoSvg
        viewBox="0 0 168 48"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M0 0V48H48V0H0ZM33.4688 33.8812C32.6437 35.0438 31.4813 35.925 29.9625 36.5625C28.4438 37.2 26.625 37.5 24.4875 37.5H13.725V10.5H23.85C26.8312 10.5 29.1562 11.1 30.7875 12.3C32.4188 13.5 33.2438 15.2063 33.2438 17.4563C33.2438 18.7313 32.9438 19.8562 32.3625 20.7937C31.7813 21.7312 30.9 22.4812 29.7562 23.0437C31.35 23.5687 32.5687 24.4125 33.4125 25.5563C34.2562 26.7 34.6875 28.0875 34.6875 29.7375C34.7062 31.3313 34.2938 32.7188 33.4688 33.8812ZM26.6062 20.6813C27.3562 20.0625 27.7312 19.2 27.7312 18.0938C27.7312 15.9563 26.2688 14.8875 23.3625 14.8875H19.2188V21.6H23.3625C24.7875 21.6 25.8562 21.3 26.6062 20.6813ZM24.0563 25.8375H19.2188V33.1312H24C25.6313 33.1312 26.9062 32.8312 27.7875 32.2125C28.6687 31.5938 29.1 30.7125 29.1 29.55C29.0812 27.0563 27.4125 25.8375 24.0563 25.8375Z"
          fill="currentColor"
        />
        <path
          d="M60 0V48H108V0H60ZM93.4688 33.8812C92.6437 35.0438 91.4812 35.925 89.9625 36.5625C88.4437 37.2 86.625 37.5 84.4875 37.5H73.725V10.5H83.85C86.8313 10.5 89.1563 11.1 90.7875 12.3C92.4188 13.5 93.2437 15.2063 93.2437 17.4563C93.2437 18.7313 92.9438 19.8562 92.3625 20.7937C91.7812 21.7312 90.9 22.4812 89.7563 23.0437C91.35 23.5687 92.5688 24.4125 93.4125 25.5563C94.2563 26.7 94.6875 28.0875 94.6875 29.7375C94.7062 31.3313 94.2938 32.7188 93.4688 33.8812ZM86.6063 20.6813C87.3563 20.0625 87.7313 19.2 87.7313 18.0938C87.7313 15.9563 86.2688 14.8875 83.3625 14.8875H79.2188V21.6H83.3625C84.7875 21.6 85.8563 21.3 86.6063 20.6813ZM84.0562 25.8375H79.2188V33.1312H84C85.6313 33.1312 86.9063 32.8312 87.7875 32.2125C88.6688 31.5938 89.1 30.7125 89.1 29.55C89.0813 27.0563 87.4125 25.8375 84.0562 25.8375Z"
          fill="currentColor"
        />
        <path
          d="M120 48H168V0H120V48ZM154.481 35.7937C153.356 36.4125 152.063 36.9 150.6 37.2563C149.119 37.6125 147.581 37.8 145.95 37.8C143.794 37.8 141.844 37.4813 140.119 36.8625C138.394 36.225 136.931 35.325 135.731 34.1438C134.531 32.9625 133.631 31.5187 132.994 29.7937C132.356 28.0875 132.038 26.1562 132.038 24C132.038 21.9 132.375 20.0062 133.031 18.3187C133.688 16.6312 134.644 15.1875 135.881 13.9688C137.119 12.7688 138.619 11.8312 140.362 11.1937C142.106 10.5562 144.056 10.2375 146.212 10.2375C147.712 10.2375 149.119 10.3875 150.469 10.7062C151.8 11.0062 153.037 11.4563 154.181 12.0563V17.3063C153.131 16.6125 152.006 16.0875 150.788 15.7312C149.569 15.375 148.294 15.1875 146.944 15.1875C145.088 15.1875 143.513 15.525 142.2 16.2188C140.888 16.9125 139.894 17.9062 139.181 19.2188C138.487 20.5312 138.131 22.125 138.131 24C138.131 25.875 138.469 27.4688 139.144 28.8C139.819 30.1125 140.794 31.125 142.069 31.8187C143.344 32.5125 144.9 32.85 146.737 32.85C149.531 32.85 152.119 32.1188 154.481 30.675V35.7937Z"
          fill="currentColor"
        />
      </LogoSvg>
    </Inner>
  </Banner>
);

export default NewLogoBanner;
