import _styled from '@emotion/styled/base';
import { C_GHOST, C_EBON } from '#legacy/psammead-styles/colours';
import { GEL_GROUP_4_SCREEN_WIDTH_MIN } from '#legacy/gel-foundations/breakpoints';

var Card = _styled(
  'div',
  process.env.NODE_ENV === 'production'
    ? {
        target: 'egtr8ff0',
      }
    : {
        target: 'egtr8ff0',
        label: 'Card',
      },
)(
  'position:relative;background-color:',
  C_GHOST,
  ';display:flex;box-shadow:0 0 0.3125rem 0.3125rem ',
  C_EBON,
  '08;@media (min-width: ',
  GEL_GROUP_4_SCREEN_WIDTH_MIN,
  '){display:block;}&:hover{.podcast-promo--hover{text-decoration:underline;}}' +
    (process.env.NODE_ENV === 'production'
      ? ''
      : '/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9jb21wb25lbnRzL2NhcmQuanN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUl1QiIsImZpbGUiOiIuLi8uLi9zcmMvY29tcG9uZW50cy9jYXJkLmpzeCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IENfR0hPU1QsIENfRUJPTiB9IGZyb20gJ0BiYmMvcHNhbW1lYWQtc3R5bGVzL2NvbG91cnMnO1xuaW1wb3J0IHsgR0VMX0dST1VQXzRfU0NSRUVOX1dJRFRIX01JTiB9IGZyb20gJ0BiYmMvZ2VsLWZvdW5kYXRpb25zL2JyZWFrcG9pbnRzJztcblxuY29uc3QgQ2FyZCA9IHN0eWxlZC5kaXZgXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogJHtDX0dIT1NUfTtcbiAgZGlzcGxheTogZmxleDtcbiAgYm94LXNoYWRvdzogMCAwIDAuMzEyNXJlbSAwLjMxMjVyZW0gJHtDX0VCT059MDg7XG5cbiAgQG1lZGlhIChtaW4td2lkdGg6ICR7R0VMX0dST1VQXzRfU0NSRUVOX1dJRFRIX01JTn0pIHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgfVxuICAmOmhvdmVyIHtcbiAgICAucG9kY2FzdC1wcm9tby0taG92ZXIge1xuICAgICAgdGV4dC1kZWNvcmF0aW9uOiB1bmRlcmxpbmU7XG4gICAgfVxuICB9XG5gO1xuXG5leHBvcnQgZGVmYXVsdCBDYXJkO1xuIl19 */'),
);

export default Card;
