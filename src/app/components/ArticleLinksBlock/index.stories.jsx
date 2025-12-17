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
  topStoriesBlocks,
  topStoriesBlocksWithLiveItem,
  mostReadBlocks,
  mostReadBlocksRTL,
} from './helpers/fixtureData';

const BackGround = styled.div`
  background-color: #f6f6f6;
  padding: 2rem;
`;

const ArticleLinksBlockComponent = ({
  data,
  service,
  experimentVariant = null,
}) => (
  <ServiceContextProvider service={service}>
    <ArticleLinksBlock blocks={data} experimentVariant={experimentVariant} />
  </ServiceContextProvider>
);

export default {
  title: 'Components/Article Links Block',
  ArticleLinksBlockComponent,
};

export const ThreeLinks = (_, { service }) => (
  <BackGround>
    <ArticleLinksBlockComponent data={threeLinks} service={service} />
  </BackGround>
);

export const OnlyOneLink = (_, { service }) => (
  <BackGround>
    <ArticleLinksBlockComponent data={oneLinkOnly} service={service} />
  </BackGround>
);

export const OneLinkWithNoTitle = (_, { service }) => (
  <BackGround>
    <ArticleLinksBlockComponent data={oneLinkWithNoTitle} service={service} />
  </BackGround>
);

export const MoreThanThreeLinks = (_, { service }) => (
  <BackGround>
    <ArticleLinksBlockComponent data={moreThanThreeLinks} service={service} />
  </BackGround>
);

export const NoImagesInData = (_, { service }) => (
  <BackGround>
    <ArticleLinksBlockComponent data={twoLinksWithNoImages} service={service} />
  </BackGround>
);

export const TruncatedTextInSingleLink = (_, { service }) => (
  <BackGround>
    <ArticleLinksBlockComponent
      data={truncatedTextInSingleLink}
      service={service}
    />
  </BackGround>
);

export const ArabicText = () => (
  <BackGround>
    <ArticleLinksBlockComponent data={arabicText} service="arabic" />
  </BackGround>
);

ArabicText.globals = {
  service: { service: 'arabic' },
};

export const WithTimestamp = (_, { service }) => (
  <BackGround>
    <ArticleLinksBlockComponent data={oneLinkWithTimestamp} service={service} />
  </BackGround>
);
