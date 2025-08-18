/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';

import Curation from '#components/Curation';
import { Curation } from '#app/models/types/curationData';
import { Article } from '#app/models/types/optimo';

import styles from './ArticlePage.styles';

const PersonalisedContent = ({
  service,
  pageData,
  sendOptimizelyEvents,
}: {
  service: string;
  pageData: Article;
  sendOptimizelyEvents: boolean;
}) => {
  const personalisedContentData = pageData.secondaryColumn.PersonalisedContent;
  console.log('personalisedContentData', personalisedContentData);
  

  const {
    palette: { GREY_2 },
  } = useTheme();


  return (
    <div css={styles.secondaryColumn}>
        <h2>{personalisedContentData.title}</h2>
    </div>
  );
};

export default PersonalisedContent;
