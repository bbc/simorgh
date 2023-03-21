/** @jsx jsx */
/* @jsxFrag React.Fragment */
import React, { useContext } from 'react';
import { jsx } from '@emotion/react';
import {
  CurationData,
  VisualProminence,
  VisualStyle,
} from '#app/models/types/promoData';
import Curation from '#app/components/Curation';
import { ServiceContext } from '../../contexts/ServiceContext';
import styles from './index.styles';

interface HomePageProps {
  pageData: {
    pageType: string;
    id?: string;
    title: string;
    curations: CurationData[];
  };
}

const HomePage = ({ pageData }: HomePageProps) => {
  const { curations } = pageData;
  const { translations } = useContext(ServiceContext);
  const { topStoriesTitle } = translations;

  return (
    <>
      <main css={styles.main}>
        <div css={styles.inner}>
          {curations.map(
            ({
              visualProminence,
              summaries,
              curationId,
              title: curationTitle,
              link,
              position,
              visualStyle,
            }) => {
              return (
                <React.Fragment key={`${curationId}-${position}`}>
                  <Curation
                    headingLevel={curationTitle ? 3 : 2}
                    visualStyle={visualStyle as VisualStyle}
                    visualProminence={visualProminence as VisualProminence}
                    promos={summaries}
                    title={curationTitle}
                    topStoriesTitle={topStoriesTitle}
                    position={position}
                    link={link}
                    curationLength={curations && curations.length}
                  />
                </React.Fragment>
              );
            },
          )}
        </div>
      </main>
    </>
  );
};

export default HomePage;
