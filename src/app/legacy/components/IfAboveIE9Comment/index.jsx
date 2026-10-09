const IfAboveIE9 = ({ children }) => (
  <>
    {/* eslint-disable-next-line react/no-danger */}
    <div dangerouslySetInnerHTML={{ __html: '<!--[if !IE]><!-->' }} />
    {children}
    {/* eslint-disable-next-line react/no-danger */}
    <div dangerouslySetInnerHTML={{ __html: '<!--<![endif]-->' }} />
  </>
);

export default IfAboveIE9;
