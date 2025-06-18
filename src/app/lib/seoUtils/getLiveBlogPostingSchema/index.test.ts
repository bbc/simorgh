import { Post } from '#nextjs/pages/[service]/live/[id]/Post/types';
import { samplePost, twitterSamplePost, videoSamplePost } from './fixtures';
import getLiveBlogPostingSchema from '.';

const posts = [samplePost, twitterSamplePost, videoSamplePost] as Post[];

describe('SEO Utils | getLiveBlogPostingSchema', () => {
  it('should return LiveBlogPosting schema structure', () => {
    const schema = getLiveBlogPostingSchema({
      posts,
      brandName: 'BBC News Mundo',
      defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/mundo.png',
      url: 'https://www.bbc.com/mundo',
      startDateTime: '2023-09-08T09:58:44+00:00',
      endDateTime: '2023-09-08T10:09:41+00:00',
    });

    expect(schema?.['@type']).toEqual('LiveBlogPosting');
    expect(schema?.liveBlogUpdate).toHaveLength(3);
    expect(schema?.coverageStartTime).toEqual('2023-09-08T09:58:44+00:00');
    expect(schema?.coverageEndTime).toEqual('2023-09-08T10:09:41+00:00');
  });

  it('should return LiveBlogPosting schema without coverage times if datetimes are excluded', () => {
    const schema = getLiveBlogPostingSchema({
      posts,
      brandName: 'BBC News Mundo',
      defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/mundo.png',
      url: 'https://www.bbc.com/mundo',
    });

    expect(schema?.['@type']).toEqual('LiveBlogPosting');
    expect(schema?.liveBlogUpdate).toHaveLength(3);
    expect(schema?.coverageStartTime).toBeFalsy();
    expect(schema?.coverageEndTime).toBeFalsy();
  });

  it('should convert posts into liveBlogUpdate list', () => {
    const schema = getLiveBlogPostingSchema({
      posts,
      brandName: 'BBC News Mundo',
      defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/mundo.png',
      url: 'https://www.bbc.com/mundo',
    });

    const expected = [
      {
        '@type': 'BlogPosting',
        headline: 'Number 3',
        publisher: {
          '@type': 'Organization',
          name: 'BBC News Mundo',
          logo: {
            '@type': 'ImageObject',
            url: 'https://news.files.bbci.co.uk/ws/img/logos/og/mundo.png',
          },
        },
        mainEntityOfPage: 'https://www.bbc.com/mundo',
        articleBody: 'Text',
      },
      {
        '@type': 'BlogPosting',
        headline: 'X Post (Twitter)',
        publisher: {
          '@type': 'Organization',
          name: 'BBC News Mundo',
          logo: {
            '@type': 'ImageObject',
            url: 'https://news.files.bbci.co.uk/ws/img/logos/og/mundo.png',
          },
        },
        mainEntityOfPage: 'https://www.bbc.com/mundo',
        articleBody: 'Social - X (Twitter) Social X (Twitter) 2',
        datePublished: '2023-09-08T10:07:36+00:00',
        dateModified: '2023-09-08T10:07:36+00:00',
      },
      {
        '@type': 'BlogPosting',
        headline: 'Video',
        publisher: {
          '@type': 'Organization',
          name: 'BBC News Mundo',
          logo: {
            '@type': 'ImageObject',
            url: 'https://news.files.bbci.co.uk/ws/img/logos/og/mundo.png',
          },
        },
        mainEntityOfPage: 'https://www.bbc.com/mundo',
        articleBody: 'Video',
        datePublished: '2023-09-08T09:58:44+00:00',
        dateModified: '2023-09-08T10:09:41+00:00',
      },
    ];

    expect(schema?.liveBlogUpdate).toHaveLength(3);

    expect(schema?.liveBlogUpdate).toEqual(expected);
  });

  it('should return null if posts are not provided', () => {
    const results = getLiveBlogPostingSchema({
      brandName: 'BBC News Mundo',
      defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/mundo.png',
      url: 'https://www.bbc.com/mundo',
    });

    expect(results).toBeNull();
  });
});
