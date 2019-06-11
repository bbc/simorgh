import React from 'react';
import { shape } from 'prop-types';
import articlePropTypes from '../../../models/propTypes/article';
import getAmpAnalyticsJson from './ampAnalyticsJson';
import ArticleAtiParams from '../ArticleAtiParams';

const JsonInlinedScript = data => (
  <script
    type="application/json"
    /* eslint-disable-next-line react/no-danger */
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
);

const AmpATIAnalytics = ({ articleData }) => {
  return (
    <amp-analytics>
      {JsonInlinedScript(
        getAmpAnalyticsJson({
          pageviewParams: ArticleAtiParams(articleData),
        }),
      )}
    </amp-analytics>
  );
};

AmpATIAnalytics.propTypes = {
  articleData: shape(articlePropTypes).isRequired,
};

export default AmpATIAnalytics;
