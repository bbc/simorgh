import styled from '@emotion/styled';

const Heading = styled.h2(props => ({
  ...props.theme?.fontVariants?.serifMedium,
  ...props.theme?.fontSizes?.bodyCopy,
  color: props.theme?.palette?.EBON,
  marginTop: 0,
  marginBottom: `${props.theme?.spacings?.FULL ?? 0}rem`,
}));

export default Heading;
