import styled from '@emotion/styled';

const Footer = styled.footer(props => ({
  ...props.theme?.fontVariants?.sansRegular,
  ...props.theme?.fontSizes?.brevier,
  color: props.theme?.palette?.RHINO,
}));

export default Footer;
