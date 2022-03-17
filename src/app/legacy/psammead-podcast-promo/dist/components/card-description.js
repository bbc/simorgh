"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _base = _interopRequireDefault(require("@emotion/styled/base"));

var _typography = require("@bbc/gel-foundations/typography");

var _fontStyles = require("@bbc/psammead-styles/font-styles");

var _colours = require("@bbc/psammead-styles/colours");

var _spacings = require("@bbc/gel-foundations/spacings");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CardDescription = (0, _base.default)("p", process.env.NODE_ENV === "production" ? {
  target: "e19r2np0"
} : {
  target: "e19r2np0",
  label: "CardDescription"
})(function (_ref) {
  var script = _ref.script;
  return (0, _typography.getLongPrimer)(script);
}, ";", function (_ref2) {
  var service = _ref2.service;
  return (0, _fontStyles.getSansRegular)(service);
}, ";max-width:30rem;color:", _colours.C_METAL, ";margin-top:", _spacings.GEL_SPACING, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NhcmQtZGVzY3JpcHRpb24uanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQU1nQyIsImZpbGUiOiIuLi8uLi9zcmMvY29tcG9uZW50cy9jYXJkLWRlc2NyaXB0aW9uLmpzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IGdldExvbmdQcmltZXIgfSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy90eXBvZ3JhcGh5JztcbmltcG9ydCB7IGdldFNhbnNSZWd1bGFyIH0gZnJvbSAnQGJiYy9wc2FtbWVhZC1zdHlsZXMvZm9udC1zdHlsZXMnO1xuaW1wb3J0IHsgQ19NRVRBTCB9IGZyb20gJ0BiYmMvcHNhbW1lYWQtc3R5bGVzL2NvbG91cnMnO1xuaW1wb3J0IHsgR0VMX1NQQUNJTkcgfSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy9zcGFjaW5ncyc7XG5cbmNvbnN0IENhcmREZXNjcmlwdGlvbiA9IHN0eWxlZC5wYFxuICAkeyh7IHNjcmlwdCB9KSA9PiBnZXRMb25nUHJpbWVyKHNjcmlwdCl9O1xuICAkeyh7IHNlcnZpY2UgfSkgPT4gZ2V0U2Fuc1JlZ3VsYXIoc2VydmljZSl9O1xuICBtYXgtd2lkdGg6IDMwcmVtO1xuICBjb2xvcjogJHtDX01FVEFMfTtcbiAgbWFyZ2luLXRvcDogJHtHRUxfU1BBQ0lOR307XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBDYXJkRGVzY3JpcHRpb247XG4iXX0= */"));
var _default = CardDescription;
exports.default = _default;