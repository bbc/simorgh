import React, { Fragment, useContext } from 'react';
import { number, string, shape } from 'prop-types';
import Helmet from 'react-helmet';
import { ServiceContext } from '../../contexts/ServiceContext';
import ErrorPageComponent from '../../components/ErrorPage';

/*
 * MVP Metadata for the error
 * This will be refactored out in https://github.com/bbc/simorgh/issues/1350
 */
const ErrorMetadata = ({ locale, messaging, brandName, themeColor }) => {
  const { title } = messaging;

  return (
    <Helmet htmlAttributes={{ lang: locale }}>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta charSet="utf-8" />
      <meta name="robots" content="noindex,nofollow" />
      <meta name="theme-color" content={themeColor} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, minimum-scale=1"
      />
      <title>
        {title} - {brandName}
      </title>
      <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
    </Helmet>
  );
};

const ErrorMain = ({ status }) => {
  const { script, brandName, locale, themeColor, translations } = useContext(
    ServiceContext,
  );
  const messaging = translations.error[status] || translations.error[500];

  return (
    <Fragment>
      <ErrorMetadata
        brandName={brandName}
        locale={locale}
        messaging={messaging}
        themeColor={themeColor}
      />
      <ErrorPageComponent {...messaging} script={script} />
    </Fragment>
  );
};

ErrorMain.propTypes = {
  status: number.isRequired,
};

ErrorMetadata.propTypes = {
  locale: string.isRequired,
  messaging: shape({ title: string.isRequired }).isRequired,
  brandName: string.isRequired,
  themeColor: string.isRequired,
};

export default ErrorMain;
