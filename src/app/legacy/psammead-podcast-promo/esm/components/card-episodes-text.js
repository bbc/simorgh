import _styled from "@emotion/styled/base";
var _excluded = ["children"];

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { node } from 'prop-types';
import { mediaIcons } from '@bbc/psammead-assets/svgs';
import { getPica } from '@bbc/gel-foundations/typography';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import { GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
import { C_METAL } from '@bbc/psammead-styles/colours';

var EpisodesText = _styled("p", process.env.NODE_ENV === "production" ? {
  target: "ea1iozc0"
} : {
  target: "ea1iozc0",
  label: "EpisodesText"
})("display:inline;", function (_ref) {
  var script = _ref.script;
  return getPica(script);
}, ";", function (_ref2) {
  var service = _ref2.service;
  return getSansRegular(service);
}, ";color:", C_METAL, ";>svg{fill:currentColor;color:unset;width:", GEL_SPACING_DBL, ";height:", GEL_SPACING_DBL, ";position:relative;bottom:0.125rem;right:0.1875rem;}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NhcmQtZXBpc29kZXMtdGV4dC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBUzZCIiwiZmlsZSI6Ii4uLy4uL3NyYy9jb21wb25lbnRzL2NhcmQtZXBpc29kZXMtdGV4dC5qc3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgbm9kZSB9IGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgbWVkaWFJY29ucyB9IGZyb20gJ0BiYmMvcHNhbW1lYWQtYXNzZXRzL3N2Z3MnO1xuaW1wb3J0IHsgZ2V0UGljYSB9IGZyb20gJ0BiYmMvZ2VsLWZvdW5kYXRpb25zL3R5cG9ncmFwaHknO1xuaW1wb3J0IHsgZ2V0U2Fuc1JlZ3VsYXIgfSBmcm9tICdAYmJjL3BzYW1tZWFkLXN0eWxlcy9mb250LXN0eWxlcyc7XG5pbXBvcnQgeyBHRUxfU1BBQ0lOR19EQkwgfSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy9zcGFjaW5ncyc7XG5pbXBvcnQgeyBDX01FVEFMIH0gZnJvbSAnQGJiYy9wc2FtbWVhZC1zdHlsZXMvY29sb3Vycyc7XG5cbmNvbnN0IEVwaXNvZGVzVGV4dCA9IHN0eWxlZC5wYFxuICBkaXNwbGF5OiBpbmxpbmU7XG4gICR7KHsgc2NyaXB0IH0pID0+IGdldFBpY2Eoc2NyaXB0KX07XG4gICR7KHsgc2VydmljZSB9KSA9PiBnZXRTYW5zUmVndWxhcihzZXJ2aWNlKX07XG4gIGNvbG9yOiAke0NfTUVUQUx9O1xuICA+IHN2ZyB7XG4gICAgZmlsbDogY3VycmVudENvbG9yO1xuICAgIGNvbG9yOiB1bnNldDtcbiAgICB3aWR0aDogJHtHRUxfU1BBQ0lOR19EQkx9O1xuICAgIGhlaWdodDogJHtHRUxfU1BBQ0lOR19EQkx9O1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICBib3R0b206IDAuMTI1cmVtO1xuICAgIHJpZ2h0OiAwLjE4NzVyZW07XG4gIH1cbmA7XG5cbmNvbnN0IENhcmRFcGlzb2Rlc1RleHQgPSAoeyBjaGlsZHJlbiwgLi4ucHJvcHMgfSkgPT4gKFxuICA8PlxuICAgIDxFcGlzb2Rlc1RleHQgey4uLnByb3BzfT5cbiAgICAgIHttZWRpYUljb25zLnNlcmllc3N0YWNrfVxuICAgICAge2NoaWxkcmVufVxuICAgIDwvRXBpc29kZXNUZXh0PlxuICA8Lz5cbik7XG5cbkNhcmRFcGlzb2Rlc1RleHQucHJvcFR5cGVzID0ge1xuICBjaGlsZHJlbjogbm9kZS5pc1JlcXVpcmVkLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2FyZEVwaXNvZGVzVGV4dDtcbiJdfQ== */"));

var CardEpisodesText = function CardEpisodesText(_ref3) {
  var children = _ref3.children,
      props = _objectWithoutProperties(_ref3, _excluded);

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(EpisodesText, props, mediaIcons.seriesstack, children));
};

CardEpisodesText.propTypes = {
  children: node.isRequired
};
export default CardEpisodesText;