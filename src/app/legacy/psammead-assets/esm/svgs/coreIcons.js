import _styled from "@emotion/styled/base";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

import React from 'react';
import { C_EBON } from '@bbc/psammead-styles/colours';
import { GEL_SPACING_HLF, GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
var defaultAttrs = {
  focusable: 'false',
  'aria-hidden': 'true'
};
var coreAttrs = {
  viewBox: '0 0 32 32',
  width: GEL_SPACING_DBL,
  height: GEL_SPACING_DBL
};

var CoreIcon = _styled("svg", process.env.NODE_ENV === "production" ? {
  target: "e1mgkatl1"
} : {
  target: "e1mgkatl1",
  label: "CoreIcon"
})("vertical-align:middle;margin:0 ", GEL_SPACING_HLF, ";color:", C_EBON, ";fill:currentColor;" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdmdzL2NvcmVJY29ucy5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBbUIyQiIsImZpbGUiOiIuLi8uLi9zcmMvc3Zncy9jb3JlSWNvbnMuanN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IENfRUJPTiB9IGZyb20gJ0BiYmMvcHNhbW1lYWQtc3R5bGVzL2NvbG91cnMnO1xuaW1wb3J0IHtcbiAgR0VMX1NQQUNJTkdfSExGLFxuICBHRUxfU1BBQ0lOR19EQkwsXG59IGZyb20gJ0BiYmMvZ2VsLWZvdW5kYXRpb25zL3NwYWNpbmdzJztcblxuY29uc3QgZGVmYXVsdEF0dHJzID0ge1xuICBmb2N1c2FibGU6ICdmYWxzZScsXG4gICdhcmlhLWhpZGRlbic6ICd0cnVlJyxcbn07XG5cbmNvbnN0IGNvcmVBdHRycyA9IHtcbiAgdmlld0JveDogJzAgMCAzMiAzMicsXG4gIHdpZHRoOiBHRUxfU1BBQ0lOR19EQkwsXG4gIGhlaWdodDogR0VMX1NQQUNJTkdfREJMLFxufTtcblxuY29uc3QgQ29yZUljb24gPSBzdHlsZWQuc3ZnYFxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICBtYXJnaW46IDAgJHtHRUxfU1BBQ0lOR19ITEZ9O1xuICBjb2xvcjogJHtDX0VCT059O1xuICBmaWxsOiBjdXJyZW50Q29sb3I7XG5gO1xuXG5jb25zdCBDbG9ja0ljb24gPSBzdHlsZWQoQ29yZUljb24pYFxuICB3aWR0aDogMC43MjVyZW07XG4gIGhlaWdodDogMC43MjVyZW07XG5gO1xuXG5jb25zdCBDb3JlSWNvbnMgPSB7XG4gIGFsZXJ0OiAoXG4gICAgPENvcmVJY29uIHsuLi5kZWZhdWx0QXR0cnN9IHsuLi5jb3JlQXR0cnN9PlxuICAgICAgPHBhdGggZD1cIk0xNiAyTDAgMzBoMzJ6bTIgMjVoLTR2LTRoNHptLTQtNlYxMWg0djEwelwiIC8+XG4gICAgPC9Db3JlSWNvbj5cbiAgKSxcbiAgaW5mbzogKFxuICAgIDxDb3JlSWNvbiB7Li4uZGVmYXVsdEF0dHJzfSB7Li4uY29yZUF0dHJzfT5cbiAgICAgIDxwYXRoIGQ9XCJNMTYgMGExNiAxNiAwIDEgMCAxNiAxNkExNiAxNiAwIDAgMCAxNiAwem0yIDI1aC00VjEzaDR6bTAtMTRoLTRWN2g0elwiIC8+XG4gICAgPC9Db3JlSWNvbj5cbiAgKSxcbiAgY2xvY2s6IChcbiAgICA8Q2xvY2tJY29uIHZpZXdCb3g9XCIwIDAgMTMgMTNcIiB3aWR0aD1cIjEzXCIgaGVpZ2h0PVwiMTNcIiB7Li4uZGVmYXVsdEF0dHJzfT5cbiAgICAgIDxwYXRoIGQ9XCJNNi41IDBBNi41IDYuNSAwIDEwMTMgNi41IDYuNSA2LjUgMCAwMDYuNSAwem0wIDExLjVhNSA1IDAgMTE1LTUgNSA1IDAgMDEtNSA1elwiIC8+XG4gICAgICA8cGF0aCBkPVwiTTcuMzQgMi45aC0xdjMuOEw5LjQgOC41N2wuNDEtLjU2LTIuNDctMS44OVYyLjl6XCIgLz5cbiAgICA8L0Nsb2NrSWNvbj5cbiAgKSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvcmVJY29ucztcbiJdfQ== */"));

var ClockIcon = /*#__PURE__*/_styled(CoreIcon, process.env.NODE_ENV === "production" ? {
  target: "e1mgkatl0"
} : {
  target: "e1mgkatl0",
  label: "ClockIcon"
})(process.env.NODE_ENV === "production" ? {
  name: "1v39w24",
  styles: "width:0.725rem;height:0.725rem"
} : {
  name: "1v39w24",
  styles: "width:0.725rem;height:0.725rem",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zdmdzL2NvcmVJY29ucy5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBMEJrQyIsImZpbGUiOiIuLi8uLi9zcmMvc3Zncy9jb3JlSWNvbnMuanN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IENfRUJPTiB9IGZyb20gJ0BiYmMvcHNhbW1lYWQtc3R5bGVzL2NvbG91cnMnO1xuaW1wb3J0IHtcbiAgR0VMX1NQQUNJTkdfSExGLFxuICBHRUxfU1BBQ0lOR19EQkwsXG59IGZyb20gJ0BiYmMvZ2VsLWZvdW5kYXRpb25zL3NwYWNpbmdzJztcblxuY29uc3QgZGVmYXVsdEF0dHJzID0ge1xuICBmb2N1c2FibGU6ICdmYWxzZScsXG4gICdhcmlhLWhpZGRlbic6ICd0cnVlJyxcbn07XG5cbmNvbnN0IGNvcmVBdHRycyA9IHtcbiAgdmlld0JveDogJzAgMCAzMiAzMicsXG4gIHdpZHRoOiBHRUxfU1BBQ0lOR19EQkwsXG4gIGhlaWdodDogR0VMX1NQQUNJTkdfREJMLFxufTtcblxuY29uc3QgQ29yZUljb24gPSBzdHlsZWQuc3ZnYFxuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICBtYXJnaW46IDAgJHtHRUxfU1BBQ0lOR19ITEZ9O1xuICBjb2xvcjogJHtDX0VCT059O1xuICBmaWxsOiBjdXJyZW50Q29sb3I7XG5gO1xuXG5jb25zdCBDbG9ja0ljb24gPSBzdHlsZWQoQ29yZUljb24pYFxuICB3aWR0aDogMC43MjVyZW07XG4gIGhlaWdodDogMC43MjVyZW07XG5gO1xuXG5jb25zdCBDb3JlSWNvbnMgPSB7XG4gIGFsZXJ0OiAoXG4gICAgPENvcmVJY29uIHsuLi5kZWZhdWx0QXR0cnN9IHsuLi5jb3JlQXR0cnN9PlxuICAgICAgPHBhdGggZD1cIk0xNiAyTDAgMzBoMzJ6bTIgMjVoLTR2LTRoNHptLTQtNlYxMWg0djEwelwiIC8+XG4gICAgPC9Db3JlSWNvbj5cbiAgKSxcbiAgaW5mbzogKFxuICAgIDxDb3JlSWNvbiB7Li4uZGVmYXVsdEF0dHJzfSB7Li4uY29yZUF0dHJzfT5cbiAgICAgIDxwYXRoIGQ9XCJNMTYgMGExNiAxNiAwIDEgMCAxNiAxNkExNiAxNiAwIDAgMCAxNiAwem0yIDI1aC00VjEzaDR6bTAtMTRoLTRWN2g0elwiIC8+XG4gICAgPC9Db3JlSWNvbj5cbiAgKSxcbiAgY2xvY2s6IChcbiAgICA8Q2xvY2tJY29uIHZpZXdCb3g9XCIwIDAgMTMgMTNcIiB3aWR0aD1cIjEzXCIgaGVpZ2h0PVwiMTNcIiB7Li4uZGVmYXVsdEF0dHJzfT5cbiAgICAgIDxwYXRoIGQ9XCJNNi41IDBBNi41IDYuNSAwIDEwMTMgNi41IDYuNSA2LjUgMCAwMDYuNSAwem0wIDExLjVhNSA1IDAgMTE1LTUgNSA1IDAgMDEtNSA1elwiIC8+XG4gICAgICA8cGF0aCBkPVwiTTcuMzQgMi45aC0xdjMuOEw5LjQgOC41N2wuNDEtLjU2LTIuNDctMS44OVYyLjl6XCIgLz5cbiAgICA8L0Nsb2NrSWNvbj5cbiAgKSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvcmVJY29ucztcbiJdfQ== */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
});

var CoreIcons = {
  alert: /*#__PURE__*/React.createElement(CoreIcon, _extends({}, defaultAttrs, coreAttrs), /*#__PURE__*/React.createElement("path", {
    d: "M16 2L0 30h32zm2 25h-4v-4h4zm-4-6V11h4v10z"
  })),
  info: /*#__PURE__*/React.createElement(CoreIcon, _extends({}, defaultAttrs, coreAttrs), /*#__PURE__*/React.createElement("path", {
    d: "M16 0a16 16 0 1 0 16 16A16 16 0 0 0 16 0zm2 25h-4V13h4zm0-14h-4V7h4z"
  })),
  clock: /*#__PURE__*/React.createElement(ClockIcon, _extends({
    viewBox: "0 0 13 13",
    width: "13",
    height: "13"
  }, defaultAttrs), /*#__PURE__*/React.createElement("path", {
    d: "M6.5 0A6.5 6.5 0 1013 6.5 6.5 6.5 0 006.5 0zm0 11.5a5 5 0 115-5 5 5 0 01-5 5z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M7.34 2.9h-1v3.8L9.4 8.57l.41-.56-2.47-1.89V2.9z"
  }))
};
export default CoreIcons;