/** @jsx jsx */
import { jsx, useTheme } from '@emotion/react';

import { Article } from '#app/models/types/optimo';
import CurationGrid from '#app/components/Curation/CurationGrid';
import Subheading from '#app/components/Curation/Subhead';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import { Summary } from '#app/models/types/curationData';

import styles from './ArticlePage.styles';

const PersonalisedContent = ({
  pageData,
  sendOptimizelyEvents,
}: {
  pageData: Article;
  sendOptimizelyEvents: boolean;
}) => {
  type PersonalisedContentType = {
    title?: string;
    articles?: Summary[];
    curationLength?: number;
    id?: string;
    link?: string;
    renderVisuallyHiddenH2Title?: boolean;
    curationSubheading?: string;
    isFirstCuration?: boolean;
  };

  const personalisedContentData: PersonalisedContentType | undefined =
    pageData.secondaryColumn.PersonalisedContent;

  const {
    palette: { GREY_2 },
  } = useTheme();

  const {
    title,
    articles = [],
    id = 'personalised-content',
    link = '',
    curationSubheading = '',
    isFirstCuration = false,
  } = personalisedContentData || {};

  if (!personalisedContentData) {
    return null;
  }

  return (
    <section aria-labelledby={id} role="region">
      {title && (
        <Subheading id={id} link={link}>
          {title}
        </Subheading>
      )}
      <CurationGrid
        summaries={articles}
        headingLevel={3}
        isFirstCuration={isFirstCuration}
      />
    </section>
  );
};

export default PersonalisedContent;
