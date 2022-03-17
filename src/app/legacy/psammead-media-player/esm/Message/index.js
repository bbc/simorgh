import _styled from '@emotion/styled/base';

function _EMOTION_STRINGIFIED_CSS_ERROR__() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}

import React from 'react';
import { string } from 'prop-types';
import { C_WHITE } from '#legacy/psammead-styles/colours';
import { GEL_SPACING_DBL, GEL_SPACING } from '#legacy/gel-foundations/spacings';
import { GEL_LONG_PRIMER } from '#legacy/gel-foundations/typography';
import { getSansRegular } from '#legacy/psammead-styles/font-styles';
import { GEL_GROUP_2_SCREEN_WIDTH_MIN } from '#legacy/gel-foundations/breakpoints';
import Image from '#legacy/psammead-image';
var NOJS_BACKGROUND_COLOUR = 'rgba(34, 34, 34, 0.75)';

var StyledWrapper = _styled(
  'div',
  process.env.NODE_ENV === 'production'
    ? {
        target: 'ezuaodt2',
      }
    : {
        target: 'ezuaodt2',
        label: 'StyledWrapper',
      },
)(
  process.env.NODE_ENV === 'production'
    ? {
        name: '1b4920d',
        styles: 'position:absolute;top:0;left:0;width:100%;height:100%',
      }
    : {
        name: '1b4920d',
        styles: 'position:absolute;top:0;left:0;width:100%;height:100%',
        map: '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9NZXNzYWdlL2luZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFZZ0MiLCJmaWxlIjoiLi4vLi4vc3JjL01lc3NhZ2UvaW5kZXguanN4Iiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHN0cmluZyB9IGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgQ19XSElURSB9IGZyb20gJ0BiYmMvcHNhbW1lYWQtc3R5bGVzL2NvbG91cnMnO1xuaW1wb3J0IHsgR0VMX1NQQUNJTkdfREJMLCBHRUxfU1BBQ0lORyB9IGZyb20gJ0BiYmMvZ2VsLWZvdW5kYXRpb25zL3NwYWNpbmdzJztcbmltcG9ydCB7IEdFTF9MT05HX1BSSU1FUiB9IGZyb20gJ0BiYmMvZ2VsLWZvdW5kYXRpb25zL3R5cG9ncmFwaHknO1xuaW1wb3J0IHsgZ2V0U2Fuc1JlZ3VsYXIgfSBmcm9tICdAYmJjL3BzYW1tZWFkLXN0eWxlcy9mb250LXN0eWxlcyc7XG5pbXBvcnQgeyBHRUxfR1JPVVBfMl9TQ1JFRU5fV0lEVEhfTUlOIH0gZnJvbSAnQGJiYy9nZWwtZm91bmRhdGlvbnMvYnJlYWtwb2ludHMnO1xuaW1wb3J0IEltYWdlIGZyb20gJ0BiYmMvcHNhbW1lYWQtaW1hZ2UnO1xuXG5jb25zdCBOT0pTX0JBQ0tHUk9VTkRfQ09MT1VSID0gJ3JnYmEoMzQsIDM0LCAzNCwgMC43NSknO1xuXG5jb25zdCBTdHlsZWRXcmFwcGVyID0gc3R5bGVkLmRpdmBcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG5gO1xuXG5jb25zdCBNZXNzYWdlV3JhcHBlciA9IHN0eWxlZC5kaXZgXG4gICR7KHsgc2VydmljZSB9KSA9PiBnZXRTYW5zUmVndWxhcihzZXJ2aWNlKX1cbiAgJHtHRUxfTE9OR19QUklNRVJ9O1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgYm9yZGVyOiAwLjA2MjVyZW0gc29saWQgdHJhbnNwYXJlbnQ7XG4gIGNvbG9yOiAke0NfV0hJVEV9O1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAke05PSlNfQkFDS0dST1VORF9DT0xPVVJ9O1xuICBAbWVkaWEgc2NyZWVuIGFuZCAoLW1zLWhpZ2gtY29udHJhc3Q6IGFjdGl2ZSkge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICB9XG5gO1xuXG5jb25zdCBTdHlsZWRNZXNzYWdlID0gc3R5bGVkLnN0cm9uZ2BcbiAgZGlzcGxheTogYmxvY2s7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIGJvdHRvbTogMDtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBwYWRkaW5nOiAke0dFTF9TUEFDSU5HfTtcbiAgQG1lZGlhIHNjcmVlbiBhbmQgKC1tcy1oaWdoLWNvbnRyYXN0OiBhY3RpdmUpIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB3aW5kb3c7XG4gIH1cbiAgQG1lZGlhIChtaW4td2lkdGg6ICR7R0VMX0dST1VQXzJfU0NSRUVOX1dJRFRIX01JTn0pIHtcbiAgICBwYWRkaW5nOiAke0dFTF9TUEFDSU5HX0RCTH07XG4gIH1cbmA7XG5cbmNvbnN0IE1lc3NhZ2UgPSAoeyBzZXJ2aWNlLCBtZXNzYWdlLCBwbGFjZWhvbGRlclNyYywgcGxhY2Vob2xkZXJTcmNzZXQgfSkgPT4gKFxuICA8U3R5bGVkV3JhcHBlcj5cbiAgICB7cGxhY2Vob2xkZXJTcmMgJiYgKFxuICAgICAgPEltYWdlXG4gICAgICAgIGFsdD1cIlwiXG4gICAgICAgIHNyYz17cGxhY2Vob2xkZXJTcmN9XG4gICAgICAgIHNyY3NldD17cGxhY2Vob2xkZXJTcmNzZXR9XG4gICAgICAgIGFyaWEtaGlkZGVuPVwidHJ1ZVwiXG4gICAgICAvPlxuICAgICl9XG4gICAgPE1lc3NhZ2VXcmFwcGVyIHNlcnZpY2U9e3NlcnZpY2V9PlxuICAgICAgPFN0eWxlZE1lc3NhZ2U+e21lc3NhZ2V9PC9TdHlsZWRNZXNzYWdlPlxuICAgIDwvTWVzc2FnZVdyYXBwZXI+XG4gIDwvU3R5bGVkV3JhcHBlcj5cbik7XG5cbk1lc3NhZ2UucHJvcFR5cGVzID0ge1xuICBzZXJ2aWNlOiBzdHJpbmcuaXNSZXF1aXJlZCxcbiAgbWVzc2FnZTogc3RyaW5nLmlzUmVxdWlyZWQsXG4gIHBsYWNlaG9sZGVyU3Jjc2V0OiBzdHJpbmcsXG4gIHBsYWNlaG9sZGVyU3JjOiBzdHJpbmcsXG59O1xuXG5NZXNzYWdlLmRlZmF1bHRQcm9wcyA9IHtcbiAgcGxhY2Vob2xkZXJTcmNzZXQ6ICcnLFxuICBwbGFjZWhvbGRlclNyYzogJycsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBNZXNzYWdlO1xuIl19 */',
        toString: _EMOTION_STRINGIFIED_CSS_ERROR__,
      },
);

