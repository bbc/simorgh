import { use } from 'react';
import filterForBlockType from '#lib/utilities/blockHandlers';
import useOperaMiniDetection from '#hooks/useOperaMiniDetection';
import PromoTimestamp from '#components/Promo/timestamp';
import { OptimoBlock } from '#app/models/types/optimo';
import useClickTrackerHandler from '#app/hooks/useClickTrackerHandler';
import { ServiceContext } from '../../../contexts/ServiceContext';
import styles from './index.styles';

interface PromoProps {
  block: OptimoBlock;
  clickTracker?: ReturnType<typeof useClickTrackerHandler>;
}

const Promo = ({ block, clickTracker }: PromoProps) => {
  const { serviceDatetimeLocale } = use(ServiceContext);

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

  const isOperaMini = useOperaMiniDetection();

  const promoBoxStyles = isOperaMini ? styles.operaPromoBox : styles.promoBox;

  return (
    <div css={promoBoxStyles}>
      <a css={styles.link} href={href} {...clickTracker}>
        {title}
      </a>
      {timestamp && (
        <PromoTimestamp
          css={styles.timestamp}
          serviceDatetimeLocale={serviceDatetimeLocale}
        >
          {timestamp}
        </PromoTimestamp>
      )}
    </div>
  );
};

export default Promo;
