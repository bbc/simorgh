import styled from '@emotion/styled';

const P = styled.p(props => ({
  ...props.theme?.fontVariants?.sansRegular,
  ...props.theme?.fontSizes?.bodyCopy,
  color: props.theme?.palette?.EBON,
}));

export default P;
