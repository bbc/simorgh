"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BulletedListItem = void 0;

var _base = _interopRequireDefault(require("@emotion/styled/base"));

var _propTypes = require("prop-types");

var _typography = require("@bbc/gel-foundations/typography");

var _fontStyles = require("@bbc/psammead-styles/font-styles");

var _colours = require("@bbc/psammead-styles/colours");

var _spacings = require("@bbc/gel-foundations/spacings");

var _propTypes2 = require("@bbc/gel-foundations/prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BulletedList = (0, _base.default)("ul", process.env.NODE_ENV === "production" ? {
  target: "e1drcs2w1"
} : {
  target: "e1drcs2w1",
  label: "BulletedList"
})(function (_ref) {
  var script = _ref.script;
  return script && (0, _typography.getBodyCopy)(script);
}, ";", function (_ref2) {
  var service = _ref2.service;
  return (0, _fontStyles.getSansRegular)(service);
}, ";margin-top:0;list-style-type:none;&>li{position:relative;}&>li::before{top:0.5rem;content:' ';position:absolute;border-width:1rem;border:0.1875rem solid ", function (_ref3) {
  var bulletPointColour = _ref3.bulletPointColour;
  return bulletPointColour;
}, ";background-color:", function (_ref4) {
  var bulletPointColour = _ref4.bulletPointColour;
  return bulletPointColour;
}, ";border-radius:", function (_ref5) {
  var bulletPointShape = _ref5.bulletPointShape;
  return bulletPointShape === 'round' ? '50%' : '0';
}, ";", function (_ref6) {
  var dir = _ref6.dir;
  return dir === 'rtl' ? 'right: -1rem;' : 'left: -1rem;';
}, ";}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBUThCIiwiZmlsZSI6Ii4uL3NyYy9pbmRleC5qc3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBzdHJpbmcsIG9uZU9mLCBzaGFwZSB9IGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgZ2V0Qm9keUNvcHkgfSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy90eXBvZ3JhcGh5JztcbmltcG9ydCB7IGdldFNhbnNSZWd1bGFyIH0gZnJvbSAnQGJiYy9wc2FtbWVhZC1zdHlsZXMvZm9udC1zdHlsZXMnO1xuaW1wb3J0IHsgQ19TSEFET1cgfSBmcm9tICdAYmJjL3BzYW1tZWFkLXN0eWxlcy9jb2xvdXJzJztcbmltcG9ydCB7IEdFTF9TUEFDSU5HX0RCTCB9IGZyb20gJ0BiYmMvZ2VsLWZvdW5kYXRpb25zL3NwYWNpbmdzJztcbmltcG9ydCB7IHNjcmlwdFByb3BUeXBlIH0gZnJvbSAnQGJiYy9nZWwtZm91bmRhdGlvbnMvcHJvcC10eXBlcyc7XG5cbmNvbnN0IEJ1bGxldGVkTGlzdCA9IHN0eWxlZC51bGBcbiAgJHsoeyBzY3JpcHQgfSkgPT4gc2NyaXB0ICYmIGdldEJvZHlDb3B5KHNjcmlwdCl9O1xuICAkeyh7IHNlcnZpY2UgfSkgPT4gZ2V0U2Fuc1JlZ3VsYXIoc2VydmljZSl9O1xuICBtYXJnaW4tdG9wOiAwO1xuICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XG5cbiAgJiA+IGxpIHtcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIH1cblxuICAmID4gbGk6OmJlZm9yZSB7XG4gICAgdG9wOiAwLjVyZW07XG4gICAgY29udGVudDogJyAnO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBib3JkZXItd2lkdGg6IDFyZW07XG4gICAgYm9yZGVyOiAwLjE4NzVyZW0gc29saWQgJHsoeyBidWxsZXRQb2ludENvbG91ciB9KSA9PiBidWxsZXRQb2ludENvbG91cn07XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHsoeyBidWxsZXRQb2ludENvbG91ciB9KSA9PiBidWxsZXRQb2ludENvbG91cn07XG4gICAgYm9yZGVyLXJhZGl1czogJHsoeyBidWxsZXRQb2ludFNoYXBlIH0pID0+XG4gICAgICBidWxsZXRQb2ludFNoYXBlID09PSAncm91bmQnID8gJzUwJScgOiAnMCd9O1xuICAgICR7KHsgZGlyIH0pID0+IChkaXIgPT09ICdydGwnID8gJ3JpZ2h0OiAtMXJlbTsnIDogJ2xlZnQ6IC0xcmVtOycpfVxuICB9XG5gO1xuXG5CdWxsZXRlZExpc3QucHJvcFR5cGVzID0ge1xuICBzY3JpcHQ6IHNoYXBlKHNjcmlwdFByb3BUeXBlKS5pc1JlcXVpcmVkLFxuICBkaXI6IG9uZU9mKFsnbHRyJywgJ3J0bCddKSxcbiAgc2VydmljZTogc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGJ1bGxldFBvaW50U2hhcGU6IG9uZU9mKFsncm91bmQnLCAnc3F1YXJlJ10pLFxuICBidWxsZXRQb2ludENvbG91cjogc3RyaW5nLFxufTtcblxuQnVsbGV0ZWRMaXN0LmRlZmF1bHRQcm9wcyA9IHtcbiAgZGlyOiAnbHRyJyxcbiAgcm9sZTogJ2xpc3QnLFxuICBidWxsZXRQb2ludFNoYXBlOiAncm91bmQnLFxuICBidWxsZXRQb2ludENvbG91cjogQ19TSEFET1csXG59O1xuXG5leHBvcnQgY29uc3QgQnVsbGV0ZWRMaXN0SXRlbSA9IHN0eWxlZC5saWBcbiAgbWFyZ2luLWJvdHRvbTogJHtHRUxfU1BBQ0lOR19EQkx9O1xuYDtcblxuQnVsbGV0ZWRMaXN0SXRlbS5kZWZhdWx0UHJvcHMgPSB7XG4gIHJvbGU6ICdsaXN0aXRlbScsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBCdWxsZXRlZExpc3Q7XG4iXX0= */"));
BulletedList.propTypes = {
  script: (0, _propTypes.shape)(_propTypes2.scriptPropType).isRequired,
  dir: (0, _propTypes.oneOf)(['ltr', 'rtl']),
  service: _propTypes.string.isRequired,
  bulletPointShape: (0, _propTypes.oneOf)(['round', 'square']),
  bulletPointColour: _propTypes.string
};
BulletedList.defaultProps = {
  dir: 'ltr',
  role: 'list',
  bulletPointShape: 'round',
  bulletPointColour: _colours.C_SHADOW
};
var BulletedListItem = (0, _base.default)("li", process.env.NODE_ENV === "production" ? {
  target: "e1drcs2w0"
} : {
  target: "e1drcs2w0",
  label: "BulletedListItem"
})("margin-bottom:", _spacings.GEL_SPACING_DBL, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBOEN5QyIsImZpbGUiOiIuLi9zcmMvaW5kZXguanN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgc3RyaW5nLCBvbmVPZiwgc2hhcGUgfSBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IGdldEJvZHlDb3B5IH0gZnJvbSAnQGJiYy9nZWwtZm91bmRhdGlvbnMvdHlwb2dyYXBoeSc7XG5pbXBvcnQgeyBnZXRTYW5zUmVndWxhciB9IGZyb20gJ0BiYmMvcHNhbW1lYWQtc3R5bGVzL2ZvbnQtc3R5bGVzJztcbmltcG9ydCB7IENfU0hBRE9XIH0gZnJvbSAnQGJiYy9wc2FtbWVhZC1zdHlsZXMvY29sb3Vycyc7XG5pbXBvcnQgeyBHRUxfU1BBQ0lOR19EQkwgfSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy9zcGFjaW5ncyc7XG5pbXBvcnQgeyBzY3JpcHRQcm9wVHlwZSB9IGZyb20gJ0BiYmMvZ2VsLWZvdW5kYXRpb25zL3Byb3AtdHlwZXMnO1xuXG5jb25zdCBCdWxsZXRlZExpc3QgPSBzdHlsZWQudWxgXG4gICR7KHsgc2NyaXB0IH0pID0+IHNjcmlwdCAmJiBnZXRCb2R5Q29weShzY3JpcHQpfTtcbiAgJHsoeyBzZXJ2aWNlIH0pID0+IGdldFNhbnNSZWd1bGFyKHNlcnZpY2UpfTtcbiAgbWFyZ2luLXRvcDogMDtcbiAgbGlzdC1zdHlsZS10eXBlOiBub25lO1xuXG4gICYgPiBsaSB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICB9XG5cbiAgJiA+IGxpOjpiZWZvcmUge1xuICAgIHRvcDogMC41cmVtO1xuICAgIGNvbnRlbnQ6ICcgJztcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgYm9yZGVyLXdpZHRoOiAxcmVtO1xuICAgIGJvcmRlcjogMC4xODc1cmVtIHNvbGlkICR7KHsgYnVsbGV0UG9pbnRDb2xvdXIgfSkgPT4gYnVsbGV0UG9pbnRDb2xvdXJ9O1xuICAgIGJhY2tncm91bmQtY29sb3I6ICR7KHsgYnVsbGV0UG9pbnRDb2xvdXIgfSkgPT4gYnVsbGV0UG9pbnRDb2xvdXJ9O1xuICAgIGJvcmRlci1yYWRpdXM6ICR7KHsgYnVsbGV0UG9pbnRTaGFwZSB9KSA9PlxuICAgICAgYnVsbGV0UG9pbnRTaGFwZSA9PT0gJ3JvdW5kJyA/ICc1MCUnIDogJzAnfTtcbiAgICAkeyh7IGRpciB9KSA9PiAoZGlyID09PSAncnRsJyA/ICdyaWdodDogLTFyZW07JyA6ICdsZWZ0OiAtMXJlbTsnKX1cbiAgfVxuYDtcblxuQnVsbGV0ZWRMaXN0LnByb3BUeXBlcyA9IHtcbiAgc2NyaXB0OiBzaGFwZShzY3JpcHRQcm9wVHlwZSkuaXNSZXF1aXJlZCxcbiAgZGlyOiBvbmVPZihbJ2x0cicsICdydGwnXSksXG4gIHNlcnZpY2U6IHN0cmluZy5pc1JlcXVpcmVkLFxuICBidWxsZXRQb2ludFNoYXBlOiBvbmVPZihbJ3JvdW5kJywgJ3NxdWFyZSddKSxcbiAgYnVsbGV0UG9pbnRDb2xvdXI6IHN0cmluZyxcbn07XG5cbkJ1bGxldGVkTGlzdC5kZWZhdWx0UHJvcHMgPSB7XG4gIGRpcjogJ2x0cicsXG4gIHJvbGU6ICdsaXN0JyxcbiAgYnVsbGV0UG9pbnRTaGFwZTogJ3JvdW5kJyxcbiAgYnVsbGV0UG9pbnRDb2xvdXI6IENfU0hBRE9XLFxufTtcblxuZXhwb3J0IGNvbnN0IEJ1bGxldGVkTGlzdEl0ZW0gPSBzdHlsZWQubGlgXG4gIG1hcmdpbi1ib3R0b206ICR7R0VMX1NQQUNJTkdfREJMfTtcbmA7XG5cbkJ1bGxldGVkTGlzdEl0ZW0uZGVmYXVsdFByb3BzID0ge1xuICByb2xlOiAnbGlzdGl0ZW0nLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQnVsbGV0ZWRMaXN0O1xuIl19 */"));
exports.BulletedListItem = BulletedListItem;
BulletedListItem.defaultProps = {
  role: 'listitem'
};
var _default = BulletedList;
exports.default = _default;