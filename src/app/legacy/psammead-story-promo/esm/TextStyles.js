import _styled from "@emotion/styled/base";
import { GEL_SPACING, GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
import { GEL_GROUP_3_SCREEN_WIDTH_MIN, GEL_GROUP_3_SCREEN_WIDTH_MAX, GEL_GROUP_4_SCREEN_WIDTH_MIN, GEL_GROUP_5_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
import { grid } from '@bbc/psammead-styles/detection';
var twoOfSixColumnsMaxWidthScaleable = "33.33%"; // (2 / 6) * 100 = 0.3333333333 = 33.33%

var fourOfSixColumnsMaxWidthScaleable = "66.67%"; // (4 / 6) * 100 = 66.6666666667 = 66.67%

var fullWidthColumnsMaxScaleable = "100%"; // (12 / 12) * 100 = 100 = 100%

var halfWidthColumnsMaxScaleable = "50%";
var TextGridColumnsTopStory = "\n  grid-column: 1 / span 6;\n\n  @media (min-width: ".concat(GEL_GROUP_3_SCREEN_WIDTH_MIN, ") {\n    grid-column: 4 / span 3;\n  }\n\n  @media (min-width: ").concat(GEL_GROUP_5_SCREEN_WIDTH_MIN, ") {\n    grid-column: 7 / span 6;\n  }\n");

var TextGridColumns = function TextGridColumns(displayImage) {
  return "\n  grid-column: 3 / span 4;\n\n  ".concat(displayImage ? '' : "grid-column: 1 / span 6;", "\n\n  @media (min-width: ").concat(GEL_GROUP_4_SCREEN_WIDTH_MIN, ") {\n    padding-top: ").concat(displayImage ? GEL_SPACING : '0', ";\n  }\n");
};

var TextGridColumnsLeadingStory = "\n  padding: 0;\n  width: 100%;\n  grid-template-columns: repeat(6, 1fr);\n  grid-column-end: span 6;\n\n  @media (min-width: ".concat(GEL_GROUP_3_SCREEN_WIDTH_MIN, ") {\n    grid-template-columns: repeat(3, 1fr);\n    grid-column-end: span 3;\n  }\n\n  @media (min-width: ").concat(GEL_GROUP_4_SCREEN_WIDTH_MIN, ") {\n    grid-template-columns: repeat(2, 1fr);\n    grid-column-end: span 2;\n  }\n");
var TextGridFallbackTopStory = "\n  @media (min-width: ".concat(GEL_GROUP_3_SCREEN_WIDTH_MIN, ") {\n    width: ").concat(halfWidthColumnsMaxScaleable, ";\n    padding: 0 ").concat(GEL_SPACING_DBL, ";\n  }\n\n  @media (min-width: ").concat(GEL_GROUP_4_SCREEN_WIDTH_MIN, ") {\n    width: ").concat(halfWidthColumnsMaxScaleable, ";\n  }\n");

var TextGridFallback = function TextGridFallback(displayImage) {
  return "\n  width: ".concat(fourOfSixColumnsMaxWidthScaleable, ";\n  padding: 0 ").concat(GEL_SPACING, ";\n\n  @media (min-width: ").concat(GEL_GROUP_3_SCREEN_WIDTH_MIN, ") {\n    padding: 0 ").concat(GEL_SPACING_DBL, ";\n  }\n\n  @media (min-width: ").concat(GEL_GROUP_4_SCREEN_WIDTH_MIN, ") {\n    display: block;\n    width: 100%;\n    padding: ").concat(GEL_SPACING, " 0;\n  }\n\n  ").concat(displayImage ? '' : "width: ".concat(fullWidthColumnsMaxScaleable, "; >div{ vertical-align: middle; }"), "\n");
};

var TextGridFallBackLeadingStory = function TextGridFallBackLeadingStory(dir) {
  return "\n  width: ".concat(fullWidthColumnsMaxScaleable, ";\n  @media (min-width: ").concat(GEL_GROUP_3_SCREEN_WIDTH_MIN, ") {\n    ").concat(dir === 'rtl' ? "padding-left: ".concat(GEL_SPACING, ";") : "padding-right: ".concat(GEL_SPACING, ";"), "\n    width: ").concat(halfWidthColumnsMaxScaleable, ";\n  }\n  @media (min-width: ").concat(GEL_GROUP_4_SCREEN_WIDTH_MIN, ") {\n    width: ").concat(twoOfSixColumnsMaxWidthScaleable, ";\n  }\n");
};

var textGridFallbackStyles = {
  top: function top() {
    return TextGridFallbackTopStory;
  },
  regular: function regular(_ref) {
    var displayImage = _ref.displayImage;
    return TextGridFallback(displayImage);
  },
  leading: function leading(_ref2) {
    var dir = _ref2.dir;
    return TextGridFallBackLeadingStory(dir);
  }
};
var textGridStyles = {
  top: function top() {
    return TextGridColumnsTopStory;
  },
  regular: function regular(_ref3) {
    var displayImage = _ref3.displayImage;
    return TextGridColumns(displayImage);
  },
  leading: function leading() {
    return TextGridColumnsLeadingStory;
  }
}; // This applies 8px padding only to the timestamp.
// The headline already has padding so targeting the timestamp prevents double padding
// from being applied.

var leadingPromoTimestampPadding = "\n  >time {\n    @media (max-width: ".concat(GEL_GROUP_3_SCREEN_WIDTH_MAX, ") {\n      padding-bottom: ").concat(GEL_SPACING, ";\n    }\n  }\n");

var TextGridItem = _styled("div", process.env.NODE_ENV === "production" ? {
  target: "e19k1v2h0"
} : {
  target: "e19k1v2h0",
  label: "TextGridItem"
})("display:inline-block;vertical-align:top;", function (_ref4) {
  var promoType = _ref4.promoType,
      displayImage = _ref4.displayImage,
      dir = _ref4.dir;
  return textGridFallbackStyles[promoType]({
    displayImage: displayImage,
    dir: dir
  });
}, "@supports (", grid, "){display:block;width:initial;padding:initial;", function (_ref5) {
  var promoType = _ref5.promoType,
      displayImage = _ref5.displayImage;
  return textGridStyles[promoType]({
    displayImage: displayImage
  });
}, ";}", function (_ref6) {
  var promoType = _ref6.promoType;
  return promoType === 'leading' ? leadingPromoTimestampPadding : '';
}, " ", function (_ref7) {
  var displayImage = _ref7.displayImage;
  return displayImage ? '' : ">div{ display:inline-block; vertical-align:initial; }\n       & svg{ margin: 0; }";
}, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9UZXh0U3R5bGVzLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFrSStCIiwiZmlsZSI6Ii4uL3NyYy9UZXh0U3R5bGVzLmpzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IEdFTF9TUEFDSU5HLCBHRUxfU1BBQ0lOR19EQkwgfSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy9zcGFjaW5ncyc7XG5pbXBvcnQge1xuICBHRUxfR1JPVVBfM19TQ1JFRU5fV0lEVEhfTUlOLFxuICBHRUxfR1JPVVBfM19TQ1JFRU5fV0lEVEhfTUFYLFxuICBHRUxfR1JPVVBfNF9TQ1JFRU5fV0lEVEhfTUlOLFxuICBHRUxfR1JPVVBfNV9TQ1JFRU5fV0lEVEhfTUlOLFxufSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy9icmVha3BvaW50cyc7XG5pbXBvcnQgeyBncmlkIH0gZnJvbSAnQGJiYy9wc2FtbWVhZC1zdHlsZXMvZGV0ZWN0aW9uJztcblxuY29uc3QgdHdvT2ZTaXhDb2x1bW5zTWF4V2lkdGhTY2FsZWFibGUgPSBgMzMuMzMlYDtcbi8vICgyIC8gNikgKiAxMDAgPSAwLjMzMzMzMzMzMzMgPSAzMy4zMyVcblxuY29uc3QgZm91ck9mU2l4Q29sdW1uc01heFdpZHRoU2NhbGVhYmxlID0gYDY2LjY3JWA7XG4vLyAoNCAvIDYpICogMTAwID0gNjYuNjY2NjY2NjY2NyA9IDY2LjY3JVxuXG5jb25zdCBmdWxsV2lkdGhDb2x1bW5zTWF4U2NhbGVhYmxlID0gYDEwMCVgO1xuLy8gKDEyIC8gMTIpICogMTAwID0gMTAwID0gMTAwJVxuXG5jb25zdCBoYWxmV2lkdGhDb2x1bW5zTWF4U2NhbGVhYmxlID0gYDUwJWA7XG5cbmNvbnN0IFRleHRHcmlkQ29sdW1uc1RvcFN0b3J5ID0gYFxuICBncmlkLWNvbHVtbjogMSAvIHNwYW4gNjtcblxuICBAbWVkaWEgKG1pbi13aWR0aDogJHtHRUxfR1JPVVBfM19TQ1JFRU5fV0lEVEhfTUlOfSkge1xuICAgIGdyaWQtY29sdW1uOiA0IC8gc3BhbiAzO1xuICB9XG5cbiAgQG1lZGlhIChtaW4td2lkdGg6ICR7R0VMX0dST1VQXzVfU0NSRUVOX1dJRFRIX01JTn0pIHtcbiAgICBncmlkLWNvbHVtbjogNyAvIHNwYW4gNjtcbiAgfVxuYDtcblxuY29uc3QgVGV4dEdyaWRDb2x1bW5zID0gZGlzcGxheUltYWdlID0+IGBcbiAgZ3JpZC1jb2x1bW46IDMgLyBzcGFuIDQ7XG5cbiAgJHtkaXNwbGF5SW1hZ2UgPyAnJyA6IGBncmlkLWNvbHVtbjogMSAvIHNwYW4gNjtgfVxuXG4gIEBtZWRpYSAobWluLXdpZHRoOiAke0dFTF9HUk9VUF80X1NDUkVFTl9XSURUSF9NSU59KSB7XG4gICAgcGFkZGluZy10b3A6ICR7ZGlzcGxheUltYWdlID8gR0VMX1NQQUNJTkcgOiAnMCd9O1xuICB9XG5gO1xuXG5jb25zdCBUZXh0R3JpZENvbHVtbnNMZWFkaW5nU3RvcnkgPSBgXG4gIHBhZGRpbmc6IDA7XG4gIHdpZHRoOiAxMDAlO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCg2LCAxZnIpO1xuICBncmlkLWNvbHVtbi1lbmQ6IHNwYW4gNjtcblxuICBAbWVkaWEgKG1pbi13aWR0aDogJHtHRUxfR1JPVVBfM19TQ1JFRU5fV0lEVEhfTUlOfSkge1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDMsIDFmcik7XG4gICAgZ3JpZC1jb2x1bW4tZW5kOiBzcGFuIDM7XG4gIH1cblxuICBAbWVkaWEgKG1pbi13aWR0aDogJHtHRUxfR1JPVVBfNF9TQ1JFRU5fV0lEVEhfTUlOfSkge1xuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDIsIDFmcik7XG4gICAgZ3JpZC1jb2x1bW4tZW5kOiBzcGFuIDI7XG4gIH1cbmA7XG5cbmNvbnN0IFRleHRHcmlkRmFsbGJhY2tUb3BTdG9yeSA9IGBcbiAgQG1lZGlhIChtaW4td2lkdGg6ICR7R0VMX0dST1VQXzNfU0NSRUVOX1dJRFRIX01JTn0pIHtcbiAgICB3aWR0aDogJHtoYWxmV2lkdGhDb2x1bW5zTWF4U2NhbGVhYmxlfTtcbiAgICBwYWRkaW5nOiAwICR7R0VMX1NQQUNJTkdfREJMfTtcbiAgfVxuXG4gIEBtZWRpYSAobWluLXdpZHRoOiAke0dFTF9HUk9VUF80X1NDUkVFTl9XSURUSF9NSU59KSB7XG4gICAgd2lkdGg6ICR7aGFsZldpZHRoQ29sdW1uc01heFNjYWxlYWJsZX07XG4gIH1cbmA7XG5cbmNvbnN0IFRleHRHcmlkRmFsbGJhY2sgPSBkaXNwbGF5SW1hZ2UgPT4gYFxuICB3aWR0aDogJHtmb3VyT2ZTaXhDb2x1bW5zTWF4V2lkdGhTY2FsZWFibGV9O1xuICBwYWRkaW5nOiAwICR7R0VMX1NQQUNJTkd9O1xuXG4gIEBtZWRpYSAobWluLXdpZHRoOiAke0dFTF9HUk9VUF8zX1NDUkVFTl9XSURUSF9NSU59KSB7XG4gICAgcGFkZGluZzogMCAke0dFTF9TUEFDSU5HX0RCTH07XG4gIH1cblxuICBAbWVkaWEgKG1pbi13aWR0aDogJHtHRUxfR1JPVVBfNF9TQ1JFRU5fV0lEVEhfTUlOfSkge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIHBhZGRpbmc6ICR7R0VMX1NQQUNJTkd9IDA7XG4gIH1cblxuICAke1xuICAgIGRpc3BsYXlJbWFnZVxuICAgICAgPyAnJ1xuICAgICAgOiBgd2lkdGg6ICR7ZnVsbFdpZHRoQ29sdW1uc01heFNjYWxlYWJsZX07ID5kaXZ7IHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7IH1gXG4gIH1cbmA7XG5cbmNvbnN0IFRleHRHcmlkRmFsbEJhY2tMZWFkaW5nU3RvcnkgPSBkaXIgPT4gYFxuICB3aWR0aDogJHtmdWxsV2lkdGhDb2x1bW5zTWF4U2NhbGVhYmxlfTtcbiAgQG1lZGlhIChtaW4td2lkdGg6ICR7R0VMX0dST1VQXzNfU0NSRUVOX1dJRFRIX01JTn0pIHtcbiAgICAke1xuICAgICAgZGlyID09PSAncnRsJ1xuICAgICAgICA/IGBwYWRkaW5nLWxlZnQ6ICR7R0VMX1NQQUNJTkd9O2BcbiAgICAgICAgOiBgcGFkZGluZy1yaWdodDogJHtHRUxfU1BBQ0lOR307YFxuICAgIH1cbiAgICB3aWR0aDogJHtoYWxmV2lkdGhDb2x1bW5zTWF4U2NhbGVhYmxlfTtcbiAgfVxuICBAbWVkaWEgKG1pbi13aWR0aDogJHtHRUxfR1JPVVBfNF9TQ1JFRU5fV0lEVEhfTUlOfSkge1xuICAgIHdpZHRoOiAke3R3b09mU2l4Q29sdW1uc01heFdpZHRoU2NhbGVhYmxlfTtcbiAgfVxuYDtcblxuY29uc3QgdGV4dEdyaWRGYWxsYmFja1N0eWxlcyA9IHtcbiAgdG9wOiAoKSA9PiBUZXh0R3JpZEZhbGxiYWNrVG9wU3RvcnksXG4gIHJlZ3VsYXI6ICh7IGRpc3BsYXlJbWFnZSB9KSA9PiBUZXh0R3JpZEZhbGxiYWNrKGRpc3BsYXlJbWFnZSksXG4gIGxlYWRpbmc6ICh7IGRpciB9KSA9PiBUZXh0R3JpZEZhbGxCYWNrTGVhZGluZ1N0b3J5KGRpciksXG59O1xuXG5jb25zdCB0ZXh0R3JpZFN0eWxlcyA9IHtcbiAgdG9wOiAoKSA9PiBUZXh0R3JpZENvbHVtbnNUb3BTdG9yeSxcbiAgcmVndWxhcjogKHsgZGlzcGxheUltYWdlIH0pID0+IFRleHRHcmlkQ29sdW1ucyhkaXNwbGF5SW1hZ2UpLFxuICBsZWFkaW5nOiAoKSA9PiBUZXh0R3JpZENvbHVtbnNMZWFkaW5nU3RvcnksXG59O1xuXG4vLyBUaGlzIGFwcGxpZXMgOHB4IHBhZGRpbmcgb25seSB0byB0aGUgdGltZXN0YW1wLlxuLy8gVGhlIGhlYWRsaW5lIGFscmVhZHkgaGFzIHBhZGRpbmcgc28gdGFyZ2V0aW5nIHRoZSB0aW1lc3RhbXAgcHJldmVudHMgZG91YmxlIHBhZGRpbmdcbi8vIGZyb20gYmVpbmcgYXBwbGllZC5cbmNvbnN0IGxlYWRpbmdQcm9tb1RpbWVzdGFtcFBhZGRpbmcgPSBgXG4gID50aW1lIHtcbiAgICBAbWVkaWEgKG1heC13aWR0aDogJHtHRUxfR1JPVVBfM19TQ1JFRU5fV0lEVEhfTUFYfSkge1xuICAgICAgcGFkZGluZy1ib3R0b206ICR7R0VMX1NQQUNJTkd9O1xuICAgIH1cbiAgfVxuYDtcblxuY29uc3QgVGV4dEdyaWRJdGVtID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB2ZXJ0aWNhbC1hbGlnbjogdG9wO1xuXG4gICR7KHsgcHJvbW9UeXBlLCBkaXNwbGF5SW1hZ2UsIGRpciB9KSA9PlxuICAgIHRleHRHcmlkRmFsbGJhY2tTdHlsZXNbcHJvbW9UeXBlXSh7IGRpc3BsYXlJbWFnZSwgZGlyIH0pfVxuXG4gIEBzdXBwb3J0cyAoJHtncmlkfSkge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHdpZHRoOiBpbml0aWFsO1xuICAgIHBhZGRpbmc6IGluaXRpYWw7XG4gICAgJHsoeyBwcm9tb1R5cGUsIGRpc3BsYXlJbWFnZSB9KSA9PlxuICAgICAgdGV4dEdyaWRTdHlsZXNbcHJvbW9UeXBlXSh7IGRpc3BsYXlJbWFnZSB9KX1cbiAgfVxuXG4gICR7KHsgcHJvbW9UeXBlIH0pID0+XG4gICAgcHJvbW9UeXBlID09PSAnbGVhZGluZycgPyBsZWFkaW5nUHJvbW9UaW1lc3RhbXBQYWRkaW5nIDogJyd9XG5cbiAgJHsoeyBkaXNwbGF5SW1hZ2UgfSkgPT5cbiAgICBkaXNwbGF5SW1hZ2VcbiAgICAgID8gJydcbiAgICAgIDogYD5kaXZ7IGRpc3BsYXk6aW5saW5lLWJsb2NrOyB2ZXJ0aWNhbC1hbGlnbjppbml0aWFsOyB9XG4gICAgICAgJiBzdmd7IG1hcmdpbjogMDsgfWB9XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBUZXh0R3JpZEl0ZW07XG4iXX0= */"));

export default TextGridItem;