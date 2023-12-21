/** @jsx jsx */
import { useContext } from 'react';
import { jsx } from '@emotion/react';
import Link from 'next/link';
import { StreamContext } from './stream-provider';

// @ts-expect-error spike any types
// this is running too often
const BackToLatestPost = ({ urn }) => {
  // not working
  const { post, setPage, streamRef, setPost } = useContext(StreamContext);
  const isSelected = post === urn;

  console.log('urn', urn);
  // null
  console.log('post', post);
  // false
  console.log('isSelected', isSelected);

  // to add functionality
  const newURL = `http://localhost:7081/pidgin/live/c07zr0zwjnnt`;

  const navigateToFirstPage = () => {
    // @ts-expect-error working it out
    window.history.pushState(null, null, newURL);
  };

  return (
    isSelected && (
      <Link onClick={navigateToFirstPage} id="post" href={newURL}>
        Return to the latest post
      </Link>
    )
  );
};

export default BackToLatestPost;
