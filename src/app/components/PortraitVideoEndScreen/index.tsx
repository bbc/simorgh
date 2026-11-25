import { use, useId } from 'react';
import VisuallyHiddenText from '#app/components/VisuallyHiddenText';
import { navigationIcons } from '#app/components/icons/shared';
import { ServiceContext } from '#app/contexts/ServiceContext';
import LatestMediaSection from '#app/pages/MediaArticlePage/PagePromoSections/LatestMediaSection';
import { LatestMedia } from '#app/pages/MediaArticlePage/PagePromoSections/LatestMediaSection/types';
import styles from './index.module.scss';

const MAX_PROMOS = 3;

type PortraitVideoEndScreenProps = {
  content: LatestMedia[];
  currentArticleId?: string;
  onClose: () => void;
};

const getIdVariants = (id?: string) =>
  id ? [id, id.split(':').pop(), id.split('/').pop()] : [];

const PortraitVideoEndScreen = ({
  content,
  currentArticleId,
  onClose,
}: PortraitVideoEndScreenProps) => {
  const { translations } = use(ServiceContext);
  const headingId = useId();
  const currentArticleIds = new Set(getIdVariants(currentArticleId));

  const promos = content
    .filter(item => item.type === 'video' && !currentArticleIds.has(item.id))
    .slice(0, MAX_PROMOS);

  if (promos.length === 0) return null;

  const closeLabel =
    translations?.media?.endOfContentClose ?? 'End of content. Close';

  return (
    <section
      className={styles.overlay}
      data-testid="portrait-video-end-screen"
      aria-labelledby={headingId}
      role="region"
    >
      <button
        type="button"
        className={`${styles.closeButton} focusIndicatorInvert`}
        onClick={onClose}
        data-testid="portrait-video-end-screen-close"
        aria-label={closeLabel}
      >
        {navigationIcons.cross}
        <VisuallyHiddenText>{closeLabel}</VisuallyHiddenText>
      </button>
      <LatestMediaSection
        content={promos}
        eventTrackingData={{
          block: {
            componentName: 'portrait-video-end-screen',
          },
        }}
        headingId={headingId}
        showTimestamp // Izzy comment - show UX this toggled on and off. If we keep on, remove assoc code
      />
    </section>
  );
};

export default PortraitVideoEndScreen;
