/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import 'isomorphic-fetch';
import { string } from 'prop-types';
import { GridItemConstrainedMedium } from '#lib/styledGrid';
import webLogger from '#lib/logger.web';
import useToggle from '../Toggle/useToggle';

const logger = webLogger();

const IncludeContainer = ({ href }) => {
  const [markup, setMarkup] = useState(null);
  const { enabled } = useToggle('styIncludes');

  useEffect(() => {
    const fetchMarkup = async () => {
      const res = await fetch(href);
      res
        .text()
        .then(html => setMarkup(html))
        .catch(e => logger.error(`HTTP Error: "${e}"`));
    };
    fetchMarkup();
  }, [href]);

  if (markup && enabled) {
    return (
      <>
        <GridItemConstrainedMedium>
          <div dangerouslySetInnerHTML={{ __html: markup }} />,
        </GridItemConstrainedMedium>
      </>
    );
  }
  return null;
};

IncludeContainer.propTypes = {
  href: string.isRequired,
};

export default IncludeContainer;
