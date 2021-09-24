import React, { useContext } from 'react';
import { bool } from 'prop-types';
import path from 'ramda/src/path';
import hasPath from 'ramda/src/hasPath';
import styled from '@emotion/styled';

import { getSansLight } from '@bbc/psammead-styles/font-styles';
import { getLongPrimer } from '@bbc/gel-foundations/typography';
import {
  GEL_SPACING_DBL,
  GEL_SPACING_TRPL,
  GEL_SPACING_QUIN,
} from '@bbc/gel-foundations/spacings';
import { C_GREY_6 } from '@bbc/psammead-styles/colours';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';

import { GridItemLarge } from '#app/components/Grid';

import { ServiceContext } from '#contexts/ServiceContext';
import useToggle from '#hooks/useToggle';

const Inner = styled.div`
  ${({ script }) => script && getLongPrimer(script)}
  ${({ service }) => service && getSansLight(service)}
  background: #f6f6f6;
  color: ${C_GREY_6};
  text-transform: uppercase;
  margin-bottom: ${GEL_SPACING_TRPL};
  padding: ${GEL_SPACING_DBL};
  ${({ increasePaddingOnDesktop }) =>
    increasePaddingOnDesktop &&
    `
      @media (min-width: ${GEL_GROUP_4_SCREEN_WIDTH_MIN}) {
        padding: ${GEL_SPACING_DBL} ${GEL_SPACING_QUIN};
      }
    `}
`;

const DisclaimerComponent = ({ increasePaddingOnDesktop }) => {
  const { service, script, disclaimer } = useContext(ServiceContext);
  const { enabled } = useToggle('disclaimer');

  const shouldShow = hasPath(['text'], disclaimer) && enabled;

  if (!shouldShow) return null;

  return (
    <GridItemLarge data-testid="disclaimer">
      <Inner
        service={service}
        script={script}
        increasePaddingOnDesktop={increasePaddingOnDesktop}
      >
        {path(['text'], disclaimer)}
      </Inner>
    </GridItemLarge>
  );
};

DisclaimerComponent.propTypes = {
  increasePaddingOnDesktop: bool,
};

DisclaimerComponent.defaultProps = {
  increasePaddingOnDesktop: true,
};

export default DisclaimerComponent;
