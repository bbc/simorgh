/** @jsx jsx */
/* @jsxFrag React.Fragment */
import React, { useContext } from 'react';
import { jsx } from '@emotion/react';
import InlineLink from '../InlineLink';
import Heading from '../Heading';
import { ServiceContext } from '../../contexts/ServiceContext';

interface UsefulLinksProps {
  position: number;
  title: string;
}

const UsefulLinks = ({ position, title }: UsefulLinksProps) => {
  const { dir } = useContext(ServiceContext);
  const isRtl = dir === 'rtl';

  return (
    <section
      // css={styles.container}
      role="region"
      aria-labelledby={`useful-links-${position}`}
    >
      <Heading
        level={2}
        size="paragon"
        // css={styles.heading}
        id={`useful-links-${position}`}
      >
        {title}
      </Heading>
      ;
    </section>
  );
  //   <div css={styles.card}>
  //     {summaries.map(summary => {
  //       return (
  //         <React.Fragment key={summary.id}>
  //           <div css={styles.textWrap}>
};

export default UsefulLinks;
