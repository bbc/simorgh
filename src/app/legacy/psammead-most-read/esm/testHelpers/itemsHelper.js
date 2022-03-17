import React from 'react';
import { TEXT_VARIANTS } from '@bbc/psammead-storybook-helpers';
import { latin } from '@bbc/gel-foundations/scripts';
import { shape, string, node } from 'prop-types';
import Timestamp from '@bbc/psammead-timestamp';

var lastUpdated = function lastUpdated(script, service) {
  return React.createElement(Timestamp, {
    datetime: "2019-03-01T14:00+00:00",
    script: script,
    padding: false,
    service: service
  }, "Last updated: 5th November 2016");
};

export var getItem = function getItem(service) {
  var withTimestamp = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var baseUrl = 'https://www.bbc.com';
  var _TEXT_VARIANTS$servic = TEXT_VARIANTS[service],
      text = _TEXT_VARIANTS$servic.text,
      articlePath = _TEXT_VARIANTS$servic.articlePath;
  var timestamp = withTimestamp ? lastUpdated(latin, service) : null;
  return {
    id: Math.floor(Math.random() * 100000) + 1,
    title: text,
    href: "".concat(baseUrl).concat(articlePath),
    timestamp: timestamp
  };
};
export var getItems = function getItems() {
  var service = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'news';
  var arraySize = arguments.length > 1 ? arguments[1] : undefined;
  return Array.from({
    length: arraySize
  }, function () {
    return getItem(service);
  });
};
export var itemPropTypes = shape({
  id: string.isRequired,
  title: string.isRequired,
  href: string.isRequired,
  timestamp: node.isRequired
});