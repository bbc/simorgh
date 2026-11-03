import { use } from 'react';
import clsx from 'clsx';
import { ServiceContext } from '#app/contexts/ServiceContext';
import { LeftChevron, RightChevron } from '../../icons';
import CallToActionLinkContext from '../CallToActionLinkContext';
import styles from './index.module.scss';

type ChevronProps = {
  className?: string;
};

const Chevron = ({ className }: ChevronProps) => {
  const { size } = use(CallToActionLinkContext);
  const { dir } = use(ServiceContext);
  const isRtl = dir === 'rtl';
  const ChevronIcon = isRtl ? LeftChevron : RightChevron;

  return (
    <ChevronIcon
      className={clsx(
        size === 'brevier' ? styles.brevierSize : styles.picaSize,
        styles.chevron,
        className,
      )}
    />
  );
};

export default Chevron;
