import _styled from "@emotion/styled/base";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import when from 'ramda/src/when';
import is from 'ramda/src/is';
import { number, string, node, oneOfType } from 'prop-types';
import { Global, css } from '@emotion/react';

var _ref = process.env.NODE_ENV === "production" ? {
  name: "lgxym1",
  styles: "body{overflow-anchor:auto;}"
} : {
  name: "1aci9o0-GlobalStyle",
  styles: "body{overflow-anchor:auto;};label:GlobalStyle;",
  map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBU2UiLCJmaWxlIjoiLi4vc3JjL2luZGV4LmpzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyB1c2VFZmZlY3QsIHVzZUxheW91dEVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB3aGVuIGZyb20gJ3JhbWRhL3NyYy93aGVuJztcbmltcG9ydCBpcyBmcm9tICdyYW1kYS9zcmMvaXMnO1xuaW1wb3J0IHsgbnVtYmVyLCBzdHJpbmcsIG5vZGUsIG9uZU9mVHlwZSB9IGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgR2xvYmFsLCBjc3MgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5cbmNvbnN0IEdsb2JhbFN0eWxlID0gKCkgPT4gKFxuICA8R2xvYmFsXG4gICAgc3R5bGVzPXtjc3NgXG4gICAgICBib2R5IHtcbiAgICAgICAgb3ZlcmZsb3ctYW5jaG9yOiBhdXRvO1xuICAgICAgfVxuICAgIGB9XG4gIC8+XG4pO1xuXG5jb25zdCBjb252ZXJ0VG9QaXhlbHMgPSBudW0gPT4gYCR7bnVtfXB4YDtcblxuY29uc3QgZ2V0U2l6ZSA9IHdoZW4oaXMoTnVtYmVyKSwgY29udmVydFRvUGl4ZWxzKTtcblxuY29uc3QgZ2V0SGVpZ2h0ID0gKHsgd3JhcHBlckhlaWdodCB9KSA9PiBnZXRTaXplKHdyYXBwZXJIZWlnaHQpO1xuXG5jb25zdCBnZXRXaWR0aCA9ICh7IHdyYXBwZXJXaWR0aCB9KSA9PiBnZXRTaXplKHdyYXBwZXJXaWR0aCk7XG5cbmNvbnN0IGNhbGN1bGF0ZU5ld1Njcm9sbFkgPSAoe1xuICBwcmV2U2Nyb2xsSGVpZ2h0LFxuICBjdXJyZW50U2Nyb2xsSGVpZ2h0LFxuICBjdXJyZW50U2Nyb2xsWSxcbn0pID0+IHtcbiAgY29uc3Qgc2Nyb2xsSGVpZ2h0RGlmZiA9IHByZXZTY3JvbGxIZWlnaHQgLSBjdXJyZW50U2Nyb2xsSGVpZ2h0O1xuXG4gIGlmIChzY3JvbGxIZWlnaHREaWZmICE9PSAwKSB7XG4gICAgcmV0dXJuIGN1cnJlbnRTY3JvbGxZIC0gc2Nyb2xsSGVpZ2h0RGlmZjtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn07XG5cbmNvbnN0IFdyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICBvdmVyZmxvdzogYXV0bztcbiAgaGVpZ2h0OiAke2dldEhlaWdodH07XG4gIHdpZHRoOiAke2dldFdpZHRofTtcbmA7XG5cbmNvbnN0IGluaXRJbnRlcnNlY3Rpb25PYnNlcnZlciA9ICh7IHdyYXBwZXJFbCwgc2V0V3JhcHBlcklPIH0pID0+IHtcbiAgY29uc3QgaW5pdCA9ICgpID0+IHtcbiAgICBjb25zdCBjYWxsYmFjayA9IChbd3JhcHBlckVudHJ5XSkgPT4ge1xuICAgICAgc2V0V3JhcHBlcklPKHdyYXBwZXJFbnRyeSk7XG4gICAgfTtcbiAgICBjb25zdCBJTyA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcihjYWxsYmFjayk7XG5cbiAgICBJTy5vYnNlcnZlKHdyYXBwZXJFbC5jdXJyZW50KTtcblxuICAgIHJldHVybiBJTztcbiAgfTtcblxuICBpZiAoJ0ludGVyc2VjdGlvbk9ic2VydmVyJyBpbiB3aW5kb3cpIHtcbiAgICByZXR1cm4gaW5pdCgpO1xuICB9XG5cbiAgcmV0dXJuIGltcG9ydChcbiAgICAvKiB3ZWJwYWNrQ2h1bmtOYW1lOiBcImludGVyc2VjdGlvbi1vYnNlcnZlci1wb2x5ZmlsbFwiICovICdpbnRlcnNlY3Rpb24tb2JzZXJ2ZXInXG4gICkudGhlbigoKSA9PiB7XG4gICAgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIucHJvdG90eXBlLlBPTExfSU5URVJWQUwgPSAxMDA7XG4gICAgcmV0dXJuIGluaXQoKTtcbiAgfSk7XG59O1xuXG5jb25zdCBpbml0UmVzaXplT2JzZXJ2ZXIgPSAoeyB3cmFwcGVyRWwsIHNldENvbnRlbnRFbFJlY3QgfSkgPT4ge1xuICBjb25zdCBpbml0ID0gUmVzaXplT2JzZXJ2ZXIgPT4ge1xuICAgIGNvbnN0IGNhbGxiYWNrID0gKFtjb250ZW50RW50cnldKSA9PiB7XG4gICAgICBzZXRDb250ZW50RWxSZWN0KGNvbnRlbnRFbnRyeS5jb250ZW50UmVjdCk7XG4gICAgfTtcbiAgICBjb25zdCBSTyA9IG5ldyBSZXNpemVPYnNlcnZlcihjYWxsYmFjayk7XG5cbiAgICBSTy5vYnNlcnZlKHdyYXBwZXJFbC5jdXJyZW50LmZpcnN0Q2hpbGQpO1xuXG4gICAgcmV0dXJuIFJPO1xuICB9O1xuXG4gIGlmICgnUmVzaXplT2JzZXJ2ZXInIGluIHdpbmRvdykge1xuICAgIHJldHVybiBpbml0KFJlc2l6ZU9ic2VydmVyKTtcbiAgfVxuICByZXR1cm4gaW1wb3J0KFxuICAgIC8qIHdlYnBhY2tDaHVua05hbWU6IFwicmVzaXplLW9ic2VydmVyLXBvbHlmaWxsXCIgKi8gJ0BqdWdnbGUvcmVzaXplLW9ic2VydmVyJ1xuICApLnRoZW4obW9kdWxlID0+IHtcbiAgICBjb25zdCBSZXNpemVPYnNlcnZlciA9IG1vZHVsZS5kZWZhdWx0O1xuICAgIHJldHVybiBpbml0KFJlc2l6ZU9ic2VydmVyKTtcbiAgfSk7XG59O1xuXG5jb25zdCBpc1Njcm9sbEFuY2hvcmluZ1N1cHBvcnRlZCA9ICgpID0+IHtcbiAgLy8gaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy1zY3JvbGwtYW5jaG9yaW5nL1xuICBpZiAoJ0NTUycgaW4gd2luZG93KSB7XG4gICAgcmV0dXJuIENTUy5zdXBwb3J0cygnb3ZlcmZsb3ctYW5jaG9yJywgJ2F1dG8nKTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5jb25zdCBDb250ZW50QW5jaG9yID0gKHsgY2hpbGRyZW4sIGluaXRpYWxIZWlnaHQsIGluaXRpYWxXaWR0aCB9KSA9PiB7XG4gIGNvbnN0IHdyYXBwZXJFbCA9IHVzZVJlZihudWxsKTtcbiAgY29uc3Qgc2Nyb2xsSGVpZ2h0ID0gdXNlUmVmKG51bGwpO1xuICBjb25zdCBzY3JvbGxBbmNob3JpbmdJc1N1cHBvcnRlZCA9IHVzZVJlZihudWxsKTtcbiAgY29uc3QgW3dyYXBwZXJJTywgc2V0V3JhcHBlcklPXSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW2NvbnRlbnRFbFJlY3QsIHNldENvbnRlbnRFbFJlY3RdID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbd3JhcHBlckRpbWVuc2lvbnMsIHNldFdyYXBwZXJEaW1lbnNpb25zXSA9IHVzZVN0YXRlKHtcbiAgICBoZWlnaHQ6IGluaXRpYWxIZWlnaHQsXG4gICAgd2lkdGg6IGluaXRpYWxXaWR0aCxcbiAgfSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAvLyBjb21wb25lbnQgZGlkIG1vdW50XG4gICAgY29uc3QgSU8gPSBpbml0SW50ZXJzZWN0aW9uT2JzZXJ2ZXIoeyB3cmFwcGVyRWwsIHNldFdyYXBwZXJJTyB9KTtcbiAgICBjb25zdCBSTyA9IGluaXRSZXNpemVPYnNlcnZlcih7IHdyYXBwZXJFbCwgc2V0Q29udGVudEVsUmVjdCB9KTtcbiAgICBzY3JvbGxBbmNob3JpbmdJc1N1cHBvcnRlZC5jdXJyZW50ID0gaXNTY3JvbGxBbmNob3JpbmdTdXBwb3J0ZWQoKTtcblxuICAgIHJldHVybiBmdW5jdGlvbiBjbGVhbnVwKCkge1xuICAgICAgSU8uZGlzY29ubmVjdCgpO1xuICAgICAgUk8uZGlzY29ubmVjdCgpO1xuICAgIH07XG4gIH0sIFtdKTtcblxuICB1c2VMYXlvdXRFZmZlY3QoKCkgPT4ge1xuICAgIC8vIGNoaWxkIGNvbnRlbnQgZGlkIHJlc2l6ZVxuICAgIGNvbnN0IHdyYXBwZXJJc091dE9mVmlldyA9IHdyYXBwZXJJTy5pc0ludGVyc2VjdGluZyA9PT0gZmFsc2U7XG5cbiAgICBpZiAod3JhcHBlcklzT3V0T2ZWaWV3KSB7XG4gICAgICAvLyB3cmFwcGVyIHdpbGwgcmVzaXplXG4gICAgICBjb25zdCB3cmFwcGVySXNBYm92ZVZpZXdwb3J0ID0gd3JhcHBlcklPLmJvdW5kaW5nQ2xpZW50UmVjdC50b3AgPCAwO1xuICAgICAgY29uc3Qge1xuICAgICAgICB3aWR0aDogbmV4dFdyYXBwZXJXaWR0aCxcbiAgICAgICAgaGVpZ2h0OiBuZXh0V3JhcHBlckhlaWdodCxcbiAgICAgIH0gPSBjb250ZW50RWxSZWN0O1xuXG4gICAgICBpZiAoIXNjcm9sbEFuY2hvcmluZ0lzU3VwcG9ydGVkLmN1cnJlbnQgJiYgd3JhcHBlcklzQWJvdmVWaWV3cG9ydCkge1xuICAgICAgICBzY3JvbGxIZWlnaHQuY3VycmVudCA9IGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0O1xuICAgICAgfVxuXG4gICAgICBzZXRXcmFwcGVyRGltZW5zaW9ucyh7XG4gICAgICAgIHdpZHRoOiBuZXh0V3JhcHBlcldpZHRoLFxuICAgICAgICBoZWlnaHQ6IG5leHRXcmFwcGVySGVpZ2h0LFxuICAgICAgfSk7XG4gICAgfVxuICB9LCBbY29udGVudEVsUmVjdF0pO1xuXG4gIHVzZUxheW91dEVmZmVjdCgoKSA9PiB7XG4gICAgLy8gd3JhcHBlciBkaWQgcmVzaXplXG4gICAgaWYgKHNjcm9sbEFuY2hvcmluZ0lzU3VwcG9ydGVkLmN1cnJlbnQgfHwgc2Nyb2xsSGVpZ2h0LmN1cnJlbnQgPT09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB7IHNjcm9sbEhlaWdodDogY3VycmVudFNjcm9sbEhlaWdodCB9ID0gZG9jdW1lbnQuYm9keTtcbiAgICBjb25zdCB7IGN1cnJlbnQ6IHByZXZTY3JvbGxIZWlnaHQgfSA9IHNjcm9sbEhlaWdodDtcbiAgICBjb25zdCBjdXJyZW50U2Nyb2xsWSA9IHdpbmRvdy5wYWdlWU9mZnNldDtcbiAgICBjb25zdCBuZXdTY3JvbGxZID0gY2FsY3VsYXRlTmV3U2Nyb2xsWSh7XG4gICAgICBwcmV2U2Nyb2xsSGVpZ2h0LFxuICAgICAgY3VycmVudFNjcm9sbEhlaWdodCxcbiAgICAgIGN1cnJlbnRTY3JvbGxZLFxuICAgIH0pO1xuXG4gICAgaWYgKG5ld1Njcm9sbFkpIHtcbiAgICAgIC8vIGFkanVzdCBzY3JvbGxZIHBvc2l0aW9uIHRvIHByZXZlbnQgdmlzaWJsZSBqdW1wXG4gICAgICB3aW5kb3cuc2Nyb2xsVG8oMCwgbmV3U2Nyb2xsWSk7XG4gICAgfVxuICB9LCBbd3JhcHBlckRpbWVuc2lvbnNdKTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8R2xvYmFsU3R5bGUgLz5cbiAgICAgIDxXcmFwcGVyXG4gICAgICAgIHdyYXBwZXJXaWR0aD17d3JhcHBlckRpbWVuc2lvbnMud2lkdGh9XG4gICAgICAgIHdyYXBwZXJIZWlnaHQ9e3dyYXBwZXJEaW1lbnNpb25zLmhlaWdodH1cbiAgICAgICAgcmVmPXt3cmFwcGVyRWx9XG4gICAgICA+XG4gICAgICAgIHtjaGlsZHJlbn1cbiAgICAgIDwvV3JhcHBlcj5cbiAgICA8Lz5cbiAgKTtcbn07XG5cbkNvbnRlbnRBbmNob3IucHJvcFR5cGVzID0ge1xuICBjaGlsZHJlbjogbm9kZS5pc1JlcXVpcmVkLFxuICBpbml0aWFsSGVpZ2h0OiBvbmVPZlR5cGUoW251bWJlciwgc3RyaW5nXSksXG4gIGluaXRpYWxXaWR0aDogb25lT2ZUeXBlKFtudW1iZXIsIHN0cmluZ10pLFxufTtcblxuQ29udGVudEFuY2hvci5kZWZhdWx0UHJvcHMgPSB7XG4gIGluaXRpYWxIZWlnaHQ6ICdhdXRvJyxcbiAgaW5pdGlhbFdpZHRoOiAnYXV0bycsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBDb250ZW50QW5jaG9yO1xuIl19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};

