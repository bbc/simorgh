import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import ErrorMain from '#components/ErrorMain';
import { useTheme } from '@emotion/react';
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
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
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

const ErrorPage = ({ errorCode }) => {
  const { brandName, dir, lang, script, service, translations } =
    useContext(ServiceContext);
  const messaging = translations.error[errorCode] || translations.error[500];

  const {
    palette: { BRAND_BACKGROUND },
  } = useTheme();

  return (
    <>
      <ErrorMetadata
        brandName={brandName}
        dir={dir}
        lang={lang}
        messaging={messaging}
        themeColor={BRAND_BACKGROUND}
      />
      <ErrorMain {...messaging} dir={dir} script={script} service={service} />
    </>
  );
};

export default ErrorPage;
