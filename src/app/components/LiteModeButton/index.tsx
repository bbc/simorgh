import { use } from 'react';
import { RequestContext } from '#app/contexts/RequestContext';
import CallToActionLink from '../CallToActionLink';
import style from './index.styles';

export default () => {
  const { canonicalLink, isLite } = use(RequestContext);
  const liteLink = `${canonicalLink}.lite`;
  return (
    <CallToActionLink
      url={isLite ? canonicalLink : liteLink}
      {...(isLite && { 'data-ignore-lite': true })}
      css={style.container}
    >
      <span css={[style.mode, !isLite && style.on]}>Pro</span>
      <span css={[style.mode, isLite && style.on]}>Lite</span>
    </CallToActionLink>
  );
};
