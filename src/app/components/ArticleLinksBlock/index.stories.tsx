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
import { Direction } from '#app/models/types/global';
import { GREY_2 } from '../ThemeProvider/palette';

interface Props {
  blocks: OptimoBlock[];
  dir?: Direction;
}

const Component = ({ blocks, dir = 'ltr' }: Props) => (
  <div
    dir={dir}
    css={{
      backgroundColor: GREY_2,
      padding: '2rem',
    }}
  >
    <ArticleLinksBlock blocks={blocks} />
  </div>
);

export default {
  title: 'Components/Article Links Block',
  Component,
  parameters: {
    docs: { readme },
    metadata,
  },
};

export const ThreeLinks = () => <Component blocks={threeLinks} />;

export const OnlyOneLink = () => <Component blocks={oneLinkOnly} />;

export const OneLinkWithNoTitle = () => (
  <Component blocks={oneLinkWithNoTitle} />
);

export const MoreThanThreeLinks = () => (
  <Component blocks={moreThanThreeLinks} />
);

export const NoImagesInData = () => <Component blocks={twoLinksWithNoImages} />;

export const TruncatedTextInSingleLink = () => (
  <Component blocks={truncatedTextInSingleLink} />
);

export const ArabicText = () => <Component blocks={arabicText} dir="rtl" />;

ArabicText.globals = {
  service: { service: 'arabic' },
};

export const WithTimestamp = () => <Component blocks={oneLinkWithTimestamp} />;
