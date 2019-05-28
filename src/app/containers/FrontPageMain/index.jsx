import React, { Fragment } from 'react';
import { shape } from 'prop-types';
import { frontPageDataPropTypes } from '../../models/propTypes/frontPage';
import { GhostWrapper, GridItemConstrainedLarge } from '../../lib/styledGrid';
import FrontPageSection from '../FrontPageSection';
import deepGet from '../../helpers/json/deepGet';

const FrontPageMain = ({ frontPageData }) => {
  const groups = deepGet(['content', 'groups'], frontPageData);

  return (
    <Fragment>
      <main role="main">
        <GhostWrapper>
          <GridItemConstrainedLarge>
            {groups.map(group => (
              <FrontPageSection key={group.title} group={group} />
            ))}
          </GridItemConstrainedLarge>
        </GhostWrapper>
      </main>
    </Fragment>
  );
};

FrontPageMain.propTypes = {
  frontPageData: shape(frontPageDataPropTypes).isRequired,
};

export default FrontPageMain;
