import React from 'react';
import { ToggleContextProvider } from '#app/contexts/ToggleContext';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import ThemeProvider from '#app/components/ThemeProvider';
import { Services } from '#app/models/types/global';
import socialLinksFixture from '#data/kyrgyz/topics/cvpv9djp9qqt.json';
import { Curation, Summary } from '#app/models/types/curationData';
import SocialLinks from '.';

const socialLinksData = socialLinksFixture.data.curations.find(curation => {
  return (
    curation.visualStyle === 'LINKS' && curation.visualProminence === 'NORMAL'
  );
});

const Component = ({
  curations,
  service,
}: {
  curations: Curation;
  service: Services;
}) => {
  return (
    <ToggleContextProvider>
      <ThemeProvider service={service}>
        <ServiceContextProvider service={service}>
          <SocialLinks
            summaries={curations.summaries as Summary[]}
            position={curations.position}
            title={curations.title || 'Social links demo'}
          />
        </ServiceContextProvider>
      </ThemeProvider>
    </ToggleContextProvider>
  );
};

export default {
  Component,
  title: 'Components/SocialLinks',
};

export const MultipleItems = () => (
  <Component curations={socialLinksData as Curation} service="kyrgyz" />
);
