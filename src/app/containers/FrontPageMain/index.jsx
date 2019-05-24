import React, { Fragment } from 'react';
import { shape } from 'prop-types';
import { articleDataPropTypes } from '../../models/propTypes/article';
import deepGet from '../../helpers/json/deepGet';
import { GhostWrapper, GridItemConstrainedLarge } from '../../lib/styledGrid';
import FrontPageSection from '../FrontPageSection';

const FrontPageMain = ({ frontPageData }) => {
  const content = deepGet(['content', 'groups'], frontPageData);

  return (
    <Fragment>
      <main role="main">
        <GhostWrapper>
          <GridItemConstrainedLarge>
            {content.map(group => (
              <FrontPageSection group={group} />
            ))}
          </GridItemConstrainedLarge>
        </GhostWrapper>
      </main>
    </Fragment>
  );
};

FrontPageMain.propTypes = {
  frontPageData: shape(articleDataPropTypes).isRequired,
};

export default FrontPageMain;
