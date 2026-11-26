import { RequestContextProvider } from '#app/contexts/RequestContext';
import { ToggleContextProvider } from '#app/contexts/ToggleContext';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import RelatedContentCarousel from '.';
import RelatedContentCarouselFixture from './fixture';
// import readme from './README.md';

const Component = ({
  content,
}: {
  content: typeof RelatedContentCarouselFixture;
}) => {
  return (
    <ServiceContextProvider service="mundo" variant="default">
      <ToggleContextProvider
        toggles={{
          relatedContentCarousel: {
            enabled: true,
          },
        }}
      >
        <RequestContextProvider
          bbcOrigin="http://localhost:9001"
          pageType="article"
          service="mundo"
          pathname="/mundo/articles/cx21p732nv5o"
        >
          <RelatedContentCarousel content={content} />
        </RequestContextProvider>
      </ToggleContextProvider>
    </ServiceContextProvider>
  );
};

export default {
  Component,
  title: 'Components/RelatedContentCarousel',
  parameters: {
    // docs: { readme },
    chromatic: { viewports: [320, 600, 1008] },
  },
};

export const Example = () => (
  <Component content={RelatedContentCarouselFixture} />
);
