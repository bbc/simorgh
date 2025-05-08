import React from 'react';
import { ToggleContextProvider } from '#app/contexts/ToggleContext';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import ThemeProvider from '#app/components/ThemeProvider';
import { Services } from '#app/models/types/global';
import socialLinksFixture from '#data/kyrgyz/topics/cvpv9djp9qqt.json';
import { Curation, Summary } from '#app/models/types/curationData';
import SocialLinks from '.';
import metadata from './metadata.json';
import readme from './README.md';

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
  parameters: {
    metadata,
    docs: { readme },
  },
};

export const MultipleLinks = () => (
  <Component curations={getSocialLinksData()} service="mundo" />
);

export const SingleLink = () => (
  <Component curations={getSocialLinksData(1)} service="mundo" />
);

export const OddNumberOfLinks = () => (
  <Component curations={getSocialLinksData(5)} service="mundo" />
);

export const RTLMultipleLinks = () => (
  <Component curations={getSocialLinksData(5)} service="arabic" />
);
