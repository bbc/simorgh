/** @jsx jsx */
import { useContext } from 'react';
import { jsx } from '@emotion/react';
import { GridItemMedium } from '#app/legacy/components/Grid';
import { RequestContext } from '#app/contexts/RequestContext';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import useViewTracker from '#app/hooks/useViewTracker';
import Text from '../Text';
import { ServiceContext } from '../../contexts/ServiceContext';
import styles from './index.styles';
import { defaultTranslations } from './config';
import InlineLink from '../InlineLink';
import { FormatIcon } from '../icons';

type CtaLinkProps = {
  href: string;
  text: string;
  ignoreLiteExtension?: boolean;
  className?: string;
  selected?: boolean;
};

export const createHrefRelativeToPage = (currentPath: string, id?: string) => {
  const noExtenstionPath = currentPath.split('.')[0];
  const slugs = noExtenstionPath.split('/');
  const idToAppend = id ?? slugs[slugs.length - 1];
  slugs.splice(-1, 1, idToAppend);

  return slugs.join('/').replace(' ', '');
};

const eventTrackingData = {
  componentName: 'easyReadCta',
};

const CtaLink = ({ href, text, className, selected = false }: CtaLinkProps) => {
  const clickTrackerHandler = useClickTrackerHandler(eventTrackingData);

  return (
    <a
      href={href}
      className={className}
      css={styles.linkContainer}
      {...clickTrackerHandler}
      {...(selected && { 'aria-current': 'page' })}
    >
      <span css={styles.linkTextContainer}>
        <Text
          size="brevier"
          css={[
            styles.linkText,
            selected ? styles.selected : styles.notSelected,
          ]}
        >
          {text}
        </Text>
      </span>
    </a>
  );
};

type Props = {
  easyReadAssetId?: string;
  originalAssetId?: string;
};

const EasyReadCTA = ({ easyReadAssetId, originalAssetId }: Props) => {
  const viewRef = useViewTracker(eventTrackingData);
  const { pathname } = useContext(RequestContext);
  const { translations } = useContext(ServiceContext);

  if (easyReadAssetId == null && originalAssetId == null) {
    return null;
  }

  const easyHref = createHrefRelativeToPage(pathname, easyReadAssetId);
  const originalHref = createHrefRelativeToPage(pathname, originalAssetId);

  const isEasyActive = easyReadAssetId == null;

  const { easyReadSite = defaultTranslations } = translations;
  const {
    toStandardSite,
    toEasySite,
    format,
    aIDisclaimer,
    learnMore,
    learnMoreLink,
  } = easyReadSite;

  const id = 'Format';

  return (
    <GridItemMedium>
      <section
        role="region"
        data-e2e="easy-read-cta"
        aria-labelledby={id}
        ref={viewRef}
      >
        <FormatIcon css={styles.icon} />
        <Text as="strong" id={id} hidden>
          {format}
        </Text>
        <CtaLink
          href={originalHref}
          text={toStandardSite}
          {...(!isEasyActive && { selected: true })}
        />
        <CtaLink
          href={easyHref}
          text={toEasySite}
          {...(isEasyActive && { selected: true })}
        />
      </section>
      {isEasyActive && (
        <Text as="small" size="brevier" css={styles.disclaimer}>
          {aIDisclaimer} <InlineLink text={learnMore} to={learnMoreLink} />.
        </Text>
      )}
    </GridItemMedium>
  );
};

export default EasyReadCTA;
