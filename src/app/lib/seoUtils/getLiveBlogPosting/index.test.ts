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

    expect(results?.liveBlogPosting).toHaveLength(3);
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
