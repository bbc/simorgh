import styled from '@emotion/styled';

const Paragraph = styled.p`
  ${({ theme: { fontVariants } }) => fontVariants.sansRegular};
  ${({ theme: { fontSizes } }) => fontSizes.greatPrimer};
  color: ${props =>
    props.theme.isDarkUi
      ? props.theme.palette.WHITE
      : props.theme.palette.GREY_10};
  padding-top: ${({ theme: { spacings } }) => `${spacings.DOUBLE}rem`};
  margin: 0;
  ${({ theme: { mq } }) => mq.GROUP_3_MIN_WIDTH} {
    padding-top: ${({ theme: { spacings } }) => `${spacings.TRIPLE}rem`};
  }
  ${({ theme: { mq } }) => mq.GROUP_4_MIN_WIDTH} {
    width: ${({ theme: { spacings } }) => `calc(50% - ${spacings.FULL}rem)`};
  }
`;

const TopicDescription = ({ children }) => {
  return <Paragraph>{children}</Paragraph>;
};

export default TopicDescription;
