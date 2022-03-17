"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _base = _interopRequireDefault(require("@emotion/styled/base"));

var _react = _interopRequireDefault(require("react"));

var _propTypes = require("prop-types");

var _svgs = require("@bbc/psammead-assets/svgs");

var _typography = require("@bbc/gel-foundations/typography");

var _fontStyles = require("@bbc/psammead-styles/font-styles");

var _spacings = require("@bbc/gel-foundations/spacings");

var _colours = require("@bbc/psammead-styles/colours");

var _excluded = ["children"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var EpisodesText = (0, _base.default)("p", process.env.NODE_ENV === "production" ? {
  target: "ea1iozc0"
} : {
  target: "ea1iozc0",
  label: "EpisodesText"
})("display:inline;", function (_ref) {
  var script = _ref.script;
  return (0, _typography.getPica)(script);
}, ";", function (_ref2) {
  var service = _ref2.service;
  return (0, _fontStyles.getSansRegular)(service);
}, ";color:", _colours.C_METAL, ";>svg{fill:currentColor;color:unset;width:", _spacings.GEL_SPACING_DBL, ";height:", _spacings.GEL_SPACING_DBL, ";position:relative;bottom:0.125rem;right:0.1875rem;}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NhcmQtZXBpc29kZXMtdGV4dC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBUzZCIiwiZmlsZSI6Ii4uLy4uL3NyYy9jb21wb25lbnRzL2NhcmQtZXBpc29kZXMtdGV4dC5qc3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgbm9kZSB9IGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgbWVkaWFJY29ucyB9IGZyb20gJ0BiYmMvcHNhbW1lYWQtYXNzZXRzL3N2Z3MnO1xuaW1wb3J0IHsgZ2V0UGljYSB9IGZyb20gJ0BiYmMvZ2VsLWZvdW5kYXRpb25zL3R5cG9ncmFwaHknO1xuaW1wb3J0IHsgZ2V0U2Fuc1JlZ3VsYXIgfSBmcm9tICdAYmJjL3BzYW1tZWFkLXN0eWxlcy9mb250LXN0eWxlcyc7XG5pbXBvcnQgeyBHRUxfU1BBQ0lOR19EQkwgfSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy9zcGFjaW5ncyc7XG5pbXBvcnQgeyBDX01FVEFMIH0gZnJvbSAnQGJiYy9wc2FtbWVhZC1zdHlsZXMvY29sb3Vycyc7XG5cbmNvbnN0IEVwaXNvZGVzVGV4dCA9IHN0eWxlZC5wYFxuICBkaXNwbGF5OiBpbmxpbmU7XG4gICR7KHsgc2NyaXB0IH0pID0+IGdldFBpY2Eoc2NyaXB0KX07XG4gICR7KHsgc2VydmljZSB9KSA9PiBnZXRTYW5zUmVndWxhcihzZXJ2aWNlKX07XG4gIGNvbG9yOiAke0NfTUVUQUx9O1xuICA+IHN2ZyB7XG4gICAgZmlsbDogY3VycmVudENvbG9yO1xuICAgIGNvbG9yOiB1bnNldDtcbiAgICB3aWR0aDogJHtHRUxfU1BBQ0lOR19EQkx9O1xuICAgIGhlaWdodDogJHtHRUxfU1BBQ0lOR19EQkx9O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBib3R0b206IDAuMTI1cmVtO1xuICAgIHJpZ2h0OiAwLjE4NzVyZW07XG4gIH1cbmA7XG5cbmNvbnN0IENhcmRFcGlzb2Rlc1RleHQgPSAoeyBjaGlsZHJlbiwgLi4ucHJvcHMgfSkgPT4gKFxuICA8PlxuICAgIDxFcGlzb2Rlc1RleHQgey4uLnByb3BzfT5cbiAgICAgIHttZWRpYUljb25zLnNlcmllc3N0YWNrfVxuICAgICAge2NoaWxkcmVufVxuICAgIDwvRXBpc29kZXNUZXh0PlxuICA8Lz5cbik7XG5cbkNhcmRFcGlzb2Rlc1RleHQucHJvcFR5cGVzID0ge1xuICBjaGlsZHJlbjogbm9kZS5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2FyZEVwaXNvZGVzVGV4dDtcbiJdfQ== */"));

var CardEpisodesText = function CardEpisodesText(_ref3) {
  var children = _ref3.children,
      props = _objectWithoutProperties(_ref3, _excluded);

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(EpisodesText, props, _svgs.mediaIcons.seriesstack, children));
};

CardEpisodesText.propTypes = {
  children: _propTypes.node.isRequired
};
var _default = CardEpisodesText;
exports.default = _default;