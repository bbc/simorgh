import _styled from "@emotion/styled/base";
import React from 'react';
import { node, string, func, shape, bool } from 'prop-types';
import { GEL_SPACING_HLF, GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
import { getBrevier } from '@bbc/gel-foundations/typography';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import { C_LUNAR, C_METAL } from '@bbc/psammead-styles/colours';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
var PADDING = "\n  padding-bottom: ".concat(GEL_SPACING_HLF, ";\n  &:last-child {\n    padding-bottom: ").concat(GEL_SPACING_DBL, ";\n  }\n");

var StyledTimestamp = _styled("time", process.env.NODE_ENV === "production" ? {
  target: "e4zesg50"
} : {
  target: "e4zesg50",
  label: "StyledTimestamp"
})(function (_ref) {
  var script = _ref.script,
      typographyFunc = _ref.typographyFunc;
  return script && typographyFunc && typographyFunc(script);
}, " color:", function (_ref2) {
  var darkMode = _ref2.darkMode;
  return darkMode ? C_LUNAR : C_METAL;
}, ";display:block;", function (_ref3) {
  var service = _ref3.service;
  return getSansRegular(service);
}, " ", function (props) {
  return props.padding && PADDING;
}, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBbUJtQyIsImZpbGUiOiIuLi9zcmMvaW5kZXguanN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IG5vZGUsIHN0cmluZywgZnVuYywgc2hhcGUsIGJvb2wgfSBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7XG4gIEdFTF9TUEFDSU5HX0hMRixcbiAgR0VMX1NQQUNJTkdfREJMLFxufSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy9zcGFjaW5ncyc7XG5pbXBvcnQgeyBnZXRCcmV2aWVyIH0gZnJvbSAnQGJiYy9nZWwtZm91bmRhdGlvbnMvdHlwb2dyYXBoeSc7XG5pbXBvcnQgeyBzY3JpcHRQcm9wVHlwZSB9IGZyb20gJ0BiYmMvZ2VsLWZvdW5kYXRpb25zL3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgQ19MVU5BUiwgQ19NRVRBTCB9IGZyb20gJ0BiYmMvcHNhbW1lYWQtc3R5bGVzL2NvbG91cnMnO1xuaW1wb3J0IHsgZ2V0U2Fuc1JlZ3VsYXIgfSBmcm9tICdAYmJjL3BzYW1tZWFkLXN0eWxlcy9mb250LXN0eWxlcyc7XG5cbmNvbnN0IFBBRERJTkcgPSBgXG4gIHBhZGRpbmctYm90dG9tOiAke0dFTF9TUEFDSU5HX0hMRn07XG4gICY6bGFzdC1jaGlsZCB7XG4gICAgcGFkZGluZy1ib3R0b206ICR7R0VMX1NQQUNJTkdfREJMfTtcbiAgfVxuYDtcblxuY29uc3QgU3R5bGVkVGltZXN0YW1wID0gc3R5bGVkLnRpbWVgXG4gICR7KHsgc2NyaXB0LCB0eXBvZ3JhcGh5RnVuYyB9KSA9PlxuICAgIHNjcmlwdCAmJiB0eXBvZ3JhcGh5RnVuYyAmJiB0eXBvZ3JhcGh5RnVuYyhzY3JpcHQpfVxuICBjb2xvcjogJHsoeyBkYXJrTW9kZSB9KSA9PiAoZGFya01vZGUgPyBDX0xVTkFSIDogQ19NRVRBTCl9O1xuICBkaXNwbGF5OiBibG9jaztcbiAgJHsoeyBzZXJ2aWNlIH0pID0+IGdldFNhbnNSZWd1bGFyKHNlcnZpY2UpfVxuICAke3Byb3BzID0+IHByb3BzLnBhZGRpbmcgJiYgUEFERElOR31cbmA7XG5cbmNvbnN0IFRpbWVzdGFtcCA9ICh7XG4gIGNoaWxkcmVuLFxuICBkYXRldGltZSxcbiAgdHlwb2dyYXBoeUZ1bmMsXG4gIHNjcmlwdCxcbiAgcGFkZGluZyxcbiAgc2VydmljZSxcbiAgZGFya01vZGUsXG4gIGNsYXNzTmFtZSxcbn0pID0+IChcbiAgPFN0eWxlZFRpbWVzdGFtcFxuICAgIGRhdGVUaW1lPXtkYXRldGltZX1cbiAgICB0eXBvZ3JhcGh5RnVuYz17dHlwb2dyYXBoeUZ1bmN9XG4gICAgc2NyaXB0PXtzY3JpcHR9XG4gICAgcGFkZGluZz17cGFkZGluZ31cbiAgICBzZXJ2aWNlPXtzZXJ2aWNlfVxuICAgIGRhcmtNb2RlPXtkYXJrTW9kZX1cbiAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgPlxuICAgIHtjaGlsZHJlbn1cbiAgPC9TdHlsZWRUaW1lc3RhbXA+XG4pO1xuXG5UaW1lc3RhbXAuZGVmYXVsdFByb3BzID0ge1xuICB0eXBvZ3JhcGh5RnVuYzogZ2V0QnJldmllcixcbiAgcGFkZGluZzogdHJ1ZSxcbiAgZGFya01vZGU6IGZhbHNlLFxuICBjbGFzc05hbWU6IG51bGwsXG59O1xuXG5UaW1lc3RhbXAucHJvcFR5cGVzID0ge1xuICBjaGlsZHJlbjogbm9kZS5pc1JlcXVpcmVkLFxuICBkYXRldGltZTogc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHR5cG9ncmFwaHlGdW5jOiBmdW5jLFxuICBwYWRkaW5nOiBib29sLFxuICBzY3JpcHQ6IHNoYXBlKHNjcmlwdFByb3BUeXBlKS5pc1JlcXVpcmVkLFxuICBzZXJ2aWNlOiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgZGFya01vZGU6IGJvb2wsXG4gIGNsYXNzTmFtZTogc3RyaW5nLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgVGltZXN0YW1wO1xuIl19 */"));

var Timestamp = function Timestamp(_ref4) {
  var children = _ref4.children,
      datetime = _ref4.datetime,
      typographyFunc = _ref4.typographyFunc,
      script = _ref4.script,
      padding = _ref4.padding,
      service = _ref4.service,
      darkMode = _ref4.darkMode,
      className = _ref4.className;
  return /*#__PURE__*/React.createElement(StyledTimestamp, {
    dateTime: datetime,
    typographyFunc: typographyFunc,
    script: script,
    padding: padding,
    service: service,
    darkMode: darkMode,
    className: className
  }, children);
};

Timestamp.defaultProps = {
  typographyFunc: getBrevier,
  padding: true,
  darkMode: false,
  className: null
};
Timestamp.propTypes = {
  children: node.isRequired,
  datetime: string.isRequired,
  typographyFunc: func,
  padding: bool,
  script: shape(scriptPropType).isRequired,
  service: string.isRequired,
  darkMode: bool,
  className: string
};
export default Timestamp;