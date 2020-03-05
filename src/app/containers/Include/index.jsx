/* eslint-disable react/no-danger */
import React from 'react';
import { string } from 'prop-types';
import { GridItemConstrainedMedium } from '#lib/styledGrid';
import useToggle from '../Toggle/useToggle';

const IncludeContainer = ({ html }) => {
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

IncludeContainer.propTypes = {
  html: string,
};

IncludeContainer.defaultProps = {
  html: null,
};

export default IncludeContainer;
