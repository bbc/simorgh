/* eslint-disable react/no-danger */
import React from 'react';
import { string } from 'prop-types';
import { GridItemConstrainedMedium } from '#lib/styledGrid';

const Include = ({ html }) => {
  return (
    <>
      <GridItemConstrainedMedium>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </GridItemConstrainedMedium>
    </>
  );
};

Include.propTypes = {
  html: string.isRequired,
};

export default Include;
