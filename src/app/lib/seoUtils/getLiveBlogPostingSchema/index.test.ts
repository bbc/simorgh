import type { Post } from '#nextjs/pages/[service]/live/[id]/Post/types';
import getLiveBlogPostingSchema from '.';
import { samplePost, twitterSamplePost, videoSamplePost } from './fixtures';

const posts = [samplePost, twitterSamplePost, videoSamplePost] as Post[];

const expectedPublisher = {
  '@type': 'NewsMediaOrganization',
  name: 'BBC News Mundo',
  logo: {
    '@type': 'ImageObject',
    url: 'https://news.files.bbci.co.uk/ws/img/logos/og/mundo.png',
  },
};

describe('SEO Utils | getLiveBlogPostingSchema', () => {
  it('should return an object with webPage and liveBlogPosting properties', () => {
    const result = getLiveBlogPostingSchema({
      posts,
      brandName: 'BBC News Mundo',
      defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/mundo.png',
      url: 'https://www.bbc.com/mundo',
      startDateTime: '2023-09-08T09:58:44+00:00',
      endDateTime: '2023-09-08T10:09:41+00:00',
    });

    const { liveBlogPosting } = result ?? {};

    expect(liveBlogPosting?.['@type']).toEqual('LiveBlogPosting');
    expect(liveBlogPosting?.liveBlogUpdate).toHaveLength(3);
    expect(liveBlogPosting?.coverageStartTime).toEqual(
      '2023-09-08T09:58:44+00:00',
    );
    expect(liveBlogPosting?.coverageEndTime).toEqual(
      '2023-09-08T10:09:41+00:00',
    );
  });

  it('should fall back to post dates for coverage times when explicit datetimes are excluded', () => {
    const result = getLiveBlogPostingSchema({
      posts,
      brandName: 'BBC News Mundo',
      defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/mundo.png',
      url: 'https://www.bbc.com/mundo',
    });

    const { liveBlogPosting } = result ?? {};

    expect(liveBlogPosting?.coverageStartTime).toEqual(
      '2023-09-08T09:58:44+00:00',
    );
    expect(liveBlogPosting?.coverageEndTime).toEqual(
      '2023-09-08T10:07:36+00:00',
    );
  });

  it('should convert posts into liveBlogUpdate list sorted by datePublished descending', () => {
    const result = getLiveBlogPostingSchema({
      posts,
      brandName: 'BBC News Mundo',
      defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/mundo.png',
      url: 'https://www.bbc.com/mundo',
    });

    const { liveBlogPosting } = result ?? {};

    const expected = [
      {
        '@type': 'BlogPosting',
        '@id':
          'https://www.bbc.com/mundo#post-asset:35f240a5-1fb2-4ed3-9c2a-657c4599fc0b',
        isAccessibleForFree: true,
        headline: 'X Post (Twitter)',
        articleBody: 'Social - X (Twitter) Social X (Twitter) 2',
        author: expectedPublisher,
        publisher: expectedPublisher,
        mainEntityOfPage: { '@id': 'https://www.bbc.com/mundo' },
        datePublished: '2023-09-08T10:07:36+00:00',
        dateModified: '2023-09-08T10:07:36+00:00',
      },
      {
        '@type': 'BlogPosting',
        '@id':
          'https://www.bbc.com/mundo#post-asset:c0166a3e-82f3-4ba2-ab47-cbf614fcbe5e',
        isAccessibleForFree: true,
        headline: 'Number 3',
        articleBody: 'Text',
        author: expectedPublisher,
        publisher: expectedPublisher,
        mainEntityOfPage: { '@id': 'https://www.bbc.com/mundo' },
        datePublished: '2023-09-08T10:05:00+00:00',
        dateModified: '2023-09-08T10:05:00+00:00',
      },
      {
        '@type': 'BlogPosting',
        '@id':
          'https://www.bbc.com/mundo#post-asset:d25690d5-6df5-4a79-9fee-5549ac8a141b',
        isAccessibleForFree: true,
        headline: 'Video',
        articleBody: 'Video',
        author: expectedPublisher,
        publisher: expectedPublisher,
        mainEntityOfPage: { '@id': 'https://www.bbc.com/mundo' },
        datePublished: '2023-09-08T09:58:44+00:00',
        dateModified: '2023-09-08T10:09:41+00:00',
      },
    ];

    expect(liveBlogPosting?.liveBlogUpdate).toEqual(expected);
  });

  it('should return null if posts are not provided', () => {
    const result = getLiveBlogPostingSchema({
      brandName: 'BBC News Mundo',
      defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/mundo.png',
      url: 'https://www.bbc.com/mundo',
    });

    expect(result).toBeNull();
  });
});
