import styled from '@emotion/styled';

const P = styled.p`
  ${({ theme: { fontVariants } }) => fontVariants.sansRegular};
  ${({ theme: { fontSizes } }) => fontSizes.bodyCopy};
  color: ${props =>
    props.theme.isDarkUi
      ? props.theme.palette.GREY_3
      : props.theme.palette.EBON};
`;

export default P;
