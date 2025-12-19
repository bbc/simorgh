import styled from '@emotion/styled';
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
import { StoryArgs } from '../../models/types/storybook';

const BackGround = styled.div`
  background-color: #f6f6f6;
  padding: 2rem;
`;

interface Props {
  blocks: OptimoBlock[];
}

const Component = ({ blocks }: Props) => {
  return <ArticleLinksBlock blocks={blocks} />;
};

export default {
  title: 'Components/Article Links Block',
  Component,
  parameters: {
    docs: { readme },
    metadata,
  },
};

export const ThreeLinks = (_: StoryArgs) => (
  <BackGround>
    <Component blocks={threeLinks} />
  </BackGround>
);

export const OnlyOneLink = (_: StoryArgs) => (
  <BackGround>
    <Component blocks={oneLinkOnly} />
  </BackGround>
);

export const OneLinkWithNoTitle = (_: StoryArgs) => (
  <BackGround>
    <Component blocks={oneLinkWithNoTitle} />
  </BackGround>
);

export const MoreThanThreeLinks = (_: StoryArgs) => (
  <BackGround>
    <Component blocks={moreThanThreeLinks} />
  </BackGround>
);

export const NoImagesInData = (_: StoryArgs) => (
  <BackGround>
    <Component blocks={twoLinksWithNoImages} />
  </BackGround>
);

export const TruncatedTextInSingleLink = (_: StoryArgs) => (
  <BackGround>
    <Component blocks={truncatedTextInSingleLink} />
  </BackGround>
);

export const ArabicText = (_: StoryArgs) => (
  <BackGround>
    <Component blocks={arabicText} service="arabic" />
  </BackGround>
);

ArabicText.globals = {
  service: { service: 'arabic' },
};

export const WithTimestamp = (_: StoryArgs) => (
  <BackGround>
    <Component blocks={oneLinkWithTimestamp} />
  </BackGround>
);
