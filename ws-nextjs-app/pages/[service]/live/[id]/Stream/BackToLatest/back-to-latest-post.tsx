/** @jsx jsx */
import { useContext } from 'react';
import { jsx } from '@emotion/react';
import { StreamContext } from './stream-provider';

const BackToLatestPost = ({ urn }: { urn: string }) => {
  const { post } = useContext(StreamContext);
  const isSelected = post === urn;
  const partialURL = `/pidgin/live/c07zr0zwjnnt`;
  const partialURLWithID = `/pidgin/live/c07zr0zwjnnt#top`;
  const partialURLWithBrandID = `/pidgin/live/c07zr0zwjnnt#topPage`;

  return (
    isSelected && (
      <>
        <a href={partialURL} id="post">
          Goes to first page
        </a>
        <br />
        <a href={partialURLWithID}>Goes to first page, focus on OL</a>
        <br />
        <a href={partialURLWithBrandID}>Goes to first page, focus on Brand</a>
      </>
    )
  );
};

export default BackToLatestPost;
