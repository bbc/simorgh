import { ServiceContextProvider } from '#contexts/ServiceContext';
import ArticleLinksBlock from '.';
import {
  threeLinks,
  oneLinkOnly,
  oneLinkWithNoTitle,
  oneLinkWithTimestamp,
  moreThanThreeLinks,
  twoLinksWithNoImages,
  truncatedTextInSingleLink,
  arabicText,
} from './helpers/fixtureData';
import metadata from './metadata.json';
import readme from './README.md';
import { OptimoBlock } from '#app/models/types/optimo';
import { StoryArgs, StoryProps } from '../../models/types/storybook';

interface Props {
  blocks: OptimoBlock[];
}

const Component = ({ blocks, service }: Props & StoryProps) => (
  <ServiceContextProvider service={service}>
    <div
      css={{
        backgroundColor: '#f6f6f6',
        padding: '2rem',
      }}
    >
      <ArticleLinksBlock blocks={blocks} />
    </div>
  </ServiceContextProvider>
);

export default {
  title: 'Components/Article Links Block',
  Component,
  parameters: {
    docs: { readme },
    metadata,
  },
};

export const ThreeLinks = (_: StoryArgs, { service, variant }: StoryProps) => (
  <Component blocks={threeLinks} service={service} variant={variant} />
);

export const OnlyOneLink = (_: StoryArgs, { service, variant }: StoryProps) => (
  <Component blocks={oneLinkOnly} service={service} variant={variant} />
);

export const OneLinkWithNoTitle = (
  _: StoryArgs,
  { service, variant }: StoryProps,
) => (
  <Component blocks={oneLinkWithNoTitle} service={service} variant={variant} />
);

export const MoreThanThreeLinks = (
  _: StoryArgs,
  { service, variant }: StoryProps,
) => (
  <Component blocks={moreThanThreeLinks} service={service} variant={variant} />
);

export const NoImagesInData = (
  _: StoryArgs,
  { service, variant }: StoryProps,
) => (
  <Component
    blocks={twoLinksWithNoImages}
    service={service}
    variant={variant}
  />
);

export const TruncatedTextInSingleLink = (
  _: StoryArgs,
  { service, variant }: StoryProps,
) => (
  <Component
    blocks={truncatedTextInSingleLink}
    service={service}
    variant={variant}
  />
);

export const ArabicText = (_: StoryArgs, { variant }: StoryProps) => (
  <Component blocks={arabicText} service="arabic" variant={variant} />
);

ArabicText.globals = {
  service: { service: 'arabic' },
};

export const WithTimestamp = (
  _: StoryArgs,
  { service, variant }: StoryProps,
) => (
  <Component
    blocks={oneLinkWithTimestamp}
    service={service}
    variant={variant}
  />
);
