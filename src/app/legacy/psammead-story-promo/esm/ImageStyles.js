import _styled from "@emotion/styled/base";
import { GEL_SPACING } from '@bbc/gel-foundations/spacings';
import { GEL_GROUP_3_SCREEN_WIDTH_MIN, GEL_GROUP_4_SCREEN_WIDTH_MIN, GEL_GROUP_4_SCREEN_WIDTH_MAX } from '@bbc/gel-foundations/breakpoints';
import { grid } from '@bbc/psammead-styles/detection';
var twoOfSixColumnsMaxWidthScaleable = "33.33%"; // (2 / 6) * 100 = 0.3333333333 = 33.33%

var fourOfSixColumnsMaxWidthScaleable = "66.67%"; // (4 / 6) * 100 = 66.6666666667 = 66.67%

var fullWidthColumnsMaxScaleable = "100%"; // (12 / 12) * 100 = 100 = 100%

var halfWidthColumnsMaxScaleable = "50%";
var gridFallbackImageWidth = "\n  width: calc(".concat(halfWidthColumnsMaxScaleable, " - ").concat(GEL_SPACING, ");\n");
var ImageGridColumnsTopStory = "\n  grid-column: 1 / span 6;\n\n  @media (min-width: ".concat(GEL_GROUP_3_SCREEN_WIDTH_MIN, ") and (max-width: ").concat(GEL_GROUP_4_SCREEN_WIDTH_MAX, ") {\n    grid-column: 1 / span 3;\n  }\n");
var ImageGridColumns = "\n  grid-column: 1 / span 2;\n";
var ImageGridColumnsLeadingStory = "\n  padding: 0;\n  grid-template-columns: repeat(6, 1fr);\n  grid-column-end: span 6;\n\n  @media (min-width: ".concat(GEL_GROUP_3_SCREEN_WIDTH_MIN, ") {\n    grid-template-columns: repeat(3, 1fr);\n    grid-column-end: span 3;\n  }\n\n  @media (min-width: ").concat(GEL_GROUP_4_SCREEN_WIDTH_MIN, ") {\n    grid-template-columns: repeat(4, 1fr);\n    grid-column-end: span 4;\n  }\n");
var ImageGridFallbackTopStory = "\n  margin-bottom: ".concat(GEL_SPACING, ";\n  width: ").concat(fullWidthColumnsMaxScaleable, ";\n\n  @media (min-width: ").concat(GEL_GROUP_3_SCREEN_WIDTH_MIN, ") {\n    ").concat(gridFallbackImageWidth, ";\n    margin-bottom: 0;\n  }\n\n  @media (min-width: ").concat(GEL_GROUP_4_SCREEN_WIDTH_MIN, ") {\n    ").concat(gridFallbackImageWidth, ";\n  }\n");
var ImageGridFallback = "\n  width: ".concat(twoOfSixColumnsMaxWidthScaleable, ";\n\n  @media (min-width: ").concat(GEL_GROUP_4_SCREEN_WIDTH_MIN, ") {\n    display: block;\n    width: 100%;\n  }\n");

var ImageGridFallbackLeadingStory = function ImageGridFallbackLeadingStory(dir) {
  return "\n  width: ".concat(fullWidthColumnsMaxScaleable, ";\n\n  @media (min-width: ").concat(GEL_GROUP_3_SCREEN_WIDTH_MIN, ") {\n    ").concat(dir === 'rtl' ? "padding-left: ".concat(GEL_SPACING, ";") : "padding-right: ".concat(GEL_SPACING, ";"), "\n    width: ").concat(halfWidthColumnsMaxScaleable, ";\n  }\n\n  @media (min-width: ").concat(GEL_GROUP_4_SCREEN_WIDTH_MIN, ") {\n    width: ").concat(fourOfSixColumnsMaxWidthScaleable, ";\n  }\n");
};

var imageGridStyles = {
  top: ImageGridColumnsTopStory,
  regular: ImageGridColumns,
  leading: ImageGridColumnsLeadingStory
};
var imageGridFallbackStyles = {
  top: function top() {
    return ImageGridFallbackTopStory;
  },
  regular: function regular() {
    return ImageGridFallback;
  },
  leading: function leading(dir) {
    return ImageGridFallbackLeadingStory(dir);
  }
};

