import React, { use, useEffect, useState } from 'react';
import Heading from '#app/components/Heading';
import Paragraph from '#app/components/Paragraph';
import { ServiceContext } from '#contexts/ServiceContext';
import { StreamResponse } from '../Post/types';
import Post from '../Post';

const Stream = ({
  streamContent,
  contributors,
}: {
  streamContent: StreamResponse | null;
  contributors: string | null;
}) => {
  const {
    translations: {
      liveExperiencePage: { liveCoverage = 'Live Coverage' },
    },
  } = use(ServiceContext);

  const [hasShareApi, setHasShareApi] = useState(false);
  const [hashValue, setHashValue] = useState('');

  useEffect(() => {
    const URLHash = window.location.hash.substring(1);
    setHashValue(URLHash);

    if (hashValue) {
      window.location.href = `#${hashValue}`;
    }

    if ('share' in navigator) {
      setHasShareApi(true);
    }
  }, [hashValue]);

  if (!streamContent) return null;

  const { results: streamResults } = streamContent?.data;

  const hasNoPost = streamResults.length === 0;
  const hasSinglePost = streamResults.length === 1;

  if (hasNoPost) return null;

  return (
    <div>
      <Heading
        className={`py-8 group-3:text-doublePica group-3:pt-12 group-4:pt-8 ${
          !contributors ? 'group-3:pb-12' : ''
        }`}
        level={2}
      >
        {liveCoverage}
      </Heading>
      {contributors && (
        <Paragraph data-testid="live-contributors" className="pb-8 group-3:pb-12">
          {contributors}
        </Paragraph>
      )}

      {hasSinglePost ? (
        <Post post={streamResults[0]} hasShareApi={hasShareApi} />
      ) : (
        <ol role="list" className="m-0 p-0">
          {streamResults.map(post => (
            <li key={post.urn} className="list-none">
              <Post post={post} hasShareApi={hasShareApi} />
            </li>
          ))}
        </ol>
      )}
    </div>
  );
};

export default Stream;
