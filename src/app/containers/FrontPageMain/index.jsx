import React, { Fragment } from 'react';
import { shape } from 'prop-types';
import { articleDataPropTypes } from '../../models/propTypes/article';
import deepGet from '../../helpers/json/deepGet';
import { GhostWrapper } from '../../lib/styledGrid';

const FrontPageMain = ({ frontPageData }) => {
  const title = deepGet(
    ['content', 'groups', 0, 'items', 0, 'headlines', 'headline'],
    frontPageData,
  );

  return (
    <Fragment>
      <main role="main">
        <GhostWrapper>
          <h1>{title}</h1>
        </GhostWrapper>
      </main>
    </Fragment>
  );
};

FrontPageMain.propTypes = {
  frontPageData: shape(articleDataPropTypes).isRequired,
};

export default FrontPageMain;
