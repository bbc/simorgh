import _styled from "@emotion/styled/base";
import { GEL_GROUP_3_SCREEN_WIDTH_MIN, GEL_GROUP_3_SCREEN_WIDTH_MAX } from '@bbc/gel-foundations/breakpoints';
import { GEL_SPACING_DBL } from '@bbc/gel-foundations/spacings';
import { grid } from '@bbc/psammead-styles/detection';
var fourOfSixColumnsMaxWidthScaleable = "66.67%"; // (4 / 6) * 100 = 66.6666666667 = 66.67%

var fullWidthColumnsMaxScaleable = "100%"; // (12 / 12) * 100 = 100 = 100%

var halfWidthColumnsMaxScaleable = "50%";

var paddingStyles = function paddingStyles(_ref) {
  var dir = _ref.dir;
  return dir === 'ltr' ? "padding-left: ".concat(GEL_SPACING_DBL, ";") : "padding-right: ".concat(GEL_SPACING_DBL, ";");
};

var textGridFallbackRadio = function textGridFallbackRadio(_ref2) {
  var fullWidth = _ref2.fullWidth,
      dir = _ref2.dir;
  return "\n  @media (min-width: ".concat(GEL_GROUP_3_SCREEN_WIDTH_MIN, ") and (max-width: ").concat(GEL_GROUP_3_SCREEN_WIDTH_MAX, ") {\n    ").concat(!fullWidth && "width: ".concat(fourOfSixColumnsMaxWidthScaleable, ";"), "\n    ").concat(paddingStyles(dir), "\n  }\n");
};

var textGridFallbackTv = function textGridFallbackTv(_ref3) {
  var fullWidth = _ref3.fullWidth,
      dir = _ref3.dir;
  return "\n  @media (min-width: ".concat(GEL_GROUP_3_SCREEN_WIDTH_MIN, ") {\n    ").concat(!fullWidth && "width: ".concat(halfWidthColumnsMaxScaleable, ";"), "\n    ").concat(paddingStyles(dir), "\n  }\n");
};

var textGridRadio = "\n  @media (min-width: ".concat(GEL_GROUP_3_SCREEN_WIDTH_MIN, ") and (max-width: ").concat(GEL_GROUP_3_SCREEN_WIDTH_MAX, ") {\n    grid-column: 3 / span 4;\n    padding: 0;\n  }\n");
var textGridTv = "\n  @media (min-width: ".concat(GEL_GROUP_3_SCREEN_WIDTH_MIN, ") {\n    grid-column: 4 / span 3;\n    padding: 0;\n  }\n");
var textGridFallbackStyles = {
  radio: textGridFallbackRadio,
  tv: textGridFallbackTv
};
var textGridStyles = {
  radio: textGridRadio,
  tv: textGridTv
};

