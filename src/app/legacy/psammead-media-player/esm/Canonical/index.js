import _styled from "@emotion/styled/base";

function _EMOTION_STRINGIFIED_CSS_ERROR__() { return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."; }

import React, { useEffect } from 'react';
import { string, bool, func, arrayOf } from 'prop-types';
import ImagePlaceholder from '@bbc/psammead-image-placeholder';
import Message from '../Message'; // XSS protection to ensure we only react to events sent from recognised origins

var isValidEvent = function isValidEvent(_ref, acceptableEventOrigins) {
  var origin = _ref.origin;
  return RegExp("^https?://(".concat(acceptableEventOrigins.join('|'), ")(:|/|$)"), 'i').test(origin);
};

var Canonical = function Canonical(_ref2) {
  var src = _ref2.src,
      placeholderSrcset = _ref2.placeholderSrcset,
      title = _ref2.title,
      placeholderSrc = _ref2.placeholderSrc,
      service = _ref2.service,
      noJsMessage = _ref2.noJsMessage,
      showPlaceholder = _ref2.showPlaceholder,
      showLoadingImage = _ref2.showLoadingImage,
      darkMode = _ref2.darkMode,
      onMediaInitialised = _ref2.onMediaInitialised,
      onMediaPlaying = _ref2.onMediaPlaying,
      onMediaPause = _ref2.onMediaPause,
      onMediaEnded = _ref2.onMediaEnded,
      onMediaPlaylistEnded = _ref2.onMediaPlaylistEnded,
      onMediaError = _ref2.onMediaError,
      acceptableEventOrigins = _ref2.acceptableEventOrigins;
  var backgroundStyle = "\n    background-image: url(".concat(placeholderSrc, ");\n    background-repeat: no-repeat;\n    background-size: contain;\n  ");

  var LoadingImageWrapper = _styled("div", process.env.NODE_ENV === "production" ? {
    target: "eqo19v61"
  } : {
    target: "eqo19v61",
    label: "LoadingImageWrapper"
  })(process.env.NODE_ENV === "production" ? {
    name: "1q19oq5",
    styles: "position:absolute;left:0;top:0;width:100%;height:100%"
  } : {
    name: "1q19oq5",
    styles: "position:absolute;left:0;top:0;width:100%;height:100%",
    map: "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9DYW5vbmljYWwvaW5kZXguanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQW9Dd0MiLCJmaWxlIjoiLi4vLi4vc3JjL0Nhbm9uaWNhbC9pbmRleC5qc3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgc3RyaW5nLCBib29sLCBmdW5jLCBhcnJheU9mIH0gZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgSW1hZ2VQbGFjZWhvbGRlciBmcm9tICdAYmJjL3BzYW1tZWFkLWltYWdlLXBsYWNlaG9sZGVyJztcbmltcG9ydCBNZXNzYWdlIGZyb20gJy4uL01lc3NhZ2UnO1xuXG4vLyBYU1MgcHJvdGVjdGlvbiB0byBlbnN1cmUgd2Ugb25seSByZWFjdCB0byBldmVudHMgc2VudCBmcm9tIHJlY29nbmlzZWQgb3JpZ2luc1xuY29uc3QgaXNWYWxpZEV2ZW50ID0gKHsgb3JpZ2luIH0sIGFjY2VwdGFibGVFdmVudE9yaWdpbnMpID0+XG4gIFJlZ0V4cChgXmh0dHBzPzovLygke2FjY2VwdGFibGVFdmVudE9yaWdpbnMuam9pbignfCcpfSkoOnwvfCQpYCwgJ2knKS50ZXN0KFxuICAgIG9yaWdpbixcbiAgKTtcblxuY29uc3QgQ2Fub25pY2FsID0gKHtcbiAgc3JjLFxuICBwbGFjZWhvbGRlclNyY3NldCxcbiAgdGl0bGUsXG4gIHBsYWNlaG9sZGVyU3JjLFxuICBzZXJ2aWNlLFxuICBub0pzTWVzc2FnZSxcbiAgc2hvd1BsYWNlaG9sZGVyLFxuICBzaG93TG9hZGluZ0ltYWdlLFxuICBkYXJrTW9kZSxcbiAgb25NZWRpYUluaXRpYWxpc2VkLFxuICBvbk1lZGlhUGxheWluZyxcbiAgb25NZWRpYVBhdXNlLFxuICBvbk1lZGlhRW5kZWQsXG4gIG9uTWVkaWFQbGF5bGlzdEVuZGVkLFxuICBvbk1lZGlhRXJyb3IsXG4gIGFjY2VwdGFibGVFdmVudE9yaWdpbnMsXG59KSA9PiB7XG4gIGNvbnN0IGJhY2tncm91bmRTdHlsZSA9IGBcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJHtwbGFjZWhvbGRlclNyY30pO1xuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xuICBgO1xuXG4gIGNvbnN0IExvYWRpbmdJbWFnZVdyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiAwO1xuICAgIHRvcDogMDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gIGA7XG5cbiAgY29uc3QgU3R5bGVkSWZyYW1lID0gc3R5bGVkLmlmcmFtZWBcbiAgICAke3Nob3dMb2FkaW5nSW1hZ2UgPyBgei1pbmRleDogMWAgOiAnJ307XG4gICAgYm9yZGVyOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICAke3Nob3dQbGFjZWhvbGRlciA/IGJhY2tncm91bmRTdHlsZSA6IG51bGx9XG4gIGA7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBoYW5kbGVyID0gZSA9PiB7XG4gICAgICBpZiAoIWlzVmFsaWRFdmVudChlLCBhY2NlcHRhYmxlRXZlbnRPcmlnaW5zKSkgcmV0dXJuO1xuXG4gICAgICBjb25zdCBjYWxsYmFjayA9IHtcbiAgICAgICAgbWVkaWFJbml0aWFsaXNlZDogb25NZWRpYUluaXRpYWxpc2VkLFxuICAgICAgICBtZWRpYVBsYXlpbmc6IG9uTWVkaWFQbGF5aW5nLFxuICAgICAgICBtZWRpYVBhdXNlOiBvbk1lZGlhUGF1c2UsXG4gICAgICAgIG1lZGlhRW5kZWQ6IG9uTWVkaWFFbmRlZCxcbiAgICAgICAgbWVkaWFQbGF5bGlzdEVuZGVkOiBvbk1lZGlhUGxheWxpc3RFbmRlZCxcbiAgICAgICAgbWVkaWFFcnJvcjogb25NZWRpYUVycm9yLFxuICAgICAgfVtlLmRhdGEuZXZlbnRdO1xuXG4gICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKGUpO1xuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGhhbmRsZXIpO1xuICAgIHJldHVybiAoKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGhhbmRsZXIpO1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPFN0eWxlZElmcmFtZVxuICAgICAgICBzcmM9e3NyY31cbiAgICAgICAgdGl0bGU9e3RpdGxlfVxuICAgICAgICBhbGxvdz1cImF1dG9wbGF5XCJcbiAgICAgICAgc2Nyb2xsaW5nPVwibm9cIlxuICAgICAgICBnZXN0dXJlPVwibWVkaWFcIlxuICAgICAgICBhbGxvd0Z1bGxTY3JlZW5cbiAgICAgIC8+XG4gICAgICB7c2hvd0xvYWRpbmdJbWFnZSAmJiAoXG4gICAgICAgIDxMb2FkaW5nSW1hZ2VXcmFwcGVyPlxuICAgICAgICAgIDxJbWFnZVBsYWNlaG9sZGVyIHJhdGlvPXs1Ni4yNX0gZGFya01vZGU9e2RhcmtNb2RlfSAvPlxuICAgICAgICA8L0xvYWRpbmdJbWFnZVdyYXBwZXI+XG4gICAgICApfVxuICAgICAgPG5vc2NyaXB0PlxuICAgICAgICA8TWVzc2FnZVxuICAgICAgICAgIHNlcnZpY2U9e3NlcnZpY2V9XG4gICAgICAgICAgbWVzc2FnZT17bm9Kc01lc3NhZ2V9XG4gICAgICAgICAgcGxhY2Vob2xkZXJTcmM9e3BsYWNlaG9sZGVyU3JjfVxuICAgICAgICAgIHBsYWNlaG9sZGVyU3Jjc2V0PXtwbGFjZWhvbGRlclNyY3NldH1cbiAgICAgICAgLz5cbiAgICAgIDwvbm9zY3JpcHQ+XG4gICAgPC8+XG4gICk7XG59O1xuXG5DYW5vbmljYWwucHJvcFR5cGVzID0ge1xuICBzcmM6IHN0cmluZy5pc1JlcXVpcmVkLFxuICBwbGFjZWhvbGRlclNyY3NldDogc3RyaW5nLFxuICB0aXRsZTogc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHBsYWNlaG9sZGVyU3JjOiBzdHJpbmcsXG4gIHNlcnZpY2U6IHN0cmluZy5pc1JlcXVpcmVkLFxuICBub0pzTWVzc2FnZTogc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHNob3dQbGFjZWhvbGRlcjogYm9vbC5pc1JlcXVpcmVkLFxuICBzaG93TG9hZGluZ0ltYWdlOiBib29sLmlzUmVxdWlyZWQsXG4gIGRhcmtNb2RlOiBib29sLmlzUmVxdWlyZWQsXG4gIG9uTWVkaWFJbml0aWFsaXNlZDogZnVuYy5pc1JlcXVpcmVkLFxuICBvbk1lZGlhUGxheWluZzogZnVuYy5pc1JlcXVpcmVkLFxuICBvbk1lZGlhUGF1c2U6IGZ1bmMuaXNSZXF1aXJlZCxcbiAgb25NZWRpYUVuZGVkOiBmdW5jLmlzUmVxdWlyZWQsXG4gIG9uTWVkaWFQbGF5bGlzdEVuZGVkOiBmdW5jLmlzUmVxdWlyZWQsXG4gIG9uTWVkaWFFcnJvcjogZnVuYy5pc1JlcXVpcmVkLFxuICBhY2NlcHRhYmxlRXZlbnRPcmlnaW5zOiBhcnJheU9mKHN0cmluZyksXG59O1xuXG5DYW5vbmljYWwuZGVmYXVsdFByb3BzID0ge1xuICBwbGFjZWhvbGRlclNyYzogbnVsbCxcbiAgcGxhY2Vob2xkZXJTcmNzZXQ6ICcnLFxuICBhY2NlcHRhYmxlRXZlbnRPcmlnaW5zOiBbXG4gICAgJ3d3dy50ZXN0LmJiYy5jb20nLFxuICAgICdwb2xsaW5nLnRlc3QuYmJjLmNvbScsXG4gICAgJ3d3dy5iYmMuY29tJyxcbiAgICAncG9sbGluZy5iYmMuY29tJyxcbiAgICAnbG9jYWxob3N0LmJiYy5jb20nLFxuICAgICdsb2NhbGhvc3QnLFxuICBdLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2Fub25pY2FsO1xuIl19 */",
    toString: _EMOTION_STRINGIFIED_CSS_ERROR__
  });

  var StyledIframe = _styled("iframe", process.env.NODE_ENV === "production" ? {
    target: "eqo19v60"
  } : {
    target: "eqo19v60",
    label: "StyledIframe"
  })(showLoadingImage ? "z-index: 1" : '', ";border:0;left:0;overflow:hidden;position:absolute;top:0;width:100%;height:100%;", showPlaceholder ? backgroundStyle : null, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9DYW5vbmljYWwvaW5kZXguanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQTRDb0MiLCJmaWxlIjoiLi4vLi4vc3JjL0Nhbm9uaWNhbC9pbmRleC5qc3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgc3RyaW5nLCBib29sLCBmdW5jLCBhcnJheU9mIH0gZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgSW1hZ2VQbGFjZWhvbGRlciBmcm9tICdAYmJjL3BzYW1tZWFkLWltYWdlLXBsYWNlaG9sZGVyJztcbmltcG9ydCBNZXNzYWdlIGZyb20gJy4uL01lc3NhZ2UnO1xuXG4vLyBYU1MgcHJvdGVjdGlvbiB0byBlbnN1cmUgd2Ugb25seSByZWFjdCB0byBldmVudHMgc2VudCBmcm9tIHJlY29nbmlzZWQgb3JpZ2luc1xuY29uc3QgaXNWYWxpZEV2ZW50ID0gKHsgb3JpZ2luIH0sIGFjY2VwdGFibGVFdmVudE9yaWdpbnMpID0+XG4gIFJlZ0V4cChgXmh0dHBzPzovLygke2FjY2VwdGFibGVFdmVudE9yaWdpbnMuam9pbignfCcpfSkoOnwvfCQpYCwgJ2knKS50ZXN0KFxuICAgIG9yaWdpbixcbiAgKTtcblxuY29uc3QgQ2Fub25pY2FsID0gKHtcbiAgc3JjLFxuICBwbGFjZWhvbGRlclNyY3NldCxcbiAgdGl0bGUsXG4gIHBsYWNlaG9sZGVyU3JjLFxuICBzZXJ2aWNlLFxuICBub0pzTWVzc2FnZSxcbiAgc2hvd1BsYWNlaG9sZGVyLFxuICBzaG93TG9hZGluZ0ltYWdlLFxuICBkYXJrTW9kZSxcbiAgb25NZWRpYUluaXRpYWxpc2VkLFxuICBvbk1lZGlhUGxheWluZyxcbiAgb25NZWRpYVBhdXNlLFxuICBvbk1lZGlhRW5kZWQsXG4gIG9uTWVkaWFQbGF5bGlzdEVuZGVkLFxuICBvbk1lZGlhRXJyb3IsXG4gIGFjY2VwdGFibGVFdmVudE9yaWdpbnMsXG59KSA9PiB7XG4gIGNvbnN0IGJhY2tncm91bmRTdHlsZSA9IGBcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiB1cmwoJHtwbGFjZWhvbGRlclNyY30pO1xuICAgIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XG4gICAgYmFja2dyb3VuZC1zaXplOiBjb250YWluO1xuICBgO1xuXG4gIGNvbnN0IExvYWRpbmdJbWFnZVdyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBsZWZ0OiAwO1xuICAgIHRvcDogMDtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gIGA7XG5cbiAgY29uc3QgU3R5bGVkSWZyYW1lID0gc3R5bGVkLmlmcmFtZWBcbiAgICAke3Nob3dMb2FkaW5nSW1hZ2UgPyBgei1pbmRleDogMWAgOiAnJ307XG4gICAgYm9yZGVyOiAwO1xuICAgIGxlZnQ6IDA7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgICAke3Nob3dQbGFjZWhvbGRlciA/IGJhY2tncm91bmRTdHlsZSA6IG51bGx9XG4gIGA7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBoYW5kbGVyID0gZSA9PiB7XG4gICAgICBpZiAoIWlzVmFsaWRFdmVudChlLCBhY2NlcHRhYmxlRXZlbnRPcmlnaW5zKSkgcmV0dXJuO1xuXG4gICAgICBjb25zdCBjYWxsYmFjayA9IHtcbiAgICAgICAgbWVkaWFJbml0aWFsaXNlZDogb25NZWRpYUluaXRpYWxpc2VkLFxuICAgICAgICBtZWRpYVBsYXlpbmc6IG9uTWVkaWFQbGF5aW5nLFxuICAgICAgICBtZWRpYVBhdXNlOiBvbk1lZGlhUGF1c2UsXG4gICAgICAgIG1lZGlhRW5kZWQ6IG9uTWVkaWFFbmRlZCxcbiAgICAgICAgbWVkaWFQbGF5bGlzdEVuZGVkOiBvbk1lZGlhUGxheWxpc3RFbmRlZCxcbiAgICAgICAgbWVkaWFFcnJvcjogb25NZWRpYUVycm9yLFxuICAgICAgfVtlLmRhdGEuZXZlbnRdO1xuXG4gICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKGUpO1xuICAgIH07XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGhhbmRsZXIpO1xuICAgIHJldHVybiAoKSA9PiB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignbWVzc2FnZScsIGhhbmRsZXIpO1xuICB9LCBbXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPFN0eWxlZElmcmFtZVxuICAgICAgICBzcmM9e3NyY31cbiAgICAgICAgdGl0bGU9e3RpdGxlfVxuICAgICAgICBhbGxvdz1cImF1dG9wbGF5XCJcbiAgICAgICAgc2Nyb2xsaW5nPVwibm9cIlxuICAgICAgICBnZXN0dXJlPVwibWVkaWFcIlxuICAgICAgICBhbGxvd0Z1bGxTY3JlZW5cbiAgICAgIC8+XG4gICAgICB7c2hvd0xvYWRpbmdJbWFnZSAmJiAoXG4gICAgICAgIDxMb2FkaW5nSW1hZ2VXcmFwcGVyPlxuICAgICAgICAgIDxJbWFnZVBsYWNlaG9sZGVyIHJhdGlvPXs1Ni4yNX0gZGFya01vZGU9e2RhcmtNb2RlfSAvPlxuICAgICAgICA8L0xvYWRpbmdJbWFnZVdyYXBwZXI+XG4gICAgICApfVxuICAgICAgPG5vc2NyaXB0PlxuICAgICAgICA8TWVzc2FnZVxuICAgICAgICAgIHNlcnZpY2U9e3NlcnZpY2V9XG4gICAgICAgICAgbWVzc2FnZT17bm9Kc01lc3NhZ2V9XG4gICAgICAgICAgcGxhY2Vob2xkZXJTcmM9e3BsYWNlaG9sZGVyU3JjfVxuICAgICAgICAgIHBsYWNlaG9sZGVyU3Jjc2V0PXtwbGFjZWhvbGRlclNyY3NldH1cbiAgICAgICAgLz5cbiAgICAgIDwvbm9zY3JpcHQ+XG4gICAgPC8+XG4gICk7XG59O1xuXG5DYW5vbmljYWwucHJvcFR5cGVzID0ge1xuICBzcmM6IHN0cmluZy5pc1JlcXVpcmVkLFxuICBwbGFjZWhvbGRlclNyY3NldDogc3RyaW5nLFxuICB0aXRsZTogc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHBsYWNlaG9sZGVyU3JjOiBzdHJpbmcsXG4gIHNlcnZpY2U6IHN0cmluZy5pc1JlcXVpcmVkLFxuICBub0pzTWVzc2FnZTogc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHNob3dQbGFjZWhvbGRlcjogYm9vbC5pc1JlcXVpcmVkLFxuICBzaG93TG9hZGluZ0ltYWdlOiBib29sLmlzUmVxdWlyZWQsXG4gIGRhcmtNb2RlOiBib29sLmlzUmVxdWlyZWQsXG4gIG9uTWVkaWFJbml0aWFsaXNlZDogZnVuYy5pc1JlcXVpcmVkLFxuICBvbk1lZGlhUGxheWluZzogZnVuYy5pc1JlcXVpcmVkLFxuICBvbk1lZGlhUGF1c2U6IGZ1bmMuaXNSZXF1aXJlZCxcbiAgb25NZWRpYUVuZGVkOiBmdW5jLmlzUmVxdWlyZWQsXG4gIG9uTWVkaWFQbGF5bGlzdEVuZGVkOiBmdW5jLmlzUmVxdWlyZWQsXG4gIG9uTWVkaWFFcnJvcjogZnVuYy5pc1JlcXVpcmVkLFxuICBhY2NlcHRhYmxlRXZlbnRPcmlnaW5zOiBhcnJheU9mKHN0cmluZyksXG59O1xuXG5DYW5vbmljYWwuZGVmYXVsdFByb3BzID0ge1xuICBwbGFjZWhvbGRlclNyYzogbnVsbCxcbiAgcGxhY2Vob2xkZXJTcmNzZXQ6ICcnLFxuICBhY2NlcHRhYmxlRXZlbnRPcmlnaW5zOiBbXG4gICAgJ3d3dy50ZXN0LmJiYy5jb20nLFxuICAgICdwb2xsaW5nLnRlc3QuYmJjLmNvbScsXG4gICAgJ3d3dy5iYmMuY29tJyxcbiAgICAncG9sbGluZy5iYmMuY29tJyxcbiAgICAnbG9jYWxob3N0LmJiYy5jb20nLFxuICAgICdsb2NhbGhvc3QnLFxuICBdLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgQ2Fub25pY2FsO1xuIl19 */"));

  useEffect(function () {
    var handler = function handler(e) {
      if (!isValidEvent(e, acceptableEventOrigins)) return;
      var callback = {
        mediaInitialised: onMediaInitialised,
        mediaPlaying: onMediaPlaying,
        mediaPause: onMediaPause,
        mediaEnded: onMediaEnded,
        mediaPlaylistEnded: onMediaPlaylistEnded,
        mediaError: onMediaError
      }[e.data.event];
      if (callback) callback(e);
    };

    window.addEventListener('message', handler);
    return function () {
      return window.removeEventListener('message', handler);
    };
  }, []);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(StyledIframe, {
    src: src,
    title: title,
    allow: "autoplay",
    scrolling: "no",
    gesture: "media",
    allowFullScreen: true
  }), showLoadingImage && /*#__PURE__*/React.createElement(LoadingImageWrapper, null, /*#__PURE__*/React.createElement(ImagePlaceholder, {
    ratio: 56.25,
    darkMode: darkMode
  })), /*#__PURE__*/React.createElement("noscript", null, /*#__PURE__*/React.createElement(Message, {
    service: service,
    message: noJsMessage,
    placeholderSrc: placeholderSrc,
    placeholderSrcset: placeholderSrcset
  })));
};

Canonical.propTypes = {
  src: string.isRequired,
  placeholderSrcset: string,
  title: string.isRequired,
  placeholderSrc: string,
  service: string.isRequired,
  noJsMessage: string.isRequired,
  showPlaceholder: bool.isRequired,
  showLoadingImage: bool.isRequired,
  darkMode: bool.isRequired,
  onMediaInitialised: func.isRequired,
  onMediaPlaying: func.isRequired,
  onMediaPause: func.isRequired,
  onMediaEnded: func.isRequired,
  onMediaPlaylistEnded: func.isRequired,
  onMediaError: func.isRequired,
  acceptableEventOrigins: arrayOf(string)
};
Canonical.defaultProps = {
  placeholderSrc: null,
  placeholderSrcset: '',
  acceptableEventOrigins: ['www.test.bbc.com', 'polling.test.bbc.com', 'www.bbc.com', 'polling.bbc.com', 'localhost.bbc.com', 'localhost']
};
export default Canonical;