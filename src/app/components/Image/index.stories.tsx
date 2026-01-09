import { RequestContextProvider } from '#contexts/RequestContext';
import AmpDecorator from '../../../../.storybook/helpers/ampDecorator';
import Image, { ImageProps } from '.';
import md from './README.md';

const ImgWithAmp = (props: ImageProps) => (
  <RequestContextProvider
    isAmp
    pageType="article"
    pathname="/afaanoromoo"
    service="afaanoromoo"
  >
    <div style={{ height: '40vh' }}>
      <Image {...props} />
    </div>
  </RequestContextProvider>
);

const BasicImage = () => (
  <Image
    alt="A penguin stands on an ice floe"
    src="https://ichef.bbci.co.uk/ace/ws/624/cpsprodpb/164AF/production/_110911319_antartica.jpg"
  />
);

export default {
  title: 'Components/Image',
  Component: BasicImage,
  parameters: {
    chromatic: { disable: true },
    docs: {
      readme: md,
    },
  },
};

export const ResponsiveImage = () => (
  <Image
    alt="A penguin stands on an ice floe"
    src="https://ichef.bbci.co.uk/ace/ws/624/cpsprodpb/164AF/production/_110911319_antartica.jpg"
    srcSet="https://ichef.bbci.co.uk/ace/ws/240/cpsprodpb/164AF/production/_110911319_antartica.jpg 240w, https://ichef.bbci.co.uk/ace/ws/624/cpsprodpb/164AF/production/_110911319_antartica.jpg 624w"
  />
);

export const ResponsiveWebPWithJpegFallback = () => (
  <Image
    alt="A penguin stands on an ice floe"
    src="https://ichef.bbci.co.uk/ace/ws/624/cpsprodpb/164AF/production/_110911319_antartica.jpg"
    srcSet="https://ichef.bbci.co.uk/ace/ws/240/cpsprodpb/164AF/production/_110911319_antartica.jpg.webp 240w, https://ichef.bbci.co.uk/ace/ws/624/cpsprodpb/164AF/production/_110911319_antartica.jpg.webp 624w"
    mediaType="image/webp"
    fallbackSrcSet="https://ichef.bbci.co.uk/ace/ws/240/cpsprodpb/164AF/production/_110911319_antartica.jpg 240w, https://ichef.bbci.co.uk/ace/ws/624/cpsprodpb/164AF/production/_110911319_antartica.jpg 624w"
    fallbackMediaType="image/jpeg"
  />
);

export const BasicAMPImage = () => (
  <ImgWithAmp
    alt="A penguin stands on an ice floe"
    src="https://ichef.bbci.co.uk/ace/ws/624/cpsprodpb/164AF/production/_110911319_antartica.jpg"
  />
);

export const ResponsiveAMPImage = () => (
  <ImgWithAmp
    alt="A penguin stands on an ice floe"
    src="https://ichef.bbci.co.uk/ace/ws/624/cpsprodpb/164AF/production/_110911319_antartica.jpg"
    srcSet="https://ichef.bbci.co.uk/ace/ws/240/cpsprodpb/164AF/production/_110911319_antartica.jpg 240w, https://ichef.bbci.co.uk/ace/ws/624/cpsprodpb/164AF/production/_110911319_antartica.jpg 624w"
  />
);

export const AMPWebPWithJpegFallback = () => (
  <ImgWithAmp
    alt="A penguin stands on an ice floe"
    src="https://ichef.bbci.co.uk/ace/ws/624/cpsprodpb/164AF/production/_110911319_antartica.jpg"
    srcSet="https://ichef.bbci.co.uk/ace/ws/240/cpsprodpb/164AF/production/_110911319_antartica.jpg.webp 240w, https://ichef.bbci.co.uk/ace/ws/624/cpsprodpb/164AF/production/_110911319_antartica.jpg.webp 624w"
    mediaType="image/webp"
    fallbackSrcSet="https://ichef.bbci.co.uk/ace/ws/240/cpsprodpb/164AF/production/_110911319_antartica.jpg 240w, https://ichef.bbci.co.uk/ace/ws/624/cpsprodpb/164AF/production/_110911319_antartica.jpg 624w"
    fallbackMediaType="image/jpeg"
  />
);

BasicAMPImage.decorators = [AmpDecorator];
ResponsiveAMPImage.decorators = [AmpDecorator];
AMPWebPWithJpegFallback.decorators = [AmpDecorator];