var GlobalStyle = function GlobalStyle() {
  return /*#__PURE__*/React.createElement(Global, {
    styles: _ref
  });
};

var convertToPixels = function convertToPixels(num) {
  return "".concat(num, "px");
};

var getSize = when(is(Number), convertToPixels);

var getHeight = function getHeight(_ref2) {
  var wrapperHeight = _ref2.wrapperHeight;
  return getSize(wrapperHeight);
};

var getWidth = function getWidth(_ref3) {
  var wrapperWidth = _ref3.wrapperWidth;
  return getSize(wrapperWidth);
};

var calculateNewScrollY = function calculateNewScrollY(_ref4) {
  var prevScrollHeight = _ref4.prevScrollHeight,
      currentScrollHeight = _ref4.currentScrollHeight,
      currentScrollY = _ref4.currentScrollY;
  var scrollHeightDiff = prevScrollHeight - currentScrollHeight;

  if (scrollHeightDiff !== 0) {
    return currentScrollY - scrollHeightDiff;
  }

  return null;
};

var Wrapper = _styled("div", process.env.NODE_ENV === "production" ? {
  target: "e1nuwca40"
} : {
  target: "e1nuwca40",
  label: "Wrapper"
})("overflow:auto;height:", getHeight, ";width:", getWidth, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBc0MwQiIsImZpbGUiOiIuLi9zcmMvaW5kZXguanN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlTGF5b3V0RWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHdoZW4gZnJvbSAncmFtZGEvc3JjL3doZW4nO1xuaW1wb3J0IGlzIGZyb20gJ3JhbWRhL3NyYy9pcyc7XG5pbXBvcnQgeyBudW1iZXIsIHN0cmluZywgbm9kZSwgb25lT2ZUeXBlIH0gZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBHbG9iYWwsIGNzcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcblxuY29uc3QgR2xvYmFsU3R5bGUgPSAoKSA9PiAoXG4gIDxHbG9iYWxcbiAgICBzdHlsZXM9e2Nzc2BcbiAgICAgIGJvZHkge1xuICAgICAgICBvdmVyZmxvdy1hbmNob3I6IGF1dG87XG4gICAgICB9XG4gICAgYH1cbiAgLz5cbik7XG5cbmNvbnN0IGNvbnZlcnRUb1BpeGVscyA9IG51bSA9PiBgJHtudW19cHhgO1xuXG5jb25zdCBnZXRTaXplID0gd2hlbihpcyhOdW1iZXIpLCBjb252ZXJ0VG9QaXhlbHMpO1xuXG5jb25zdCBnZXRIZWlnaHQgPSAoeyB3cmFwcGVySGVpZ2h0IH0pID0+IGdldFNpemUod3JhcHBlckhlaWdodCk7XG5cbmNvbnN0IGdldFdpZHRoID0gKHsgd3JhcHBlcldpZHRoIH0pID0+IGdldFNpemUod3JhcHBlcldpZHRoKTtcblxuY29uc3QgY2FsY3VsYXRlTmV3U2Nyb2xsWSA9ICh7XG4gIHByZXZTY3JvbGxIZWlnaHQsXG4gIGN1cnJlbnRTY3JvbGxIZWlnaHQsXG4gIGN1cnJlbnRTY3JvbGxZLFxufSkgPT4ge1xuICBjb25zdCBzY3JvbGxIZWlnaHREaWZmID0gcHJldlNjcm9sbEhlaWdodCAtIGN1cnJlbnRTY3JvbGxIZWlnaHQ7XG5cbiAgaWYgKHNjcm9sbEhlaWdodERpZmYgIT09IDApIHtcbiAgICByZXR1cm4gY3VycmVudFNjcm9sbFkgLSBzY3JvbGxIZWlnaHREaWZmO1xuICB9XG4gIHJldHVybiBudWxsO1xufTtcblxuY29uc3QgV3JhcHBlciA9IHN0eWxlZC5kaXZgXG4gIG92ZXJmbG93OiBhdXRvO1xuICBoZWlnaHQ6ICR7Z2V0SGVpZ2h0fTtcbiAgd2lkdGg6ICR7Z2V0V2lkdGh9O1xuYDtcblxuY29uc3QgaW5pdEludGVyc2VjdGlvbk9ic2VydmVyID0gKHsgd3JhcHBlckVsLCBzZXRXcmFwcGVySU8gfSkgPT4ge1xuICBjb25zdCBpbml0ID0gKCkgPT4ge1xuICAgIGNvbnN0IGNhbGxiYWNrID0gKFt3cmFwcGVyRW50cnldKSA9PiB7XG4gICAgICBzZXRXcmFwcGVySU8od3JhcHBlckVudHJ5KTtcbiAgICB9O1xuICAgIGNvbnN0IElPID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKGNhbGxiYWNrKTtcblxuICAgIElPLm9ic2VydmUod3JhcHBlckVsLmN1cnJlbnQpO1xuXG4gICAgcmV0dXJuIElPO1xuICB9O1xuXG4gIGlmICgnSW50ZXJzZWN0aW9uT2JzZXJ2ZXInIGluIHdpbmRvdykge1xuICAgIHJldHVybiBpbml0KCk7XG4gIH1cblxuICByZXR1cm4gaW1wb3J0KFxuICAgIC8qIHdlYnBhY2tDaHVua05hbWU6IFwiaW50ZXJzZWN0aW9uLW9ic2VydmVyLXBvbHlmaWxsXCIgKi8gJ2ludGVyc2VjdGlvbi1vYnNlcnZlcidcbiAgKS50aGVuKCgpID0+IHtcbiAgICBJbnRlcnNlY3Rpb25PYnNlcnZlci5wcm90b3R5cGUuUE9MTF9JTlRFUlZBTCA9IDEwMDtcbiAgICByZXR1cm4gaW5pdCgpO1xuICB9KTtcbn07XG5cbmNvbnN0IGluaXRSZXNpemVPYnNlcnZlciA9ICh7IHdyYXBwZXJFbCwgc2V0Q29udGVudEVsUmVjdCB9KSA9PiB7XG4gIGNvbnN0IGluaXQgPSBSZXNpemVPYnNlcnZlciA9PiB7XG4gICAgY29uc3QgY2FsbGJhY2sgPSAoW2NvbnRlbnRFbnRyeV0pID0+IHtcbiAgICAgIHNldENvbnRlbnRFbFJlY3QoY29udGVudEVudHJ5LmNvbnRlbnRSZWN0KTtcbiAgICB9O1xuICAgIGNvbnN0IFJPID0gbmV3IFJlc2l6ZU9ic2VydmVyKGNhbGxiYWNrKTtcblxuICAgIFJPLm9ic2VydmUod3JhcHBlckVsLmN1cnJlbnQuZmlyc3RDaGlsZCk7XG5cbiAgICByZXR1cm4gUk87XG4gIH07XG5cbiAgaWYgKCdSZXNpemVPYnNlcnZlcicgaW4gd2luZG93KSB7XG4gICAgcmV0dXJuIGluaXQoUmVzaXplT2JzZXJ2ZXIpO1xuICB9XG4gIHJldHVybiBpbXBvcnQoXG4gICAgLyogd2VicGFja0NodW5rTmFtZTogXCJyZXNpemUtb2JzZXJ2ZXItcG9seWZpbGxcIiAqLyAnQGp1Z2dsZS9yZXNpemUtb2JzZXJ2ZXInXG4gICkudGhlbihtb2R1bGUgPT4ge1xuICAgIGNvbnN0IFJlc2l6ZU9ic2VydmVyID0gbW9kdWxlLmRlZmF1bHQ7XG4gICAgcmV0dXJuIGluaXQoUmVzaXplT2JzZXJ2ZXIpO1xuICB9KTtcbn07XG5cbmNvbnN0IGlzU2Nyb2xsQW5jaG9yaW5nU3VwcG9ydGVkID0gKCkgPT4ge1xuICAvLyBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXNjcm9sbC1hbmNob3JpbmcvXG4gIGlmICgnQ1NTJyBpbiB3aW5kb3cpIHtcbiAgICByZXR1cm4gQ1NTLnN1cHBvcnRzKCdvdmVyZmxvdy1hbmNob3InLCAnYXV0bycpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmNvbnN0IENvbnRlbnRBbmNob3IgPSAoeyBjaGlsZHJlbiwgaW5pdGlhbEhlaWdodCwgaW5pdGlhbFdpZHRoIH0pID0+IHtcbiAgY29uc3Qgd3JhcHBlckVsID0gdXNlUmVmKG51bGwpO1xuICBjb25zdCBzY3JvbGxIZWlnaHQgPSB1c2VSZWYobnVsbCk7XG4gIGNvbnN0IHNjcm9sbEFuY2hvcmluZ0lzU3VwcG9ydGVkID0gdXNlUmVmKG51bGwpO1xuICBjb25zdCBbd3JhcHBlcklPLCBzZXRXcmFwcGVySU9dID0gdXNlU3RhdGUoe30pO1xuICBjb25zdCBbY29udGVudEVsUmVjdCwgc2V0Q29udGVudEVsUmVjdF0gPSB1c2VTdGF0ZSh7fSk7XG4gIGNvbnN0IFt3cmFwcGVyRGltZW5zaW9ucywgc2V0V3JhcHBlckRpbWVuc2lvbnNdID0gdXNlU3RhdGUoe1xuICAgIGhlaWdodDogaW5pdGlhbEhlaWdodCxcbiAgICB3aWR0aDogaW5pdGlhbFdpZHRoLFxuICB9KTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIC8vIGNvbXBvbmVudCBkaWQgbW91bnRcbiAgICBjb25zdCBJTyA9IGluaXRJbnRlcnNlY3Rpb25PYnNlcnZlcih7IHdyYXBwZXJFbCwgc2V0V3JhcHBlcklPIH0pO1xuICAgIGNvbnN0IFJPID0gaW5pdFJlc2l6ZU9ic2VydmVyKHsgd3JhcHBlckVsLCBzZXRDb250ZW50RWxSZWN0IH0pO1xuICAgIHNjcm9sbEFuY2hvcmluZ0lzU3VwcG9ydGVkLmN1cnJlbnQgPSBpc1Njcm9sbEFuY2hvcmluZ1N1cHBvcnRlZCgpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGNsZWFudXAoKSB7XG4gICAgICBJTy5kaXNjb25uZWN0KCk7XG4gICAgICBSTy5kaXNjb25uZWN0KCk7XG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIHVzZUxheW91dEVmZmVjdCgoKSA9PiB7XG4gICAgLy8gY2hpbGQgY29udGVudCBkaWQgcmVzaXplXG4gICAgY29uc3Qgd3JhcHBlcklzT3V0T2ZWaWV3ID0gd3JhcHBlcklPLmlzSW50ZXJzZWN0aW5nID09PSBmYWxzZTtcblxuICAgIGlmICh3cmFwcGVySXNPdXRPZlZpZXcpIHtcbiAgICAgIC8vIHdyYXBwZXIgd2lsbCByZXNpemVcbiAgICAgIGNvbnN0IHdyYXBwZXJJc0Fib3ZlVmlld3BvcnQgPSB3cmFwcGVySU8uYm91bmRpbmdDbGllbnRSZWN0LnRvcCA8IDA7XG4gICAgICBjb25zdCB7XG4gICAgICAgIHdpZHRoOiBuZXh0V3JhcHBlcldpZHRoLFxuICAgICAgICBoZWlnaHQ6IG5leHRXcmFwcGVySGVpZ2h0LFxuICAgICAgfSA9IGNvbnRlbnRFbFJlY3Q7XG5cbiAgICAgIGlmICghc2Nyb2xsQW5jaG9yaW5nSXNTdXBwb3J0ZWQuY3VycmVudCAmJiB3cmFwcGVySXNBYm92ZVZpZXdwb3J0KSB7XG4gICAgICAgIHNjcm9sbEhlaWdodC5jdXJyZW50ID0gZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQ7XG4gICAgICB9XG5cbiAgICAgIHNldFdyYXBwZXJEaW1lbnNpb25zKHtcbiAgICAgICAgd2lkdGg6IG5leHRXcmFwcGVyV2lkdGgsXG4gICAgICAgIGhlaWdodDogbmV4dFdyYXBwZXJIZWlnaHQsXG4gICAgICB9KTtcbiAgICB9XG4gIH0sIFtjb250ZW50RWxSZWN0XSk7XG5cbiAgdXNlTGF5b3V0RWZmZWN0KCgpID0+IHtcbiAgICAvLyB3cmFwcGVyIGRpZCByZXNpemVcbiAgICBpZiAoc2Nyb2xsQW5jaG9yaW5nSXNTdXBwb3J0ZWQuY3VycmVudCB8fCBzY3JvbGxIZWlnaHQuY3VycmVudCA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHsgc2Nyb2xsSGVpZ2h0OiBjdXJyZW50U2Nyb2xsSGVpZ2h0IH0gPSBkb2N1bWVudC5ib2R5O1xuICAgIGNvbnN0IHsgY3VycmVudDogcHJldlNjcm9sbEhlaWdodCB9ID0gc2Nyb2xsSGVpZ2h0O1xuICAgIGNvbnN0IGN1cnJlbnRTY3JvbGxZID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuICAgIGNvbnN0IG5ld1Njcm9sbFkgPSBjYWxjdWxhdGVOZXdTY3JvbGxZKHtcbiAgICAgIHByZXZTY3JvbGxIZWlnaHQsXG4gICAgICBjdXJyZW50U2Nyb2xsSGVpZ2h0LFxuICAgICAgY3VycmVudFNjcm9sbFksXG4gICAgfSk7XG5cbiAgICBpZiAobmV3U2Nyb2xsWSkge1xuICAgICAgLy8gYWRqdXN0IHNjcm9sbFkgcG9zaXRpb24gdG8gcHJldmVudCB2aXNpYmxlIGp1bXBcbiAgICAgIHdpbmRvdy5zY3JvbGxUbygwLCBuZXdTY3JvbGxZKTtcbiAgICB9XG4gIH0sIFt3cmFwcGVyRGltZW5zaW9uc10pO1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxHbG9iYWxTdHlsZSAvPlxuICAgICAgPFdyYXBwZXJcbiAgICAgICAgd3JhcHBlcldpZHRoPXt3cmFwcGVyRGltZW5zaW9ucy53aWR0aH1cbiAgICAgICAgd3JhcHBlckhlaWdodD17d3JhcHBlckRpbWVuc2lvbnMuaGVpZ2h0fVxuICAgICAgICByZWY9e3dyYXBwZXJFbH1cbiAgICAgID5cbiAgICAgICAge2NoaWxkcmVufVxuICAgICAgPC9XcmFwcGVyPlxuICAgIDwvPlxuICApO1xufTtcblxuQ29udGVudEFuY2hvci5wcm9wVHlwZXMgPSB7XG4gIGNoaWxkcmVuOiBub2RlLmlzUmVxdWlyZWQsXG4gIGluaXRpYWxIZWlnaHQ6IG9uZU9mVHlwZShbbnVtYmVyLCBzdHJpbmddKSxcbiAgaW5pdGlhbFdpZHRoOiBvbmVPZlR5cGUoW251bWJlciwgc3RyaW5nXSksXG59O1xuXG5Db250ZW50QW5jaG9yLmRlZmF1bHRQcm9wcyA9IHtcbiAgaW5pdGlhbEhlaWdodDogJ2F1dG8nLFxuICBpbml0aWFsV2lkdGg6ICdhdXRvJyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IENvbnRlbnRBbmNob3I7XG4iXX0= */"));

var initIntersectionObserver = function initIntersectionObserver(_ref5) {
  var wrapperEl = _ref5.wrapperEl,
      setWrapperIO = _ref5.setWrapperIO;

  var init = function init() {
    var callback = function callback(_ref6) {
      var _ref7 = _slicedToArray(_ref6, 1),
          wrapperEntry = _ref7[0];

      setWrapperIO(wrapperEntry);
    };

    var IO = new IntersectionObserver(callback);
    IO.observe(wrapperEl.current);
    return IO;
  };

  if ('IntersectionObserver' in window) {
    return init();
  }

  return import(
  /* webpackChunkName: "intersection-observer-polyfill" */
  'intersection-observer').then(function () {
    IntersectionObserver.prototype.POLL_INTERVAL = 100;
    return init();
  });
};

var initResizeObserver = function initResizeObserver(_ref8) {
  var wrapperEl = _ref8.wrapperEl,
      setContentElRect = _ref8.setContentElRect;

  var init = function init(ResizeObserver) {
    var callback = function callback(_ref9) {
      var _ref10 = _slicedToArray(_ref9, 1),
          contentEntry = _ref10[0];

      setContentElRect(contentEntry.contentRect);
    };

    var RO = new ResizeObserver(callback);
    RO.observe(wrapperEl.current.firstChild);
    return RO;
  };

  if ('ResizeObserver' in window) {
    return init(ResizeObserver);
  }

  return import(
  /* webpackChunkName: "resize-observer-polyfill" */
  '@juggle/resize-observer').then(function (module) {
    var ResizeObserver = module.default;
    return init(ResizeObserver);
  });
};

var isScrollAnchoringSupported = function isScrollAnchoringSupported() {
  // https://drafts.csswg.org/css-scroll-anchoring/
  if ('CSS' in window) {
    return CSS.supports('overflow-anchor', 'auto');
  }

  return false;
};

var ContentAnchor = function ContentAnchor(_ref11) {
  var children = _ref11.children,
      initialHeight = _ref11.initialHeight,
      initialWidth = _ref11.initialWidth;
  var wrapperEl = useRef(null);
  var scrollHeight = useRef(null);
  var scrollAnchoringIsSupported = useRef(null);

  var _useState = useState({}),
      _useState2 = _slicedToArray(_useState, 2),
      wrapperIO = _useState2[0],
      setWrapperIO = _useState2[1];

  var _useState3 = useState({}),
      _useState4 = _slicedToArray(_useState3, 2),
      contentElRect = _useState4[0],
      setContentElRect = _useState4[1];

  var _useState5 = useState({
    height: initialHeight,
    width: initialWidth
  }),
      _useState6 = _slicedToArray(_useState5, 2),
      wrapperDimensions = _useState6[0],
      setWrapperDimensions = _useState6[1];

  useEffect(function () {
    // component did mount
    var IO = initIntersectionObserver({
      wrapperEl: wrapperEl,
      setWrapperIO: setWrapperIO
    });
    var RO = initResizeObserver({
      wrapperEl: wrapperEl,
      setContentElRect: setContentElRect
    });
    scrollAnchoringIsSupported.current = isScrollAnchoringSupported();
    return function cleanup() {
      IO.disconnect();
      RO.disconnect();
    };
  }, []);
  useLayoutEffect(function () {
    // child content did resize
    var wrapperIsOutOfView = wrapperIO.isIntersecting === false;

    if (wrapperIsOutOfView) {
      // wrapper will resize
      var wrapperIsAboveViewport = wrapperIO.boundingClientRect.top < 0;
      var nextWrapperWidth = contentElRect.width,
          nextWrapperHeight = contentElRect.height;

      if (!scrollAnchoringIsSupported.current && wrapperIsAboveViewport) {
        scrollHeight.current = document.body.scrollHeight;
      }

      setWrapperDimensions({
        width: nextWrapperWidth,
        height: nextWrapperHeight
      });
    }
  }, [contentElRect]);
  useLayoutEffect(function () {
    // wrapper did resize
    if (scrollAnchoringIsSupported.current || scrollHeight.current === null) {
      return;
    }

    var currentScrollHeight = document.body.scrollHeight;
    var prevScrollHeight = scrollHeight.current;
    var currentScrollY = window.pageYOffset;
    var newScrollY = calculateNewScrollY({
      prevScrollHeight: prevScrollHeight,
      currentScrollHeight: currentScrollHeight,
      currentScrollY: currentScrollY
    });

    if (newScrollY) {
      // adjust scrollY position to prevent visible jump
      window.scrollTo(0, newScrollY);
    }
  }, [wrapperDimensions]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(GlobalStyle, null), /*#__PURE__*/React.createElement(Wrapper, {
    wrapperWidth: wrapperDimensions.width,
    wrapperHeight: wrapperDimensions.height,
    ref: wrapperEl
  }, children));
};

ContentAnchor.propTypes = {
  children: node.isRequired,
  initialHeight: oneOfType([number, string]),
  initialWidth: oneOfType([number, string])
};
ContentAnchor.defaultProps = {
  initialHeight: 'auto',
  initialWidth: 'auto'
};
export default ContentAnchor;