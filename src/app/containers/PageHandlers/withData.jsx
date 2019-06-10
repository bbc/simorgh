import React, { useContext } from 'react';
import { shape, element } from 'prop-types';
import articlePropTypes from '../../models/propTypes/article';
import ErrorMain from '../ErrorMain';
import nodeLogger from '../../helpers/logger.node';
import deepGet from '../../helpers/json/deepGet';
import { ServiceContext } from '../../contexts/ServiceContext';
import idSanitiser from '../../lib/utilities/idSanitiser';

const logger = nodeLogger(__filename);

/* used to remove - & _ from locale and service language for comparison
eg: transforms en-GB, en_gb to engb, etc.
TODO: move this to a util ? not sure where exactly
*/
const sanitizedLocaleToLowerCase = text => idSanitiser(text.toLowerCase());

// checks for data, status & language keys, setting default status if not found
const constructRenderObject = data => ({
  status: deepGet(['status'], data) || 500,
  pageData: deepGet(['pageData'], data),
  language: deepGet(['pageData', 'metadata', 'passport', 'language'], data),
});

// checks for pageData, 200 status and if languge from article data fits the service locale
const shouldRender = data => {
  const { status, pageData, language } = constructRenderObject(data);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { locale } = useContext(ServiceContext);

  const hasDataAnd200Status = pageData && status === 200;
  const hasValidLocale =
    pageData &&
    sanitizedLocaleToLowerCase(language) === sanitizedLocaleToLowerCase(locale);

  return {
    hasDataAnd200Status,
    hasValidLocale,
    status,
    pageData,
  };
};

const WithData = Component => {
  const DataContainer = ({ data, ...props }) => {
    const {
      hasDataAnd200Status,
      hasValidLocale,
      status,
      pageData,
    } = shouldRender(data);
    if (hasDataAnd200Status && hasValidLocale) {
      try {
        return <Component pageData={pageData} {...props} />;
      } catch (err) {
        logger.error(err);
      }
    }

    if (hasDataAnd200Status && !hasValidLocale) {
      return <ErrorMain status={404} />;
    }

    return <ErrorMain status={status} />;
  };

  DataContainer.propTypes = {
    data: shape(articlePropTypes),
  };

  DataContainer.defaultProps = {
    data: null,
  };

  return DataContainer;
};

WithData.propTypes = {
  Component: element,
};

export default WithData;
