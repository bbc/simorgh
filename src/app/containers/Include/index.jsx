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
  const { enabled } = useToggle('include');

  useEffect(() => {
    const fetchMarkup = async () => {
      try {
        const res = await fetch(href);
        const html = await res.text();
        setMarkup(html);
      } catch (e) {
        logger.error(`HTTP Error: "${e}"`);
      }
    };
    if (enabled) {
      fetchMarkup();
    }
  }, [href, enabled]);

  if (markup && enabled) {
    return (
      <GridItemConstrainedMedium>
        <div dangerouslySetInnerHTML={{ __html: markup }} />,
      </GridItemConstrainedMedium>
    );
  }
  return null;
};

IncludeContainer.propTypes = {
  href: string.isRequired,
};

export default IncludeContainer;
