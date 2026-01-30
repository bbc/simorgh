import bylineExtractor from '.';
import {
  bylineWithNoAuthor,
  bylineWithLink,
  bylineWithNonPngPhoto,
  bylineWithMultipleContributors,
} from '../../../../pages/ArticlePage/fixtureData';

describe('bylineExtractor', () => {
  it('should return an empty array when authorName is not present', () => {
    const bylineValues = bylineExtractor(bylineWithNoAuthor);
    expect(bylineValues).toHaveLength(0);
  });

  it('should return an array with all contributors containing all byline data', () => {
    const bylineValues = bylineExtractor(bylineWithMultipleContributors);

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
    const bylineValues = bylineExtractor(bylineWithLink);

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
    const bylineValues = bylineExtractor(bylineWithNonPngPhoto);

    const { authorImage } = bylineValues?.[0] || {};

    expect(authorImage).toEqual('');
  });
});
