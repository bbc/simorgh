import { RequestContextProvider } from '#contexts/RequestContext';
import { ToggleContextProvider } from '#contexts/ToggleContext';
import { ServiceContextProvider } from '#contexts/ServiceContext';
import serviceVariants from '#testHelpers/serviceVariants';
import { durationCoverage, indonesian, arabic } from './fixtures';
import RecentAudioEpisodes from './index';

const Component = ({
  masterBrand,
  brandId,
  pageType,
  episodes,
  service,
  variant,
  pageLang,
}) => (
  <RequestContextProvider
    service={service}
    pageType="media"
    pathname={`/${service}`}
    isAmp={false}
    variant={variant === 'default' ? null : variant}
  >
    <ToggleContextProvider
      toggles={{
        eventTracking: {
          enabled: false,
        },
      }}
    >
      <ServiceContextProvider
        service={service}
        variant={variant}
        pageLang={pageLang}
      >
        <RecentAudioEpisodes
          masterBrand={masterBrand}
          episodes={episodes}
          brandId={brandId}
          pageType={pageType}
        />
      </ServiceContextProvider>
    </ToggleContextProvider>
  </RequestContextProvider>
);

const fixtures = { indonesia: indonesian, arabic };
const masterBrands = {
  indonesia: 'bbc_indonesian_radio',
  arabic: 'bbc_arabic_radio',
};

export default {
  title: 'Containers/Episode List/Audio',
  Component,
};

export const MultipleItems = {
  render: (_, { service }) => (
    <Component
      episodes={fixtures?.[service] ?? fixtures.indonesia}
      pageType="Podcast"
      masterBrand={masterBrands?.[service] ?? masterBrands.indonesia}
      service={service}
    />
  ),
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

export const SingleItem = {
  render: (_, { service }) => (
    <Component
      episodes={[fixtures?.[service]?.[0] ?? fixtures.indonesia[0]]}
      pageType="Podcast"
      masterBrand={masterBrands?.[service] ?? masterBrands.indonesia}
      service={service}
    />
  ),
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

// This story is for chromatic testing purposes only
export const TestMultipleItems = storyArgs =>
  MultipleItems.render(storyArgs, { service: 'indonesia' });
TestMultipleItems.tags = ['!dev'];
TestMultipleItems.globals = {
  service: { service: 'indonesia' },
};

// This story is for chromatic testing purposes only
export const TestSingleItem = storyArgs =>
  SingleItem.render(storyArgs, { service: 'indonesia' });
TestSingleItem.tags = ['!dev'];
TestSingleItem.globals = {
  service: { service: 'indonesia' },
};

export const AllServicesDuration = () => (
  <div>
    {serviceVariants.map(
      ({ service, variant, pageLang, configVariant, label }) => (
        <div key={`${service}-${configVariant}`}>
          <strong>{label}</strong>
          <Component
            episodes={durationCoverage}
            pageType="On Demand Radio"
            masterBrand={`bbc_${service}_radio`}
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
