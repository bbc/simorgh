import _styled from "@emotion/styled/base";
import { C_POSTBOX, C_METAL, C_EBON } from '@bbc/psammead-styles/colours';

var InlineLink = _styled("a", process.env.NODE_ENV === "production" ? {
  target: "e1cs6q200"
} : {
  target: "e1cs6q200",
  label: "InlineLink"
})("color:", C_EBON, ";border-bottom:1px solid ", C_POSTBOX, ";text-decoration:none;&:visited{color:", C_METAL, ";border-bottom:1px solid ", C_METAL, ";}&:focus,&:hover{border-bottom:2px solid ", C_POSTBOX, ";color:", C_POSTBOX, ";}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRzJCIiwiZmlsZSI6Ii4uL3NyYy9pbmRleC5qc3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBDX1BPU1RCT1gsIENfTUVUQUwsIENfRUJPTiB9IGZyb20gJ0BiYmMvcHNhbW1lYWQtc3R5bGVzL2NvbG91cnMnO1xuXG5jb25zdCBJbmxpbmVMaW5rID0gc3R5bGVkLmFgXG4gIGNvbG9yOiAke0NfRUJPTn07XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAke0NfUE9TVEJPWH07XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcblxuICAmOnZpc2l0ZWQge1xuICAgIGNvbG9yOiAke0NfTUVUQUx9O1xuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAke0NfTUVUQUx9O1xuICB9XG5cbiAgJjpmb2N1cyxcbiAgJjpob3ZlciB7XG4gICAgYm9yZGVyLWJvdHRvbTogMnB4IHNvbGlkICR7Q19QT1NUQk9YfTtcbiAgICBjb2xvcjogJHtDX1BPU1RCT1h9O1xuICB9XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBJbmxpbmVMaW5rO1xuIl19 */"));

export default InlineLink;