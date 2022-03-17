import _styled from "@emotion/styled/base";
import { shape, string } from 'prop-types';
import { scriptPropType } from '@bbc/gel-foundations/prop-types';
import { C_METAL } from '@bbc/psammead-styles/colours';
import { getDoublePica } from '@bbc/gel-foundations/typography';
import { getSansRegular } from '@bbc/psammead-styles/font-styles';

var HeadingIndex = _styled("h1", process.env.NODE_ENV === "production" ? {
  target: "e1rv5fpv0"
} : {
  target: "e1rv5fpv0",
  label: "HeadingIndex"
})(function (_ref) {
  var script = _ref.script;
  return script && getDoublePica(script);
}, ";", function (_ref2) {
  var service = _ref2.service;
  return getSansRegular(service);
}, ";color:", C_METAL, ";margin:0;" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBTzhCIiwiZmlsZSI6Ii4uL3NyYy9pbmRleC5qc3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBzaGFwZSwgc3RyaW5nIH0gZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBzY3JpcHRQcm9wVHlwZSB9IGZyb20gJ0BiYmMvZ2VsLWZvdW5kYXRpb25zL3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgQ19NRVRBTCB9IGZyb20gJ0BiYmMvcHNhbW1lYWQtc3R5bGVzL2NvbG91cnMnO1xuaW1wb3J0IHsgZ2V0RG91YmxlUGljYSB9IGZyb20gJ0BiYmMvZ2VsLWZvdW5kYXRpb25zL3R5cG9ncmFwaHknO1xuaW1wb3J0IHsgZ2V0U2Fuc1JlZ3VsYXIgfSBmcm9tICdAYmJjL3BzYW1tZWFkLXN0eWxlcy9mb250LXN0eWxlcyc7XG5cbmNvbnN0IEhlYWRpbmdJbmRleCA9IHN0eWxlZC5oMWBcbiAgJHsoeyBzY3JpcHQgfSkgPT4gc2NyaXB0ICYmIGdldERvdWJsZVBpY2Eoc2NyaXB0KX07XG4gICR7KHsgc2VydmljZSB9KSA9PiBnZXRTYW5zUmVndWxhcihzZXJ2aWNlKX07XG4gIGNvbG9yOiAke0NfTUVUQUx9O1xuICBtYXJnaW46IDA7XG5gO1xuXG5IZWFkaW5nSW5kZXgucHJvcFR5cGVzID0ge1xuICBzY3JpcHQ6IHNoYXBlKHNjcmlwdFByb3BUeXBlKS5pc1JlcXVpcmVkLFxuICBzZXJ2aWNlOiBzdHJpbmcuaXNSZXF1aXJlZCxcbn07XG5cbkhlYWRpbmdJbmRleC5kZWZhdWx0UHJvcHMgPSB7XG4gIHRhYkluZGV4OiAnLTEnLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgSGVhZGluZ0luZGV4O1xuIl19 */"));

HeadingIndex.propTypes = {
  script: shape(scriptPropType).isRequired,
  service: string.isRequired
};
HeadingIndex.defaultProps = {
  tabIndex: '-1'
};
export default HeadingIndex;