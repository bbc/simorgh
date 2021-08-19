import React, { useContext } from 'react';
import path from 'ramda/src/path';
import hasPath from 'ramda/src/hasPath';
import styled from '@emotion/styled';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import { getFoolscap } from '@bbc/gel-foundations/typography';

import { GridItemLarge } from '#app/components/Grid';

import { ServiceContext } from '#contexts/ServiceContext';
import useToggle from '#hooks/useToggle';

const StyledWrapper = styled(GridItemLarge)`
  ${({ script }) => script && getFoolscap(script)}
  ${({ service }) => service && getSansRegular(service)}
  font-size: 2rem;
  padding-top: 2rem;
`;

const DisclaimerComponent = () => {
  const { service, disclaimer } = useContext(ServiceContext);
  const { enabled } = useToggle('disclaimer');

  const shouldShow = hasPath(['text'], disclaimer) && enabled;

  if (!shouldShow) return null;

  return (
    <StyledWrapper data-testid="disclaimer" service={service}>
      {path(['text'], disclaimer)}
    </StyledWrapper>
  );
};

export default DisclaimerComponent;
