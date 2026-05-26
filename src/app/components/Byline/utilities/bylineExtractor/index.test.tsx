import {
  bylineSamplePost,
  bylineSamplePostWithUnsupportedImage,
  bylinesSamplePostWithoutImage,
  bylinesSamplePostWithoutSubtitle,
} from '../../../../../../ws-nextjs-app/pages/[service]/live/[id]/Post/fixture';
import filterForBlockType from '../../../../lib/utilities/blockHandlers';
import {
  bylineWithLink,
  bylineWithMultipleContributors,
  bylineWithNoAuthor,
  bylineWithNonPngPhoto,
} from '../../../../pages/ArticlePage/fixtureData';
import {
  ARTICLE_PAGE,
  LIVE_PAGE,
  MEDIA_ARTICLE_PAGE,
} from '../../../../routes/utils/pageTypes';
import bylineExtractor from '.';

describe('bylineExtractor', () => {
  describe('Article Page & Media Article Page', () => {
    [ARTICLE_PAGE, MEDIA_ARTICLE_PAGE].forEach(pageType => {
      it('should return an empty array when authorName is not present', () => {
        const bylineValues = bylineExtractor({
          blocks: bylineWithNoAuthor,
          pageType,
        });
        expect(bylineValues).toHaveLength(0);
      });

      it('should return an array with all contributors containing all byline data', () => {
        const bylineValues = bylineExtractor({
          blocks: bylineWithMultipleContributors,
          pageType,
        });

        const sampleContributor = {
          authorImage:
            'https://ichef.bbci.co.uk/ace/ws/160/cpsprodpb/f974/live/36226e20-94aa-11ec-9acc-37a09ce5ea88.png.webp',
          authorName: 'Mayeni Jones',
          authorTopicUrl: '/news/topics/c8qx38nq177t',
          jobRole: 'Journalist',
          location: 'Lagos, Nigeria',
          twitterLink: 'https://twitter.com/MayeniJones',
          twitterText: 'MayeniJones',
        };

        expect(bylineValues).toHaveLength(5);
        expect(bylineValues).toEqual([
          sampleContributor,
          sampleContributor,
          sampleContributor,
          sampleContributor,
          sampleContributor,
        ]);
      });

      it('should return an array populated with objects containing byline data, with some optional fields missing', () => {
        const bylineValues = bylineExtractor({
          blocks: bylineWithLink,
          pageType,
        });

        expect(bylineValues).toEqual([
          {
            authorImage: '',
            authorName: 'Single Byline (all values)',
            authorTopicUrl: '/news/topics/c8qx38nq177t',
            jobRole: 'Test',
            location: '',
            twitterLink: 'https://twitter.com/test',
            twitterText: 'test',
          },
        ]);
      });
      it('should return an object, with an empty string in the image field if no .png extension', () => {
        const bylineValues = bylineExtractor({
          blocks: bylineWithNonPngPhoto,
          pageType,
        });

        const { authorImage } = bylineValues?.[0] || {};

        expect(authorImage).toEqual('');
      });
    });
  });

  describe('Live Page', () => {
    it('should return an array with the byline data for the post contributor', () => {
      const {
        header: {
          model: { blocks: postHeaderBlocks },
        },
      } = bylineSamplePost;
      const { model: contributorData } = filterForBlockType(
        postHeaderBlocks,
        'contributor',
      );

      const bylineValues = bylineExtractor({
        blocks: [contributorData],
        pageType: LIVE_PAGE,
      });

      const sampleContributor = {
        authorName: 'Gahuza contributor',
        jobRole: 'gahuza contributor',
        authorImage:
          'https://ichef.bbci.co.uk/ace/ws/160/cpsdevpb/vivo/test/images/2016/12/12/977af52a-6eaf-481f-9a06-094860d56760.jpg.webp',
      };

      expect(bylineValues).toHaveLength(1);
      expect(bylineValues).toEqual([sampleContributor]);
    });

    it('should return an array with the byline data for the post contributor where the image is missing', () => {
      const {
        header: {
          model: { blocks: postHeaderBlocks },
        },
      } = bylinesSamplePostWithoutImage;
      const { model: contributorData } = filterForBlockType(
        postHeaderBlocks,
        'contributor',
      );

      const bylineValues = bylineExtractor({
        blocks: [contributorData],
        pageType: LIVE_PAGE,
      });

      const sampleContributor = {
        authorName: 'new contributor in test',
        jobRole: 'contributor',
        authorImage: '',
      };

      expect(bylineValues).toHaveLength(1);
      expect(bylineValues).toEqual([sampleContributor]);
    });

    it('should return an array with the byline data for the post contributor where the image is an unsupported format', () => {
      const {
        header: {
          model: { blocks: postHeaderBlocks },
        },
      } = bylineSamplePostWithUnsupportedImage;
      const { model: contributorData } = filterForBlockType(
        postHeaderBlocks,
        'contributor',
      );

      const bylineValues = bylineExtractor({
        blocks: [contributorData],
        pageType: LIVE_PAGE,
      });

      const sampleContributor = {
        authorName: 'Gahuza contributor',
        jobRole: 'gahuza contributor',
        authorImage: '',
      };

      expect(bylineValues).toHaveLength(1);
      expect(bylineValues).toEqual([sampleContributor]);
    });

    it('should return an array with the byline data for the post contributor where the subtitle is missing', () => {
      const {
        header: {
          model: { blocks: postHeaderBlocks },
        },
      } = bylinesSamplePostWithoutSubtitle;
      const { model: contributorData } = filterForBlockType(
        postHeaderBlocks,
        'contributor',
      );

      const bylineValues = bylineExtractor({
        blocks: [contributorData],
        pageType: LIVE_PAGE,
      });

      const sampleContributor = {
        authorName: 'John Doe',
        jobRole: null,
        authorImage:
          'https://ichef.bbci.co.uk/ace/ws/160/cpsdevpb/vivo/test/images/2015/1/20/d3be9c18-8975-4e20-9923-5c309c2dc00d.gif.webp',
      };

      expect(bylineValues).toHaveLength(1);
      expect(bylineValues).toEqual([sampleContributor]);
    });
  });
});
