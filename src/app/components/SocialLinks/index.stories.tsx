import { ToggleContextProvider } from '#app/contexts/ToggleContext';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import ThemeProvider from '#app/components/ThemeProvider';
import { Services } from '#app/models/types/global';
import socialLinksFixture from '#data/kyrgyz/topics/cvpv9djp9qqt.json';
import {
  Curation,
  Summary,
  VISUAL_STYLE,
  VISUAL_PROMINENCE,
} from '#app/models/types/curationData';
import SocialLinks from '.';
import metadata from './metadata.json';
import readme from './README.md';

const getSocialLinksData = (numberOfItems?: number): Curation => {
  const socialLinksCuration = socialLinksFixture.data.curations.find(
    curation => {
      return (
        curation.visualStyle === VISUAL_STYLE.LINKS &&
        curation.visualProminence === VISUAL_PROMINENCE.NORMAL
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
  curation,
  service,
}: {
  curation: Curation;
  service: Services;
}) => {
  return (
    <ToggleContextProvider>
      <ThemeProvider service={service}>
        <ServiceContextProvider service={service}>
          <SocialLinks
            summaries={curation.summaries as Summary[]}
            title={curation.title || 'Social Links'}
            eventTrackingData={{ componentName: 'social-links' }}
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

export const Example = () => (
  <Component curation={getSocialLinksData()} service="mundo" />
);

export const SingleLink = () => (
  <Component curation={getSocialLinksData(1)} service="mundo" />
);

export const OddNumberOfLinks = () => (
  <Component curation={getSocialLinksData(5)} service="mundo" />
);
