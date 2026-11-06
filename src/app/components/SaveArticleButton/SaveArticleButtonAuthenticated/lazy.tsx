import dynamic, { type DynamicOptionsLoadingProps } from 'next/dynamic';
import loadQueryConsumer from '#app/contexts/QueryContext/loadQueryConsumer';
import { use } from 'react';
import { ServiceContext } from '#contexts/ServiceContext';
import SaveButton from '#app/components/SaveButton';
import SaveArticleButtonGuest from '../SaveArticleButtonGuest';

const noop = () => undefined;

export const SaveArticleButtonLoadingFallback = ({
  error,
  isLoading,
}: DynamicOptionsLoadingProps) => {
  const { translations } = use(ServiceContext);
  const loadingLabel = translations?.saveArticleButton?.loading ?? '';

  if (error && !isLoading) return <SaveArticleButtonGuest />;

  return (
    <SaveButton
      onClick={noop}
      isLoading
      visualLabel={loadingLabel}
      accessibleLabel={loadingLabel}
      testId="save-article-btn-loading"
    />
  );
};

export default dynamic(
  () =>
    loadQueryConsumer(
      import(
        /* webpackChunkName: "save_article_button_authenticated" */
        '.'
      ),
    ),
  {
    ssr: false,
    loading: props => <SaveArticleButtonLoadingFallback {...props} />,
  },
);
