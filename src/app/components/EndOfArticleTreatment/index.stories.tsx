import { RequestContextProvider } from '#app/contexts/RequestContext';
import { ServiceContextProvider } from '#app/contexts/ServiceContext';
import ThemeProvider from '#app/components/ThemeProvider';
import studyCurations from '#nextjs/pages/[service]/articles/articleEnd/studyCurations.json';
import EndOfArticleTreatment from '.';
import { ArticleEndItem } from './types';

const studyItems = studyCurations.cwe9k0d7x9z0o as ArticleEndItem[];

const Example = ({ items }: { items: ArticleEndItem[] }) => (
  <RequestContextProvider
    service="mundo"
    pageType="article"
    pathname="/mundo/articles/cwe9k0d7x9z0o?renderer_env=live"
  >
    <ServiceContextProvider service="mundo">
      <ThemeProvider service="mundo">
        <div css={{ maxWidth: '42rem', margin: '2rem auto' }}>
          <EndOfArticleTreatment items={items} />
        </div>
      </ThemeProvider>
    </ServiceContextProvider>
  </RequestContextProvider>
);

export const MundoResearchPrototype = {
  render: () => <Example items={studyItems} />,
};
export const SingleItemHidden = {
  render: () => <Example items={studyItems.slice(1, 2)} />,
};
export const NoRelatedContentHidden = { render: () => <Example items={[]} /> };

export default {
  title: 'Components/EndOfArticleTreatment',
  component: EndOfArticleTreatment,
  parameters: { chromatic: { disableSnapshot: true } },
};
