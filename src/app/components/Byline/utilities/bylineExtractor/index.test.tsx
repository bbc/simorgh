import bylineExtractor from '.';
import {
  bylineWithNoAuthor,
  bylineWithLink,
  bylineWithNonPngPhoto,
  bylineWithAllData,
} from '../../../../pages/ArticlePage/fixtureData';

describe('bylineExtractor', () => {
  it('should return null when authorName is not present', () => {
    const bylineValues = bylineExtractor(bylineWithNoAuthor);

    expect(bylineValues).toBeNull();
  });

  it('should return an object containing all byline data', () => {
    const bylineValues = bylineExtractor(bylineWithAllData);

    expect(bylineValues).toEqual({
      authorImage:
        'https://ichef.bbci.co.uk/ace/ws/160/cpsprodpb/f974/live/36226e20-94aa-11ec-9acc-37a09ce5ea88.png.webp',
      authorName: 'Mayeni Jones',
      authorTopicUrl: '/news/topics/c8qx38nq177t',
      jobRole: 'Journalist',
      location: 'Lagos, Nigeria',
      twitterLink: 'https://twitter.com/MayeniJones',
      twitterText: 'MayeniJones',
    });
  });

  it('should return an object containing byline data, with some optional fields missing', () => {
    const bylineValues = bylineExtractor(bylineWithLink);

    expect(bylineValues).toEqual({
      authorImage: '',
      authorName: 'Single Byline (all values)',
      authorTopicUrl: '/news/topics/c8qx38nq177t',
      jobRole: 'Test',
      location: '',
      twitterLink: 'https://twitter.com/test',
      twitterText: 'test',
    });
  });
  it('should return an object, with an empty string in the image field if no .png extension', () => {
    const bylineValues = bylineExtractor(bylineWithNonPngPhoto);

    const { authorImage } = bylineValues || {};

    expect(authorImage).toEqual('');
  });
});
