import { use } from 'react';

import SERVICES_WITH_NEW_NAV from '#app/components/Navigation/config';
import { RequestContext } from '#app/contexts/RequestContext';
import useToggle from '#hooks/useToggle';
import { ServiceContext } from '../../../contexts/ServiceContext';
import styles from './index.styles';

const ScriptLink = () => {
  const { scriptLink, service } = use(ServiceContext);
  const { pathname, variant: currentVariant } = use(RequestContext);
  const { enabled: scriptLinkEnabled } = useToggle('scriptLink');

  const { text, variant: alternateVariant } = scriptLink || {};

  if (!pathname) return null;
  if (!scriptLinkEnabled) return null;
  if (!alternateVariant) return null;

  const pathPartsWithoutExtension = pathname
    .replace(/\.[^/.]+$/, '') // remove any extensions, we don't want to link to AMP pages directly
    .split('?')?.[0] // remove any query parameters
    .split('/'); // split path into parts

  const currentVariantIndex = pathPartsWithoutExtension.indexOf(
    currentVariant as string,
  );

  pathPartsWithoutExtension[currentVariantIndex] = alternateVariant;
  const pathToVariant = pathPartsWithoutExtension.join('/');
  const useNewNavigationStyles = SERVICES_WITH_NEW_NAV.includes(service);
  const linkStyles = useNewNavigationStyles ? styles.newNavLink : styles.link;
  const containerStyles = useNewNavigationStyles
    ? styles.newNavContainer
    : styles.container;

  return (
    <a
      css={linkStyles}
      href={pathToVariant}
      data-variant={alternateVariant}
      className="focusIndicatorRemove"
    >
      <span css={containerStyles}>{text}</span>
    </a>
  );
};

export default ScriptLink;
