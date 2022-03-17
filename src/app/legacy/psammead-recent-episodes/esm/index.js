import React from 'react';
import styled from 'styled-components';
import { GEL_SPACING, GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
import { grid } from '@bbc/psammead-styles/detection';
import Grid from '@bbc/psammead-grid';
import { string } from 'prop-types'; // Wrapping Grid + adds the dividers

var RecentEpisodes = /*#__PURE__*/styled.ul.withConfig({
  displayName: "RecentEpisodes",
  componentId: "z10ngj-0"
})(["li{border-bottom:1px black solid;}"]); // Get SVG
// Align to top

var PlayIcon = /*#__PURE__*/styled.div.withConfig({
  displayName: "PlayIcon",
  componentId: "z10ngj-1"
})(["display:inline-block;"]);
var Wrapper = /*#__PURE__*/styled.h3.withConfig({
  displayName: "Wrapper",
  componentId: "z10ngj-2"
})(["display:inline-block;"]); // Most stuff goes

RecentEpisodes.Episode = function (_ref) {
  var children = _ref.children,
      Link = _ref.Link;
  return /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement(Link, null, /*#__PURE__*/React.createElement(PlayIcon, null, "Play!"), /*#__PURE__*/React.createElement(Wrapper, null, children)));
};

RecentEpisodes.BrandTitle = styled.h2.withConfig({
  displayName: "BrandTitle",
  componentId: "z10ngj-3"
})([""]);
RecentEpisodes.EpisodeTitle = styled.p.withConfig({
  displayName: "EpisodeTitle",
  componentId: "z10ngj-4"
})([""]);
RecentEpisodes.Date = styled.p.withConfig({
  displayName: "Date",
  componentId: "z10ngj-5"
})([""]);
RecentEpisodes.Duration = styled.p.withConfig({
  displayName: "Duration",
  componentId: "z10ngj-6"
})([""]);
RecentEpisodes.propTypes = {};
RecentEpisodes.defaultProps = {};
export default RecentEpisodes;