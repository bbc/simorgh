import { use } from 'react';
import { Helmet } from 'react-helmet';
import ErrorMain from '#components/ErrorMain';
import { useTheme } from '@emotion/react';
import { ARTICLE_PAGE, MEDIA_ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import DeleteSavedArticleIfDeleted from '#app/components/DeleteSavedArticleIfDeleted';
import { ServiceContext } from '../../contexts/ServiceContext';
/*
 * MVP Metadata for the error
 * This will be refactored out in https://github.com/bbc/simorgh/issues/1350
 */
const ErrorMetadata = ({ dir, lang, messaging, brandName, themeColor }) => {
  const { title } = messaging;

  const pageTitle = `${title} - ${brandName}`;

  return (
    <Helmet htmlAttributes={{ lang, dir }}>
      <meta charSet="utf-8" />
      <meta name="robots" content="noindex,nofollow" />
      <meta name="theme-color" content={themeColor} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1"
      />
      <title>{pageTitle}</title>
      <meta name="og:description" content={title} />
      <meta name="og:title" content={pageTitle} />
      <meta name="twitter:description" content={title} />
      <meta name="twitter:title" content={pageTitle} />
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
    </Helmet>
  );
};

const ErrorPage = ({ errorCode, pageType }) => {
  const { brandName, dir, lang, translations } = use(ServiceContext);
  const messaging = translations.error[errorCode] || translations.error[500];

  const {
    palette: { BRAND_BACKGROUND },
  } = useTheme();

  // Only render DeleteSavedArticleIfDeleted for article pages
  const isArticlePage =
    pageType === ARTICLE_PAGE || pageType === MEDIA_ARTICLE_PAGE;

  return (
    <>
      {isArticlePage && <DeleteSavedArticleIfDeleted errorCode={errorCode} />}
      <ErrorMetadata
        brandName={brandName}
        dir={dir}
        lang={lang}
        messaging={messaging}
        themeColor={BRAND_BACKGROUND}
      />
      <ErrorMain {...messaging} dir={dir} />
    </>
  );
};

export default ErrorPage;
