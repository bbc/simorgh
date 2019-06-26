import React, { Fragment, useContext, useRef, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { obj } from 'prop-types';
import { articleDataPropTypes } from '../../models/propTypes/article';
import MetadataContainer from '../Metadata';
import headings from '../Headings';
import text from '../Text';
import image from '../Image';
import Blocks from '../Blocks';
import timestamp from '../ArticleTimestamp';
import { GhostWrapper } from '../../lib/styledGrid';
import ATIAnalytics from '../ATIAnalytics';
import { RequestContext } from '../../contexts/RequestContext';

const usePrevious = value => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

const componentsToRender = {
  headline: headings,
  subheadline: headings,
  text,
  image,
  timestamp,
};

const ArticleMain = ({ articleData, location }) => {
  const { pageType } = useContext(RequestContext);
  const { content, metadata, promo } = articleData;
  const { blocks } = content.model;
  const { pathname } = location;

  /* this is not working... everytime I navigate to a new page using
      an anchor tag or a Link, this gets reset... state and props don'r get preserved during navigation.
  */
  const previousPath = usePrevious(pathname);

  return (
    <Fragment>
      <ATIAnalytics
        data={articleData}
        pageType={pageType}
        previousPath={previousPath}
      />
      <MetadataContainer metadata={metadata} promo={promo} />
      <main role="main">
        <div>
          <a href="/news/articles/c6v11qzyv8po">article 1</a>
        </div>
        <div>
          <a href="/news/articles/c0000000003o">article 2</a>
        </div>
        <GhostWrapper>
          <Blocks blocks={blocks} componentsToRender={componentsToRender} />
        </GhostWrapper>
      </main>
    </Fragment>
  );
};

ArticleMain.propTypes = {
  articleData: articleDataPropTypes.isRequired,
  location: obj.isRequired,
};

export default withRouter(ArticleMain);
