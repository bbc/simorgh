import React, { useContext } from 'react';
import styled from 'styled-components';
import SectionLabel from '@bbc/psammead-section-label';
import {
  GEL_GROUP_3_SCREEN_WIDTH_MIN,
  GEL_GROUP_3_SCREEN_WIDTH_MAX,
} from '@bbc/gel-foundations/breakpoints';
import { GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
import { ServiceContext } from '#contexts/ServiceContext';

const SectionLabelWithMargin = styled(SectionLabel)`
  @media (min-width: ${GEL_GROUP_3_SCREEN_WIDTH_MIN}) and (max-width: ${GEL_GROUP_3_SCREEN_WIDTH_MAX}) {
    margin-bottom: ${GEL_SPACING_DBL};
  }
`;

const MostReadSectionLabel = () => {
  const {
    service,
    script,
    dir,
    mostRead: { header },
  } = useContext(ServiceContext);
  return (
    <SectionLabelWithMargin
      script={script}
      labelId="Most-Read"
      service={service}
      dir={dir}
    >
      {header}
    </SectionLabelWithMargin>
  );
};

export default MostReadSectionLabel;
