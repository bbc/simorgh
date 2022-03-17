import _styled from '@emotion/styled/base';
import { oneOf } from 'prop-types';
import { C_WHITE } from '#legacy/psammead-styles/colours';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
} from '#legacy/gel-foundations/breakpoints';
import { GEL_SPACING } from '#legacy/gel-foundations/spacings';
import { getPica } from '#legacy/gel-foundations/typography';
import { getSansRegular } from '#legacy/psammead-styles/font-styles';
var SKIP_LINK_COLOR = '#333';
var SKIP_LINK_BORDER = '0.1875rem'; // 3px

var TOP_BOTTOM_SPACING = '0.75rem'; // 12px

var SkipLink = _styled(
  'a',
  process.env.NODE_ENV === 'production'
    ? {
        target: 'e1kgr8rg0',
      }
    : {
        target: 'e1kgr8rg0',
        label: 'SkipLink',
      },
)(
  'position:absolute;clip-path:inset(100%);clip:rect(1px, 1px, 1px, 1px);height:1px;width:1px;overflow:hidden;padding:',
  TOP_BOTTOM_SPACING,
  ' ',
  GEL_SPACING,
  ';background-color:',
  C_WHITE,
  ';border:',
  SKIP_LINK_BORDER,
  ' solid #000;color:',
  SKIP_LINK_COLOR,
  ';text-decoration:none;',
  function (_ref) {
    var script = _ref.script;
    return script && getPica(script);
  },
  ';',
  function (_ref2) {
    var service = _ref2.service;
    return service && getSansRegular(service);
  },
  ';&:focus{clip-path:none;clip:auto;height:auto;width:auto;top:0;',
  function (_ref3) {
    var dir = _ref3.dir;
    return '\n      '.concat(dir === 'ltr' ? 'left' : 'right', ': 0;\n    ');
  },
  '@media (min-width: ',
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  '){top:',
  GEL_SPACING,
  ';}}@media (max-width: ',
  GEL_GROUP_2_SCREEN_WIDTH_MAX,
  '){padding:',
  GEL_SPACING,
  ';}' +
    (process.env.NODE_ENV === 'production'
      ? ''
      : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9Ta2lwTGluay9pbmRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZXlCIiwiZmlsZSI6Ii4uLy4uL3NyYy9Ta2lwTGluay9pbmRleC5qc3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBvbmVPZiB9IGZyb20gJ3Byb3AtdHlwZXMnO1xuaW1wb3J0IHsgQ19XSElURSB9IGZyb20gJ0BiYmMvcHNhbW1lYWQtc3R5bGVzL2NvbG91cnMnO1xuaW1wb3J0IHtcbiAgR0VMX0dST1VQXzJfU0NSRUVOX1dJRFRIX01JTixcbiAgR0VMX0dST1VQXzJfU0NSRUVOX1dJRFRIX01BWCxcbn0gZnJvbSAnQGJiYy9nZWwtZm91bmRhdGlvbnMvYnJlYWtwb2ludHMnO1xuaW1wb3J0IHsgR0VMX1NQQUNJTkcgfSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy9zcGFjaW5ncyc7XG5pbXBvcnQgeyBnZXRQaWNhIH0gZnJvbSAnQGJiYy9nZWwtZm91bmRhdGlvbnMvdHlwb2dyYXBoeSc7XG5pbXBvcnQgeyBnZXRTYW5zUmVndWxhciB9IGZyb20gJ0BiYmMvcHNhbW1lYWQtc3R5bGVzL2ZvbnQtc3R5bGVzJztcblxuY29uc3QgU0tJUF9MSU5LX0NPTE9SID0gJyMzMzMnO1xuY29uc3QgU0tJUF9MSU5LX0JPUkRFUiA9ICcwLjE4NzVyZW0nOyAvLyAzcHhcbmNvbnN0IFRPUF9CT1RUT01fU1BBQ0lORyA9ICcwLjc1cmVtJzsgLy8gMTJweFxuXG5jb25zdCBTa2lwTGluayA9IHN0eWxlZC5hYFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGNsaXAtcGF0aDogaW5zZXQoMTAwJSk7XG4gIGNsaXA6IHJlY3QoMXB4LCAxcHgsIDFweCwgMXB4KTtcbiAgaGVpZ2h0OiAxcHg7XG4gIHdpZHRoOiAxcHg7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHBhZGRpbmc6ICR7VE9QX0JPVFRPTV9TUEFDSU5HfSAke0dFTF9TUEFDSU5HfTtcbiAgYmFja2dyb3VuZC1jb2xvcjogJHtDX1dISVRFfTtcbiAgYm9yZGVyOiAke1NLSVBfTElOS19CT1JERVJ9IHNvbGlkICMwMDA7XG4gIGNvbG9yOiAke1NLSVBfTElOS19DT0xPUn07XG4gIHRleHQtZGVjb3JhdGlvbjogbm9uZTtcbiAgJHsoeyBzY3JpcHQgfSkgPT4gc2NyaXB0ICYmIGdldFBpY2Eoc2NyaXB0KX07XG4gICR7KHsgc2VydmljZSB9KSA9PiBzZXJ2aWNlICYmIGdldFNhbnNSZWd1bGFyKHNlcnZpY2UpfTtcblxuICAmOmZvY3VzIHtcbiAgICBjbGlwLXBhdGg6IG5vbmU7XG4gICAgY2xpcDogYXV0bztcbiAgICBoZWlnaHQ6IGF1dG87XG4gICAgd2lkdGg6IGF1dG87XG4gICAgdG9wOiAwO1xuICAgICR7KHsgZGlyIH0pID0+IGBcbiAgICAgICR7ZGlyID09PSAnbHRyJyA/ICdsZWZ0JyA6ICdyaWdodCd9OiAwO1xuICAgIGB9XG5cbiAgICBAbWVkaWEgKG1pbi13aWR0aDogJHtHRUxfR1JPVVBfMl9TQ1JFRU5fV0lEVEhfTUlOfSkge1xuICAgICAgdG9wOiAke0dFTF9TUEFDSU5HfTtcbiAgICB9XG4gIH1cblxuICBAbWVkaWEgKG1heC13aWR0aDogJHtHRUxfR1JPVVBfMl9TQ1JFRU5fV0lEVEhfTUFYfSkge1xuICAgIHBhZGRpbmc6ICR7R0VMX1NQQUNJTkd9O1xuICB9XG5gO1xuXG5Ta2lwTGluay5wcm9wVHlwZXMgPSB7XG4gIGRpcjogb25lT2YoWydsdHInLCAncnRsJ10pLFxufTtcblxuU2tpcExpbmsuZGVmYXVsdFByb3BzID0geyBkaXI6ICdsdHInIH07XG5cbmV4cG9ydCBkZWZhdWx0IFNraXBMaW5rO1xuIl19 */'),
);

SkipLink.propTypes = {
  dir: oneOf(['ltr', 'rtl']),
};
SkipLink.defaultProps = {
  dir: 'ltr',
};
export default SkipLink;
