import React, { Fragment } from 'react';
import { shape } from 'prop-types';
import { articleDataPropTypes } from '../../models/propTypes/article';
import deepGet from '../../helpers/json/deepGet';
import Page from '../Page';

const Article = props => (
  <Page {...props}>
    {({ articleData }) => (
      <Fragment>
        <main role="main">
          <h1>
            {deepGet(
              ['content', 'groups', 0, 'items', 0, 'headlines', 'headline'],
              articleData,
            )}
          </h1>
        </main>
      </Fragment>
    )}
  </Page>
);

Article.propTypes = {
  articleData: shape(articleDataPropTypes).isRequired,
};

export default Article;
