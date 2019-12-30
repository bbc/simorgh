import React from 'react';
import { TEXT_VARIANTS } from '@bbc/psammead-storybook-helpers';
import { latin } from '@bbc/gel-foundations/scripts';
import { shape, string, node, arrayOf } from 'prop-types';
import Timestamp from '@bbc/psammead-timestamp';

const lastUpdated = (script, service) => (
  <Timestamp
    datetime="2019-03-01T14:00+00:00"
    script={script}
    padding={false}
    service={service}
  >
    Last updated: 5th November 2016
  </Timestamp>
);

export const getItem = (service, withTimestamp = false) => {
  const baseUrl = 'https://www.bbc.com';
  const { text, articlePath } = TEXT_VARIANTS[service];
  const timestamp = withTimestamp ? lastUpdated(latin, service) : null;
  return {
    id: Math.floor(Math.random() * 100000) + 1,
    title: text,
    href: `${baseUrl}${articlePath}`,
    timestamp,
  };
};

export const getItems = (service = 'news', arraySize) =>
  Array.from({ length: arraySize }, () => getItem(service));

export const itemPropTypes = shape({
  id: string.isRequired,
  title: string.isRequired,
  href: string.isRequired,
  timestamp: node,
});

export const itemsPropTypes = arrayOf(
  shape({
    id: string.isRequired,
    title: string.isRequired,
    href: string.isRequired,
    timestamp: node,
  }),
);
