/* eslint-disable no-console */
import glob from 'glob';
import { dirname } from 'path';

const ALLOW_LIST = [
  'src/app/components/Byline',
  'src/app/components/Curation',
  'src/app/components/Heading',
  'src/app/components/Image',
  'src/app/components/InlineLink',
  'src/app/components/MessageBanner',
  'src/app/components/Paragraph',
  'src/app/components/Text',
  'src/app/components/Curation/CurationGrid',
  'src/app/components/Curation/CurationPromo',
  'src/app/components/Curation/HierarchicalGrid',
  'src/app/components/Curation/Subhead',
  'src/app/hooks/useImageColour',
  'src/app/lib/utilities/moment',
  'src/app/pages/ArticlePage',
  'src/app/pages/ArticlePage/PagePromoSections/RelatedContentSection',
  'src/app/pages/ArticlePage/PagePromoSections/TopStoriesSection',
  'src/app/pages/ErrorPage',
  'src/app/pages/FeatureIdxPage',
  'src/app/pages/FrontPage',
  'src/app/pages/HomePage',
  'src/app/pages/IdxPage',
  'src/app/pages/LiveRadioPage',
  'src/app/pages/MediaArticlePage',
  'src/app/pages/MediaArticlePage/PagePromoSections/RelatedContentSection',
  'src/app/pages/MediaArticlePage/PagePromoSections/TopStoriesSection',
  'src/app/pages/MediaAssetPage',
  'src/app/pages/MostReadPage',
  'src/app/pages/OnDemandAudioPage',
  'src/app/pages/OnDemandTvPage',
  'src/app/pages/PhotoGalleryPage',
  'src/app/pages/StoryPage',
  'src/app/pages/TopicPage',
];

const allComponentsWithStories = glob
  .sync('src/app/**/**/index.stories.{js,jsx,tsx,ts}', {
    ignore: [
      'src/app/legacy/**',
      'src/app/components/ThemeProvider',
      'src/app/components/icons',
      'src/app/components/OptimizelyRecommendations',
      'src/app/pages/__mocks__',
      'src/app/pages/utils',
    ],
  })
  .map(path => dirname(path));

const componentsWithMetadata = glob
  .sync('src/app/**/**/metadata.json')
  .map(path => dirname(path));

const componentsWithoutMetadata = allComponentsWithStories.filter(
  component =>
    !componentsWithMetadata.includes(component) &&
    !ALLOW_LIST.includes(component),
);

if (componentsWithoutMetadata.length > 0) {
  console.error(`❌ The following components are missing Component Health Metadata:

${componentsWithoutMetadata.join('\n')}

Please ensure that a metadata.json file exists.
  `);
  process.exitCode = 1;
} else {
  console.log(
    '✅ All new components have Component Health Metadata configured',
  );
}
