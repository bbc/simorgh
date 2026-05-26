import StyledTitle from './index.styles';

const Title = ({ children, className = '', as = '' }) => (
  <StyledTitle as={as} {...(className ? { className } : undefined)}>
    {children}
  </StyledTitle>
);

export default Title;
