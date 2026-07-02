import styled from '@emotion/styled';

const P = styled.p`
  ${({ theme: { fontVariants } }) => fontVariants.sansRegular};
  ${({ theme: { fontSizes } }) => fontSizes.bodyCopy};
  color: ${({ theme }) =>
    theme.isDarkUi ? theme.palette.GREY_3 : theme.palette.EBON};

  @media (prefers-color-scheme: dark) {
    ${({ theme }) => !theme.isDarkUi && `color: ${theme.palette.GREY_3};`}
  }
`;

export default P;
