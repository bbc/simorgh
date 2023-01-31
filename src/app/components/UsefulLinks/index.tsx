/** @jsx jsx */
/* @jsxFrag React.Fragment */
import React, { useContext } from 'react';
import { jsx } from '@emotion/react';
// import InlineLink from '../InlineLink';
import { Summary } from '#app/models/types/promoData';
import InlineLink from '#psammead/psammead-inline-link/src';
import { VISUAL_PROMINANCE } from '#app/pages/TopicPage/Curation';
import Image from '../Image';
import Heading from '../Heading';
import { ServiceContext } from '../../contexts/ServiceContext';

interface UsefulLinksProps {
  position: number;
  title: string;
  visualProminence: string;
  summaries: Summary[];
}

const UsefulLinks = ({
  summaries,
  position,
  title,
  visualProminence,
}: UsefulLinksProps) => {
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
                {summary.imageUrl &&
                  visualProminence === VISUAL_PROMINANCE.NORMAL && (
                    <Image
                      alt=""
                      src={summary.imageUrl.replace('{width}', 'raw')}
                      placeholder={false}
                    />
                  )}

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
