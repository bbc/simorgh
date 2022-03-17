import React from 'react';
import styled, { css } from 'styled-components';
import { node } from 'prop-types';
import { C_EBON } from '@bbc/psammead-styles/colours';
import { getSerifMedium } from '@bbc/psammead-styles/font-styles';
import { grid } from '@bbc/psammead-styles/detection';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
import { GEL_SPACING_DBL, GEL_SPACING } from '@bbc/gel-foundations/spacings';
import { getDoublePica } from '@bbc/gel-foundations/dist/typography';
var fourOfSixColumnsMaxWidthScaleable = "66.67%"; // (4 / 6) * 100 = 66.6666666667 = 66.67%

var twoOfSixColumnsMaxWidthScaleable = "33.33%"; // (2 / 6) * 100 = 0.3333333333 = 33.33%

var LeadingPromoWrapper =
/*#__PURE__*/
styled.div.withConfig({
  displayName: "LeadingPromoWrapper",
  componentId: "sc-1a9mfzj-0"
})(["@supports (", "){display:grid;grid-template-columns:repeat(6,1fr);grid-column-gap:", ";}"], grid, GEL_SPACING_DBL);
var ImageGridColumns =
/*#__PURE__*/
css(["grid-template-columns:repeat(4,1fr);grid-column-end:span 4;"]);
var ImageGridColumnsFallback =
/*#__PURE__*/
css(["width:", ";"], fourOfSixColumnsMaxWidthScaleable);
var ImageGridItem =
/*#__PURE__*/
styled.div.withConfig({
  displayName: "ImageGridItem",
  componentId: "sc-1a9mfzj-1"
})(["display:inline-block;", " @supports (", "){width:initial;@media (min-width:", "){", "}}"], ImageGridColumnsFallback, grid, GEL_GROUP_4_SCREEN_WIDTH_MIN, ImageGridColumns);
var TextGridColumns =
/*#__PURE__*/
css(["grid-template-columns:repeat(2,1fr);grid-column-end:span 2;"]);
var TextGridColumnsFallBack =
/*#__PURE__*/
css(["width:", ";"], twoOfSixColumnsMaxWidthScaleable);
var TextGridItem =
/*#__PURE__*/
styled.div.withConfig({
  displayName: "TextGridItem",
  componentId: "sc-1a9mfzj-2"
})(["display:inline-block;vertical-align:top;", " @supports (", "){width:100%;@media (min-width:", "){", "}}"], TextGridColumnsFallBack, grid, GEL_GROUP_4_SCREEN_WIDTH_MIN, TextGridColumns);
export var LeadingPromoHeadline =
/*#__PURE__*/
styled.h3.withConfig({
  displayName: "LeadingPromoHeadline",
  componentId: "sc-1a9mfzj-3"
})(["", " ", " color:", ";margin:0;padding-bottom:", ";"], function (_ref) {
  var script = _ref.script;
  return script && getDoublePica(script);
}, function (_ref2) {
  var service = _ref2.service;
  return getSerifMedium(service);
}, C_EBON, GEL_SPACING);

var LeadingStoryPromo = function LeadingStoryPromo(_ref3) {
  var image = _ref3.image,
      info = _ref3.info;
  return React.createElement(LeadingPromoWrapper, null, React.createElement(TextGridItem, null, info), React.createElement(ImageGridItem, null, image));
};

LeadingStoryPromo.propTypes = {
  image: node.isRequired,
  info: node.isRequired
};
export default LeadingStoryPromo;