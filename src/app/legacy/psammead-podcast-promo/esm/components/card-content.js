import _styled from '@emotion/styled/base';
import { GEL_SPACING, GEL_SPACING_DBL } from '#legacy/gel-foundations/spacings';
import {
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
} from '#legacy/gel-foundations/breakpoints';

var CardContent = _styled(
  'div',
  process.env.NODE_ENV === 'production'
    ? {
        target: 'ejmatl50',
      }
    : {
        target: 'ejmatl50',
        label: 'CardContent',
      },
)(
  'flex:1;padding:',
  GEL_SPACING,
  ';@media (min-width: ',
  GEL_GROUP_2_SCREEN_WIDTH_MIN,
  '){padding:',
  GEL_SPACING,
  ' ',
  GEL_SPACING_DBL,
  ';}@media (min-width: ',
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  '){padding:',
  GEL_SPACING_DBL,
  ';}' +
    (process.env.NODE_ENV === 'production'
      ? ''
      : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NhcmQtY29udGVudC5qc3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBUThCIiwiZmlsZSI6Ii4uLy4uL3NyYy9jb21wb25lbnRzL2NhcmQtY29udGVudC5qc3giLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5cbmltcG9ydCB7IEdFTF9TUEFDSU5HLCBHRUxfU1BBQ0lOR19EQkwgfSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy9zcGFjaW5ncyc7XG5pbXBvcnQge1xuICBHRUxfR1JPVVBfMl9TQ1JFRU5fV0lEVEhfTUlOLFxuICBHRUxfR1JPVVBfNF9TQ1JFRU5fV0lEVEhfTUlOLFxufSBmcm9tICdAYmJjL2dlbC1mb3VuZGF0aW9ucy9icmVha3BvaW50cyc7XG5cbmNvbnN0IENhcmRDb250ZW50ID0gc3R5bGVkLmRpdmBcbiAgZmxleDogMTtcbiAgcGFkZGluZzogJHtHRUxfU1BBQ0lOR307XG5cbiAgQG1lZGlhIChtaW4td2lkdGg6ICR7R0VMX0dST1VQXzJfU0NSRUVOX1dJRFRIX01JTn0pIHtcbiAgICBwYWRkaW5nOiAke0dFTF9TUEFDSU5HfSAke0dFTF9TUEFDSU5HX0RCTH07XG4gIH1cblxuICBAbWVkaWEgKG1pbi13aWR0aDogJHtHRUxfR1JPVVBfNF9TQ1JFRU5fV0lEVEhfTUlOfSkge1xuICAgIHBhZGRpbmc6ICR7R0VMX1NQQUNJTkdfREJMfTtcbiAgfVxuYDtcblxuZXhwb3J0IGRlZmF1bHQgQ2FyZENvbnRlbnQ7XG4iXX0= */'),
);

export default CardContent;
