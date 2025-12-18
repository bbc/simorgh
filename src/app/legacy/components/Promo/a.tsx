import styled from '@emotion/styled';

const A = styled.a(props => ({
  color: props.theme?.palette?.GREY_10,
  textDecoration: 'none',
  display: 'block',
  '&:hover, &:focus': { textDecoration: 'underline' },
  '&:visited': { color: props.theme?.palette?.GREY_6 },
  '&:before': {
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    content: '""',
  },
}));

export default A;
