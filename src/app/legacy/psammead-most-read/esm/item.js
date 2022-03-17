import React, { Fragment } from 'react';
import { node, oneOf, shape, string } from 'prop-types';
import styled from 'styled-components';
import { getFoolscap, getDoublePica } from '@bbc/gel-foundations/typography';
import { C_EBON, C_POSTBOX } from '@bbc/psammead-styles/colours';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import { GEL_SPACING } from '@bbc/gel-foundations/spacings';
import { getSerifLight, getSerifMedium } from '@bbc/psammead-styles/font-styles';
export var StyledCountSpan =
/*#__PURE__*/
styled.span.withConfig({
  displayName: "StyledCountSpan",
  componentId: "sc-1arzkfq-0"
})(["", ";", " color:", ";margin:0;padding-bottom:", ";display:inline-block;min-width:3rem;"], function (_ref) {
  var script = _ref.script;
  return script && getFoolscap(script);
}, function (_ref2) {
  var service = _ref2.service;
  return getSerifLight(service);
}, C_POSTBOX, GEL_SPACING);
var StyledLink =
/*#__PURE__*/
styled.a.withConfig({
  displayName: "StyledLink",
  componentId: "sc-1arzkfq-1"
})(["", ";", " color:", ";text-decoration:none;padding-bottom:", ";&:hover,&:focus{text-decoration:underline;}"], function (_ref3) {
  var script = _ref3.script;
  return script && getDoublePica(script);
}, function (_ref4) {
  var service = _ref4.service;
  return getSerifMedium(service);
}, C_EBON, GEL_SPACING);
export var MostReadItem = function MostReadItem(_ref5) {
  var dir = _ref5.dir,
      lastUpdated = _ref5.lastUpdated,
      script = _ref5.script,
      service = _ref5.service,
      _ref5$item = _ref5.item,
      title = _ref5$item.title,
      href = _ref5$item.href;
  return React.createElement(Fragment, {
    dir: dir
  }, React.createElement(StyledLink, {
    href: href,
    script: script,
    service: service
  }, title), lastUpdated);
};
StyledCountSpan.propTypes = {
  service: string.isRequired,
  script: shape(scriptPropType).isRequired
};
MostReadItem.propTypes = {
  dir: string,
  service: string.isRequired,
  script: shape(scriptPropType).isRequired,
  lastUpdated: node,
  item: shape({
    title: string.isRequired,
    href: string.isRequired
  }).isRequired
};
MostReadItem.defaultProps = {
  dir: oneOf(['rtl', 'ltr']),
  lastUpdated: null
};