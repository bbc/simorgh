import React from 'react';
import { ToggleContextProvider } from '#app/contexts/ToggleContext';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import ThemeProvider from '#app/components/ThemeProvider';
import { Services } from '#app/models/types/global';
import socialLinksFixture from '#data/kyrgyz/topics/cvpv9djp9qqt.json';
import { Curation, Summary } from '#app/models/types/curationData';
import SocialLinks from '.';

const getSocialLinksData = (numberOfItems?: number): Curation => {
  const socialLinksCuration = socialLinksFixture.data.curations.find(
    curation => {
      return (
        curation.visualStyle === 'LINKS' &&
        curation.visualProminence === 'NORMAL'
      );
    },
  ) as Curation;

  if (!socialLinksCuration.summaries || !numberOfItems)
    return socialLinksCuration;

  return {
    ...socialLinksCuration,
    summaries: socialLinksCuration.summaries.slice(0, numberOfItems),
  };
};

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

export const MultipleLinks = () => (
  <Component curations={getSocialLinksData()} service="kyrgyz" />
);

export const SingleLink = () => (
  <Component curations={getSocialLinksData(1)} service="kyrgyz" />
);

export const OddNumberOfLinks = () => (
  <Component curations={getSocialLinksData(5)} service="kyrgyz" />
);

export const RTLMultipleLinks = () => (
  <Component curations={getSocialLinksData(5)} service="arabic" />
);