var TextGridItem = _styled("div", process.env.NODE_ENV === "production" ? {
  target: "e54140o0"
} : {
  target: "e54140o0",
  label: "TextGridItem"
})("display:inline-block;width:", fullWidthColumnsMaxScaleable, ";", function (_ref4) {
  var bulletinType = _ref4.bulletinType;
  return textGridFallbackStyles[bulletinType];
}, "@supports (", grid, "){width:initial;grid-column:1/span 6;", function (_ref5) {
  var bulletinType = _ref5.bulletinType,
      fullWidth = _ref5.fullWidth;
  return !fullWidth && textGridStyles[bulletinType];
}, ";}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9UZXh0U3R5bGVzLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEyRCtCIiwiZmlsZSI6Ii4uL3NyYy9UZXh0U3R5bGVzLmpzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7XG4gIEdFTF9HUk9VUF8zX1NDUkVFTl9XSURUSF9NSU4sXG4gIEdFTF9HUk9VUF8zX1NDUkVFTl9XSURUSF9NQVgsXG59IGZyb20gJ0BiYmMvZ2VsLWZvdW5kYXRpb25zL2JyZWFrcG9pbnRzJztcbmltcG9ydCB7IEdFTF9TUEFDSU5HX0RCTCB9IGZyb20gJ0BiYmMvZ2VsLWZvdW5kYXRpb25zL3NwYWNpbmdzJztcbmltcG9ydCB7IGdyaWQgfSBmcm9tICdAYmJjL3BzYW1tZWFkLXN0eWxlcy9kZXRlY3Rpb24nO1xuXG5jb25zdCBmb3VyT2ZTaXhDb2x1bW5zTWF4V2lkdGhTY2FsZWFibGUgPSBgNjYuNjclYDtcbi8vICg0IC8gNikgKiAxMDAgPSA2Ni42NjY2NjY2NjY3ID0gNjYuNjclXG5cbmNvbnN0IGZ1bGxXaWR0aENvbHVtbnNNYXhTY2FsZWFibGUgPSBgMTAwJWA7XG4vLyAoMTIgLyAxMikgKiAxMDAgPSAxMDAgPSAxMDAlXG5cbmNvbnN0IGhhbGZXaWR0aENvbHVtbnNNYXhTY2FsZWFibGUgPSBgNTAlYDtcblxuY29uc3QgcGFkZGluZ1N0eWxlcyA9ICh7IGRpciB9KSA9PlxuICBkaXIgPT09ICdsdHInXG4gICAgPyBgcGFkZGluZy1sZWZ0OiAke0dFTF9TUEFDSU5HX0RCTH07YFxuICAgIDogYHBhZGRpbmctcmlnaHQ6ICR7R0VMX1NQQUNJTkdfREJMfTtgO1xuXG5jb25zdCB0ZXh0R3JpZEZhbGxiYWNrUmFkaW8gPSAoeyBmdWxsV2lkdGgsIGRpciB9KSA9PiBgXG4gIEBtZWRpYSAobWluLXdpZHRoOiAke0dFTF9HUk9VUF8zX1NDUkVFTl9XSURUSF9NSU59KSBhbmQgKG1heC13aWR0aDogJHtHRUxfR1JPVVBfM19TQ1JFRU5fV0lEVEhfTUFYfSkge1xuICAgICR7IWZ1bGxXaWR0aCAmJiBgd2lkdGg6ICR7Zm91ck9mU2l4Q29sdW1uc01heFdpZHRoU2NhbGVhYmxlfTtgfVxuICAgICR7cGFkZGluZ1N0eWxlcyhkaXIpfVxuICB9XG5gO1xuXG5jb25zdCB0ZXh0R3JpZEZhbGxiYWNrVHYgPSAoeyBmdWxsV2lkdGgsIGRpciB9KSA9PiBgXG4gIEBtZWRpYSAobWluLXdpZHRoOiAke0dFTF9HUk9VUF8zX1NDUkVFTl9XSURUSF9NSU59KSB7XG4gICAgJHshZnVsbFdpZHRoICYmIGB3aWR0aDogJHtoYWxmV2lkdGhDb2x1bW5zTWF4U2NhbGVhYmxlfTtgfVxuICAgICR7cGFkZGluZ1N0eWxlcyhkaXIpfVxuICB9XG5gO1xuXG5jb25zdCB0ZXh0R3JpZFJhZGlvID0gYFxuICBAbWVkaWEgKG1pbi13aWR0aDogJHtHRUxfR1JPVVBfM19TQ1JFRU5fV0lEVEhfTUlOfSkgYW5kIChtYXgtd2lkdGg6ICR7R0VMX0dST1VQXzNfU0NSRUVOX1dJRFRIX01BWH0pIHtcbiAgICBncmlkLWNvbHVtbjogMyAvIHNwYW4gNDtcbiAgICBwYWRkaW5nOiAwO1xuICB9XG5gO1xuXG5jb25zdCB0ZXh0R3JpZFR2ID0gYFxuICBAbWVkaWEgKG1pbi13aWR0aDogJHtHRUxfR1JPVVBfM19TQ1JFRU5fV0lEVEhfTUlOfSkge1xuICAgIGdyaWQtY29sdW1uOiA0IC8gc3BhbiAzO1xuICAgIHBhZGRpbmc6IDA7XG4gIH1cbmA7XG5cbmNvbnN0IHRleHRHcmlkRmFsbGJhY2tTdHlsZXMgPSB7XG4gIHJhZGlvOiB0ZXh0R3JpZEZhbGxiYWNrUmFkaW8sXG4gIHR2OiB0ZXh0R3JpZEZhbGxiYWNrVHYsXG59O1xuXG5jb25zdCB0ZXh0R3JpZFN0eWxlcyA9IHtcbiAgcmFkaW86IHRleHRHcmlkUmFkaW8sXG4gIHR2OiB0ZXh0R3JpZFR2LFxufTtcblxuY29uc3QgVGV4dEdyaWRJdGVtID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB3aWR0aDogJHtmdWxsV2lkdGhDb2x1bW5zTWF4U2NhbGVhYmxlfTtcbiAgJHsoeyBidWxsZXRpblR5cGUgfSkgPT4gdGV4dEdyaWRGYWxsYmFja1N0eWxlc1tidWxsZXRpblR5cGVdfVxuXG4gIEBzdXBwb3J0cyAoJHtncmlkfSkge1xuICAgIHdpZHRoOiBpbml0aWFsO1xuICAgIGdyaWQtY29sdW1uOiAxIC8gc3BhbiA2O1xuICAgICR7KHsgYnVsbGV0aW5UeXBlLCBmdWxsV2lkdGggfSkgPT5cbiAgICAgICFmdWxsV2lkdGggJiYgdGV4dEdyaWRTdHlsZXNbYnVsbGV0aW5UeXBlXX1cbiAgfVxuYDtcblxuZXhwb3J0IGRlZmF1bHQgVGV4dEdyaWRJdGVtO1xuIl19 */"));

export default TextGridItem;