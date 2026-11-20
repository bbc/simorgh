import styled from '@emotion/styled';

const H1 = styled.h1`
  ${({ theme: { fontVariants } }) => fontVariants.sansBold};
  ${({ theme: { fontSizes } }) => fontSizes.canon};
  color: ${props =>
    props.theme.isDarkUi
      ? props.theme.palette.WHITE
      : props.theme.palette.GREY_10};
  margin: 0;
  ${({ theme: { mq } }) => mq.GROUP_4_MIN_WIDTH} {
    display: inline-block;
  }
`;

const TopicTitle = ({ children }) => {
  return (
    <H1 id="content" tabIndex="-1">
      {children}
    </H1>
  );
};

export default TopicTitle;
