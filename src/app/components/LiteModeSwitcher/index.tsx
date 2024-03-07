/** @jsx jsx */
import { RequestContext } from '#app/contexts/RequestContext';
import { jsx } from '@emotion/react';
import { useContext } from 'react';

export default function LiteModeSwitcher() {
  const { canonicalLink, isLite } = useContext(RequestContext);

  if (!isLite) return null;

  return (
    <a className="lite-switcher" href={canonicalLink}>
      Go to full site
    </a>
  );
}
