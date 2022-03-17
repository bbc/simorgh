import _styled from '@emotion/styled/base';
import { shape, string, bool } from 'prop-types';
import { C_SHADOW, C_LUNAR } from '#legacy/psammead-styles/colours';
import {
  GEL_SPACING_TRPL,
  GEL_SPACING_QUAD,
  GEL_SPACING_QUIN,
} from '#legacy/gel-foundations/spacings';
import { getCanon, getTrafalgar } from '#legacy/gel-foundations/typography';
import { MEDIA_QUERY_TYPOGRAPHY } from '#legacy/gel-foundations/breakpoints';
import { scriptPropType } from '#legacy/gel-foundations/prop-types';
import {
  getSansBold,
  getSerifMedium,
} from '#legacy/psammead-styles/font-styles';
export var Headline = _styled(
  'h1',
  process.env.NODE_ENV === 'production'
    ? {
        target: 'e14hemmw1',
      }
    : {
        target: 'e14hemmw1',
        label: 'Headline',
      },
)(
  function (_ref) {
    var script = _ref.script;
    return script && getCanon(script);
  },
  ';',
  function (_ref2) {
    var service = _ref2.service;
    return getSerifMedium(service);
  },
  ' color:',
  function (_ref3) {
    var darkMode = _ref3.darkMode;
    return darkMode ? C_LUNAR : C_SHADOW;
  },
  ';display:block;margin:0;padding:',
  GEL_SPACING_QUAD,
  ' 0;',
  MEDIA_QUERY_TYPOGRAPHY.LAPTOP_AND_LARGER,
  '{padding:',
  GEL_SPACING_QUIN,
  ' 0;}' +
    (process.env.NODE_ENV === 'production'
      ? ''
      : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBYWlDIiwiZmlsZSI6Ii4uL3NyYy9pbmRleC5qc3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBzaGFwZSwgc3RyaW5nLCBib29sIH0gZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgeyBDX1NIQURPVywgQ19MVU5BUiB9IGZyb20gJ0BiYmMvcHNhbW1lYWQtc3R5bGVzL2NvbG91cnMnO1xuaW1wb3J0IHtcbiAgR0VMX1NQQUNJTkdfVFJQTCxcbiAgR0VMX1NQQUNJTkdfUVVBRCxcbiAgR0VMX1NQQUNJTkdfUVVJTixcbn0gZnJvbSAnQGJiYy9nZWwtZm91bmRhdGlvbnMvc3BhY2luZ3MnO1xuaW1wb3J0IHsgZ2V0Q2Fub24sIGdldFRyYWZhbGdhciB9IGZyb20gJ0BiYmMvZ2VsLWZvdW5kYXRpb25zL3R5cG9ncmFwaHknO1xuaW1wb3J0IHsgTUVESUFfUVVFUllfVFlQT0dSQVBIWSB9IGZyb20gJ0BiYmMvZ2VsLWZvdW5kYXRpb25zL2JyZWFrcG9pbnRzJztcbmltcG9ydCB7IHNjcmlwdFByb3BUeXBlIH0gZnJvbSAnQGJiYy9nZWwtZm91bmRhdGlvbnMvcHJvcC10eXBlcyc7XG5pbXBvcnQgeyBnZXRTYW5zQm9sZCwgZ2V0U2VyaWZNZWRpdW0gfSBmcm9tICdAYmJjL3BzYW1tZWFkLXN0eWxlcy9mb250LXN0eWxlcyc7XG5cbmV4cG9ydCBjb25zdCBIZWFkbGluZSA9IHN0eWxlZC5oMWBcbiAgJHsoeyBzY3JpcHQgfSkgPT4gc2NyaXB0ICYmIGdldENhbm9uKHNjcmlwdCl9O1xuICAkeyh7IHNlcnZpY2UgfSkgPT4gZ2V0U2VyaWZNZWRpdW0oc2VydmljZSl9XG4gIGNvbG9yOiAkeyh7IGRhcmtNb2RlIH0pID0+IChkYXJrTW9kZSA/IENfTFVOQVIgOiBDX1NIQURPVyl9O1xuICBkaXNwbGF5OiBibG9jazsgLyogRXhwbGljaXRseSBzZXQgKi9cbiAgbWFyZ2luOiAwOyAvKiBSZXNldCAqL1xuICBwYWRkaW5nOiAke0dFTF9TUEFDSU5HX1FVQUR9IDA7XG4gICR7TUVESUFfUVVFUllfVFlQT0dSQVBIWS5MQVBUT1BfQU5EX0xBUkdFUn0ge1xuICAgIHBhZGRpbmc6ICR7R0VMX1NQQUNJTkdfUVVJTn0gMDtcbiAgfVxuYDtcblxuSGVhZGxpbmUucHJvcFR5cGVzID0ge1xuICBzY3JpcHQ6IHNoYXBlKHNjcmlwdFByb3BUeXBlKS5pc1JlcXVpcmVkLFxuICBzZXJ2aWNlOiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgZGFya01vZGU6IGJvb2wsXG59O1xuXG5IZWFkbGluZS5kZWZhdWx0UHJvcHMgPSB7XG4gIGRhcmtNb2RlOiBmYWxzZSxcbn07XG5cbmV4cG9ydCBjb25zdCBTdWJIZWFkaW5nID0gc3R5bGVkLmgyYFxuICAkeyh7IHNjcmlwdCB9KSA9PiBzY3JpcHQgJiYgZ2V0VHJhZmFsZ2FyKHNjcmlwdCl9O1xuICAkeyh7IHNlcnZpY2UgfSkgPT4gZ2V0U2Fuc0JvbGQoc2VydmljZSl9XG4gIGNvbG9yOiAkeyh7IGRhcmtNb2RlIH0pID0+IChkYXJrTW9kZSA/IENfTFVOQVIgOiBDX1NIQURPVyl9O1xuICBtYXJnaW46IDA7IC8qIFJlc2V0ICovXG4gIHBhZGRpbmc6ICR7R0VMX1NQQUNJTkdfVFJQTH0gMDtcbiAgJHtNRURJQV9RVUVSWV9UWVBPR1JBUEhZLkxBUFRPUF9BTkRfTEFSR0VSfSB7XG4gICAgcGFkZGluZy10b3A6ICR7R0VMX1NQQUNJTkdfUVVBRH07XG4gIH1cbmA7XG5cblN1YkhlYWRpbmcucHJvcFR5cGVzID0ge1xuICBzY3JpcHQ6IHNoYXBlKHNjcmlwdFByb3BUeXBlKS5pc1JlcXVpcmVkLFxuICBzZXJ2aWNlOiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgZGFya01vZGU6IGJvb2wsXG59O1xuXG5TdWJIZWFkaW5nLmRlZmF1bHRQcm9wcyA9IHtcbiAgZGFya01vZGU6IGZhbHNlLFxuICB0YWJJbmRleDogJy0xJyxcbn07XG4iXX0= */'),
);
Headline.propTypes = {
  script: shape(scriptPropType).isRequired,
  service: string.isRequired,
  darkMode: bool,
};
Headline.defaultProps = {
  darkMode: false,
};
export var SubHeading = _styled(
  'h2',
  process.env.NODE_ENV === 'production'
    ? {
        target: 'e14hemmw0',
      }
    : {
        target: 'e14hemmw0',
        label: 'SubHeading',
      },
)(
  function (_ref4) {
    var script = _ref4.script;
    return script && getTrafalgar(script);
  },
  ';',
  function (_ref5) {
    var service = _ref5.service;
    return getSansBold(service);
  },
  ' color:',
  function (_ref6) {
    var darkMode = _ref6.darkMode;
    return darkMode ? C_LUNAR : C_SHADOW;
  },
  ';margin:0;padding:',
  GEL_SPACING_TRPL,
  ' 0;',
  MEDIA_QUERY_TYPOGRAPHY.LAPTOP_AND_LARGER,
  '{padding-top:',
  GEL_SPACING_QUAD,
  ';}' +
    (process.env.NODE_ENV === 'production'
      ? ''
      : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBbUNtQyIsImZpbGUiOiIuLi9zcmMvaW5kZXguanN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgc2hhcGUsIHN0cmluZywgYm9vbCB9IGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgQ19TSEFET1csIENfTFVOQVIgfSBmcm9tICdAYmJjL3BzYW1tZWFkLXN0eWxlcy9jb2xvdXJzJztcbmltcG9ydCB7XG4gIEdFTF9TUEFDSU5HX1RSUEwsXG4gIEdFTF9TUEFDSU5HX1FVQUQsXG4gIEdFTF9TUEFDSU5HX1FVSU4sXG59IGZyb20gJ0BiYmMvZ2VsLWZvdW5kYXRpb25zL3NwYWNpbmdzJztcbmltcG9ydCB7IGdldENhbm9uLCBnZXRUcmFmYWxnYXIgfSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy90eXBvZ3JhcGh5JztcbmltcG9ydCB7IE1FRElBX1FVRVJZX1RZUE9HUkFQSFkgfSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy9icmVha3BvaW50cyc7XG5pbXBvcnQgeyBzY3JpcHRQcm9wVHlwZSB9IGZyb20gJ0BiYmMvZ2VsLWZvdW5kYXRpb25zL3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgZ2V0U2Fuc0JvbGQsIGdldFNlcmlmTWVkaXVtIH0gZnJvbSAnQGJiYy9wc2FtbWVhZC1zdHlsZXMvZm9udC1zdHlsZXMnO1xuXG5leHBvcnQgY29uc3QgSGVhZGxpbmUgPSBzdHlsZWQuaDFgXG4gICR7KHsgc2NyaXB0IH0pID0+IHNjcmlwdCAmJiBnZXRDYW5vbihzY3JpcHQpfTtcbiAgJHsoeyBzZXJ2aWNlIH0pID0+IGdldFNlcmlmTWVkaXVtKHNlcnZpY2UpfVxuICBjb2xvcjogJHsoeyBkYXJrTW9kZSB9KSA9PiAoZGFya01vZGUgPyBDX0xVTkFSIDogQ19TSEFET1cpfTtcbiAgZGlzcGxheTogYmxvY2s7IC8qIEV4cGxpY2l0bHkgc2V0ICovXG4gIG1hcmdpbjogMDsgLyogUmVzZXQgKi9cbiAgcGFkZGluZzogJHtHRUxfU1BBQ0lOR19RVUFEfSAwO1xuICAke01FRElBX1FVRVJZX1RZUE9HUkFQSFkuTEFQVE9QX0FORF9MQVJHRVJ9IHtcbiAgICBwYWRkaW5nOiAke0dFTF9TUEFDSU5HX1FVSU59IDA7XG4gIH1cbmA7XG5cbkhlYWRsaW5lLnByb3BUeXBlcyA9IHtcbiAgc2NyaXB0OiBzaGFwZShzY3JpcHRQcm9wVHlwZSkuaXNSZXF1aXJlZCxcbiAgc2VydmljZTogc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGRhcmtNb2RlOiBib29sLFxufTtcblxuSGVhZGxpbmUuZGVmYXVsdFByb3BzID0ge1xuICBkYXJrTW9kZTogZmFsc2UsXG59O1xuXG5leHBvcnQgY29uc3QgU3ViSGVhZGluZyA9IHN0eWxlZC5oMmBcbiAgJHsoeyBzY3JpcHQgfSkgPT4gc2NyaXB0ICYmIGdldFRyYWZhbGdhcihzY3JpcHQpfTtcbiAgJHsoeyBzZXJ2aWNlIH0pID0+IGdldFNhbnNCb2xkKHNlcnZpY2UpfVxuICBjb2xvcjogJHsoeyBkYXJrTW9kZSB9KSA9PiAoZGFya01vZGUgPyBDX0xVTkFSIDogQ19TSEFET1cpfTtcbiAgbWFyZ2luOiAwOyAvKiBSZXNldCAqL1xuICBwYWRkaW5nOiAke0dFTF9TUEFDSU5HX1RSUEx9IDA7XG4gICR7TUVESUFfUVVFUllfVFlQT0dSQVBIWS5MQVBUT1BfQU5EX0xBUkdFUn0ge1xuICAgIHBhZGRpbmctdG9wOiAke0dFTF9TUEFDSU5HX1FVQUR9O1xuICB9XG5gO1xuXG5TdWJIZWFkaW5nLnByb3BUeXBlcyA9IHtcbiAgc2NyaXB0OiBzaGFwZShzY3JpcHRQcm9wVHlwZSkuaXNSZXF1aXJlZCxcbiAgc2VydmljZTogc3RyaW5nLmlzUmVxdWlyZWQsXG4gIGRhcmtNb2RlOiBib29sLFxufTtcblxuU3ViSGVhZGluZy5kZWZhdWx0UHJvcHMgPSB7XG4gIGRhcmtNb2RlOiBmYWxzZSxcbiAgdGFiSW5kZXg6ICctMScsXG59O1xuIl19 */'),
);
SubHeading.propTypes = {
  script: shape(scriptPropType).isRequired,
  service: string.isRequired,
  darkMode: bool,
};
SubHeading.defaultProps = {
  darkMode: false,
  tabIndex: '-1',
};
