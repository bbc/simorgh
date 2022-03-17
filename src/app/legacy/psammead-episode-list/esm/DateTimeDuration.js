import _styled from "@emotion/styled/base";
import { getBrevier } from '@bbc/gel-foundations/typography';
import { GEL_SPACING } from '@bbc/gel-foundations/spacings';
import { C_METAL, C_PEBBLE, C_CLOUD_LIGHT } from '@bbc/psammead-styles/colours';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import { withEpisodeContext } from './helpers';
var borderStyling = "\n  padding-left: ".concat(GEL_SPACING, ";\n  margin-left: ").concat(GEL_SPACING, ";\n  border-left: 0.0625rem solid ").concat(C_CLOUD_LIGHT, ";\n");

var DateTimeDuration = _styled("span", process.env.NODE_ENV === "production" ? {
  target: "evjp1s70"
} : {
  target: "evjp1s70",
  label: "DateTimeDuration"
})(function (_ref) {
  var script = _ref.script;
  return getBrevier(script);
}, " ", function (_ref2) {
  var service = _ref2.service;
  return getSansRegular(service);
}, " color:", function (_ref3) {
  var darkMode = _ref3.darkMode;
  return darkMode ? C_PEBBLE : C_METAL;
}, ";", function (_ref4) {
  var hasBorder = _ref4.hasBorder;
  return hasBorder && borderStyling;
}, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9EYXRlVGltZUR1cmF0aW9uLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFjb0MiLCJmaWxlIjoiLi4vc3JjL0RhdGVUaW1lRHVyYXRpb24uanN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgZ2V0QnJldmllciB9IGZyb20gJ0BiYmMvZ2VsLWZvdW5kYXRpb25zL3R5cG9ncmFwaHknO1xuaW1wb3J0IHsgR0VMX1NQQUNJTkcgfSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy9zcGFjaW5ncyc7XG5pbXBvcnQgeyBDX01FVEFMLCBDX1BFQkJMRSwgQ19DTE9VRF9MSUdIVCB9IGZyb20gJ0BiYmMvcHNhbW1lYWQtc3R5bGVzL2NvbG91cnMnO1xuaW1wb3J0IHsgZ2V0U2Fuc1JlZ3VsYXIgfSBmcm9tICdAYmJjL3BzYW1tZWFkLXN0eWxlcy9mb250LXN0eWxlcyc7XG5cbmltcG9ydCB7IHdpdGhFcGlzb2RlQ29udGV4dCB9IGZyb20gJy4vaGVscGVycyc7XG5cbmNvbnN0IGJvcmRlclN0eWxpbmcgPSBgXG4gIHBhZGRpbmctbGVmdDogJHtHRUxfU1BBQ0lOR307XG4gIG1hcmdpbi1sZWZ0OiAke0dFTF9TUEFDSU5HfTtcbiAgYm9yZGVyLWxlZnQ6IDAuMDYyNXJlbSBzb2xpZCAke0NfQ0xPVURfTElHSFR9O1xuYDtcblxuY29uc3QgRGF0ZVRpbWVEdXJhdGlvbiA9IHN0eWxlZC5zcGFuYFxuICAkeyh7IHNjcmlwdCB9KSA9PiBnZXRCcmV2aWVyKHNjcmlwdCl9XG4gICR7KHsgc2VydmljZSB9KSA9PiBnZXRTYW5zUmVndWxhcihzZXJ2aWNlKX1cbiAgY29sb3I6ICR7KHsgZGFya01vZGUgfSkgPT4gKGRhcmtNb2RlID8gQ19QRUJCTEUgOiBDX01FVEFMKX07XG4gICR7KHsgaGFzQm9yZGVyIH0pID0+IGhhc0JvcmRlciAmJiBib3JkZXJTdHlsaW5nfVxuYDtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aEVwaXNvZGVDb250ZXh0KERhdGVUaW1lRHVyYXRpb24pO1xuIl19 */"));

export default withEpisodeContext(DateTimeDuration);