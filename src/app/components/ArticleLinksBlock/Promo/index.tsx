import { use } from 'react';
import filterForBlockType from '#lib/utilities/blockHandlers';
import PromoTimestamp from '#components/Promo/timestamp';
import { OptimoBlock } from '#app/models/types/optimo';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import { Chevron, ChevronOrientation } from '#app/components/icons';
import { ServiceContext } from '../../../contexts/ServiceContext';
import styles from './index.module.scss';

interface PromoProps {
  block: OptimoBlock;
  clickTracker?: ReturnType<typeof useClickTrackerHandler>;
}

const Promo = ({ block, clickTracker }: PromoProps) => {
  const { serviceDatetimeLocale, dir } = use(ServiceContext);

  const textBlock = filterForBlockType(
    (block?.model as { blocks?: Record<string, unknown> })?.blocks || {},
    'text',
  );
  const aresLinkBlock = filterForBlockType(
    (block?.model as { blocks?: Record<string, unknown> })?.blocks || {},
    'aresLink',
  );
  const timestamp =
    aresLinkBlock?.model?.blocks?.[0]?.model?.timestamp ?? undefined;

  const href =
    textBlock?.model?.blocks?.[0]?.model?.blocks?.[0]?.model?.locator ?? '';
  const title =
    textBlock?.model?.blocks?.[0]?.model?.blocks?.[0]?.model?.text ?? '';

  return (
    <div className={styles.promoBox}>
      <a className={styles.link} href={href} {...clickTracker}>
        {title}
        <Chevron
          dir={dir}
          className={styles.chevron}
          orientation={ChevronOrientation.FORWARD}
        />
      </a>
      {timestamp && (
        <PromoTimestamp
          className={styles.timestamp}
          serviceDatetimeLocale={serviceDatetimeLocale}
        >
          {timestamp}
        </PromoTimestamp>
      )}
    </div>
  );
};

export default Promo;
