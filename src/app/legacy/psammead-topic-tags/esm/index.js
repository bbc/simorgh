import _styled from '@emotion/styled/base';
import React, { forwardRef } from 'react';
import { string, shape, node, func } from 'prop-types';
import { C_LUNAR, C_EBON, C_METAL } from '#legacy/psammead-styles/colours';
import {
  GEL_SPACING_HLF,
  GEL_SPACING,
  GEL_SPACING_DBL,
} from '#legacy/gel-foundations/spacings';
import { getSansRegular } from '#legacy/psammead-styles/font-styles';
import { getBrevier } from '#legacy/gel-foundations/typography';
import { scriptPropType } from '#legacy/gel-foundations/prop-types';
var MIN_TAG_HEIGHT = '2.75rem'; // 44px

var CONTAINER_STYLES = '\n  display: flex;\n  flex-wrap: wrap;\n  margin-top: -'
  .concat(GEL_SPACING, ';\n  margin-bottom: 0;\n  margin-left: -')
  .concat(GEL_SPACING_HLF, ';\n  margin-right: -')
  .concat(GEL_SPACING_HLF, ';\n  padding: 0;\n');

var SingleTopicTagContainer = _styled(
  'div',
  process.env.NODE_ENV === 'production'
    ? {
        target: 'e1hq59l2',
      }
    : {
        target: 'e1hq59l2',
        label: 'SingleTopicTagContainer',
      },
)(
  CONTAINER_STYLES,
  ';' +
    (process.env.NODE_ENV === 'production'
      ? ''
      : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBeUIwQyIsImZpbGUiOiIuLi9zcmMvaW5kZXguanN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBzdHJpbmcsIHNoYXBlLCBub2RlLCBmdW5jIH0gZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBDX0xVTkFSLCBDX0VCT04sIENfTUVUQUwgfSBmcm9tICdAYmJjL3BzYW1tZWFkLXN0eWxlcy9jb2xvdXJzJztcbmltcG9ydCB7XG4gIEdFTF9TUEFDSU5HX0hMRixcbiAgR0VMX1NQQUNJTkcsXG4gIEdFTF9TUEFDSU5HX0RCTCxcbn0gZnJvbSAnQGJiYy9nZWwtZm91bmRhdGlvbnMvc3BhY2luZ3MnO1xuaW1wb3J0IHsgZ2V0U2Fuc1JlZ3VsYXIgfSBmcm9tICdAYmJjL3BzYW1tZWFkLXN0eWxlcy9mb250LXN0eWxlcyc7XG5pbXBvcnQgeyBnZXRCcmV2aWVyIH0gZnJvbSAnQGJiYy9nZWwtZm91bmRhdGlvbnMvdHlwb2dyYXBoeSc7XG5pbXBvcnQgeyBzY3JpcHRQcm9wVHlwZSB9IGZyb20gJ0BiYmMvZ2VsLWZvdW5kYXRpb25zL3Byb3AtdHlwZXMnO1xuXG5jb25zdCBNSU5fVEFHX0hFSUdIVCA9ICcyLjc1cmVtJzsgLy8gNDRweFxuXG5jb25zdCBDT05UQUlORVJfU1RZTEVTID0gYFxuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIG1hcmdpbi10b3A6IC0ke0dFTF9TUEFDSU5HfTtcbiAgbWFyZ2luLWJvdHRvbTogMDtcbiAgbWFyZ2luLWxlZnQ6IC0ke0dFTF9TUEFDSU5HX0hMRn07XG4gIG1hcmdpbi1yaWdodDogLSR7R0VMX1NQQUNJTkdfSExGfTtcbiAgcGFkZGluZzogMDtcbmA7XG5cbmNvbnN0IFNpbmdsZVRvcGljVGFnQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgJHtDT05UQUlORVJfU1RZTEVTfVxuYDtcblxuY29uc3QgVG9waWNzTGlzdCA9IHN0eWxlZC51bGBcbiAgJHtDT05UQUlORVJfU1RZTEVTfVxuICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XG5gO1xuXG5jb25zdCBTaW5nbGVUb3BpY1RhZ0l0ZW0gPSBzdHlsZWQuZGl2YFxuICAkeyh7IHNlcnZpY2UgfSkgPT4gZ2V0U2Fuc1JlZ3VsYXIoc2VydmljZSl9XG4gICR7KHsgc2NyaXB0IH0pID0+IHNjcmlwdCAmJiBnZXRCcmV2aWVyKHNjcmlwdCl9XG5cbiAgd29yZC1icmVhazogYnJlYWstd29yZDtcbiAgbWFyZ2luLXRvcDogJHtHRUxfU1BBQ0lOR307XG4gIG1hcmdpbi1sZWZ0OiAke0dFTF9TUEFDSU5HX0hMRn07XG4gIG1hcmdpbi1yaWdodDogJHtHRUxfU1BBQ0lOR19ITEZ9O1xuICBhIHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgICBtaW4taGVpZ2h0OiAke01JTl9UQUdfSEVJR0hUfTtcbiAgICBwYWRkaW5nOiAke0dFTF9TUEFDSU5HfSAke0dFTF9TUEFDSU5HX0RCTH07XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkeyh7IGJhY2tncm91bmRDb2xvdXIgfSkgPT4gYmFja2dyb3VuZENvbG91cn07XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgIGNvbG9yOiAke0NfRUJPTn07XG5cbiAgICAmOmhvdmVyLFxuICAgICY6Zm9jdXMge1xuICAgICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG4gICAgfVxuICAgICY6dmlzaXRlZCB7XG4gICAgICBjb2xvcjogJHtDX01FVEFMfTtcbiAgICB9XG4gIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBUb3BpY1RhZyA9IGZvcndhcmRSZWYoKHsgbmFtZSwgbGluaywgb25DbGljayB9LCByZWYpID0+IChcbiAgPGEgaHJlZj17bGlua30gb25DbGljaz17b25DbGlja30gcmVmPXtyZWZ9PlxuICAgIHtuYW1lfVxuICA8L2E+XG4pKTtcblxuZXhwb3J0IGNvbnN0IFRvcGljVGFncyA9ICh7XG4gIGNoaWxkcmVuLFxuICBzY3JpcHQsXG4gIHNlcnZpY2UsXG4gIHRhZ0JhY2tncm91bmRDb2xvdXIsXG59KSA9PiB7XG4gIGNvbnN0IGhhc011bHRpcGxlQ2hpbGRyZW4gPSBjaGlsZHJlbi5sZW5ndGggPiAxO1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIHtoYXNNdWx0aXBsZUNoaWxkcmVuID8gKFxuICAgICAgICA8VG9waWNzTGlzdCByb2xlPVwibGlzdFwiIHNlcnZpY2U9e3NlcnZpY2V9IHNjcmlwdD17c2NyaXB0fT5cbiAgICAgICAgICB7Y2hpbGRyZW4ubWFwKChjaGlsZCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChjaGlsZC50eXBlICE9PSBUb3BpY1RhZykgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxTaW5nbGVUb3BpY1RhZ0l0ZW1cbiAgICAgICAgICAgICAgICBhcz1cImxpXCJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3VyPXt0YWdCYWNrZ3JvdW5kQ29sb3VyfVxuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC9uby1hcnJheS1pbmRleC1rZXlcbiAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICAgIHNlcnZpY2U9e3NlcnZpY2V9XG4gICAgICAgICAgICAgICAgc2NyaXB0PXtzY3JpcHR9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7Y2hpbGR9XG4gICAgICAgICAgICAgIDwvU2luZ2xlVG9waWNUYWdJdGVtPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KX1cbiAgICAgICAgPC9Ub3BpY3NMaXN0PlxuICAgICAgKSA6IChcbiAgICAgICAgPFNpbmdsZVRvcGljVGFnQ29udGFpbmVyIHNlcnZpY2U9e3NlcnZpY2V9IHNjcmlwdD17c2NyaXB0fT5cbiAgICAgICAgICA8U2luZ2xlVG9waWNUYWdJdGVtXG4gICAgICAgICAgICBzZXJ2aWNlPXtzZXJ2aWNlfVxuICAgICAgICAgICAgc2NyaXB0PXtzY3JpcHR9XG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3VyPXt0YWdCYWNrZ3JvdW5kQ29sb3VyfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtjaGlsZHJlbi50eXBlID09PSBUb3BpY1RhZyAmJiBjaGlsZHJlbn1cbiAgICAgICAgICA8L1NpbmdsZVRvcGljVGFnSXRlbT5cbiAgICAgICAgPC9TaW5nbGVUb3BpY1RhZ0NvbnRhaW5lcj5cbiAgICAgICl9XG4gICAgPC8+XG4gICk7XG59O1xuXG5Ub3BpY1RhZy5wcm9wVHlwZXMgPSB7XG4gIG5hbWU6IHN0cmluZy5pc1JlcXVpcmVkLFxuICBsaW5rOiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgb25DbGljazogZnVuYyxcbn07XG5cblRvcGljVGFnLmRlZmF1bHRQcm9wcyA9IHsgb25DbGljazogbnVsbCB9O1xuXG5Ub3BpY1RhZ3MucHJvcFR5cGVzID0ge1xuICBjaGlsZHJlbjogbm9kZSxcbiAgc2NyaXB0OiBzaGFwZShzY3JpcHRQcm9wVHlwZSkuaXNSZXF1aXJlZCxcbiAgc2VydmljZTogc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHRhZ0JhY2tncm91bmRDb2xvdXI6IHN0cmluZyxcbn07XG5cblRvcGljVGFncy5kZWZhdWx0UHJvcHMgPSB7XG4gIGNoaWxkcmVuOiBbXSxcbiAgdGFnQmFja2dyb3VuZENvbG91cjogQ19MVU5BUixcbn07XG4iXX0= */'),
);

var TopicsList = _styled(
  'ul',
  process.env.NODE_ENV === 'production'
    ? {
        target: 'e1hq59l1',
      }
    : {
        target: 'e1hq59l1',
        label: 'TopicsList',
      },
)(
  CONTAINER_STYLES,
  ' list-style-type:none;' +
    (process.env.NODE_ENV === 'production'
      ? ''
      : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBNkI0QiIsImZpbGUiOiIuLi9zcmMvaW5kZXguanN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBzdHJpbmcsIHNoYXBlLCBub2RlLCBmdW5jIH0gZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBDX0xVTkFSLCBDX0VCT04sIENfTUVUQUwgfSBmcm9tICdAYmJjL3BzYW1tZWFkLXN0eWxlcy9jb2xvdXJzJztcbmltcG9ydCB7XG4gIEdFTF9TUEFDSU5HX0hMRixcbiAgR0VMX1NQQUNJTkcsXG4gIEdFTF9TUEFDSU5HX0RCTCxcbn0gZnJvbSAnQGJiYy9nZWwtZm91bmRhdGlvbnMvc3BhY2luZ3MnO1xuaW1wb3J0IHsgZ2V0U2Fuc1JlZ3VsYXIgfSBmcm9tICdAYmJjL3BzYW1tZWFkLXN0eWxlcy9mb250LXN0eWxlcyc7XG5pbXBvcnQgeyBnZXRCcmV2aWVyIH0gZnJvbSAnQGJiYy9nZWwtZm91bmRhdGlvbnMvdHlwb2dyYXBoeSc7XG5pbXBvcnQgeyBzY3JpcHRQcm9wVHlwZSB9IGZyb20gJ0BiYmMvZ2VsLWZvdW5kYXRpb25zL3Byb3AtdHlwZXMnO1xuXG5jb25zdCBNSU5fVEFHX0hFSUdIVCA9ICcyLjc1cmVtJzsgLy8gNDRweFxuXG5jb25zdCBDT05UQUlORVJfU1RZTEVTID0gYFxuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIG1hcmdpbi10b3A6IC0ke0dFTF9TUEFDSU5HfTtcbiAgbWFyZ2luLWJvdHRvbTogMDtcbiAgbWFyZ2luLWxlZnQ6IC0ke0dFTF9TUEFDSU5HX0hMRn07XG4gIG1hcmdpbi1yaWdodDogLSR7R0VMX1NQQUNJTkdfSExGfTtcbiAgcGFkZGluZzogMDtcbmA7XG5cbmNvbnN0IFNpbmdsZVRvcGljVGFnQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgJHtDT05UQUlORVJfU1RZTEVTfVxuYDtcblxuY29uc3QgVG9waWNzTGlzdCA9IHN0eWxlZC51bGBcbiAgJHtDT05UQUlORVJfU1RZTEVTfVxuICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XG5gO1xuXG5jb25zdCBTaW5nbGVUb3BpY1RhZ0l0ZW0gPSBzdHlsZWQuZGl2YFxuICAkeyh7IHNlcnZpY2UgfSkgPT4gZ2V0U2Fuc1JlZ3VsYXIoc2VydmljZSl9XG4gICR7KHsgc2NyaXB0IH0pID0+IHNjcmlwdCAmJiBnZXRCcmV2aWVyKHNjcmlwdCl9XG5cbiAgd29yZC1icmVhazogYnJlYWstd29yZDtcbiAgbWFyZ2luLXRvcDogJHtHRUxfU1BBQ0lOR307XG4gIG1hcmdpbi1sZWZ0OiAke0dFTF9TUEFDSU5HX0hMRn07XG4gIG1hcmdpbi1yaWdodDogJHtHRUxfU1BBQ0lOR19ITEZ9O1xuICBhIHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgICBtaW4taGVpZ2h0OiAke01JTl9UQUdfSEVJR0hUfTtcbiAgICBwYWRkaW5nOiAke0dFTF9TUEFDSU5HfSAke0dFTF9TUEFDSU5HX0RCTH07XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkeyh7IGJhY2tncm91bmRDb2xvdXIgfSkgPT4gYmFja2dyb3VuZENvbG91cn07XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgIGNvbG9yOiAke0NfRUJPTn07XG5cbiAgICAmOmhvdmVyLFxuICAgICY6Zm9jdXMge1xuICAgICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG4gICAgfVxuICAgICY6dmlzaXRlZCB7XG4gICAgICBjb2xvcjogJHtDX01FVEFMfTtcbiAgICB9XG4gIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBUb3BpY1RhZyA9IGZvcndhcmRSZWYoKHsgbmFtZSwgbGluaywgb25DbGljayB9LCByZWYpID0+IChcbiAgPGEgaHJlZj17bGlua30gb25DbGljaz17b25DbGlja30gcmVmPXtyZWZ9PlxuICAgIHtuYW1lfVxuICA8L2E+XG4pKTtcblxuZXhwb3J0IGNvbnN0IFRvcGljVGFncyA9ICh7XG4gIGNoaWxkcmVuLFxuICBzY3JpcHQsXG4gIHNlcnZpY2UsXG4gIHRhZ0JhY2tncm91bmRDb2xvdXIsXG59KSA9PiB7XG4gIGNvbnN0IGhhc011bHRpcGxlQ2hpbGRyZW4gPSBjaGlsZHJlbi5sZW5ndGggPiAxO1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIHtoYXNNdWx0aXBsZUNoaWxkcmVuID8gKFxuICAgICAgICA8VG9waWNzTGlzdCByb2xlPVwibGlzdFwiIHNlcnZpY2U9e3NlcnZpY2V9IHNjcmlwdD17c2NyaXB0fT5cbiAgICAgICAgICB7Y2hpbGRyZW4ubWFwKChjaGlsZCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChjaGlsZC50eXBlICE9PSBUb3BpY1RhZykgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxTaW5nbGVUb3BpY1RhZ0l0ZW1cbiAgICAgICAgICAgICAgICBhcz1cImxpXCJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3VyPXt0YWdCYWNrZ3JvdW5kQ29sb3VyfVxuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC9uby1hcnJheS1pbmRleC1rZXlcbiAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICAgIHNlcnZpY2U9e3NlcnZpY2V9XG4gICAgICAgICAgICAgICAgc2NyaXB0PXtzY3JpcHR9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7Y2hpbGR9XG4gICAgICAgICAgICAgIDwvU2luZ2xlVG9waWNUYWdJdGVtPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KX1cbiAgICAgICAgPC9Ub3BpY3NMaXN0PlxuICAgICAgKSA6IChcbiAgICAgICAgPFNpbmdsZVRvcGljVGFnQ29udGFpbmVyIHNlcnZpY2U9e3NlcnZpY2V9IHNjcmlwdD17c2NyaXB0fT5cbiAgICAgICAgICA8U2luZ2xlVG9waWNUYWdJdGVtXG4gICAgICAgICAgICBzZXJ2aWNlPXtzZXJ2aWNlfVxuICAgICAgICAgICAgc2NyaXB0PXtzY3JpcHR9XG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3VyPXt0YWdCYWNrZ3JvdW5kQ29sb3VyfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtjaGlsZHJlbi50eXBlID09PSBUb3BpY1RhZyAmJiBjaGlsZHJlbn1cbiAgICAgICAgICA8L1NpbmdsZVRvcGljVGFnSXRlbT5cbiAgICAgICAgPC9TaW5nbGVUb3BpY1RhZ0NvbnRhaW5lcj5cbiAgICAgICl9XG4gICAgPC8+XG4gICk7XG59O1xuXG5Ub3BpY1RhZy5wcm9wVHlwZXMgPSB7XG4gIG5hbWU6IHN0cmluZy5pc1JlcXVpcmVkLFxuICBsaW5rOiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgb25DbGljazogZnVuYyxcbn07XG5cblRvcGljVGFnLmRlZmF1bHRQcm9wcyA9IHsgb25DbGljazogbnVsbCB9O1xuXG5Ub3BpY1RhZ3MucHJvcFR5cGVzID0ge1xuICBjaGlsZHJlbjogbm9kZSxcbiAgc2NyaXB0OiBzaGFwZShzY3JpcHRQcm9wVHlwZSkuaXNSZXF1aXJlZCxcbiAgc2VydmljZTogc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHRhZ0JhY2tncm91bmRDb2xvdXI6IHN0cmluZyxcbn07XG5cblRvcGljVGFncy5kZWZhdWx0UHJvcHMgPSB7XG4gIGNoaWxkcmVuOiBbXSxcbiAgdGFnQmFja2dyb3VuZENvbG91cjogQ19MVU5BUixcbn07XG4iXX0= */'),
);

var SingleTopicTagItem = _styled(
  'div',
  process.env.NODE_ENV === 'production'
    ? {
        target: 'e1hq59l0',
      }
    : {
        target: 'e1hq59l0',
        label: 'SingleTopicTagItem',
      },
)(
  function (_ref) {
    var service = _ref.service;
    return getSansRegular(service);
  },
  ' ',
  function (_ref2) {
    var script = _ref2.script;
    return script && getBrevier(script);
  },
  ' word-break:break-word;margin-top:',
  GEL_SPACING,
  ';margin-left:',
  GEL_SPACING_HLF,
  ';margin-right:',
  GEL_SPACING_HLF,
  ';a{display:inline-flex;min-height:',
  MIN_TAG_HEIGHT,
  ';padding:',
  GEL_SPACING,
  ' ',
  GEL_SPACING_DBL,
  ';align-items:center;background-color:',
  function (_ref3) {
    var backgroundColour = _ref3.backgroundColour;
    return backgroundColour;
  },
  ';text-decoration:none;color:',
  C_EBON,
  ';&:hover,&:focus{text-decoration:underline;}&:visited{color:',
  C_METAL,
  ';}}' +
    (process.env.NODE_ENV === 'production'
      ? ''
      : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBa0NxQyIsImZpbGUiOiIuLi9zcmMvaW5kZXguanN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IGZvcndhcmRSZWYgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBzdHJpbmcsIHNoYXBlLCBub2RlLCBmdW5jIH0gZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBDX0xVTkFSLCBDX0VCT04sIENfTUVUQUwgfSBmcm9tICdAYmJjL3BzYW1tZWFkLXN0eWxlcy9jb2xvdXJzJztcbmltcG9ydCB7XG4gIEdFTF9TUEFDSU5HX0hMRixcbiAgR0VMX1NQQUNJTkcsXG4gIEdFTF9TUEFDSU5HX0RCTCxcbn0gZnJvbSAnQGJiYy9nZWwtZm91bmRhdGlvbnMvc3BhY2luZ3MnO1xuaW1wb3J0IHsgZ2V0U2Fuc1JlZ3VsYXIgfSBmcm9tICdAYmJjL3BzYW1tZWFkLXN0eWxlcy9mb250LXN0eWxlcyc7XG5pbXBvcnQgeyBnZXRCcmV2aWVyIH0gZnJvbSAnQGJiYy9nZWwtZm91bmRhdGlvbnMvdHlwb2dyYXBoeSc7XG5pbXBvcnQgeyBzY3JpcHRQcm9wVHlwZSB9IGZyb20gJ0BiYmMvZ2VsLWZvdW5kYXRpb25zL3Byb3AtdHlwZXMnO1xuXG5jb25zdCBNSU5fVEFHX0hFSUdIVCA9ICcyLjc1cmVtJzsgLy8gNDRweFxuXG5jb25zdCBDT05UQUlORVJfU1RZTEVTID0gYFxuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LXdyYXA6IHdyYXA7XG4gIG1hcmdpbi10b3A6IC0ke0dFTF9TUEFDSU5HfTtcbiAgbWFyZ2luLWJvdHRvbTogMDtcbiAgbWFyZ2luLWxlZnQ6IC0ke0dFTF9TUEFDSU5HX0hMRn07XG4gIG1hcmdpbi1yaWdodDogLSR7R0VMX1NQQUNJTkdfSExGfTtcbiAgcGFkZGluZzogMDtcbmA7XG5cbmNvbnN0IFNpbmdsZVRvcGljVGFnQ29udGFpbmVyID0gc3R5bGVkLmRpdmBcbiAgJHtDT05UQUlORVJfU1RZTEVTfVxuYDtcblxuY29uc3QgVG9waWNzTGlzdCA9IHN0eWxlZC51bGBcbiAgJHtDT05UQUlORVJfU1RZTEVTfVxuICBsaXN0LXN0eWxlLXR5cGU6IG5vbmU7XG5gO1xuXG5jb25zdCBTaW5nbGVUb3BpY1RhZ0l0ZW0gPSBzdHlsZWQuZGl2YFxuICAkeyh7IHNlcnZpY2UgfSkgPT4gZ2V0U2Fuc1JlZ3VsYXIoc2VydmljZSl9XG4gICR7KHsgc2NyaXB0IH0pID0+IHNjcmlwdCAmJiBnZXRCcmV2aWVyKHNjcmlwdCl9XG5cbiAgd29yZC1icmVhazogYnJlYWstd29yZDtcbiAgbWFyZ2luLXRvcDogJHtHRUxfU1BBQ0lOR307XG4gIG1hcmdpbi1sZWZ0OiAke0dFTF9TUEFDSU5HX0hMRn07XG4gIG1hcmdpbi1yaWdodDogJHtHRUxfU1BBQ0lOR19ITEZ9O1xuICBhIHtcbiAgICBkaXNwbGF5OiBpbmxpbmUtZmxleDtcbiAgICBtaW4taGVpZ2h0OiAke01JTl9UQUdfSEVJR0hUfTtcbiAgICBwYWRkaW5nOiAke0dFTF9TUEFDSU5HfSAke0dFTF9TUEFDSU5HX0RCTH07XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkeyh7IGJhY2tncm91bmRDb2xvdXIgfSkgPT4gYmFja2dyb3VuZENvbG91cn07XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgIGNvbG9yOiAke0NfRUJPTn07XG5cbiAgICAmOmhvdmVyLFxuICAgICY6Zm9jdXMge1xuICAgICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG4gICAgfVxuICAgICY6dmlzaXRlZCB7XG4gICAgICBjb2xvcjogJHtDX01FVEFMfTtcbiAgICB9XG4gIH1cbmA7XG5cbmV4cG9ydCBjb25zdCBUb3BpY1RhZyA9IGZvcndhcmRSZWYoKHsgbmFtZSwgbGluaywgb25DbGljayB9LCByZWYpID0+IChcbiAgPGEgaHJlZj17bGlua30gb25DbGljaz17b25DbGlja30gcmVmPXtyZWZ9PlxuICAgIHtuYW1lfVxuICA8L2E+XG4pKTtcblxuZXhwb3J0IGNvbnN0IFRvcGljVGFncyA9ICh7XG4gIGNoaWxkcmVuLFxuICBzY3JpcHQsXG4gIHNlcnZpY2UsXG4gIHRhZ0JhY2tncm91bmRDb2xvdXIsXG59KSA9PiB7XG4gIGNvbnN0IGhhc011bHRpcGxlQ2hpbGRyZW4gPSBjaGlsZHJlbi5sZW5ndGggPiAxO1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIHtoYXNNdWx0aXBsZUNoaWxkcmVuID8gKFxuICAgICAgICA8VG9waWNzTGlzdCByb2xlPVwibGlzdFwiIHNlcnZpY2U9e3NlcnZpY2V9IHNjcmlwdD17c2NyaXB0fT5cbiAgICAgICAgICB7Y2hpbGRyZW4ubWFwKChjaGlsZCwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGlmIChjaGlsZC50eXBlICE9PSBUb3BpY1RhZykgcmV0dXJuIG51bGw7XG5cbiAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgIDxTaW5nbGVUb3BpY1RhZ0l0ZW1cbiAgICAgICAgICAgICAgICBhcz1cImxpXCJcbiAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3VyPXt0YWdCYWNrZ3JvdW5kQ29sb3VyfVxuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSByZWFjdC9uby1hcnJheS1pbmRleC1rZXlcbiAgICAgICAgICAgICAgICBrZXk9e2luZGV4fVxuICAgICAgICAgICAgICAgIHNlcnZpY2U9e3NlcnZpY2V9XG4gICAgICAgICAgICAgICAgc2NyaXB0PXtzY3JpcHR9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7Y2hpbGR9XG4gICAgICAgICAgICAgIDwvU2luZ2xlVG9waWNUYWdJdGVtPlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KX1cbiAgICAgICAgPC9Ub3BpY3NMaXN0PlxuICAgICAgKSA6IChcbiAgICAgICAgPFNpbmdsZVRvcGljVGFnQ29udGFpbmVyIHNlcnZpY2U9e3NlcnZpY2V9IHNjcmlwdD17c2NyaXB0fT5cbiAgICAgICAgICA8U2luZ2xlVG9waWNUYWdJdGVtXG4gICAgICAgICAgICBzZXJ2aWNlPXtzZXJ2aWNlfVxuICAgICAgICAgICAgc2NyaXB0PXtzY3JpcHR9XG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3VyPXt0YWdCYWNrZ3JvdW5kQ29sb3VyfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtjaGlsZHJlbi50eXBlID09PSBUb3BpY1RhZyAmJiBjaGlsZHJlbn1cbiAgICAgICAgICA8L1NpbmdsZVRvcGljVGFnSXRlbT5cbiAgICAgICAgPC9TaW5nbGVUb3BpY1RhZ0NvbnRhaW5lcj5cbiAgICAgICl9XG4gICAgPC8+XG4gICk7XG59O1xuXG5Ub3BpY1RhZy5wcm9wVHlwZXMgPSB7XG4gIG5hbWU6IHN0cmluZy5pc1JlcXVpcmVkLFxuICBsaW5rOiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgb25DbGljazogZnVuYyxcbn07XG5cblRvcGljVGFnLmRlZmF1bHRQcm9wcyA9IHsgb25DbGljazogbnVsbCB9O1xuXG5Ub3BpY1RhZ3MucHJvcFR5cGVzID0ge1xuICBjaGlsZHJlbjogbm9kZSxcbiAgc2NyaXB0OiBzaGFwZShzY3JpcHRQcm9wVHlwZSkuaXNSZXF1aXJlZCxcbiAgc2VydmljZTogc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHRhZ0JhY2tncm91bmRDb2xvdXI6IHN0cmluZyxcbn07XG5cblRvcGljVGFncy5kZWZhdWx0UHJvcHMgPSB7XG4gIGNoaWxkcmVuOiBbXSxcbiAgdGFnQmFja2dyb3VuZENvbG91cjogQ19MVU5BUixcbn07XG4iXX0= */'),
);

export var TopicTag = /*#__PURE__*/ forwardRef(function (_ref4, ref) {
  var name = _ref4.name,
    link = _ref4.link,
    onClick = _ref4.onClick;
  return /*#__PURE__*/ React.createElement(
    'a',
    {
      href: link,
      onClick: onClick,
      ref: ref,
    },
    name,
  );
});
export var TopicTags = function TopicTags(_ref5) {
  var children = _ref5.children,
    script = _ref5.script,
    service = _ref5.service,
    tagBackgroundColour = _ref5.tagBackgroundColour;
  var hasMultipleChildren = children.length > 1;
  return /*#__PURE__*/ React.createElement(
    React.Fragment,
    null,
    hasMultipleChildren
      ? /*#__PURE__*/ React.createElement(
          TopicsList,
          {
            role: 'list',
            service: service,
            script: script,
          },
          children.map(function (child, index) {
            if (child.type !== TopicTag) return null;
            return /*#__PURE__*/ React.createElement(
              SingleTopicTagItem,
              {
                as: 'li',
                backgroundColour: tagBackgroundColour, // eslint-disable-next-line react/no-array-index-key
                key: index,
                service: service,
                script: script,
              },
              child,
            );
          }),
        )
      : /*#__PURE__*/ React.createElement(
          SingleTopicTagContainer,
          {
            service: service,
            script: script,
          },
          /*#__PURE__*/ React.createElement(
            SingleTopicTagItem,
            {
              service: service,
              script: script,
              backgroundColour: tagBackgroundColour,
            },
            children.type === TopicTag && children,
          ),
        ),
  );
};
TopicTag.propTypes = {
  name: string.isRequired,
  link: string.isRequired,
  onClick: func,
};
TopicTag.defaultProps = {
  onClick: null,
};
TopicTags.propTypes = {
  children: node,
  script: shape(scriptPropType).isRequired,
  service: string.isRequired,
  tagBackgroundColour: string,
};
TopicTags.defaultProps = {
  children: [],
  tagBackgroundColour: C_LUNAR,
};