var ImageGridItem = _styled("div", process.env.NODE_ENV === "production" ? {
  target: "e1fos6470"
} : {
  target: "e1fos6470",
  label: "ImageGridItem"
})("display:inline-block;vertical-align:top;position:relative;", function (_ref) {
  var promoType = _ref.promoType,
      dir = _ref.dir;
  return imageGridFallbackStyles[promoType](dir);
}, "@supports (", grid, "){width:initial;", function (_ref2) {
  var promoType = _ref2.promoType;
  return imageGridStyles[promoType];
}, ";}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9JbWFnZVN0eWxlcy5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBd0dnQyIsImZpbGUiOiIuLi9zcmMvSW1hZ2VTdHlsZXMuanN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgR0VMX1NQQUNJTkcgfSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy9zcGFjaW5ncyc7XG5pbXBvcnQge1xuICBHRUxfR1JPVVBfM19TQ1JFRU5fV0lEVEhfTUlOLFxuICBHRUxfR1JPVVBfNF9TQ1JFRU5fV0lEVEhfTUlOLFxuICBHRUxfR1JPVVBfNF9TQ1JFRU5fV0lEVEhfTUFYLFxufSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy9icmVha3BvaW50cyc7XG5pbXBvcnQgeyBncmlkIH0gZnJvbSAnQGJiYy9wc2FtbWVhZC1zdHlsZXMvZGV0ZWN0aW9uJztcblxuY29uc3QgdHdvT2ZTaXhDb2x1bW5zTWF4V2lkdGhTY2FsZWFibGUgPSBgMzMuMzMlYDtcbi8vICgyIC8gNikgKiAxMDAgPSAwLjMzMzMzMzMzMzMgPSAzMy4zMyVcblxuY29uc3QgZm91ck9mU2l4Q29sdW1uc01heFdpZHRoU2NhbGVhYmxlID0gYDY2LjY3JWA7XG4vLyAoNCAvIDYpICogMTAwID0gNjYuNjY2NjY2NjY2NyA9IDY2LjY3JVxuXG5jb25zdCBmdWxsV2lkdGhDb2x1bW5zTWF4U2NhbGVhYmxlID0gYDEwMCVgO1xuLy8gKDEyIC8gMTIpICogMTAwID0gMTAwID0gMTAwJVxuXG5jb25zdCBoYWxmV2lkdGhDb2x1bW5zTWF4U2NhbGVhYmxlID0gYDUwJWA7XG5cbmNvbnN0IGdyaWRGYWxsYmFja0ltYWdlV2lkdGggPSBgXG4gIHdpZHRoOiBjYWxjKCR7aGFsZldpZHRoQ29sdW1uc01heFNjYWxlYWJsZX0gLSAke0dFTF9TUEFDSU5HfSk7XG5gO1xuXG5jb25zdCBJbWFnZUdyaWRDb2x1bW5zVG9wU3RvcnkgPSBgXG4gIGdyaWQtY29sdW1uOiAxIC8gc3BhbiA2O1xuXG4gIEBtZWRpYSAobWluLXdpZHRoOiAke0dFTF9HUk9VUF8zX1NDUkVFTl9XSURUSF9NSU59KSBhbmQgKG1heC13aWR0aDogJHtHRUxfR1JPVVBfNF9TQ1JFRU5fV0lEVEhfTUFYfSkge1xuICAgIGdyaWQtY29sdW1uOiAxIC8gc3BhbiAzO1xuICB9XG5gO1xuXG5jb25zdCBJbWFnZUdyaWRDb2x1bW5zID0gYFxuICBncmlkLWNvbHVtbjogMSAvIHNwYW4gMjtcbmA7XG5cbmNvbnN0IEltYWdlR3JpZENvbHVtbnNMZWFkaW5nU3RvcnkgPSBgXG4gIHBhZGRpbmc6IDA7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDYsIDFmcik7XG4gIGdyaWQtY29sdW1uLWVuZDogc3BhbiA2O1xuXG4gIEBtZWRpYSAobWluLXdpZHRoOiAke0dFTF9HUk9VUF8zX1NDUkVFTl9XSURUSF9NSU59KSB7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMywgMWZyKTtcbiAgICBncmlkLWNvbHVtbi1lbmQ6IHNwYW4gMztcbiAgfVxuXG4gIEBtZWRpYSAobWluLXdpZHRoOiAke0dFTF9HUk9VUF80X1NDUkVFTl9XSURUSF9NSU59KSB7XG4gICAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoNCwgMWZyKTtcbiAgICBncmlkLWNvbHVtbi1lbmQ6IHNwYW4gNDtcbiAgfVxuYDtcblxuY29uc3QgSW1hZ2VHcmlkRmFsbGJhY2tUb3BTdG9yeSA9IGBcbiAgbWFyZ2luLWJvdHRvbTogJHtHRUxfU1BBQ0lOR307XG4gIHdpZHRoOiAke2Z1bGxXaWR0aENvbHVtbnNNYXhTY2FsZWFibGV9O1xuXG4gIEBtZWRpYSAobWluLXdpZHRoOiAke0dFTF9HUk9VUF8zX1NDUkVFTl9XSURUSF9NSU59KSB7XG4gICAgJHtncmlkRmFsbGJhY2tJbWFnZVdpZHRofTtcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xuICB9XG5cbiAgQG1lZGlhIChtaW4td2lkdGg6ICR7R0VMX0dST1VQXzRfU0NSRUVOX1dJRFRIX01JTn0pIHtcbiAgICAke2dyaWRGYWxsYmFja0ltYWdlV2lkdGh9O1xuICB9XG5gO1xuXG5jb25zdCBJbWFnZUdyaWRGYWxsYmFjayA9IGBcbiAgd2lkdGg6ICR7dHdvT2ZTaXhDb2x1bW5zTWF4V2lkdGhTY2FsZWFibGV9O1xuXG4gIEBtZWRpYSAobWluLXdpZHRoOiAke0dFTF9HUk9VUF80X1NDUkVFTl9XSURUSF9NSU59KSB7XG4gICAgZGlzcGxheTogYmxvY2s7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cbmA7XG5cbmNvbnN0IEltYWdlR3JpZEZhbGxiYWNrTGVhZGluZ1N0b3J5ID0gZGlyID0+IGBcbiAgd2lkdGg6ICR7ZnVsbFdpZHRoQ29sdW1uc01heFNjYWxlYWJsZX07XG5cbiAgQG1lZGlhIChtaW4td2lkdGg6ICR7R0VMX0dST1VQXzNfU0NSRUVOX1dJRFRIX01JTn0pIHtcbiAgICAke1xuICAgICAgZGlyID09PSAncnRsJ1xuICAgICAgICA/IGBwYWRkaW5nLWxlZnQ6ICR7R0VMX1NQQUNJTkd9O2BcbiAgICAgICAgOiBgcGFkZGluZy1yaWdodDogJHtHRUxfU1BBQ0lOR307YFxuICAgIH1cbiAgICB3aWR0aDogJHtoYWxmV2lkdGhDb2x1bW5zTWF4U2NhbGVhYmxlfTtcbiAgfVxuXG4gIEBtZWRpYSAobWluLXdpZHRoOiAke0dFTF9HUk9VUF80X1NDUkVFTl9XSURUSF9NSU59KSB7XG4gICAgd2lkdGg6ICR7Zm91ck9mU2l4Q29sdW1uc01heFdpZHRoU2NhbGVhYmxlfTtcbiAgfVxuYDtcblxuY29uc3QgaW1hZ2VHcmlkU3R5bGVzID0ge1xuICB0b3A6IEltYWdlR3JpZENvbHVtbnNUb3BTdG9yeSxcbiAgcmVndWxhcjogSW1hZ2VHcmlkQ29sdW1ucyxcbiAgbGVhZGluZzogSW1hZ2VHcmlkQ29sdW1uc0xlYWRpbmdTdG9yeSxcbn07XG5cbmNvbnN0IGltYWdlR3JpZEZhbGxiYWNrU3R5bGVzID0ge1xuICB0b3A6ICgpID0+IEltYWdlR3JpZEZhbGxiYWNrVG9wU3RvcnksXG4gIHJlZ3VsYXI6ICgpID0+IEltYWdlR3JpZEZhbGxiYWNrLFxuICBsZWFkaW5nOiBkaXIgPT4gSW1hZ2VHcmlkRmFsbGJhY2tMZWFkaW5nU3RvcnkoZGlyKSxcbn07XG5cbmNvbnN0IEltYWdlR3JpZEl0ZW0gPSBzdHlsZWQuZGl2YFxuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIHZlcnRpY2FsLWFsaWduOiB0b3A7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgJHsoeyBwcm9tb1R5cGUsIGRpciB9KSA9PiBpbWFnZUdyaWRGYWxsYmFja1N0eWxlc1twcm9tb1R5cGVdKGRpcil9XG5cbiAgQHN1cHBvcnRzICgke2dyaWR9KSB7XG4gICAgd2lkdGg6IGluaXRpYWw7XG4gICAgJHsoeyBwcm9tb1R5cGUgfSkgPT4gaW1hZ2VHcmlkU3R5bGVzW3Byb21vVHlwZV19XG4gIH1cbmA7XG5cbmV4cG9ydCBkZWZhdWx0IEltYWdlR3JpZEl0ZW07XG4iXX0= */"));

export default ImageGridItem;