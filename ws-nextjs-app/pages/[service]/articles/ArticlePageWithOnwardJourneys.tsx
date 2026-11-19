import { ComponentType } from 'react';
import { useArticleOnwardJourneys } from '#app/contexts/ArticleOnwardJourneysContext';
import { Article } from '#app/models/types/optimo';

type Props = {
  Page: ComponentType<{ pageData: Article }>;
  pageData: Article;
};

const ArticlePageWithOnwardJourneys = ({ Page, pageData }: Props) => (
  <Page pageData={useArticleOnwardJourneys(pageData)} />
);

export default ArticlePageWithOnwardJourneys;
