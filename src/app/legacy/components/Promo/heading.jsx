import styled from '@emotion/styled';

const Heading = styled.h2`
  ${props => props.theme.fontVariants.serifMedium}
  ${props => props.theme.fontSizes.bodyCopy}
  color: ${props =>
    props.theme.isDarkUi
      ? props.theme.palette.GREY_2
      : props.theme.palette.EBON};
  margin-top: 0;
  margin-bottom: ${props => `${props.theme.spacings.FULL}rem`};

  @media (prefers-color-scheme: dark) {
    ${props => !props.theme.isDarkUi && `color: ${props.theme.palette.GREY_2};`}
  }
`;

export default Heading;
