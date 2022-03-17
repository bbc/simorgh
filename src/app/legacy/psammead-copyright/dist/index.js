"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _base = _interopRequireDefault(require("@emotion/styled/base"));

var _propTypes = require("prop-types");

var _colours = require("@bbc/psammead-styles/colours");

var _spacings = require("@bbc/gel-foundations/spacings");

var _typography = require("@bbc/gel-foundations/typography");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Copyright = (0, _base.default)("p", process.env.NODE_ENV === "production" ? {
  target: "etq3yw90"
} : {
  target: "etq3yw90",
  label: "Copyright"
})(_typography.GEL_MINION, ";background-color:rgba(34, 34, 34, 0.75);text-transform:uppercase;color:", _colours.C_WHITE, ";padding:", _spacings.GEL_SPACING_HLF, " ", _spacings.GEL_SPACING, ";font-family:", _typography.GEL_FF_REITH_SANS, ";position:absolute;bottom:0;margin:0;", function (props) {
  return props.position;
}, ":0;" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBTTBCIiwiZmlsZSI6Ii4uL3NyYy9pbmRleC5qc3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBvbmVPZiB9IGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgQ19XSElURSB9IGZyb20gJ0BiYmMvcHNhbW1lYWQtc3R5bGVzL2NvbG91cnMnO1xuaW1wb3J0IHsgR0VMX1NQQUNJTkcsIEdFTF9TUEFDSU5HX0hMRiB9IGZyb20gJ0BiYmMvZ2VsLWZvdW5kYXRpb25zL3NwYWNpbmdzJztcbmltcG9ydCB7IEdFTF9NSU5JT04sIEdFTF9GRl9SRUlUSF9TQU5TIH0gZnJvbSAnQGJiYy9nZWwtZm91bmRhdGlvbnMvdHlwb2dyYXBoeSc7XG5cbmNvbnN0IENvcHlyaWdodCA9IHN0eWxlZC5wYFxuICAke0dFTF9NSU5JT059O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDM0LCAzNCwgMzQsIDAuNzUpO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICBjb2xvcjogJHtDX1dISVRFfTtcbiAgcGFkZGluZzogJHtHRUxfU1BBQ0lOR19ITEZ9ICR7R0VMX1NQQUNJTkd9O1xuICBmb250LWZhbWlseTogJHtHRUxfRkZfUkVJVEhfU0FOU307XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm90dG9tOiAwO1xuICBtYXJnaW46IDA7XG4gICR7cHJvcHMgPT4gcHJvcHMucG9zaXRpb259OiAwO1xuYDtcblxuQ29weXJpZ2h0LnByb3BUeXBlcyA9IHtcbiAgcG9zaXRpb246IG9uZU9mKFsnbGVmdCcsICdyaWdodCddKSxcbn07XG5cbkNvcHlyaWdodC5kZWZhdWx0UHJvcHMgPSB7XG4gIHBvc2l0aW9uOiAnbGVmdCcsXG4gIHJvbGU6ICd0ZXh0Jyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvcHlyaWdodDtcbiJdfQ== */"));
Copyright.propTypes = {
  position: (0, _propTypes.oneOf)(['left', 'right'])
};
Copyright.defaultProps = {
  position: 'left',
  role: 'text'
};
var _default = Copyright;
exports.default = _default;