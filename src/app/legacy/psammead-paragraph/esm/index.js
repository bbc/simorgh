import _styled from "@emotion/styled/base";
import { shape, string, bool } from 'prop-types';
import { C_SHADOW, C_LUNAR } from '@bbc/psammead-styles/colours';
import { GEL_SPACING_TRPL } from '@bbc/gel-foundations/spacings';
import { getBodyCopy } from '@bbc/gel-foundations/typography';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';

var Paragraph = _styled("p", process.env.NODE_ENV === "production" ? {
  target: "e1c0huex0"
} : {
  target: "e1c0huex0",
  label: "Paragraph"
})(function (_ref) {
  var script = _ref.script;
  return script && getBodyCopy(script);
}, ";", function (_ref2) {
  var service = _ref2.service;
  return getSansRegular(service);
}, " color:", function (_ref3) {
  var darkMode = _ref3.darkMode;
  return darkMode ? C_LUNAR : C_SHADOW;
}, ";padding-bottom:", GEL_SPACING_TRPL, ";margin:0;" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBUTBCIiwiZmlsZSI6Ii4uL3NyYy9pbmRleC5qc3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBzaGFwZSwgc3RyaW5nLCBib29sIH0gZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBDX1NIQURPVywgQ19MVU5BUiB9IGZyb20gJ0BiYmMvcHNhbW1lYWQtc3R5bGVzL2NvbG91cnMnO1xuaW1wb3J0IHsgR0VMX1NQQUNJTkdfVFJQTCB9IGZyb20gJ0BiYmMvZ2VsLWZvdW5kYXRpb25zL3NwYWNpbmdzJztcbmltcG9ydCB7IGdldEJvZHlDb3B5IH0gZnJvbSAnQGJiYy9nZWwtZm91bmRhdGlvbnMvdHlwb2dyYXBoeSc7XG5pbXBvcnQgeyBzY3JpcHRQcm9wVHlwZSB9IGZyb20gJ0BiYmMvZ2VsLWZvdW5kYXRpb25zL3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgZ2V0U2Fuc1JlZ3VsYXIgfSBmcm9tICdAYmJjL3BzYW1tZWFkLXN0eWxlcy9mb250LXN0eWxlcyc7XG5cbmNvbnN0IFBhcmFncmFwaCA9IHN0eWxlZC5wYFxuICAkeyh7IHNjcmlwdCB9KSA9PiBzY3JpcHQgJiYgZ2V0Qm9keUNvcHkoc2NyaXB0KX07XG4gICR7KHsgc2VydmljZSB9KSA9PiBnZXRTYW5zUmVndWxhcihzZXJ2aWNlKX1cbiAgY29sb3I6ICR7KHsgZGFya01vZGUgfSkgPT4gKGRhcmtNb2RlID8gQ19MVU5BUiA6IENfU0hBRE9XKX07XG4gIHBhZGRpbmctYm90dG9tOiAke0dFTF9TUEFDSU5HX1RSUEx9O1xuICBtYXJnaW46IDA7IC8qIFJlc2V0ICovXG5gO1xuXG5QYXJhZ3JhcGgucHJvcFR5cGVzID0ge1xuICBzY3JpcHQ6IHNoYXBlKHNjcmlwdFByb3BUeXBlKS5pc1JlcXVpcmVkLFxuICBzZXJ2aWNlOiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgZGFya01vZGU6IGJvb2wsXG59O1xuXG5QYXJhZ3JhcGguZGVmYXVsdFByb3BzID0ge1xuICBkYXJrTW9kZTogZmFsc2UsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBQYXJhZ3JhcGg7XG4iXX0= */"));

Paragraph.propTypes = {
  script: shape(scriptPropType).isRequired,
  service: string.isRequired,
  darkMode: bool
};
Paragraph.defaultProps = {
  darkMode: false
};
export default Paragraph;