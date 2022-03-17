import _styled from "@emotion/styled/base";
var _excluded = ["children", "startOffset"];

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

import React from 'react';
import { bool, node, number, shape, oneOf } from 'prop-types';
import { GEL_MARGIN_BELOW_400PX, GEL_GUTTER_BELOW_600PX, GEL_MARGIN_ABOVE_400PX, GEL_GUTTER_ABOVE_600PX } from '@bbc/gel-foundations/spacings';
import { GEL_GROUP_0_SCREEN_WIDTH_MAX, GEL_GROUP_1_SCREEN_WIDTH_MIN, GEL_GROUP_1_SCREEN_WIDTH_MAX, GEL_GROUP_2_SCREEN_WIDTH_MIN, GEL_GROUP_2_SCREEN_WIDTH_MAX, GEL_GROUP_3_SCREEN_WIDTH_MIN, GEL_GROUP_3_SCREEN_WIDTH_MAX, GEL_GROUP_4_SCREEN_WIDTH_MIN, GEL_GROUP_4_SCREEN_WIDTH_MAX, GEL_GROUP_5_SCREEN_WIDTH_MIN } from '@bbc/gel-foundations/breakpoints';
var groups = {
  group0: {
    min: null,
    max: GEL_GROUP_0_SCREEN_WIDTH_MAX,
    gutterSize: GEL_GUTTER_BELOW_600PX,
    marginSize: GEL_MARGIN_BELOW_400PX
  },
  group1: {
    min: GEL_GROUP_1_SCREEN_WIDTH_MIN,
    max: GEL_GROUP_1_SCREEN_WIDTH_MAX,
    gutterSize: GEL_GUTTER_BELOW_600PX,
    marginSize: GEL_MARGIN_BELOW_400PX
  },
  group2: {
    min: GEL_GROUP_2_SCREEN_WIDTH_MIN,
    max: GEL_GROUP_2_SCREEN_WIDTH_MAX,
    gutterSize: GEL_GUTTER_BELOW_600PX,
    marginSize: GEL_MARGIN_ABOVE_400PX
  },
  group3: {
    min: GEL_GROUP_3_SCREEN_WIDTH_MIN,
    max: GEL_GROUP_3_SCREEN_WIDTH_MAX,
    gutterSize: GEL_GUTTER_ABOVE_600PX,
    marginSize: GEL_MARGIN_ABOVE_400PX
  },
  group4: {
    min: GEL_GROUP_4_SCREEN_WIDTH_MIN,
    max: GEL_GROUP_4_SCREEN_WIDTH_MAX,
    gutterSize: GEL_GUTTER_ABOVE_600PX,
    marginSize: GEL_MARGIN_ABOVE_400PX
  },
  group5: {
    min: GEL_GROUP_5_SCREEN_WIDTH_MIN,
    max: null,
    gutterSize: GEL_GUTTER_ABOVE_600PX,
    marginSize: GEL_MARGIN_ABOVE_400PX
  }
};

var mediaQuery = function mediaQuery(_ref) {
  var min = _ref.min,
      max = _ref.max,
      styles = _ref.styles;

  if (min && max) {
    return "\n      @media (min-width: ".concat(min, ") and (max-width: ").concat(max, ") {\n        ").concat(styles, "\n      }\n    ");
  }

  if (min) {
    return "\n      @media (min-width: ".concat(min, ") {\n        ").concat(styles, "\n      }\n    ");
  }

  if (max) {
    return "\n      @media (max-width: ".concat(max, ") {\n        ").concat(styles, "\n      }\n    ");
  }

  return '';
};

var gridMediaQueries = function gridMediaQueries(_ref2) {
  var columns = _ref2.columns,
      margins = _ref2.margins,
      gridStartOffset = _ref2.gridStartOffset,
      enableGelGutters = _ref2.enableGelGutters;
  var selectedGroups = Object.keys(columns);
  return selectedGroups.map(function (group) {
    return mediaQuery({
      min: groups[group].min,
      max: groups[group].max,
      styles: "\n      grid-template-columns: repeat(".concat(columns[group], ", 1fr);\n      grid-column-end: span ").concat(columns[group], ";\n      ").concat(enableGelGutters ? "grid-column-gap: ".concat(groups[group].gutterSize, ";") : "", "\n      ").concat(margins[group] ? "padding: 0 ".concat(groups[group].marginSize, ";") : "", "\n      ").concat(gridStartOffset && gridStartOffset[group] ? "grid-column-start: ".concat(gridStartOffset[group], ";") : "")
    });
  });
};

var startOffsetPercentage = function startOffsetPercentage(columnsGroup, gridStartOffsetGroup) {
  return "".concat(100 / columnsGroup * (gridStartOffsetGroup - 1), "%");
};

