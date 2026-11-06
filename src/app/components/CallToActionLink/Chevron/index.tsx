import clsx from 'clsx';
import { use } from 'react';
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
  const chevronClassName = clsx(
    styles.chevron,
    size === 'brevier' ? styles.brevierSize : styles.picaSize,
    className,
  );

  return isRtl ? (
    <LeftChevron className={chevronClassName} />
  ) : (
    <RightChevron className={chevronClassName} />
  );
};

export default Chevron;
