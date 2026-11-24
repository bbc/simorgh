import styled from '@emotion/styled';
import fixture from '#data/pidgin/topics/c95y35941vrt.json';
import { MEDIA_TYPES } from '#app/lib/utilities/isMedia';
import { RequestContextProvider } from '#contexts/RequestContext';
import Promo from '.';

const Wrapper = styled.div`
  max-width: 30rem;
`;

const Component = () => {
  return (
    <Wrapper>
      <Promo {...fixture.data.curations[0].summaries[0]} />
    </Wrapper>
  );
};

const WithMediaIndicator = () => {
  return (
    <Wrapper>
      <Promo
        {...fixture.data.curations[0].summaries[0]}
        type={MEDIA_TYPES.VIDEO}
        duration={123}
      />
      <Promo
        {...fixture.data.curations[0].summaries[0]}
        type={MEDIA_TYPES.PHOTO_GALLERY}
        duration={123}
      />
      <Promo
        {...fixture.data.curations[0].summaries[24]}
        type={MEDIA_TYPES.VIDEO}
        duration={123}
      />
    </Wrapper>
  );
};

export default {
  title: 'Components/Curation/Promo - Normal',
  Component,
  parameters: { chromatic: { disable: true } },
};

export const Example = Component;
export const Media = WithMediaIndicator;

export const MissingMyNewsImage = () => (
  <RequestContextProvider
    service="pidgin"
    pageType="myNews"
    pathname="/pidgin/my-news"
  >
    <Wrapper>
      <Promo
        {...fixture.data.curations[0].summaries[0]}
        imageUrl=""
        imageAlt=""
      />
    </Wrapper>
  </RequestContextProvider>
);

export const PortraitImage = () => (
  <Wrapper>
    <Promo
      {...fixture.data.curations[0].summaries[0]}
      title="Portrait image with a blurred background"
      imageAlt="BBC presenter"
      imageUrl="https://ichef.bbci.co.uk/ace/ws/{width}/cpsprodpb/beb0/live/98c7a0b0-af66-11f0-aa13-0b0479f6f42a.jpg.webp"
      isPortraitImage
    />
  </Wrapper>
);

export const ProgrammeImage = () => (
  <Wrapper>
    <Promo
      {...fixture.data.curations[0].summaries[0]}
      title="Programme image"
      imageAlt="BBC podcast artwork"
      imageUrl="https://ichef.bbci.co.uk/images/ic/{width}xn/p0776f5z.jpg"
    />
  </Wrapper>
);