var getNegativeOffset = function getNegativeOffset(columnsGroup, parentColumnsGroup, gridStartOffset, gridStartOffsetGroup) {
  var isValidOffset = gridStartOffset && gridStartOffsetGroup && gridStartOffsetGroup < parentColumnsGroup && columnsGroup === parentColumnsGroup; // if fills out whole page

  return isValidOffset ? " - ".concat(startOffsetPercentage(parentColumnsGroup, gridStartOffsetGroup)) : "";
};
/*
 * 1 We vertically align to the top so that sibling
 *   grid items that are placed side-by-side within a row
 *   have their text and images aligned
 */


var childrenFallback = function childrenFallback(item, dir, columnsGroup, marginsGroup, marginSize, parentColumnsGroup, parentEnableGelGutters, gutterSize, gridStartOffset, gridStartOffsetGroup) {
  var negativeOffset = getNegativeOffset(columnsGroup, parentColumnsGroup, gridStartOffset, gridStartOffsetGroup);
  var guttersWithinParent = parentColumnsGroup - 1;
  var guttersWithinItem = columnsGroup - 1;
  var adjustedNumberOfGutters = guttersWithinParent + 1; // This is needed since this current implementation cannot handle a negative margin outside the items.

  return " \n  ".concat(marginsGroup ? "padding: 0 ".concat(marginSize, ";") : "", "\n  ").concat(parentEnableGelGutters ? " \n        width: calc(".concat(columnsGroup, "/").concat(parentColumnsGroup, "*(100% - ").concat(adjustedNumberOfGutters, " * ").concat(gutterSize, ") + ").concat(guttersWithinItem, " * ").concat(gutterSize, " ").concat(negativeOffset, ");\n        ") : "", "\n  ").concat(parentEnableGelGutters && item ? "margin: 0 ".concat(parseFloat(gutterSize) / 2, "rem;") : "", "\n  ").concat(!parentEnableGelGutters ? "width: calc(".concat(100 * columnsGroup / parentColumnsGroup, "%").concat(negativeOffset, ");") : "", "\n  \n  ").concat(gridStartOffsetGroup && gridStartOffsetGroup < parentColumnsGroup ? "margin-".concat(dir === 'ltr' ? 'left' : 'right', ": ").concat(startOffsetPercentage(parentColumnsGroup, gridStartOffsetGroup), ";") : "", "\n  display: inline-block;\n  vertical-align: top; \n");
};
/* [1] */


var outerGridFallback = function outerGridFallback(dir, columnsGroup, marginsGroup, marginSize, enableGelGutters, gutterSize, gridStartOffset, gridStartOffsetGroup) {
  return "\n  ".concat(marginsGroup ? "padding: 0 ".concat(marginSize, ";") : "", "\n  ").concat(gridStartOffset && gridStartOffsetGroup < columnsGroup ? "margin-".concat(dir === 'ltr' ? 'left' : 'right', ": ").concat(startOffsetPercentage(columnsGroup, gridStartOffsetGroup)) : "");
};

var gridFallbacks = function gridFallbacks(_ref3) {
  var item = _ref3.item,
      dir = _ref3.dir,
      columns = _ref3.columns,
      margins = _ref3.margins,
      parentColumns = _ref3.parentColumns,
      enableGelGutters = _ref3.enableGelGutters,
      parentEnableGelGutters = _ref3.parentEnableGelGutters,
      gridStartOffset = _ref3.gridStartOffset;
  var isOuterGrid = !parentColumns;
  var selectedGroups = Object.keys(columns);
  return "\n    \n      ".concat(selectedGroups.map(function (group) {
    return "\n            ".concat(mediaQuery({
      min: groups[group].min,
      max: groups[group].max,
      styles: "\n              ".concat(isOuterGrid ? outerGridFallback(dir, columns[group], margins[group], groups[group].marginSize, enableGelGutters, groups[group].gutterSize, gridStartOffset, gridStartOffset[group]) : childrenFallback(item, dir, columns[group], margins[group], groups[group].marginSize, parentColumns[group], parentEnableGelGutters, groups[group].gutterSize, gridStartOffset, gridStartOffset[group]))
    }), "\n          ");
  }).join(''), " \n    ");
};

