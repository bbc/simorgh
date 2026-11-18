import mockIdctaConfig from '#app/contexts/AccountContext/mocks';
import ModalReviewPrototype from '.';

export default {
  title: 'Temporary/Account Modal Review',
  component: ModalReviewPrototype,
  globals: {
    service: { service: 'ws', variant: 'default' },
    idctaConfig: mockIdctaConfig,
  },
  parameters: { layout: 'fullscreen' },
};

export const InlineArticle = () => <ModalReviewPrototype example="inline" />;
export const ArticleLink = () => <ModalReviewPrototype example="articleLink" />;
export const ArticleBottom = () => (
  <ModalReviewPrototype example="articleBottom" />
);
