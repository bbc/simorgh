import _styled from '@emotion/styled/base';
import { GEL_SPACING_TRPL } from '#legacy/gel-foundations/spacings';

var Figure = _styled(
  'figure',
  process.env.NODE_ENV === 'production'
    ? {
        target: 'e6bmn90',
      }
    : {
        target: 'e6bmn90',
        label: 'Figure',
      },
)(
  'margin:0;padding-bottom:',
  GEL_SPACING_TRPL,
  ';width:100%;' +
    (process.env.NODE_ENV === 'production'
      ? ''
      : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRzRCIiwiZmlsZSI6Ii4uL3NyYy9pbmRleC5qc3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBHRUxfU1BBQ0lOR19UUlBMIH0gZnJvbSAnQGJiYy9nZWwtZm91bmRhdGlvbnMvc3BhY2luZ3MnO1xuXG5jb25zdCBGaWd1cmUgPSBzdHlsZWQuZmlndXJlYFxuICBtYXJnaW46IDA7XG4gIHBhZGRpbmctYm90dG9tOiAke0dFTF9TUEFDSU5HX1RSUEx9O1xuICB3aWR0aDogMTAwJTtcbmA7XG5cbmV4cG9ydCBkZWZhdWx0IEZpZ3VyZTtcbiJdfQ== */'),
);

export default Figure;
