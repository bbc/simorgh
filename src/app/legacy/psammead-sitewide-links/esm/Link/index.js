import _styled from "@emotion/styled/base";
import React from 'react';
import { string, bool } from 'prop-types';
import { C_WHITE } from '@bbc/psammead-styles/colours';
import { GEL_SPACING } from '@bbc/gel-foundations/spacings';

var StyledLink = _styled("a", process.env.NODE_ENV === "production" ? {
  target: "en832a51"
} : {
  target: "en832a51",
  label: "StyledLink"
})("padding:", GEL_SPACING, " 0 ", GEL_SPACING, ";color:", C_WHITE, ";font-weight:700;text-decoration:none;display:", function (_ref) {
  var inline = _ref.inline;
  return inline ? 'inline' : 'block';
}, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9MaW5rL2luZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFNMkIiLCJmaWxlIjoiLi4vLi4vc3JjL0xpbmsvaW5kZXguanN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IHN0cmluZywgYm9vbCB9IGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgQ19XSElURSB9IGZyb20gJ0BiYmMvcHNhbW1lYWQtc3R5bGVzL2NvbG91cnMnO1xuaW1wb3J0IHsgR0VMX1NQQUNJTkcgfSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy9zcGFjaW5ncyc7XG5cbmNvbnN0IFN0eWxlZExpbmsgPSBzdHlsZWQuYWBcbiAgcGFkZGluZzogJHtHRUxfU1BBQ0lOR30gMCAke0dFTF9TUEFDSU5HfTtcbiAgY29sb3I6ICR7Q19XSElURX07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7IC8qIFVzZWQgaW5zdGVhZCBvZiBSZWl0aCBTYW5zIEJvbGQgc2luY2UgaXQgaXMgbm90IHdvcnRoIHRoZSBwZXJmb3JtYW5jZSBjb3N0IGluIHRoaXMgY2FzZS4gKi9cbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBkaXNwbGF5OiAkeyh7IGlubGluZSB9KSA9PiAoaW5saW5lID8gJ2lubGluZScgOiAnYmxvY2snKX07XG5gO1xuXG5jb25zdCBTdHlsZUxpbmtUZXh0ID0gc3R5bGVkLnNwYW5gXG4gICR7Lyogc2Mtc2VsZWN0b3IgKi8gU3R5bGVkTGlua306aG92ZXIgJixcbiAgJHsvKiBzYy1zZWxlY3RvciAqLyBTdHlsZWRMaW5rfTpmb2N1cyAmIHtcbiAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbiAgfVxuYDtcblxuY29uc3QgTGluayA9ICh7IHRleHQsIGhyZWYsIGlubGluZSwgbGFuZyB9KSA9PiAoXG4gIDxTdHlsZWRMaW5rIGxhbmc9e2xhbmd9IGlubGluZT17aW5saW5lfSBocmVmPXtocmVmfT5cbiAgICA8U3R5bGVMaW5rVGV4dD57dGV4dH08L1N0eWxlTGlua1RleHQ+XG4gIDwvU3R5bGVkTGluaz5cbik7XG5cbkxpbmsuZGVmYXVsdFByb3BzID0ge1xuICBpbmxpbmU6IGZhbHNlLFxuICBsYW5nOiBudWxsLFxufTtcblxuTGluay5wcm9wVHlwZXMgPSB7XG4gIGhyZWY6IHN0cmluZy5pc1JlcXVpcmVkLFxuICB0ZXh0OiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgbGFuZzogc3RyaW5nLFxuICBpbmxpbmU6IGJvb2wsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBMaW5rO1xuIl19 */"));

var StyleLinkText = _styled("span", process.env.NODE_ENV === "production" ? {
  target: "en832a50"
} : {
  target: "en832a50",
  label: "StyleLinkText"
})(
/* sc-selector */
StyledLink, ":hover &,",
/* sc-selector */
StyledLink, ":focus &{text-decoration:underline;}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9MaW5rL2luZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFjaUMiLCJmaWxlIjoiLi4vLi4vc3JjL0xpbmsvaW5kZXguanN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IHN0cmluZywgYm9vbCB9IGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgQ19XSElURSB9IGZyb20gJ0BiYmMvcHNhbW1lYWQtc3R5bGVzL2NvbG91cnMnO1xuaW1wb3J0IHsgR0VMX1NQQUNJTkcgfSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy9zcGFjaW5ncyc7XG5cbmNvbnN0IFN0eWxlZExpbmsgPSBzdHlsZWQuYWBcbiAgcGFkZGluZzogJHtHRUxfU1BBQ0lOR30gMCAke0dFTF9TUEFDSU5HfTtcbiAgY29sb3I6ICR7Q19XSElURX07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7IC8qIFVzZWQgaW5zdGVhZCBvZiBSZWl0aCBTYW5zIEJvbGQgc2luY2UgaXQgaXMgbm90IHdvcnRoIHRoZSBwZXJmb3JtYW5jZSBjb3N0IGluIHRoaXMgY2FzZS4gKi9cbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBkaXNwbGF5OiAkeyh7IGlubGluZSB9KSA9PiAoaW5saW5lID8gJ2lubGluZScgOiAnYmxvY2snKX07XG5gO1xuXG5jb25zdCBTdHlsZUxpbmtUZXh0ID0gc3R5bGVkLnNwYW5gXG4gICR7Lyogc2Mtc2VsZWN0b3IgKi8gU3R5bGVkTGlua306aG92ZXIgJixcbiAgJHsvKiBzYy1zZWxlY3RvciAqLyBTdHlsZWRMaW5rfTpmb2N1cyAmIHtcbiAgICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbiAgfVxuYDtcblxuY29uc3QgTGluayA9ICh7IHRleHQsIGhyZWYsIGlubGluZSwgbGFuZyB9KSA9PiAoXG4gIDxTdHlsZWRMaW5rIGxhbmc9e2xhbmd9IGlubGluZT17aW5saW5lfSBocmVmPXtocmVmfT5cbiAgICA8U3R5bGVMaW5rVGV4dD57dGV4dH08L1N0eWxlTGlua1RleHQ+XG4gIDwvU3R5bGVkTGluaz5cbik7XG5cbkxpbmsuZGVmYXVsdFByb3BzID0ge1xuICBpbmxpbmU6IGZhbHNlLFxuICBsYW5nOiBudWxsLFxufTtcblxuTGluay5wcm9wVHlwZXMgPSB7XG4gIGhyZWY6IHN0cmluZy5pc1JlcXVpcmVkLFxuICB0ZXh0OiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgbGFuZzogc3RyaW5nLFxuICBpbmxpbmU6IGJvb2wsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBMaW5rO1xuIl19 */"));

var Link = function Link(_ref2) {
  var text = _ref2.text,
      href = _ref2.href,
      inline = _ref2.inline,
      lang = _ref2.lang;
  return /*#__PURE__*/React.createElement(StyledLink, {
    lang: lang,
    inline: inline,
    href: href
  }, /*#__PURE__*/React.createElement(StyleLinkText, null, text));
};

Link.defaultProps = {
  inline: false,
  lang: null
};
Link.propTypes = {
  href: string.isRequired,
  text: string.isRequired,
  lang: string,
  inline: bool
};
export default Link;