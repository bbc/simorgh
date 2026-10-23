import ReadTimeArticle from '.';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import { Services, Variants } from '#app/models/types/global';
import serviceVariants from '#testHelpers/serviceVariants';
import readme from './README.md';
import metadata from './metadata.json';

const Component = ({
  service,
  variant,
  pageLang,
}: {
  service: Services;
  variant: Variants;
  pageLang?: string;
}) => (
  <ServiceContextProvider
    service={service}
    variant={variant}
    pageLang={pageLang}
  >
    <ReadTimeArticle readTimeValue={5} />
  </ServiceContextProvider>
);

export default {
  title: 'Components/ReadTime',
  Component,
  parameters: {
    docs: { readme },
    metadata,
  },
};

export const FiveMinuteReadTime = () => (
  <Component service="pidgin" variant="default" />
);

export const AllServices = () => (
  <div>
    {serviceVariants.map(
      ({ service, variant, pageLang, configVariant, label }) => (
        <div key={`${service}-${configVariant}`}>
          <strong>{label}</strong>
          <Component
            service={service as Services}
            variant={variant as Variants}
            pageLang={pageLang}
          />
        </div>
      ),
    )}
  </div>
);
AllServices.tags = ['!dev'];
AllServices.parameters = {
  chromatic: {
    disable: false,
  },
};