var GridComponent = _styled("div", process.env.NODE_ENV === "production" ? {
  target: "e57qer20"
} : {
  target: "e57qer20",
  label: "GridComponent"
})(gridFallbacks, "@supports (display: grid){", gridMediaQueries, " ", function (_ref4) {
  var item = _ref4.item;
  return item ? "display: block; width: initial; margin: 0;" : "display: grid; position: initial; width: initial; margin: 0;";
}, ";}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNFFnQyIsImZpbGUiOiIuLi9zcmMvaW5kZXguanN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGJvb2wsIG5vZGUsIG51bWJlciwgc2hhcGUsIG9uZU9mIH0gZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQge1xuICBHRUxfTUFSR0lOX0JFTE9XXzQwMFBYLFxuICBHRUxfR1VUVEVSX0JFTE9XXzYwMFBYLFxuICBHRUxfTUFSR0lOX0FCT1ZFXzQwMFBYLFxuICBHRUxfR1VUVEVSX0FCT1ZFXzYwMFBYLFxufSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy9zcGFjaW5ncyc7XG5pbXBvcnQge1xuICBHRUxfR1JPVVBfMF9TQ1JFRU5fV0lEVEhfTUFYLFxuICBHRUxfR1JPVVBfMV9TQ1JFRU5fV0lEVEhfTUlOLFxuICBHRUxfR1JPVVBfMV9TQ1JFRU5fV0lEVEhfTUFYLFxuICBHRUxfR1JPVVBfMl9TQ1JFRU5fV0lEVEhfTUlOLFxuICBHRUxfR1JPVVBfMl9TQ1JFRU5fV0lEVEhfTUFYLFxuICBHRUxfR1JPVVBfM19TQ1JFRU5fV0lEVEhfTUlOLFxuICBHRUxfR1JPVVBfM19TQ1JFRU5fV0lEVEhfTUFYLFxuICBHRUxfR1JPVVBfNF9TQ1JFRU5fV0lEVEhfTUlOLFxuICBHRUxfR1JPVVBfNF9TQ1JFRU5fV0lEVEhfTUFYLFxuICBHRUxfR1JPVVBfNV9TQ1JFRU5fV0lEVEhfTUlOLFxufSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy9icmVha3BvaW50cyc7XG5cbmNvbnN0IGdyb3VwcyA9IHtcbiAgZ3JvdXAwOiB7XG4gICAgbWluOiBudWxsLFxuICAgIG1heDogR0VMX0dST1VQXzBfU0NSRUVOX1dJRFRIX01BWCxcbiAgICBndXR0ZXJTaXplOiBHRUxfR1VUVEVSX0JFTE9XXzYwMFBYLFxuICAgIG1hcmdpblNpemU6IEdFTF9NQVJHSU5fQkVMT1dfNDAwUFgsXG4gIH0sXG4gIGdyb3VwMToge1xuICAgIG1pbjogR0VMX0dST1VQXzFfU0NSRUVOX1dJRFRIX01JTixcbiAgICBtYXg6IEdFTF9HUk9VUF8xX1NDUkVFTl9XSURUSF9NQVgsXG4gICAgZ3V0dGVyU2l6ZTogR0VMX0dVVFRFUl9CRUxPV182MDBQWCxcbiAgICBtYXJnaW5TaXplOiBHRUxfTUFSR0lOX0JFTE9XXzQwMFBYLFxuICB9LFxuICBncm91cDI6IHtcbiAgICBtaW46IEdFTF9HUk9VUF8yX1NDUkVFTl9XSURUSF9NSU4sXG4gICAgbWF4OiBHRUxfR1JPVVBfMl9TQ1JFRU5fV0lEVEhfTUFYLFxuICAgIGd1dHRlclNpemU6IEdFTF9HVVRURVJfQkVMT1dfNjAwUFgsXG4gICAgbWFyZ2luU2l6ZTogR0VMX01BUkdJTl9BQk9WRV80MDBQWCxcbiAgfSxcbiAgZ3JvdXAzOiB7XG4gICAgbWluOiBHRUxfR1JPVVBfM19TQ1JFRU5fV0lEVEhfTUlOLFxuICAgIG1heDogR0VMX0dST1VQXzNfU0NSRUVOX1dJRFRIX01BWCxcbiAgICBndXR0ZXJTaXplOiBHRUxfR1VUVEVSX0FCT1ZFXzYwMFBYLFxuICAgIG1hcmdpblNpemU6IEdFTF9NQVJHSU5fQUJPVkVfNDAwUFgsXG4gIH0sXG4gIGdyb3VwNDoge1xuICAgIG1pbjogR0VMX0dST1VQXzRfU0NSRUVOX1dJRFRIX01JTixcbiAgICBtYXg6IEdFTF9HUk9VUF80X1NDUkVFTl9XSURUSF9NQVgsXG4gICAgZ3V0dGVyU2l6ZTogR0VMX0dVVFRFUl9BQk9WRV82MDBQWCxcbiAgICBtYXJnaW5TaXplOiBHRUxfTUFSR0lOX0FCT1ZFXzQwMFBYLFxuICB9LFxuICBncm91cDU6IHtcbiAgICBtaW46IEdFTF9HUk9VUF81X1NDUkVFTl9XSURUSF9NSU4sXG4gICAgbWF4OiBudWxsLFxuICAgIGd1dHRlclNpemU6IEdFTF9HVVRURVJfQUJPVkVfNjAwUFgsXG4gICAgbWFyZ2luU2l6ZTogR0VMX01BUkdJTl9BQk9WRV80MDBQWCxcbiAgfSxcbn07XG5cbmNvbnN0IG1lZGlhUXVlcnkgPSAoeyBtaW4sIG1heCwgc3R5bGVzIH0pID0+IHtcbiAgaWYgKG1pbiAmJiBtYXgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgQG1lZGlhIChtaW4td2lkdGg6ICR7bWlufSkgYW5kIChtYXgtd2lkdGg6ICR7bWF4fSkge1xuICAgICAgICAke3N0eWxlc31cbiAgICAgIH1cbiAgICBgO1xuICB9XG4gIGlmIChtaW4pIHtcbiAgICByZXR1cm4gYFxuICAgICAgQG1lZGlhIChtaW4td2lkdGg6ICR7bWlufSkge1xuICAgICAgICAke3N0eWxlc31cbiAgICAgIH1cbiAgICBgO1xuICB9XG4gIGlmIChtYXgpIHtcbiAgICByZXR1cm4gYFxuICAgICAgQG1lZGlhIChtYXgtd2lkdGg6ICR7bWF4fSkge1xuICAgICAgICAke3N0eWxlc31cbiAgICAgIH1cbiAgICBgO1xuICB9XG4gIHJldHVybiAnJztcbn07XG5cbmNvbnN0IGdyaWRNZWRpYVF1ZXJpZXMgPSAoe1xuICBjb2x1bW5zLFxuICBtYXJnaW5zLFxuICBncmlkU3RhcnRPZmZzZXQsXG4gIGVuYWJsZUdlbEd1dHRlcnMsXG59KSA9PiB7XG4gIGNvbnN0IHNlbGVjdGVkR3JvdXBzID0gT2JqZWN0LmtleXMoY29sdW1ucyk7XG5cbiAgcmV0dXJuIHNlbGVjdGVkR3JvdXBzLm1hcChncm91cCA9PlxuICAgIG1lZGlhUXVlcnkoe1xuICAgICAgbWluOiBncm91cHNbZ3JvdXBdLm1pbixcbiAgICAgIG1heDogZ3JvdXBzW2dyb3VwXS5tYXgsXG4gICAgICBzdHlsZXM6IGBcbiAgICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KCR7Y29sdW1uc1tncm91cF19LCAxZnIpO1xuICAgICAgZ3JpZC1jb2x1bW4tZW5kOiBzcGFuICR7Y29sdW1uc1tncm91cF19O1xuICAgICAgJHtlbmFibGVHZWxHdXR0ZXJzID8gYGdyaWQtY29sdW1uLWdhcDogJHtncm91cHNbZ3JvdXBdLmd1dHRlclNpemV9O2AgOiBgYH1cbiAgICAgICR7bWFyZ2luc1tncm91cF0gPyBgcGFkZGluZzogMCAke2dyb3Vwc1tncm91cF0ubWFyZ2luU2l6ZX07YCA6IGBgfVxuICAgICAgJHtcbiAgICAgICAgZ3JpZFN0YXJ0T2Zmc2V0ICYmIGdyaWRTdGFydE9mZnNldFtncm91cF1cbiAgICAgICAgICA/IGBncmlkLWNvbHVtbi1zdGFydDogJHtncmlkU3RhcnRPZmZzZXRbZ3JvdXBdfTtgXG4gICAgICAgICAgOiBgYFxuICAgICAgfWAsXG4gICAgfSksXG4gICk7XG59O1xuXG5jb25zdCBzdGFydE9mZnNldFBlcmNlbnRhZ2UgPSAoY29sdW1uc0dyb3VwLCBncmlkU3RhcnRPZmZzZXRHcm91cCkgPT5cbiAgYCR7KDEwMCAvIGNvbHVtbnNHcm91cCkgKiAoZ3JpZFN0YXJ0T2Zmc2V0R3JvdXAgLSAxKX0lYDtcblxuY29uc3QgZ2V0TmVnYXRpdmVPZmZzZXQgPSAoXG4gIGNvbHVtbnNHcm91cCxcbiAgcGFyZW50Q29sdW1uc0dyb3VwLFxuICBncmlkU3RhcnRPZmZzZXQsXG4gIGdyaWRTdGFydE9mZnNldEdyb3VwLFxuKSA9PiB7XG4gIGNvbnN0IGlzVmFsaWRPZmZzZXQgPVxuICAgIGdyaWRTdGFydE9mZnNldCAmJlxuICAgIGdyaWRTdGFydE9mZnNldEdyb3VwICYmXG4gICAgZ3JpZFN0YXJ0T2Zmc2V0R3JvdXAgPCBwYXJlbnRDb2x1bW5zR3JvdXAgJiZcbiAgICBjb2x1bW5zR3JvdXAgPT09IHBhcmVudENvbHVtbnNHcm91cDsgLy8gaWYgZmlsbHMgb3V0IHdob2xlIHBhZ2VcblxuICByZXR1cm4gaXNWYWxpZE9mZnNldFxuICAgID8gYCAtICR7c3RhcnRPZmZzZXRQZXJjZW50YWdlKHBhcmVudENvbHVtbnNHcm91cCwgZ3JpZFN0YXJ0T2Zmc2V0R3JvdXApfWBcbiAgICA6IGBgO1xufTtcblxuLypcbiAqIDEgV2UgdmVydGljYWxseSBhbGlnbiB0byB0aGUgdG9wIHNvIHRoYXQgc2libGluZ1xuICogICBncmlkIGl0ZW1zIHRoYXQgYXJlIHBsYWNlZCBzaWRlLWJ5LXNpZGUgd2l0aGluIGEgcm93XG4gKiAgIGhhdmUgdGhlaXIgdGV4dCBhbmQgaW1hZ2VzIGFsaWduZWRcbiAqL1xuY29uc3QgY2hpbGRyZW5GYWxsYmFjayA9IChcbiAgaXRlbSxcbiAgZGlyLFxuICBjb2x1bW5zR3JvdXAsXG4gIG1hcmdpbnNHcm91cCxcbiAgbWFyZ2luU2l6ZSxcbiAgcGFyZW50Q29sdW1uc0dyb3VwLFxuICBwYXJlbnRFbmFibGVHZWxHdXR0ZXJzLFxuICBndXR0ZXJTaXplLFxuICBncmlkU3RhcnRPZmZzZXQsXG4gIGdyaWRTdGFydE9mZnNldEdyb3VwLFxuKSA9PiB7XG4gIGNvbnN0IG5lZ2F0aXZlT2Zmc2V0ID0gZ2V0TmVnYXRpdmVPZmZzZXQoXG4gICAgY29sdW1uc0dyb3VwLFxuICAgIHBhcmVudENvbHVtbnNHcm91cCxcbiAgICBncmlkU3RhcnRPZmZzZXQsXG4gICAgZ3JpZFN0YXJ0T2Zmc2V0R3JvdXAsXG4gICk7XG4gIGNvbnN0IGd1dHRlcnNXaXRoaW5QYXJlbnQgPSBwYXJlbnRDb2x1bW5zR3JvdXAgLSAxO1xuICBjb25zdCBndXR0ZXJzV2l0aGluSXRlbSA9IGNvbHVtbnNHcm91cCAtIDE7XG4gIGNvbnN0IGFkanVzdGVkTnVtYmVyT2ZHdXR0ZXJzID0gZ3V0dGVyc1dpdGhpblBhcmVudCArIDE7IC8vIFRoaXMgaXMgbmVlZGVkIHNpbmNlIHRoaXMgY3VycmVudCBpbXBsZW1lbnRhdGlvbiBjYW5ub3QgaGFuZGxlIGEgbmVnYXRpdmUgbWFyZ2luIG91dHNpZGUgdGhlIGl0ZW1zLlxuXG4gIHJldHVybiBgIFxuICAke21hcmdpbnNHcm91cCA/IGBwYWRkaW5nOiAwICR7bWFyZ2luU2l6ZX07YCA6IGBgfVxuICAke1xuICAgIHBhcmVudEVuYWJsZUdlbEd1dHRlcnNcbiAgICAgID8gYCBcbiAgICAgICAgd2lkdGg6IGNhbGMoJHtjb2x1bW5zR3JvdXB9LyR7cGFyZW50Q29sdW1uc0dyb3VwfSooMTAwJSAtICR7YWRqdXN0ZWROdW1iZXJPZkd1dHRlcnN9ICogJHtndXR0ZXJTaXplfSkgKyAke2d1dHRlcnNXaXRoaW5JdGVtfSAqICR7Z3V0dGVyU2l6ZX0gJHtuZWdhdGl2ZU9mZnNldH0pO1xuICAgICAgICBgXG4gICAgICA6IGBgXG4gIH1cbiAgJHtcbiAgICBwYXJlbnRFbmFibGVHZWxHdXR0ZXJzICYmIGl0ZW1cbiAgICAgID8gYG1hcmdpbjogMCAke3BhcnNlRmxvYXQoZ3V0dGVyU2l6ZSkgLyAyfXJlbTtgXG4gICAgICA6IGBgXG4gIH1cbiAgJHtcbiAgICAhcGFyZW50RW5hYmxlR2VsR3V0dGVyc1xuICAgICAgPyBgd2lkdGg6IGNhbGMoJHtcbiAgICAgICAgICAoMTAwICogY29sdW1uc0dyb3VwKSAvIHBhcmVudENvbHVtbnNHcm91cFxuICAgICAgICB9JSR7bmVnYXRpdmVPZmZzZXR9KTtgXG4gICAgICA6IGBgXG4gIH1cbiAgXG4gICR7XG4gICAgZ3JpZFN0YXJ0T2Zmc2V0R3JvdXAgJiYgZ3JpZFN0YXJ0T2Zmc2V0R3JvdXAgPCBwYXJlbnRDb2x1bW5zR3JvdXBcbiAgICAgID8gYG1hcmdpbi0ke2RpciA9PT0gJ2x0cicgPyAnbGVmdCcgOiAncmlnaHQnfTogJHtzdGFydE9mZnNldFBlcmNlbnRhZ2UoXG4gICAgICAgICAgcGFyZW50Q29sdW1uc0dyb3VwLFxuICAgICAgICAgIGdyaWRTdGFydE9mZnNldEdyb3VwLFxuICAgICAgICApfTtgXG4gICAgICA6IGBgXG4gIH1cbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB2ZXJ0aWNhbC1hbGlnbjogdG9wOyBcbmA7XG59OyAvKiBbMV0gKi9cblxuY29uc3Qgb3V0ZXJHcmlkRmFsbGJhY2sgPSAoXG4gIGRpcixcbiAgY29sdW1uc0dyb3VwLFxuICBtYXJnaW5zR3JvdXAsXG4gIG1hcmdpblNpemUsXG4gIGVuYWJsZUdlbEd1dHRlcnMsXG4gIGd1dHRlclNpemUsXG4gIGdyaWRTdGFydE9mZnNldCxcbiAgZ3JpZFN0YXJ0T2Zmc2V0R3JvdXAsXG4pID0+IGBcbiAgJHttYXJnaW5zR3JvdXAgPyBgcGFkZGluZzogMCAke21hcmdpblNpemV9O2AgOiBgYH1cbiAgJHtcbiAgICBncmlkU3RhcnRPZmZzZXQgJiYgZ3JpZFN0YXJ0T2Zmc2V0R3JvdXAgPCBjb2x1bW5zR3JvdXBcbiAgICAgID8gYG1hcmdpbi0ke2RpciA9PT0gJ2x0cicgPyAnbGVmdCcgOiAncmlnaHQnfTogJHtzdGFydE9mZnNldFBlcmNlbnRhZ2UoXG4gICAgICAgICAgY29sdW1uc0dyb3VwLFxuICAgICAgICAgIGdyaWRTdGFydE9mZnNldEdyb3VwLFxuICAgICAgICApfWBcbiAgICAgIDogYGBcbiAgfWA7XG5cbmNvbnN0IGdyaWRGYWxsYmFja3MgPSAoe1xuICBpdGVtLFxuICBkaXIsXG4gIGNvbHVtbnMsXG4gIG1hcmdpbnMsXG4gIHBhcmVudENvbHVtbnMsXG4gIGVuYWJsZUdlbEd1dHRlcnMsXG4gIHBhcmVudEVuYWJsZUdlbEd1dHRlcnMsXG4gIGdyaWRTdGFydE9mZnNldCxcbn0pID0+IHtcbiAgY29uc3QgaXNPdXRlckdyaWQgPSAhcGFyZW50Q29sdW1ucztcblxuICBjb25zdCBzZWxlY3RlZEdyb3VwcyA9IE9iamVjdC5rZXlzKGNvbHVtbnMpO1xuICByZXR1cm4gYFxuICAgIFxuICAgICAgJHtzZWxlY3RlZEdyb3Vwc1xuICAgICAgICAubWFwKFxuICAgICAgICAgIGdyb3VwID0+IGBcbiAgICAgICAgICAgICR7bWVkaWFRdWVyeSh7XG4gICAgICAgICAgICAgIG1pbjogZ3JvdXBzW2dyb3VwXS5taW4sXG4gICAgICAgICAgICAgIG1heDogZ3JvdXBzW2dyb3VwXS5tYXgsXG4gICAgICAgICAgICAgIHN0eWxlczogYFxuICAgICAgICAgICAgICAke1xuICAgICAgICAgICAgICAgIGlzT3V0ZXJHcmlkXG4gICAgICAgICAgICAgICAgICA/IG91dGVyR3JpZEZhbGxiYWNrKFxuICAgICAgICAgICAgICAgICAgICAgIGRpcixcbiAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zW2dyb3VwXSxcbiAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5zW2dyb3VwXSxcbiAgICAgICAgICAgICAgICAgICAgICBncm91cHNbZ3JvdXBdLm1hcmdpblNpemUsXG4gICAgICAgICAgICAgICAgICAgICAgZW5hYmxlR2VsR3V0dGVycyxcbiAgICAgICAgICAgICAgICAgICAgICBncm91cHNbZ3JvdXBdLmd1dHRlclNpemUsXG4gICAgICAgICAgICAgICAgICAgICAgZ3JpZFN0YXJ0T2Zmc2V0LFxuICAgICAgICAgICAgICAgICAgICAgIGdyaWRTdGFydE9mZnNldFtncm91cF0sXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIDogY2hpbGRyZW5GYWxsYmFjayhcbiAgICAgICAgICAgICAgICAgICAgICBpdGVtLFxuICAgICAgICAgICAgICAgICAgICAgIGRpcixcbiAgICAgICAgICAgICAgICAgICAgICBjb2x1bW5zW2dyb3VwXSxcbiAgICAgICAgICAgICAgICAgICAgICBtYXJnaW5zW2dyb3VwXSxcbiAgICAgICAgICAgICAgICAgICAgICBncm91cHNbZ3JvdXBdLm1hcmdpblNpemUsXG4gICAgICAgICAgICAgICAgICAgICAgcGFyZW50Q29sdW1uc1tncm91cF0sXG4gICAgICAgICAgICAgICAgICAgICAgcGFyZW50RW5hYmxlR2VsR3V0dGVycyxcbiAgICAgICAgICAgICAgICAgICAgICBncm91cHNbZ3JvdXBdLmd1dHRlclNpemUsXG4gICAgICAgICAgICAgICAgICAgICAgZ3JpZFN0YXJ0T2Zmc2V0LFxuICAgICAgICAgICAgICAgICAgICAgIGdyaWRTdGFydE9mZnNldFtncm91cF0sXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgfWAsXG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICBgLFxuICAgICAgICApXG4gICAgICAgIC5qb2luKCcnKX0gXG4gICAgYDtcbn07XG5cbmNvbnN0IEdyaWRDb21wb25lbnQgPSBzdHlsZWQuZGl2YFxuICAke2dyaWRGYWxsYmFja3N9XG4gIEBzdXBwb3J0cyAoZGlzcGxheTogZ3JpZCkge1xuICAgICR7Z3JpZE1lZGlhUXVlcmllc31cbiAgICAkeyh7IGl0ZW0gfSkgPT5cbiAgICAgIGl0ZW1cbiAgICAgICAgPyBgZGlzcGxheTogYmxvY2s7IHdpZHRoOiBpbml0aWFsOyBtYXJnaW46IDA7YFxuICAgICAgICA6IGBkaXNwbGF5OiBncmlkOyBwb3NpdGlvbjogaW5pdGlhbDsgd2lkdGg6IGluaXRpYWw7IG1hcmdpbjogMDtgfVxuICB9XG5gO1xuXG5jb25zdCBHcmlkID0gUmVhY3QuZm9yd2FyZFJlZihcbiAgKFxuICAgIHtcbiAgICAgIGNoaWxkcmVuLFxuICAgICAgc3RhcnRPZmZzZXQ6IGdyaWRTdGFydE9mZnNldCwgLy8gYWxpYXMgdGhpcyBwcm9wIHRvIHByZXZlbnQgaXQgcmVuZGVyaW5nIGFzIGFuIGVsZW1lbnQgYXR0cmlidXRlIGUuZy4gPGRpdiBzdGFydG9mZnNldD1cIltvYmplY3QgT2JqZWN0XVwiPlxuICAgICAgLi4ub3RoZXJQcm9wc1xuICAgIH0sXG4gICAgcmVmLFxuICApID0+IHtcbiAgICBjb25zdCByZW5kZXJDaGlsZHJlbiA9ICgpID0+XG4gICAgICBSZWFjdC5DaGlsZHJlbi5tYXAoY2hpbGRyZW4sIGNoaWxkID0+IHtcbiAgICAgICAgaWYgKGNoaWxkKSB7XG4gICAgICAgICAgY29uc3QgaXNOZXN0ZWRHcmlkQ29tcG9uZW50ID0gY2hpbGQudHlwZSA9PT0gR3JpZDtcblxuICAgICAgICAgIGlmIChpc05lc3RlZEdyaWRDb21wb25lbnQpIHtcbiAgICAgICAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoY2hpbGQsIHtcbiAgICAgICAgICAgICAgcGFyZW50Q29sdW1uczogb3RoZXJQcm9wcy5jb2x1bW5zLFxuICAgICAgICAgICAgICBwYXJlbnRFbmFibGVHZWxHdXR0ZXJzOiBvdGhlclByb3BzLmVuYWJsZUdlbEd1dHRlcnMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgICAgfSk7XG5cbiAgICBjb25zdCByZW5kZXJHcmlkQ29tcG9uZW50ID0gKCkgPT4gKFxuICAgICAgPEdyaWRDb21wb25lbnRcbiAgICAgICAgey4uLm90aGVyUHJvcHN9XG4gICAgICAgIGdyaWRTdGFydE9mZnNldD17Z3JpZFN0YXJ0T2Zmc2V0fVxuICAgICAgICByZWY9e3JlZn1cbiAgICAgID5cbiAgICAgICAge3JlbmRlckNoaWxkcmVuKCl9XG4gICAgICA8L0dyaWRDb21wb25lbnQ+XG4gICAgKTtcblxuICAgIHJldHVybiByZW5kZXJHcmlkQ29tcG9uZW50KCk7XG4gIH0sXG4pO1xuXG5HcmlkLnByb3BUeXBlcyA9IHtcbiAgY2hpbGRyZW46IG5vZGUuaXNSZXF1aXJlZCxcbiAgZGlyOiBvbmVPZihbJ2x0cicsICdydGwnXSksXG4gIGNvbHVtbnM6IHNoYXBlKHtcbiAgICBncm91cDE6IG51bWJlci5pc1JlcXVpcmVkLFxuICAgIGdyb3VwMjogbnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgZ3JvdXAzOiBudW1iZXIuaXNSZXF1aXJlZCxcbiAgICBncm91cDQ6IG51bWJlci5pc1JlcXVpcmVkLFxuICAgIGdyb3VwNTogbnVtYmVyLmlzUmVxdWlyZWQsXG4gIH0pLmlzUmVxdWlyZWQsXG4gIGVuYWJsZUdlbEd1dHRlcnM6IGJvb2wsXG4gIGVuYWJsZU5lZ2F0aXZlR2VsTWFyZ2luczogYm9vbCxcbiAgbWFyZ2luczogc2hhcGUoe1xuICAgIGdyb3VwMTogYm9vbCxcbiAgICBncm91cDI6IGJvb2wsXG4gICAgZ3JvdXAzOiBib29sLFxuICAgIGdyb3VwNDogYm9vbCxcbiAgICBncm91cDU6IGJvb2wsXG4gIH0pLFxuICBzdGFydE9mZnNldDogc2hhcGUoe1xuICAgIGdyb3VwMTogbnVtYmVyLFxuICAgIGdyb3VwMjogbnVtYmVyLFxuICAgIGdyb3VwMzogbnVtYmVyLFxuICAgIGdyb3VwNDogbnVtYmVyLFxuICAgIGdyb3VwNTogbnVtYmVyLFxuICB9KSxcbiAgaXRlbTogYm9vbCxcbiAgcGFyZW50Q29sdW1uczogc2hhcGUoe1xuICAgIGdyb3VwMTogbnVtYmVyLFxuICAgIGdyb3VwMjogbnVtYmVyLFxuICAgIGdyb3VwMzogbnVtYmVyLFxuICAgIGdyb3VwNDogbnVtYmVyLFxuICAgIGdyb3VwNTogbnVtYmVyLFxuICB9KSxcbn07XG5cbkdyaWQuZGVmYXVsdFByb3BzID0ge1xuICBkaXI6ICdsdHInLFxuICBlbmFibGVHZWxHdXR0ZXJzOiBmYWxzZSxcbiAgZW5hYmxlTmVnYXRpdmVHZWxNYXJnaW5zOiBmYWxzZSxcbiAgbWFyZ2luczoge1xuICAgIGdyb3VwMTogZmFsc2UsXG4gICAgZ3JvdXAyOiBmYWxzZSxcbiAgICBncm91cDM6IGZhbHNlLFxuICAgIGdyb3VwNDogZmFsc2UsXG4gICAgZ3JvdXA1OiBmYWxzZSxcbiAgfSxcbiAgc3RhcnRPZmZzZXQ6IHt9LFxuICBpdGVtOiBmYWxzZSxcbiAgcGFyZW50Q29sdW1uczogbnVsbCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IEdyaWQ7XG4iXX0= */"));

