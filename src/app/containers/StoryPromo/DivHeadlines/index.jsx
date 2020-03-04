import styled from 'styled-components';
import { bool, string, oneOf, shape } from 'prop-types';
import { GEL_SPACING } from '@bbc/gel-foundations/spacings';
import { C_EBON } from '@bbc/psammead-styles/colours';
import { getSerifMedium } from '@bbc/psammead-styles/font-styles';
import {
  getParagon,
  getPica,
  getDoublePica,
} from '@bbc/gel-foundations/typography';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';

const PROMO_TYPES = oneOf(['top', 'regular', 'leading']);

const headlineTopStoryTypography = script => getParagon(script);

const headlineRegularTypography = script => getPica(script);

const headlineLeadingStoryTypography = script => getDoublePica(script);

const headlineTypography = script => ({
  top: headlineTopStoryTypography(script),
  regular: headlineRegularTypography(script),
  leading: headlineLeadingStoryTypography(script),
});

const DivHeadline = styled.div`
  color: ${C_EBON};
  margin: 0; /* Reset */
  padding-bottom: ${GEL_SPACING};
  ${({ service }) => getSerifMedium(service)}
  ${({ script, promoType }) => script && headlineTypography(script)[promoType]}
  ${({ promoHasImage }) =>
    !promoHasImage &&
    `display: inline;`} /* Needed for aligning Media Indicator with Headline */
`;

DivHeadline.propTypes = {
  script: shape(scriptPropType).isRequired,
  service: string.isRequired,
  promoHasImage: bool,
  promoType: PROMO_TYPES,
};

DivHeadline.defaultProps = {
  promoHasImage: true,
  promoType: 'regular',
};

export default DivHeadline;
