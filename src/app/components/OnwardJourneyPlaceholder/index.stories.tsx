import { Article } from '#app/models/types/optimo';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { RequestContextProvider } from '#app/contexts/RequestContext';
import { ArticleOnwardJourneysProvider } from '#app/contexts/ArticleOnwardJourneysContext';
import OnwardJourneyPlaceholder from '.';
import metadata from './metadata.json';
import readme from './README.md';

const article = {
  content: { model: { blocks: [] } },
  metadata: { topics: [] },
} as unknown as Article;

const Component = () => (
  <RequestContextProvider
    service="pidgin"
    pageType={ARTICLE_PAGE}
    pathname="/pidgin/articles/cvpde7nqj92o"
  >
    <ArticleOnwardJourneysProvider pageData={article} pageType={ARTICLE_PAGE}>
      <OnwardJourneyPlaceholder onwardJourney="mostRead" />
    </ArticleOnwardJourneysProvider>
  </RequestContextProvider>
);

export default {
  title: 'Components/Onward Journey Placeholder',
  component: OnwardJourneyPlaceholder,
  parameters: {
    docs: { readme },
    metadata,
  },
};

export const Default = Component;
