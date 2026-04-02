import { use } from 'react';
import useToggle from '#hooks/useToggle';
import { RequestContext } from '#app/contexts/RequestContext';
import SERVICES_WITH_NEW_NAV from '#app/components/Navigation/config';
import { ARTICLE_PAGE } from '#app/routes/utils/pageTypes';
import { ServiceContext } from '../../../contexts/ServiceContext';
import styles from './index.styles';

const ScriptLink = () => {
  const { scriptLink, service } = use(ServiceContext);
  const { pathname, pageType, variant: currentVariant } = use(RequestContext);
  const { enabled: scriptLinkEnabled } = useToggle('scriptLink');

  const { text, variant: alternateVariant } = scriptLink || {};
  const isNewNavigationService = SERVICES_WITH_NEW_NAV.includes(service);

  if (!pathname) return null;
  if (!scriptLinkEnabled) return null;
  if (!alternateVariant) return null;
  if (
    isNewNavigationService &&
    service === 'ukchina' &&
    pageType !== ARTICLE_PAGE
  ) {
    return null;
  }

  const pathPartsWithoutExtension = pathname
    .replace(/\.[^/.]+$/, '') // remove any extensions, we don't want to link to AMP pages directly
    .split('?')?.[0] // remove any query parameters
    .split('/'); // split path into parts

  const currentVariantIndex = pathPartsWithoutExtension.indexOf(
    currentVariant as string,
  );

  pathPartsWithoutExtension[currentVariantIndex] = alternateVariant;
  const pathToVariant = pathPartsWithoutExtension.join('/');

  return (
    <a
      css={styles.link(isNewNavigationService ? 'new-navigation' : 'legacy')}
      href={pathToVariant}
      data-variant={alternateVariant}
      className="focusIndicatorRemove"
    >
      <span
        css={styles.container(
          isNewNavigationService ? 'new-navigation' : 'legacy',
        )}
      >
        {text}
      </span>
    </a>
  );
};

export default ScriptLink;
