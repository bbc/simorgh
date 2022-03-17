import _styled from "@emotion/styled/base";
import { getLongPrimer } from '@bbc/gel-foundations/typography';
import { C_WHITE, C_EBON } from '@bbc/psammead-styles/colours';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';
import { GEL_SPACING_HLF } from '@bbc/gel-foundations/spacings';
import { withEpisodeContext } from './helpers';

var Description = _styled("span", process.env.NODE_ENV === "production" ? {
  target: "eapxui60"
} : {
  target: "eapxui60",
  label: "Description"
})(function (_ref) {
  var script = _ref.script;
  return getLongPrimer(script);
}, " ", function (_ref2) {
  var service = _ref2.service;
  return getSansRegular(service);
}, " color:", function (_ref3) {
  var darkMode = _ref3.darkMode;
  return darkMode ? C_WHITE : C_EBON;
}, ";display:inline-block;width:100%;margin:", GEL_SPACING_HLF, " 0;" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9EZXNjcmlwdGlvbi5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBUStCIiwiZmlsZSI6Ii4uL3NyYy9EZXNjcmlwdGlvbi5qc3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBnZXRMb25nUHJpbWVyIH0gZnJvbSAnQGJiYy9nZWwtZm91bmRhdGlvbnMvdHlwb2dyYXBoeSc7XG5pbXBvcnQgeyBDX1dISVRFLCBDX0VCT04gfSBmcm9tICdAYmJjL3BzYW1tZWFkLXN0eWxlcy9jb2xvdXJzJztcbmltcG9ydCB7IGdldFNhbnNSZWd1bGFyIH0gZnJvbSAnQGJiYy9wc2FtbWVhZC1zdHlsZXMvZm9udC1zdHlsZXMnO1xuaW1wb3J0IHsgR0VMX1NQQUNJTkdfSExGIH0gZnJvbSAnQGJiYy9nZWwtZm91bmRhdGlvbnMvc3BhY2luZ3MnO1xuXG5pbXBvcnQgeyB3aXRoRXBpc29kZUNvbnRleHQgfSBmcm9tICcuL2hlbHBlcnMnO1xuXG5jb25zdCBEZXNjcmlwdGlvbiA9IHN0eWxlZC5zcGFuYFxuICAkeyh7IHNjcmlwdCB9KSA9PiBnZXRMb25nUHJpbWVyKHNjcmlwdCl9XG4gICR7KHsgc2VydmljZSB9KSA9PiBnZXRTYW5zUmVndWxhcihzZXJ2aWNlKX1cbiAgY29sb3I6ICR7KHsgZGFya01vZGUgfSkgPT4gKGRhcmtNb2RlID8gQ19XSElURSA6IENfRUJPTil9O1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXJnaW46ICR7R0VMX1NQQUNJTkdfSExGfSAwO1xuYDtcblxuZXhwb3J0IGRlZmF1bHQgd2l0aEVwaXNvZGVDb250ZXh0KERlc2NyaXB0aW9uKTtcbiJdfQ== */"));

export default withEpisodeContext(Description);