var MessageWrapper = _styled(
  'div',
  process.env.NODE_ENV === 'production'
    ? {
        target: 'ezuaodt1',
      }
    : {
        target: 'ezuaodt1',
        label: 'MessageWrapper',
      },
)(
  function (_ref) {
    var service = _ref.service;
    return getSansRegular(service);
  },
  ' ',
  GEL_LONG_PRIMER,
  ';width:100%;height:100%;position:absolute;top:0;left:0;border:0.0625rem solid transparent;color:',
  C_WHITE,
  ';background-color:',
  NOJS_BACKGROUND_COLOUR,
  ';@media screen and (-ms-high-contrast: active){background-color:transparent;}' +
    (process.env.NODE_ENV === 'production'
      ? ''
      : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9NZXNzYWdlL2luZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFvQmlDIiwiZmlsZSI6Ii4uLy4uL3NyYy9NZXNzYWdlL2luZGV4LmpzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBzdHJpbmcgfSBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IENfV0hJVEUgfSBmcm9tICdAYmJjL3BzYW1tZWFkLXN0eWxlcy9jb2xvdXJzJztcbmltcG9ydCB7IEdFTF9TUEFDSU5HX0RCTCwgR0VMX1NQQUNJTkcgfSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy9zcGFjaW5ncyc7XG5pbXBvcnQgeyBHRUxfTE9OR19QUklNRVIgfSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy90eXBvZ3JhcGh5JztcbmltcG9ydCB7IGdldFNhbnNSZWd1bGFyIH0gZnJvbSAnQGJiYy9wc2FtbWVhZC1zdHlsZXMvZm9udC1zdHlsZXMnO1xuaW1wb3J0IHsgR0VMX0dST1VQXzJfU0NSRUVOX1dJRFRIX01JTiB9IGZyb20gJ0BiYmMvZ2VsLWZvdW5kYXRpb25zL2JyZWFrcG9pbnRzJztcbmltcG9ydCBJbWFnZSBmcm9tICdAYmJjL3BzYW1tZWFkLWltYWdlJztcblxuY29uc3QgTk9KU19CQUNLR1JPVU5EX0NPTE9VUiA9ICdyZ2JhKDM0LCAzNCwgMzQsIDAuNzUpJztcblxuY29uc3QgU3R5bGVkV3JhcHBlciA9IHN0eWxlZC5kaXZgXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuYDtcblxuY29uc3QgTWVzc2FnZVdyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICAkeyh7IHNlcnZpY2UgfSkgPT4gZ2V0U2Fuc1JlZ3VsYXIoc2VydmljZSl9XG4gICR7R0VMX0xPTkdfUFJJTUVSfTtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIGJvcmRlcjogMC4wNjI1cmVtIHNvbGlkIHRyYW5zcGFyZW50O1xuICBjb2xvcjogJHtDX1dISVRFfTtcbiAgYmFja2dyb3VuZC1jb2xvcjogJHtOT0pTX0JBQ0tHUk9VTkRfQ09MT1VSfTtcbiAgQG1lZGlhIHNjcmVlbiBhbmQgKC1tcy1oaWdoLWNvbnRyYXN0OiBhY3RpdmUpIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgfVxuYDtcblxuY29uc3QgU3R5bGVkTWVzc2FnZSA9IHN0eWxlZC5zdHJvbmdgXG4gIGRpc3BsYXk6IGJsb2NrO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBib3R0b206IDA7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcGFkZGluZzogJHtHRUxfU1BBQ0lOR307XG4gIEBtZWRpYSBzY3JlZW4gYW5kICgtbXMtaGlnaC1jb250cmFzdDogYWN0aXZlKSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2luZG93O1xuICB9XG4gIEBtZWRpYSAobWluLXdpZHRoOiAke0dFTF9HUk9VUF8yX1NDUkVFTl9XSURUSF9NSU59KSB7XG4gICAgcGFkZGluZzogJHtHRUxfU1BBQ0lOR19EQkx9O1xuICB9XG5gO1xuXG5jb25zdCBNZXNzYWdlID0gKHsgc2VydmljZSwgbWVzc2FnZSwgcGxhY2Vob2xkZXJTcmMsIHBsYWNlaG9sZGVyU3Jjc2V0IH0pID0+IChcbiAgPFN0eWxlZFdyYXBwZXI+XG4gICAge3BsYWNlaG9sZGVyU3JjICYmIChcbiAgICAgIDxJbWFnZVxuICAgICAgICBhbHQ9XCJcIlxuICAgICAgICBzcmM9e3BsYWNlaG9sZGVyU3JjfVxuICAgICAgICBzcmNzZXQ9e3BsYWNlaG9sZGVyU3Jjc2V0fVxuICAgICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgICAgLz5cbiAgICApfVxuICAgIDxNZXNzYWdlV3JhcHBlciBzZXJ2aWNlPXtzZXJ2aWNlfT5cbiAgICAgIDxTdHlsZWRNZXNzYWdlPnttZXNzYWdlfTwvU3R5bGVkTWVzc2FnZT5cbiAgICA8L01lc3NhZ2VXcmFwcGVyPlxuICA8L1N0eWxlZFdyYXBwZXI+XG4pO1xuXG5NZXNzYWdlLnByb3BUeXBlcyA9IHtcbiAgc2VydmljZTogc3RyaW5nLmlzUmVxdWlyZWQsXG4gIG1lc3NhZ2U6IHN0cmluZy5pc1JlcXVpcmVkLFxuICBwbGFjZWhvbGRlclNyY3NldDogc3RyaW5nLFxuICBwbGFjZWhvbGRlclNyYzogc3RyaW5nLFxufTtcblxuTWVzc2FnZS5kZWZhdWx0UHJvcHMgPSB7XG4gIHBsYWNlaG9sZGVyU3Jjc2V0OiAnJyxcbiAgcGxhY2Vob2xkZXJTcmM6ICcnLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgTWVzc2FnZTtcbiJdfQ== */'),
);

var StyledMessage = _styled(
  'strong',
  process.env.NODE_ENV === 'production'
    ? {
        target: 'ezuaodt0',
      }
    : {
        target: 'ezuaodt0',
        label: 'StyledMessage',
      },
)(
  'display:block;font-weight:normal;bottom:0;position:absolute;padding:',
  GEL_SPACING,
  ';@media screen and (-ms-high-contrast: active){background-color:window;}@media (min-width: ',
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  '){padding:',
  GEL_SPACING_DBL,
  ';}' +
    (process.env.NODE_ENV === 'production'
      ? ''
      : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9NZXNzYWdlL2luZGV4LmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFvQ21DIiwiZmlsZSI6Ii4uLy4uL3NyYy9NZXNzYWdlL2luZGV4LmpzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBzdHJpbmcgfSBmcm9tICdwcm9wLXR5cGVzJztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IENfV0hJVEUgfSBmcm9tICdAYmJjL3BzYW1tZWFkLXN0eWxlcy9jb2xvdXJzJztcbmltcG9ydCB7IEdFTF9TUEFDSU5HX0RCTCwgR0VMX1NQQUNJTkcgfSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy9zcGFjaW5ncyc7XG5pbXBvcnQgeyBHRUxfTE9OR19QUklNRVIgfSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy90eXBvZ3JhcGh5JztcbmltcG9ydCB7IGdldFNhbnNSZWd1bGFyIH0gZnJvbSAnQGJiYy9wc2FtbWVhZC1zdHlsZXMvZm9udC1zdHlsZXMnO1xuaW1wb3J0IHsgR0VMX0dST1VQXzJfU0NSRUVOX1dJRFRIX01JTiB9IGZyb20gJ0BiYmMvZ2VsLWZvdW5kYXRpb25zL2JyZWFrcG9pbnRzJztcbmltcG9ydCBJbWFnZSBmcm9tICdAYmJjL3BzYW1tZWFkLWltYWdlJztcblxuY29uc3QgTk9KU19CQUNLR1JPVU5EX0NPTE9VUiA9ICdyZ2JhKDM0LCAzNCwgMzQsIDAuNzUpJztcblxuY29uc3QgU3R5bGVkV3JhcHBlciA9IHN0eWxlZC5kaXZgXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuYDtcblxuY29uc3QgTWVzc2FnZVdyYXBwZXIgPSBzdHlsZWQuZGl2YFxuICAkeyh7IHNlcnZpY2UgfSkgPT4gZ2V0U2Fuc1JlZ3VsYXIoc2VydmljZSl9XG4gICR7R0VMX0xPTkdfUFJJTUVSfTtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIGJvcmRlcjogMC4wNjI1cmVtIHNvbGlkIHRyYW5zcGFyZW50O1xuICBjb2xvcjogJHtDX1dISVRFfTtcbiAgYmFja2dyb3VuZC1jb2xvcjogJHtOT0pTX0JBQ0tHUk9VTkRfQ09MT1VSfTtcbiAgQG1lZGlhIHNjcmVlbiBhbmQgKC1tcy1oaWdoLWNvbnRyYXN0OiBhY3RpdmUpIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgfVxuYDtcblxuY29uc3QgU3R5bGVkTWVzc2FnZSA9IHN0eWxlZC5zdHJvbmdgXG4gIGRpc3BsYXk6IGJsb2NrO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBib3R0b206IDA7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgcGFkZGluZzogJHtHRUxfU1BBQ0lOR307XG4gIEBtZWRpYSBzY3JlZW4gYW5kICgtbXMtaGlnaC1jb250cmFzdDogYWN0aXZlKSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogd2luZG93O1xuICB9XG4gIEBtZWRpYSAobWluLXdpZHRoOiAke0dFTF9HUk9VUF8yX1NDUkVFTl9XSURUSF9NSU59KSB7XG4gICAgcGFkZGluZzogJHtHRUxfU1BBQ0lOR19EQkx9O1xuICB9XG5gO1xuXG5jb25zdCBNZXNzYWdlID0gKHsgc2VydmljZSwgbWVzc2FnZSwgcGxhY2Vob2xkZXJTcmMsIHBsYWNlaG9sZGVyU3Jjc2V0IH0pID0+IChcbiAgPFN0eWxlZFdyYXBwZXI+XG4gICAge3BsYWNlaG9sZGVyU3JjICYmIChcbiAgICAgIDxJbWFnZVxuICAgICAgICBhbHQ9XCJcIlxuICAgICAgICBzcmM9e3BsYWNlaG9sZGVyU3JjfVxuICAgICAgICBzcmNzZXQ9e3BsYWNlaG9sZGVyU3Jjc2V0fVxuICAgICAgICBhcmlhLWhpZGRlbj1cInRydWVcIlxuICAgICAgLz5cbiAgICApfVxuICAgIDxNZXNzYWdlV3JhcHBlciBzZXJ2aWNlPXtzZXJ2aWNlfT5cbiAgICAgIDxTdHlsZWRNZXNzYWdlPnttZXNzYWdlfTwvU3R5bGVkTWVzc2FnZT5cbiAgICA8L01lc3NhZ2VXcmFwcGVyPlxuICA8L1N0eWxlZFdyYXBwZXI+XG4pO1xuXG5NZXNzYWdlLnByb3BUeXBlcyA9IHtcbiAgc2VydmljZTogc3RyaW5nLmlzUmVxdWlyZWQsXG4gIG1lc3NhZ2U6IHN0cmluZy5pc1JlcXVpcmVkLFxuICBwbGFjZWhvbGRlclNyY3NldDogc3RyaW5nLFxuICBwbGFjZWhvbGRlclNyYzogc3RyaW5nLFxufTtcblxuTWVzc2FnZS5kZWZhdWx0UHJvcHMgPSB7XG4gIHBsYWNlaG9sZGVyU3Jjc2V0OiAnJyxcbiAgcGxhY2Vob2xkZXJTcmM6ICcnLFxufTtcblxuZXhwb3J0IGRlZmF1bHQgTWVzc2FnZTtcbiJdfQ== */'),
);

var Message = function Message(_ref2) {
  var service = _ref2.service,
    message = _ref2.message,
    placeholderSrc = _ref2.placeholderSrc,
    placeholderSrcset = _ref2.placeholderSrcset;
  return /*#__PURE__*/ React.createElement(
    StyledWrapper,
    null,
    placeholderSrc &&
      /*#__PURE__*/ React.createElement(Image, {
        alt: '',
        src: placeholderSrc,
        srcset: placeholderSrcset,
        'aria-hidden': 'true',
      }),
    /*#__PURE__*/ React.createElement(
      MessageWrapper,
      {
        service: service,
      },
      /*#__PURE__*/ React.createElement(StyledMessage, null, message),
    ),
  );
};

Message.propTypes = {
  service: string.isRequired,
  message: string.isRequired,
  placeholderSrcset: string,
  placeholderSrc: string,
};
Message.defaultProps = {
  placeholderSrcset: '',
  placeholderSrc: '',
};
export default Message;
