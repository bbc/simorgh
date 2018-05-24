import React, { Fragment } from 'react';
import Helmet from 'react-helmet';

const Article = () => {
  const headline = 'Article Headline';

  return (
    <Fragment>
      <Helmet htmlAttributes={{ lang: 'en-GB' }}>
        <title>{headline}</title>
      </Helmet>
      <h1 foo="bar" className="headline">{headline}</h1>
    </Fragment>
  );
};

export default Article;
