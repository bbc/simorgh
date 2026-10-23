import { RequestContextProvider } from '#contexts/RequestContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import serviceVariants from '#testHelpers/serviceVariants';
import { afrique, durationCoverage, pashto } from './fixtures';
import RecentVideoEpisodes from '.';

const Component = ({ masterBrand, episodes, service, variant, pageLang }) => (
  <RequestContextProvider
    service={service}
    pageType="media"
    pathname={`/${service}`}
    isAmp={false}
    // should amp come from context?
    variant={variant === 'default' ? null : variant}
  >
    <ServiceContextProvider
      service={service}
      variant={variant}
      pageLang={pageLang}
    >
      <RecentVideoEpisodes masterBrand={masterBrand} episodes={episodes} />
    </ServiceContextProvider>
  </RequestContextProvider>
);

const fixtures = { afrique, pashto };

export default {
  title: 'Containers/Episode List/Video',
  Component,
  globals: {
    backgrounds: { value: 'dark' },
  },
};

export const MultipleItems = {
  render: (_, { service }) => (
    <Component
      episodes={fixtures?.[service] ?? fixtures.afrique}
      masterBrand={`bbc_${service}_tv`}
      service={service}
    />
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

export const SingleItem = {
  render: (_, { service }) => (
    <Component
      episodes={[fixtures?.[service]?.[0] ?? fixtures.afrique[0]]}
      masterBrand={`bbc_${service}_tv`}
      service={service}
    />
  ),
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
};

// This story is for chromatic testing purposes only
export const TestMultipleItems = storyArgs =>
  MultipleItems.render(storyArgs, { service: 'afrique' });
TestMultipleItems.tags = ['!dev'];
TestMultipleItems.globals = {
  service: { service: 'afrique' },
};

// This story is for chromatic testing purposes only
export const TestSingleItem = storyArgs =>
  SingleItem.render(storyArgs, { service: 'afrique' });
TestSingleItem.tags = ['!dev'];
TestSingleItem.globals = {
  service: { service: 'afrique' },
};

export const AllServicesDuration = () => (
  <div>
    {serviceVariants.map(
      ({ service, variant, pageLang, configVariant, label }) => (
        <div key={`${service}-${configVariant}`}>
          <strong>{label}</strong>
          <Component
            episodes={durationCoverage}
            masterBrand={`bbc_${service}_tv`}
            service={service}
            variant={variant}
            pageLang={pageLang}
          />
        </div>
      ),
    )}
  </div>
);
AllServicesDuration.tags = ['!dev'];
AllServicesDuration.parameters = {
  chromatic: {
    disable: false,
  },
};
