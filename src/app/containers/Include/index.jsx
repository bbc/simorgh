/* eslint-disable react/no-danger */
import React from 'react';
import { string } from 'prop-types';
import { GridItemConstrainedMedium } from '#lib/styledGrid';
import useToggle from '../Toggle/useToggle';

const Include = ({ html }) => {
  const { enabled } = useToggle('styIncludes');
  return (
    <>
      {enabled && (
        <GridItemConstrainedMedium>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </GridItemConstrainedMedium>
      )}
    </>
  );
};

Include.propTypes = {
  html: string,
};

Include.defaultProps = {
  html: null,
};

export default Include;
