/** @jsx jsx */
/* @jsxFrag React.Fragment */
import React, { useContext } from 'react';
import { jsx } from '@emotion/react';
// import InlineLink from '../InlineLink';
import Heading from '../Heading';
import { ServiceContext } from '../../contexts/ServiceContext';
import InlineLink from '#psammead/psammead-inline-link/src';

interface UsefulLinksProps {
  position: number;
  title: string;
  summaries: {
    imageUrl?: string;
    link: string;
    imageAlt?: string;
    description?: string;
    title: string;
    id: string;
  }[];
}

const UsefulLinks = ({ summaries, position, title }: UsefulLinksProps) => {
  const { dir } = useContext(ServiceContext);
  const isRtl = dir === 'rtl';

  return (
    <section
      // css={styles.container}
      role="region"
      aria-labelledby={`useful-links-${position}`}
    >
      <>
        <Heading
          level={2}
          size="paragon"
          // css={styles.heading}
          id={`useful-links-${position}`}
        >
          {title}
        </Heading>
        <ul>
          {summaries.map(summary => {
            return (
              <li>
                <InlineLink href={summary.link}>{summary.title}</InlineLink>
              </li>
            );
          })}
        </ul>
      </>
    </section>
  );
  //   <div css={styles.card}>
  //     {summaries.map(summary => {
  //       return (
  //         <React.Fragment key={summary.id}>
  //           <div css={styles.textWrap}>
};

export default UsefulLinks;
