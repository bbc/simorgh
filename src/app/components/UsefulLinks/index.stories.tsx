import { ToggleContextProvider } from '#app/contexts/ToggleContext';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import ThemeProvider from '#app/components/ThemeProvider';
import { Services } from '#app/models/types/global';
import fixture from '#data/kyrgyz/topics/cvpv9djp9qqt.json';
import {
  Curation,
  Summary,
  VISUAL_STYLE,
  VISUAL_PROMINENCE,
} from '#app/models/types/curationData';
import UsefulLinks from '.';
import metadata from './metadata.json';
import readme from './README.md';

const getUsefulLinksData = (numberOfItems?: number): Curation => {
  const curations = fixture.data.curations.find(curation => {
    return (
      curation.visualStyle === VISUAL_STYLE.LINKS &&
      curation.visualProminence === VISUAL_PROMINENCE.LOW
    );
  }) as Curation;

  if (!curations.summaries || !numberOfItems) return curations;

  return {
    ...curations,
    summaries: curations.summaries.slice(0, numberOfItems),
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
          <UsefulLinks
            summaries={curation.summaries as Summary[]}
            title={curation.title || 'Useful Links'}
          />
        </ServiceContextProvider>
      </ThemeProvider>
    </ToggleContextProvider>
  );
};

export default {
  Component,
  title: 'Components/UsefulLinks',
  parameters: {
    metadata,
    docs: { readme },
  },
};

export const Example = () => (
  <Component curation={getUsefulLinksData()} service="mundo" />
);

export const SingleLink = () => (
  <Component curation={getUsefulLinksData(1)} service="mundo" />
);

export const OddNumberOfLinks = () => (
  <Component curation={getUsefulLinksData(3)} service="mundo" />
);
