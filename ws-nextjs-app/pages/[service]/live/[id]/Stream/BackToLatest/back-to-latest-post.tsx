/** @jsx jsx */
import { useContext } from 'react';
import { jsx } from '@emotion/react';
// import useLocation from '#hooks/useLocation';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { StreamContext } from './stream-provider';

const BackToLatestPost = ({ urn }: { urn: string }) => {
  const router = useRouter();
  const { post, streamRef } = useContext(StreamContext);
  const isSelected = post === urn;
  const partialURL = `/pidgin/live/c07zr0zwjnnt`;
  const partialURLWithID = `/pidgin/live/c07zr0zwjnnt#top`;
  const partialURLWithBrandID = `/pidgin/live/c07zr0zwjnnt#topPage`;
  // const location = useLocation();
  // const queryString = location.search;

  // @ts-expect-error spike unknown type
  const navigateToTopOfPage = otherEvent => {
    // this prevents refresh
    otherEvent.preventDefault();
    // this just resets URL doesn't take user anywhere
    // @ts-expect-error unknown
    window.history.pushState(null, null, partialURL);
    // @ts-expect-error spike
    document.getElementById('top').focus();
    // @ts-expect-error spike
    streamRef.current.scrollIntoView(true);
    // does not make post unselected
  };

  // @ts-expect-error spike unknown type
  const handleClickRouter = e => {
    e.preventDefault();
    router.push(partialURL);
    // tried timeout but this isn't recommended
  };

  return (
    isSelected && (
      <>
        <Link id="post" href={partialURLWithID}>
          Goes to top of stream (Client-side render)
        </Link>
        <br />
        {/* <a onClick={handleClickRouter} href={partialURL}>
          Goes to top of first page, focus on stream (NEXT Router)
        </a>
        <br />
        <a onClick={navigateToTopOfPage} href={partialURL}>
          Goes to top of stream on current page, does not remove the Back To
          Latest component (Standard Link)
        </a>
        <br />
        <a href={partialURL}>
          Goes to top of first page, focus on brand. Refreshes page even if on
          page 1 (Standard Link)
        </a>
        <br />
        <a href={partialURLWithID}>
          Goes to first page, focus on OL with hash param. Refreshes page even
          if on page 1 (Standard Link)
        </a>
        <br />
        <a href={partialURLWithBrandID}>
          Goes to first page, focus on Brand with hash param. Refreshes page
          even if on page 1 (Standard Link)
        </a> */}
      </>
    )
  );
};

export default BackToLatestPost;
