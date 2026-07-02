import styled from '@emotion/styled';

const Heading = styled.h2`
  ${props => props.theme.fontVariants.serifMedium}
  ${props => props.theme.fontSizes.bodyCopy}
  color: ${({ theme }) =>
    theme.isDarkUi ? theme.palette.GREY_2 : theme.palette.EBON};
  margin-top: 0;
  margin-bottom: ${props => `${props.theme.spacings.FULL}rem`};
  @media (prefers-color-scheme: dark) {
    ${({ theme }) => !theme.isDarkUi && `color: ${theme.palette.GREY_2};`}
  }
`;

export default Heading;
