import React, { useContext } from 'react';
import SectionLabel from '@bbc/psammead-section-label';
import { ServiceContext } from '#contexts/ServiceContext';

const MostReadSectionLabel = () => {
  const {
    service,
    script,
    dir,
    mostRead: { header },
  } = useContext(ServiceContext);
  return (
    <SectionLabel
      script={script}
      labelId="Most-Read"
      service={service}
      dir={dir}
    >
      {header}
    </SectionLabel>
  );
};

export default MostReadSectionLabel;
