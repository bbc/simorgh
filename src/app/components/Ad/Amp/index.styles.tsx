import styled from '@emotion/styled';
import { css, Theme } from '@emotion/react';
import React, { JSX } from 'react';
import { GREY_3 } from '../../ThemeProvider/palette';

export const AdSection = styled.section`
  background-color: ${GREY_3};
`;

export const StyledWrapper = styled.div`
  margin: 0 auto; /* To centre page layout for Group 4+ */
  text-align: center;
`;

// styled-components removes non-standard attributes (such as AMP attributes) on
// server rendering. spreading props like this allows us to add AMP attributes
// to the element.
const AccessDiv = (
  props: JSX.IntrinsicAttributes & globalThis.JSX.DivProps,
) => <div {...props} />;

// amp-geo adds geo group classes to the body of the document depending on
// the user's location. It removes the `amp-geo-pending` class when geolocation
// data is available.
// setting display: none ensures ad requests within this component are not made.
export const DisplayWrapper = styled(AccessDiv)`
  .amp-geo-pending &,
  .amp-geo-group-gbOrUnknown & {
    display: none;
    visibility: hidden;
  }
`;

const styles = {
  link: ({ fontSizes, fontVariants, palette, spacings }: Theme) =>
    css({
      ...fontSizes.minion,
      ...fontVariants.sansRegular,
      color: palette.RHINO,
      textDecoration: 'none',
      textTransform: 'uppercase',
      display: 'block',
      padding: `${spacings.FULL}rem 0`,
      '&:hover': {
        textDecoration: 'underline',
      },
    }),
};

export default styles;
