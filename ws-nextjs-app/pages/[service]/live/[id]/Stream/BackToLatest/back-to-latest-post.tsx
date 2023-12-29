/** @jsx jsx */
import { useContext } from 'react';
import { jsx } from '@emotion/react';
import useLocation from '#hooks/useLocation';
import Link from 'next/link';
import makeRelativeUrlPath from '#lib/utilities/makeRelativeUrlPath';
import { StreamContext } from './stream-provider';

// @ts-expect-error spike any types
// this is running too often
const BackToLatestPost = ({ urn }) => {
  // not working
  const { post, setPage, streamRef, setPost, hiddenHeadlineRef } =
    useContext(StreamContext);
  const isSelected = post === urn;

  console.log('urn', urn);
  // null
  console.log('post', post);
  // false
  console.log('isSelected', isSelected);

  // to add functionality
  const newURL = `http://localhost:7081/pidgin/live/c07zr0zwjnnt`;
  const partialURL = `/pidgin/live/c07zr0zwjnnt#hiddenHeadline`;

  const location = useLocation();
  const queryString = location.search;
  console.log('queryString', queryString);

  const relativeUrl = makeRelativeUrlPath(partialURL);
  console.log('relativeUrl', relativeUrl);

  // const relativeUrlNew = makeRelativeUrlPath('c07zr0zwjnnt');
  // console.log('relativeUrlNew', relativeUrlNew);

  // @ts-expect-error working it out
  const navigateToFirstPage = event => {
    // this prevwents refresh
    event.preventDefault();
    // window.history.pushState(null, null, newURL);
    console.log('event', event);
  };

  return (
    isSelected && (
      <Link
        onClick={() => {
          hiddenHeadlineRef.current.focus();
        }}
        id="post"
        href={partialURL}
      >
        Return to the latest post
      </Link>
    )
  );
};

export default BackToLatestPost;
