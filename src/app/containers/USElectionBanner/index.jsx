import React from 'react';
import styled from 'styled-components';

// Utilities
import useToggle from '#hooks/useToggle';

// Components
import FrontPageSection from '../../components/FrontPageSection';

const createMarkup = oembed => {
  return { __html: oembed.html };
};

const USElectionBanner = ({ oembed }) => {
  const { enabled } = useToggle('us2020ElectionBanner');

  if (!enabled || !oembed) return null;

  return (
    <FrontPageSection>
      <div dangerouslySetInnerHTML={createMarkup(oembed)} />
    </FrontPageSection>
  );
};

export default USElectionBanner;
