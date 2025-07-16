import { use } from 'react';
import useToggle from '#hooks/useToggle';
import { RequestContext } from '#app/contexts/RequestContext';
import { ServiceContext } from '../../../contexts/ServiceContext';
import styles from './index.module.css';

const ScriptLink = () => {
  const { scriptLink } = use(ServiceContext);
  const { pathname, variant: currentVariant } = use(RequestContext);
  const { enabled: scriptLinkEnabled } = useToggle('scriptLink');

  const { text, variant: alternateVariant } = scriptLink || {};

  if (!pathname) return null;
  if (!scriptLinkEnabled) return null;
  if (!alternateVariant) return null;

  const pathPartsWithoutExtension = pathname
    .replace(/\.[^/.]+$/, '') // remove any extensions, we don't want to link to AMP pages directly
    .split('/');

  const currentVariantIndex = pathPartsWithoutExtension.indexOf(
    currentVariant as string,
  );

  pathPartsWithoutExtension[currentVariantIndex] = alternateVariant;
  const pathToVariant = pathPartsWithoutExtension.join('/');

  return (
    <a
      className={styles.link}
      href={pathToVariant}
      data-variant={alternateVariant}
      className="focusIndicatorRemove"
    >
      <span className={styles.container}>{text}</span>
    </a>
  );
};

export default ScriptLink;
