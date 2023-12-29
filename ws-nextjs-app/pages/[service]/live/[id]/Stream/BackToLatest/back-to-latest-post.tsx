/** @jsx jsx */
import { useContext } from 'react';
import { jsx } from '@emotion/react';
import Link from 'next/link';
import { StreamContext } from './stream-provider';

const BackToLatestPost = ({ urn }: { urn: string }) => {
  const { post, streamRef } = useContext(StreamContext);
  const isSelected = post === urn;
  const partialURL = `/pidgin/live/c07zr0zwjnnt`;

  // @ts-expect-error spike any type
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleClick = event => {
    // This doesn't do anything since the link redirects to the href
    // We can use event.preventDefault() to prevent this
    // Then we could use Next JS useRouter() and router.push(partialURL) to redirect;
    // Something like the below could get this to scroll after page refresh (However I wasn't able to get this to work)
    // This currently directs user to the top of the stream on the current page and then reloads the 1st page.
    // refer to Dropbox Paper for PS Web solution - they utilise logic used by their pagination
    // @ts-expect-error spike unknown type
    streamRef.current.scrollIntoView(true);
  };

  return (
    isSelected && (
      <Link onClick={handleClick} id="post" href={partialURL}>
        Return to the latest post
      </Link>
    )
  );
};

export default BackToLatestPost;
