import pipe from 'ramda/src/pipe';
import _ArticlePage from './ArticlePage';
import _RadioPage from './RadioPage';
import withContexts from '#containers/PageHandlers/withContexts';
import withPageWrapper from '#containers/PageHandlers/withPageWrapper';
import withError from '#containers/PageHandlers/withError';
import withLoading from '#containers/PageHandlers/withLoading';
import withData from '#containers/PageHandlers/withData';
import withVariant from '#containers/PageHandlers/withVariant';

const applyBasicPageHandlers = pipe(
  withData,
  withError,
  withLoading,
  withPageWrapper,
  withContexts,
);

export const ArticlePage = pipe(
  applyBasicPageHandlers,
  withVariant,
)(_ArticlePage);

export const RadioPage = applyBasicPageHandlers(_RadioPage);
