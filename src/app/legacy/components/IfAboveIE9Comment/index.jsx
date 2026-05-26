// biome-ignore-all lint/security/noDangerouslySetInnerHtml: we want this
const IfAboveIE9 = ({ children }) => (
  <>
    <div dangerouslySetInnerHTML={{ __html: '<!--[if !IE]><!-->' }} />
    {children}
    <div dangerouslySetInnerHTML={{ __html: '<!--<![endif]-->' }} />
  </>
);

export default IfAboveIE9;