var Grid = /*#__PURE__*/React.forwardRef(function (_ref5, ref) {
  var children = _ref5.children,
      gridStartOffset = _ref5.startOffset,
      otherProps = _objectWithoutProperties(_ref5, _excluded);

  var renderChildren = function renderChildren() {
    return React.Children.map(children, function (child) {
      if (child) {
        var isNestedGridComponent = child.type === Grid;

        if (isNestedGridComponent) {
          return /*#__PURE__*/React.cloneElement(child, {
            parentColumns: otherProps.columns,
            parentEnableGelGutters: otherProps.enableGelGutters
          });
        }
      }

      return child;
    });
  };

  var renderGridComponent = function renderGridComponent() {
    return /*#__PURE__*/React.createElement(GridComponent, _extends({}, otherProps, {
      gridStartOffset: gridStartOffset,
      ref: ref
    }), renderChildren());
  };

  return renderGridComponent();
});
Grid.propTypes = {
  children: node.isRequired,
  dir: oneOf(['ltr', 'rtl']),
  columns: shape({
    group1: number.isRequired,
    group2: number.isRequired,
    group3: number.isRequired,
    group4: number.isRequired,
    group5: number.isRequired
  }).isRequired,
  enableGelGutters: bool,
  enableNegativeGelMargins: bool,
  margins: shape({
    group1: bool,
    group2: bool,
    group3: bool,
    group4: bool,
    group5: bool
  }),
  startOffset: shape({
    group1: number,
    group2: number,
    group3: number,
    group4: number,
    group5: number
  }),
  item: bool,
  parentColumns: shape({
    group1: number,
    group2: number,
    group3: number,
    group4: number,
    group5: number
  })
};
Grid.defaultProps = {
  dir: 'ltr',
  enableGelGutters: false,
  enableNegativeGelMargins: false,
  margins: {
    group1: false,
    group2: false,
    group3: false,
    group4: false,
    group5: false
  },
  startOffset: {},
  item: false,
  parentColumns: null
};
export default Grid;