import { Post } from '../../../../../ws-nextjs-app/pages/[service]/live/[id]/Post/types';
import { samplePost, twitterSamplePost, videoSamplePost } from './fixtures';
import getLiveBlogPosting from '.';

const posts = [samplePost, twitterSamplePost, videoSamplePost] as Post[];

describe('SEO Utils | getLiveBlogPosting', () => {
  it('should convert posts into liveBlogPosting list', () => {
    const results = getLiveBlogPosting({
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

    expect(results?.liveBlogPosting).toHaveLength(3);

    expect(results?.liveBlogPosting).toEqual(expected);
  });

  it('should return null if posts are not provided', () => {
    const results = getLiveBlogPosting({
      brandName: 'BBC News Mundo',
      defaultImage: 'https://news.files.bbci.co.uk/ws/img/logos/og/mundo.png',
      url: 'https://www.bbc.com/mundo',
    });

    expect(results).toBeNull();
  });
});
