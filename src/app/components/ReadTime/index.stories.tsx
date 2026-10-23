import ReadTimeArticle from '.';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import { Services, Variants } from '#app/models/types/global';
import serviceVariants from '#testHelpers/serviceVariants';
import readme from './README.md';
import metadata from './metadata.json';

// Example for pidgin service and default variant
const service = 'pidgin';
const variant = 'default';

const Component = ({ readTime }: { readTime: number }) => (
  <ServiceContextProvider service={service} variant={variant}>
    <ReadTimeArticle readTimeValue={readTime} />
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

export const SevenMinuteReadTime = () => <Component readTime={7} />;
export const OneMinuteReadTime = () => <Component readTime={1} />;

export const AllServices = () => (
  <div>
    {serviceVariants.map(
      ({ service, variant, pageLang, configVariant, label }) => (
        <div key={`${service}-${configVariant}`}>
          <strong>{label}</strong>
          <ServiceContextProvider
            service={service as Services}
            variant={variant as Variants}
            pageLang={pageLang}
          >
            <ReadTimeArticle readTimeValue={1} />
            <ReadTimeArticle readTimeValue={7} />
          </ServiceContextProvider>
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
