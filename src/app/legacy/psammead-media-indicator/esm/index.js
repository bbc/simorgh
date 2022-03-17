import _styled from '@emotion/styled/base';

function _EMOTION_STRINGIFIED_CSS_ERROR__() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}

import React from 'react';
import { node, bool, string, oneOf, shape } from 'prop-types';
import { C_WHITE, C_EBON } from '#legacy/psammead-styles/colours';
import { GEL_SPACING } from '#legacy/gel-foundations/spacings';
import { getMinion } from '#legacy/gel-foundations/typography';
import { getSansRegular } from '#legacy/psammead-styles/font-styles';
import { scriptPropType } from '#legacy/gel-foundations/prop-types';
import { mediaIcons } from '#legacy/psammead-assets/svgs';

var StyledMediaIndicator = _styled(
  'div',
  process.env.NODE_ENV === 'production'
    ? {
        target: 'e1bj7urb1',
      }
    : {
        target: 'e1bj7urb1',
        label: 'StyledMediaIndicator',
      },
)(
  'color:',
  C_EBON,
  ';background-color:',
  C_WHITE,
  ';',
  function (_ref) {
    var service = _ref.service;
    return getSansRegular(service);
  },
  ' ',
  function (_ref2) {
    var script = _ref2.script;
    return script && getMinion(script);
  },
  ';',
  function (_ref3) {
    var isInline = _ref3.isInline,
      dir = _ref3.dir;
    return isInline
      ? '\n          display: inline-block;\n          vertical-align: middle;\n          padding-'
          .concat(dir === 'rtl' ? 'left' : 'right', ': ')
          .concat(GEL_SPACING, ';\n        ')
      : '\n          display: block;\n        ';
  },
  ';' +
    (process.env.NODE_ENV === 'production'
      ? ''
      : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBVXVDIiwiZmlsZSI6Ii4uL3NyYy9pbmRleC5qc3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgbm9kZSwgYm9vbCwgc3RyaW5nLCBvbmVPZiwgc2hhcGUgfSBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCB7IENfV0hJVEUsIENfRUJPTiB9IGZyb20gJ0BiYmMvcHNhbW1lYWQtc3R5bGVzL2NvbG91cnMnO1xuaW1wb3J0IHsgR0VMX1NQQUNJTkcgfSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy9zcGFjaW5ncyc7XG5pbXBvcnQgeyBnZXRNaW5pb24gfSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy90eXBvZ3JhcGh5JztcbmltcG9ydCB7IGdldFNhbnNSZWd1bGFyIH0gZnJvbSAnQGJiYy9wc2FtbWVhZC1zdHlsZXMvZm9udC1zdHlsZXMnO1xuaW1wb3J0IHsgc2NyaXB0UHJvcFR5cGUgfSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy9wcm9wLXR5cGVzJztcbmltcG9ydCB7IG1lZGlhSWNvbnMgfSBmcm9tICdAYmJjL3BzYW1tZWFkLWFzc2V0cy9zdmdzJztcblxuY29uc3QgU3R5bGVkTWVkaWFJbmRpY2F0b3IgPSBzdHlsZWQuZGl2YFxuICBjb2xvcjogJHtDX0VCT059O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAke0NfV0hJVEV9O1xuICAkeyh7IHNlcnZpY2UgfSkgPT4gZ2V0U2Fuc1JlZ3VsYXIoc2VydmljZSl9XG4gICR7KHsgc2NyaXB0IH0pID0+IHNjcmlwdCAmJiBnZXRNaW5pb24oc2NyaXB0KX07XG5cbiAgJHsoeyBpc0lubGluZSwgZGlyIH0pID0+XG4gICAgaXNJbmxpbmVcbiAgICAgID8gYFxuICAgICAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgICAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICAgICAgICAgIHBhZGRpbmctJHtkaXIgPT09ICdydGwnID8gJ2xlZnQnIDogJ3JpZ2h0J306ICR7R0VMX1NQQUNJTkd9O1xuICAgICAgICBgXG4gICAgICA6IGBcbiAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgYH1cbmA7XG5cbmNvbnN0IEZsZXhXcmFwcGVyID0gc3R5bGVkLmRpdmBcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgaGVpZ2h0OiAxMDAlO1xuYDtcblxuY29uc3QgTWVkaWFJbmRpY2F0b3IgPSAoeyB0eXBlLCBzY3JpcHQsIHNlcnZpY2UsIGRpciwgaXNJbmxpbmUsIGNoaWxkcmVuIH0pID0+IChcbiAgPFN0eWxlZE1lZGlhSW5kaWNhdG9yXG4gICAgZGF0YS1lMmU9XCJtZWRpYS1pbmRpY2F0b3JcIlxuICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgc2NyaXB0PXtzY3JpcHR9XG4gICAgc2VydmljZT17c2VydmljZX1cbiAgICBkaXI9e2Rpcn1cbiAgICBpc0lubGluZT17aXNJbmxpbmV9XG4gID5cbiAgICA8RmxleFdyYXBwZXI+XG4gICAgICB7bWVkaWFJY29uc1t0eXBlXX1cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L0ZsZXhXcmFwcGVyPlxuICA8L1N0eWxlZE1lZGlhSW5kaWNhdG9yPlxuKTtcblxuTWVkaWFJbmRpY2F0b3IucHJvcFR5cGVzID0ge1xuICB0eXBlOiBvbmVPZihbJ3ZpZGVvJywgJ2F1ZGlvJywgJ3Bob3RvZ2FsbGVyeSddKSxcbiAgc2NyaXB0OiBzaGFwZShzY3JpcHRQcm9wVHlwZSkuaXNSZXF1aXJlZCxcbiAgc2VydmljZTogc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGRpcjogb25lT2YoWydsdHInLCAncnRsJ10pLFxuICBpc0lubGluZTogYm9vbCxcbiAgY2hpbGRyZW46IG5vZGUsXG59O1xuXG5NZWRpYUluZGljYXRvci5kZWZhdWx0UHJvcHMgPSB7XG4gIHR5cGU6ICd2aWRlbycsXG4gIGRpcjogJ2x0cicsXG4gIGlzSW5saW5lOiBmYWxzZSxcbiAgY2hpbGRyZW46IG51bGwsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBNZWRpYUluZGljYXRvcjtcbiJdfQ== */'),
);

var FlexWrapper = _styled(
  'div',
  process.env.NODE_ENV === 'production'
    ? {
        target: 'e1bj7urb0',
      }
    : {
        target: 'e1bj7urb0',
        label: 'FlexWrapper',
      },
)(
  process.env.NODE_ENV === 'production'
    ? {
        name: '197dxto',
        styles: 'display:flex;align-items:center;height:100%',
      }
    : {
        name: '197dxto',
        styles: 'display:flex;align-items:center;height:100%',
        map: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNEI4QiIsImZpbGUiOiIuLi9zcmMvaW5kZXguanN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IG5vZGUsIGJvb2wsIHN0cmluZywgb25lT2YsIHNoYXBlIH0gZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBDX1dISVRFLCBDX0VCT04gfSBmcm9tICdAYmJjL3BzYW1tZWFkLXN0eWxlcy9jb2xvdXJzJztcbmltcG9ydCB7IEdFTF9TUEFDSU5HIH0gZnJvbSAnQGJiYy9nZWwtZm91bmRhdGlvbnMvc3BhY2luZ3MnO1xuaW1wb3J0IHsgZ2V0TWluaW9uIH0gZnJvbSAnQGJiYy9nZWwtZm91bmRhdGlvbnMvdHlwb2dyYXBoeSc7XG5pbXBvcnQgeyBnZXRTYW5zUmVndWxhciB9IGZyb20gJ0BiYmMvcHNhbW1lYWQtc3R5bGVzL2ZvbnQtc3R5bGVzJztcbmltcG9ydCB7IHNjcmlwdFByb3BUeXBlIH0gZnJvbSAnQGJiYy9nZWwtZm91bmRhdGlvbnMvcHJvcC10eXBlcyc7XG5pbXBvcnQgeyBtZWRpYUljb25zIH0gZnJvbSAnQGJiYy9wc2FtbWVhZC1hc3NldHMvc3Zncyc7XG5cbmNvbnN0IFN0eWxlZE1lZGlhSW5kaWNhdG9yID0gc3R5bGVkLmRpdmBcbiAgY29sb3I6ICR7Q19FQk9OfTtcbiAgYmFja2dyb3VuZC1jb2xvcjogJHtDX1dISVRFfTtcbiAgJHsoeyBzZXJ2aWNlIH0pID0+IGdldFNhbnNSZWd1bGFyKHNlcnZpY2UpfVxuICAkeyh7IHNjcmlwdCB9KSA9PiBzY3JpcHQgJiYgZ2V0TWluaW9uKHNjcmlwdCl9O1xuXG4gICR7KHsgaXNJbmxpbmUsIGRpciB9KSA9PlxuICAgIGlzSW5saW5lXG4gICAgICA/IGBcbiAgICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICAgICAgICBwYWRkaW5nLSR7ZGlyID09PSAncnRsJyA/ICdsZWZ0JyA6ICdyaWdodCd9OiAke0dFTF9TUEFDSU5HfTtcbiAgICAgICAgYFxuICAgICAgOiBgXG4gICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgIGB9XG5gO1xuXG5jb25zdCBGbGV4V3JhcHBlciA9IHN0eWxlZC5kaXZgXG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGhlaWdodDogMTAwJTtcbmA7XG5cbmNvbnN0IE1lZGlhSW5kaWNhdG9yID0gKHsgdHlwZSwgc2NyaXB0LCBzZXJ2aWNlLCBkaXIsIGlzSW5saW5lLCBjaGlsZHJlbiB9KSA9PiAoXG4gIDxTdHlsZWRNZWRpYUluZGljYXRvclxuICAgIGRhdGEtZTJlPVwibWVkaWEtaW5kaWNhdG9yXCJcbiAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgIHNjcmlwdD17c2NyaXB0fVxuICAgIHNlcnZpY2U9e3NlcnZpY2V9XG4gICAgZGlyPXtkaXJ9XG4gICAgaXNJbmxpbmU9e2lzSW5saW5lfVxuICA+XG4gICAgPEZsZXhXcmFwcGVyPlxuICAgICAge21lZGlhSWNvbnNbdHlwZV19XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9GbGV4V3JhcHBlcj5cbiAgPC9TdHlsZWRNZWRpYUluZGljYXRvcj5cbik7XG5cbk1lZGlhSW5kaWNhdG9yLnByb3BUeXBlcyA9IHtcbiAgdHlwZTogb25lT2YoWyd2aWRlbycsICdhdWRpbycsICdwaG90b2dhbGxlcnknXSksXG4gIHNjcmlwdDogc2hhcGUoc2NyaXB0UHJvcFR5cGUpLmlzUmVxdWlyZWQsXG4gIHNlcnZpY2U6IHN0cmluZy5pc1JlcXVpcmVkLFxuICBkaXI6IG9uZU9mKFsnbHRyJywgJ3J0bCddKSxcbiAgaXNJbmxpbmU6IGJvb2wsXG4gIGNoaWxkcmVuOiBub2RlLFxufTtcblxuTWVkaWFJbmRpY2F0b3IuZGVmYXVsdFByb3BzID0ge1xuICB0eXBlOiAndmlkZW8nLFxuICBkaXI6ICdsdHInLFxuICBpc0lubGluZTogZmFsc2UsXG4gIGNoaWxkcmVuOiBudWxsLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgTWVkaWFJbmRpY2F0b3I7XG4iXX0= */',
        toString: _EMOTION_STRINGIFIED_CSS_ERROR__,
      },
);

var MediaIndicator = function MediaIndicator(_ref4) {
  var type = _ref4.type,
    script = _ref4.script,
    service = _ref4.service,
    dir = _ref4.dir,
    isInline = _ref4.isInline,
    children = _ref4.children;
  return /*#__PURE__*/ React.createElement(
    StyledMediaIndicator,
    {
      'data-e2e': 'media-indicator',
      'aria-hidden': 'true',
      script: script,
      service: service,
      dir: dir,
      isInline: isInline,
    },
    /*#__PURE__*/ React.createElement(
      FlexWrapper,
      null,
      mediaIcons[type],
      children,
    ),
  );
};

MediaIndicator.propTypes = {
  type: oneOf(['video', 'audio', 'photogallery']),
  script: shape(scriptPropType).isRequired,
  service: string.isRequired,
  dir: oneOf(['ltr', 'rtl']),
  isInline: bool,
  children: node,
};
MediaIndicator.defaultProps = {
  type: 'video',
  dir: 'ltr',
  isInline: false,
  children: null,
};
export default MediaIndicator;
