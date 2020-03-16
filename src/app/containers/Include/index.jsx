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
  const [hasError, setError] = useState(false);
  const { enabled } = useToggle('include');

  useEffect(() => {
    const fetchMarkup = async () => {
      try {
        const res = await fetch(href);
        if (res.status !== 200) {
          throw new Error('Failed to fetch');
        } else {
          const html = await res.text();
          setMarkup(html);
        }
      } catch (e) {
        setError(true);
        logger.error(`HTTP Error: "${e}"`);
      }
    };
    if (enabled) {
      fetchMarkup();
    }
  }, [href, enabled]);

  const shouldNotDisplayInclude = hasError || !(markup && enabled);

  if (shouldNotDisplayInclude) {
    return null;
  }

  return (
    <GridItemConstrainedMedium>
      <div dangerouslySetInnerHTML={{ __html: markup }} />,
    </GridItemConstrainedMedium>
  );
};

IncludeContainer.propTypes = {
  href: string.isRequired,
};

export default IncludeContainer;
